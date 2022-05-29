import { randomInt } from '../../../javascript-helper';
import { DeviceInfo } from '../../../../../routes/legacy/bloc/models/device-info';
import { mainDc } from '../../../../containers/main-init';
import { getUserDevicesRef } from '../../../../../routes/legacy/bloc/core/rtdb/rtdb';
import {
  selectCompatibleFunctionFlowByUserDevices,
  ClientVersionFlow,
  VersionRequirementsPerPlatformsType,
  waitUntilDeviceInfoCreated,
  retrieveVersionFromDevicesInfo,
} from '../client-flow';

describe('ContentFlow', () => {

  afterAll(async () => {
    await mainDc.app.delete();
  });

  it('select compatible function flow by user devices', () => {
    const CLIENT_VERSION_REQUIREMENTS: VersionRequirementsPerPlatformsType = {
      ios: {
        [ClientVersionFlow.LATEST]: {
          min: '4.0.0',
          max: '5.0.0',
        },
      },
    };

    let flow;

    // test lowercase
    flow = selectCompatibleFunctionFlowByUserDevices(CLIENT_VERSION_REQUIREMENTS, [
      { platform: 'ios', version: '4.22.2' },
    ]);
    expect(flow).toEqual(ClientVersionFlow.LATEST);

    // test uppercase
    flow = selectCompatibleFunctionFlowByUserDevices(CLIENT_VERSION_REQUIREMENTS, [
      { platform: 'iOS', version: '4.22.2' },
    ]);
    expect(flow).toEqual(ClientVersionFlow.LATEST);

    // test too low version
    flow = selectCompatibleFunctionFlowByUserDevices(CLIENT_VERSION_REQUIREMENTS, [
      { platform: 'iOS', version: '3.22.2' },
    ]);
    expect(flow).toBeUndefined();

    // test too high version
    flow = selectCompatibleFunctionFlowByUserDevices(CLIENT_VERSION_REQUIREMENTS, [
      { platform: 'iOS', version: '5.1.0' },
    ]);
    expect(flow).toBeFalsy();

    // test no devices
    flow = selectCompatibleFunctionFlowByUserDevices(CLIENT_VERSION_REQUIREMENTS, []);
    expect(flow).toEqual(ClientVersionFlow.LATEST);

    // test no devices
    flow = selectCompatibleFunctionFlowByUserDevices(CLIENT_VERSION_REQUIREMENTS, [{ platform: 'iOS', version: null }]);
    expect(flow).toEqual(ClientVersionFlow.LATEST);

    // test priority
    flow = selectCompatibleFunctionFlowByUserDevices(
      {
        ios: { [ClientVersionFlow.LATEST]: { min: '10' } },
        android: { [ClientVersionFlow.DEPRECATED]: { min: '10' } },
      },
      [
        { platform: 'ios', version: '10' },
        { platform: 'android', version: '10' },
      ]
    );
    expect(flow).toEqual(ClientVersionFlow.LATEST);

    // test priority, different order
    flow = selectCompatibleFunctionFlowByUserDevices(
      {
        ios: { [ClientVersionFlow.DEPRECATED]: { min: '10' } },
        android: { [ClientVersionFlow.LATEST]: { min: '10' } },
      },
      [
        { platform: 'ios', version: '10' },
        { platform: 'android', version: '10' },
      ]
    );
    expect(flow).toEqual(ClientVersionFlow.LATEST);

    //  regression: test select deprecated
    flow = selectCompatibleFunctionFlowByUserDevices(
      {
        // rules:
        ios: {
          [ClientVersionFlow.LATEST]: {
            min: '4.0.0',
          },
          [ClientVersionFlow.DEPRECATED]: {
            max: '4.0.0',
          },
        },
      },
      [
        // used device:
        { platform: 'ios', version: '3.2.6' },
      ]
    );
    expect(flow).toEqual(ClientVersionFlow.DEPRECATED);

    flow = selectCompatibleFunctionFlowByUserDevices(
      {
        // rules:
        ios: {
          [ClientVersionFlow.LATEST]: {
            min: '4.0.0',
          },
          [ClientVersionFlow.DEPRECATED]: {
            min: '3.0.0',
            max: '4.0.0',
          },
        },
      },
      [
        // used device:
        { platform: 'ios', version: '3.2.6' },
      ]
    );
    expect(flow).toEqual(ClientVersionFlow.DEPRECATED);

    flow = selectCompatibleFunctionFlowByUserDevices(
      {
        // rules:
        ios: {
          [ClientVersionFlow.DEPRECATED]: {
            max: '4.0.0',
          },
        },
      },
      [
        // used device:
        { platform: 'ios', version: '3.2.6' },
      ]
    );
    expect(flow).toEqual(ClientVersionFlow.DEPRECATED);
  });

  it('wait until device info created [timeout]', async () => {
    const dtStart = new Date();
    const result = await waitUntilDeviceInfoCreated(mainDc, 'ut_' + randomInt(), 400);
    expect(result).toBeFalsy();
    expect(+new Date()).toBeGreaterThanOrEqual(+dtStart + 400);
  });

  it('wait until device info created [success]', async () => {
    const dtStart = new Date();
    const uid = 'ut_' + randomInt();

    setTimeout(() => {
      const ref = getUserDevicesRef(mainDc.rtdb, uid);
      ref.set({
        version: { android: '3.3.3' },
      } as DeviceInfo);
    }, 100);

    const result = await waitUntilDeviceInfoCreated(mainDc, uid, 400);
    expect(result).not.toEqual([]);
    expect(+new Date()).toBeGreaterThanOrEqual(+dtStart + 100);
  });

  it('retrieve version from devices info [regression]', () => {
    let iosVersion = retrieveVersionFromDevicesInfo(
      [{ version: { ios: '4.0' } }, { version: { ios: '3.0' } }, { version: { android: '5.0' } }] as DeviceInfo[],
      'iOS'
    );
    expect(iosVersion).toEqual('4.0');

    iosVersion = retrieveVersionFromDevicesInfo([], 'iOS');
    expect(iosVersion).toBeFalsy();
  });
});

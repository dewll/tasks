import * as _ from 'lodash';
import * as compareVersions from 'compare-versions';
import moment from 'moment';
import { Logger } from '../../logger';
import { VERSIONS_REQUIREMENTS } from './index';
import { DeviceInfo } from '../../../../routes/legacy/bloc/models/device-info';
import { DependencyContainerType } from '../../../containers/dependency-container';
import { PlatformType, PlatformTypeLC } from '../../../../routes/legacy/bloc/models/platform-type';
import { getDevices } from '../../../../gateway/use-cases/content-project/helpers/project-user-details-worker';

const logger = new Logger('ClientVersionFlow');

/**
 * Type of versionRequirements parameter in selectFunctionFlow(), selectCompatibleFunctionFlowByUserDevices()
 *
 * example:
 * {
 *   ios: {
 *     [ClientVersionFlow.LATEST>]: {
 *       min: '4.0.0',
 *       max: '4.0.0',
 *       ...
 *     },
 *   },
 *   android: {
 *     [ClientVersionFlow.DEPRECATED]: {
 *       ...
 *     },
 *   }
 * }
 * */
export type VersionRequirementsPerPlatformsType = Partial<Record<PlatformTypeLC, Record<string, ClientVersion>>>;

export interface ClientVersion {
  flow?: ClientVersionFlow;
  min?: string;
  max?: string;
}

export const enum ClientVersionFlow {
  LATEST = 'LATEST',
  DEPRECATED = 'DEPRECATED',
  ERROR = 'ERROR',
}

interface UserDeviceInfo {
  platform: PlatformType | PlatformTypeLC;
  version: string;
}

export type ClientVersionFlowRequirements = Partial<
  Record<
    PlatformType | PlatformTypeLC,
    | { [ClientVersionFlow.LATEST]: ClientVersion }
    | { [ClientVersionFlow.DEPRECATED]: ClientVersion }
    | { [ClientVersionFlow.ERROR]: ClientVersion }
  >
>;

export async function selectFunctionFlowForClient(
  dc: DependencyContainerType,
  versionRequirements: ClientVersionFlowRequirements,
  uid: string | null,
  platform?: PlatformType,
  appVersion?: string,
  awaitUserDeviceCreation?: boolean
): Promise<ClientVersionFlow> {
  const functionality = _.findKey(VERSIONS_REQUIREMENTS, (item) => item === versionRequirements);

  const logArgs = {
    uid,
    platform,
    appVersion,
    ...(functionality ? { functionality } : null),
  };

  let flow = null;
  try {
    flow = await selectFunctionFlow(dc, versionRequirements, uid, platform, appVersion, awaitUserDeviceCreation);
    flow = flow || ClientVersionFlow.ERROR;
    logger.logInfo('selectFunctionFlowForClient result', { flow, ...logArgs });
  } catch (e) {
    logger.logError('selectFunctionFlowForClient', e, logArgs);
    throw e;
  }
  return flow;
}

export function selectCompatibleFunctionFlowByUserDevices(
  versionRequirements: VersionRequirementsPerPlatformsType,
  userDevices: UserDeviceInfo[]
): ClientVersionFlow {
  if (userDevices.length === 0) return ClientVersionFlow.LATEST;

  let compatibleVersions: ClientVersion[] = [];

  for (const device of userDevices) {
    if (!device.platform || device.platform?.length === 0) continue;
    const versionsPerFlows: Record<string, ClientVersion> = versionRequirements[device.platform.toLowerCase()];
    if (!versionsPerFlows) continue;

    for (const flow of Object.keys(versionsPerFlows) as ClientVersionFlow[]) {
      const requiredVersion: ClientVersion = versionsPerFlows[flow as string];

      if (!device.version) {
        compatibleVersions.push({ flow, ...requiredVersion });
        continue;
      }

      if (requiredVersion.min && !compareVersions.compare(device.version || '0', requiredVersion.min, '>=')) {
        continue;
      }
      if (requiredVersion.max && !compareVersions.compare(device.version || '0', requiredVersion.max, '<')) {
        continue;
      }
      compatibleVersions.push({ flow, ...requiredVersion });
    }
  }

  const FLOWS_PRIORITIES = {
    [ClientVersionFlow.LATEST]: 3,
    [ClientVersionFlow.DEPRECATED]: 2,
    [ClientVersionFlow.ERROR]: 1,
  };
  compatibleVersions = _.sortBy(compatibleVersions, (clientVersion) => -FLOWS_PRIORITIES[clientVersion.flow!]);
  return compatibleVersions[0]?.flow;
}

/**
 * Select the most appropriate CF workflow based on the requirements of the CF and the user's app version
 */
async function selectFunctionFlow<Requirements>(
  dc: DependencyContainerType,
  versionRequirements: Requirements,
  uid: string | null,
  platform?: PlatformType,
  appVersion?: string,
  awaitUserDeviceCreation?: boolean
): Promise<ClientVersionFlow> {
  let userDevices: UserDeviceInfo[] = [];

  if (platform && appVersion) {
    userDevices = [{ platform: platform, version: appVersion }];
  } else if (uid) {
    if (awaitUserDeviceCreation) {
      if (!(await waitUntilDeviceInfoCreated(dc, uid, 3000))) {
        return ClientVersionFlow.DEPRECATED;
      }
    }
    userDevices = await retrieveAppClientDeviceVersionsFromDb(dc, uid);
  }

  return selectCompatibleFunctionFlowByUserDevices(versionRequirements, userDevices);
}

export async function waitUntilDeviceInfoCreated(
  dc: DependencyContainerType,
  uid: string,
  timeoutMilliseconds: number
): Promise<DeviceInfo[] | null> {
  const { logger } = dc;
  let devices: DeviceInfo[] = [];
  let dtTimeout: Date | null = null;

  while (!devices.length) {
    devices = await getDevices(dc, uid);
    if (devices.length) {
      break;
    }

    dtTimeout = dtTimeout || moment().add(timeoutMilliseconds, 'ms').toDate();
    if (dtTimeout < new Date()) {
      logger.logError(
        'awaitUntilDeviceInfoCreated',
        new Error(`DeviceInfo for user ${uid} was not created (we waited ${timeoutMilliseconds} milliseconds)`)
      );
      return null;
    }

    logger.logInfo(`DeviceInfo not yet created for user ${uid}, waiting...`, uid);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  return devices;
}

/**
 * Get the latest versions of the user's Android and IOS apps
 *
 */
async function retrieveAppClientDeviceVersionsFromDb(
  dc: DependencyContainerType,
  uid: string
): Promise<UserDeviceInfo[]> {
  dc.logger.logInfo('Params in function for client version checking', uid);

  const devices: DeviceInfo[] = await getDevices(dc, uid);

  const currentClientVersionOnIos = retrieveVersionFromDevicesInfo(devices, 'iOS');
  const currentClientVersionOnAndroid = retrieveVersionFromDevicesInfo(devices, 'Android');

  dc.logger.logInfo('Retrieve version from device info ', {
    uid: uid,
    ios: currentClientVersionOnIos,
    android: currentClientVersionOnAndroid,
  });

  return [
    { platform: 'iOS', version: currentClientVersionOnIos },
    { platform: 'Android', version: currentClientVersionOnAndroid },
  ];
}

/**
 * Filter and find the latest version of all devices by platform
 *
 * @param devices
 * @param platform
 */
export function retrieveVersionFromDevicesInfo(devices: DeviceInfo[], platform: PlatformType) {
  const _platform = platform.toLowerCase(); // convert to as lowercase
  const devicesTemp = devices.filter((d) => d.version && (d.version as any)[_platform]);

  const device: DeviceInfo = devicesTemp.reduce((prev: any, current: any) => {
    return prev && compareVersions.compare(prev.version[_platform], current.version[_platform], '>') ? prev : current;
  }, null);

  return (device?.version as any)[_platform];
}

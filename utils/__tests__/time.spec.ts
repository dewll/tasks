import {TimeUtils,getCurrentTime} from '../time';

const event = new Date();
const daysNumber = 5;
const number = 3600;
const seconds = 7200;

describe('TimeUtils', ()=>{
  it('testing if  date is display', () => {
    const getDisplayDate = TimeUtils.getDisplayDate()
    expect(getDisplayDate).toBeTruthy;
  });
  it('testing if days is gotten for timestamp', () => {
    const getDaysFrom = TimeUtils.getDaysFrom(getCurrentTime())
    expect(getDaysFrom).toBeTruthy;
  });
  it('testing if time stamp is gotten', () => {
    const getTimeStamp = TimeUtils.getTimeStamp(`${event}`)
    expect(getTimeStamp).toBeTruthy;
  });
  it('testing if number of days to add is added to date', () => {
    const addDaysInDate = TimeUtils.addDaysInDate(event, daysNumber )
    expect(addDaysInDate).toBeTruthy;
  });
  it('testing if date in the past is gotten', () => {
    const dateInPastFromNow = TimeUtils.dateInPastFromNow(daysNumber)
    expect(dateInPastFromNow).toBeTruthy;
  });
  it('testing if date is gotten from date in string', () => {
    const getDateFromString = TimeUtils.getDateFromString(`${event}`)
    expect(getDateFromString).toBeTruthy;
  });
  it('testing if date is gotten from number', () => {
    const getDateFromNumber = TimeUtils.getDateFromNumber(number)
    expect(getDateFromNumber).toBeTruthy;
  });
  it('testing if date is gotten from seconds', () => {
    const getDaysFromSeconds = TimeUtils.getDaysFromSeconds(seconds)
    expect(getDaysFromSeconds).toBeTruthy;
  });
  it('testing if current date is gotten', () => {
    const getCurrentDate = TimeUtils.getCurrentDate()
    expect(getCurrentDate).toBeTruthy;
  });
  it('testing if difference between date is gotten', () => {
    const getDiffTimeInterval = TimeUtils.getDiffTimeInterval(event, event)
    expect(getDiffTimeInterval).toBe(0);
  });
  it('testing if date type is return', () => {
    const toDateType = TimeUtils.toDateType(event)
    expect(toDateType).toBeTruthy;
  });
})
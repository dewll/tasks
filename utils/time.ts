import * as _ from 'lodash';
import moment from 'moment';
import { Logger } from './logger';
import { firestore } from 'firebase-admin';

const csvTimeStampFormat = 'DD/MM/YYYY';
const freshDeskTimeFormat = 'YYYY-MM-DD';
const unixStartTime = moment.unix(0);
export const ONE_DAY = 3600 * 24;
const MILLISECONDS_RATIO = 1000;

type DisplayFormat = 'DD MMM YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';

const logger = new Logger();

export const TimeUtils = {
  getDisplayDate,
  getDaysFrom,
  getTimeStamp,
  addDaysInDate,
  dateInPastFromNow,
  getDateFromString,
  getDateFromNumber,
  getDaysFromSeconds,
  getCurrentDate,
  getDiffTimeInterval,
  toDateType,
}

/**
 * current time stamp in seconds
 * @returns {number}
 */
export const getCurrentTime = () => (Date.now() / MILLISECONDS_RATIO) | 0;

export const getUnixTimeFromDateString = (s: string) => (Date.parse(s) / MILLISECONDS_RATIO) | 0;

export const convertToTimestamp = (n: number) => firestore.Timestamp.fromDate(new Date(n));

/**
 * current time stamp in millis
 * @returns {number}
 */
export const getCurrentTimeStampInMillis = () => Date.now();

function getDisplayDate(timeStamp: number = getCurrentTime(), format: DisplayFormat = 'DD MMM YYYY'): string {
  return moment.unix(timeStamp).format(format);
}

export const getUnixStartTime = () => unixStartTime.toDate();

export const getFreshDeskTime = (timestamp: number): string => getDisplayDate(timestamp, freshDeskTimeFormat);

function getDaysFrom(timeStamp: number): string {
  logger.logInfo(`timeStamp => ${timeStamp}`);
  const endDate = moment(timeStamp * MILLISECONDS_RATIO);
  return endDate.from(unixStartTime);
}

/**
 * returns timestamp from dateString in DD/MM/YYYY
 * @param {string} dateString
 * @returns {number}
 */
function getTimeStamp(dateString: string): number {
  return moment(dateString, csvTimeStampFormat, true).unix();
}

/**
 *
 * @param date // subscription date
 * @param days // number of days need to add
 */
function addDaysInDate(date: Date, days: number): Date {
  return moment(new Date(date.setDate(date.getDate() + days))).toDate();
}

/**
 *
 * @param days // number of days in the past
 */
function dateInPastFromNow(days: number): Date {
  return moment().subtract(days, 'd').toDate();
}

/**
 * get date from string
 * @param date
 */
function getDateFromString(dateString: string): Date {
  const date = moment(parseInt(dateString)).toDate();
  return isNaN(date as unknown as number) ? new Date(0) : date;
}

/**
 * get date from number
 * @param date
 */
function getDateFromNumber(date: number): Date {
  return moment(date * MILLISECONDS_RATIO).toDate();
}

function getDaysFromSeconds(seconds: number) {
  return seconds / (24 * 60 * 60);
}

function getCurrentDate(): Date {
  return new Date();
}

/**
 * time interval in seconds between starts of dates
 */
function getDiffTimeInterval(endDate: Date, startDate: Date) {
  return moment(endDate).startOf('day').diff(moment(startDate).startOf('day'), 'days') * ONE_DAY;
}

function toDateType(date: firestore.Timestamp | Date | null | undefined): Date {
  if (!date) {
    return new Date(0);
  }
  let DateNative: Date | null = _.isObject(date) && 'toDate' in date ? date.toDate() : date;

  if (isNaN(DateNative as any)) {
    DateNative = null;
  }
  return DateNative ?? new Date(0);
}

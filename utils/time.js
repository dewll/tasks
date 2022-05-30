"use strict";
exports.__esModule = true;
exports.addDaysInDate = exports.getFreshDeskTime = exports.getUnixStartTime = exports.getCurrentTimeStampInMillis = exports.convertToTimestamp = exports.getUnixTimeFromDateString = exports.getCurrentTime = exports.TimeUtils = exports.ONE_DAY = void 0;
var _ = require("lodash");
var moment_1 = require("moment");
var logger_1 = require("./logger");
var firebase_admin_1 = require("firebase-admin");
var csvTimeStampFormat = 'DD/MM/YYYY';
var freshDeskTimeFormat = 'YYYY-MM-DD';
//const unixStartTime = moment.unix(0);
exports.ONE_DAY = 3600 * 24;
var MILLISECONDS_RATIO = 1000;
var logger = new logger_1.Logger();
exports.TimeUtils = {
    getDisplayDate: getDisplayDate,
    getDaysFrom: getDaysFrom,
    getTimeStamp: getTimeStamp,
    addDaysInDate: addDaysInDate,
    dateInPastFromNow: dateInPastFromNow,
    getDateFromString: getDateFromString,
    getDateFromNumber: getDateFromNumber,
    getDaysFromSeconds: getDaysFromSeconds,
    getCurrentDate: getCurrentDate,
    getDiffTimeInterval: getDiffTimeInterval,
    toDateType: toDateType
};
/**
 * current time stamp in seconds
 * @returns {number}
 */
var getCurrentTime = function () { return (Date.now() / MILLISECONDS_RATIO) | 0; };
exports.getCurrentTime = getCurrentTime;
var getUnixTimeFromDateString = function (s) { return (Date.parse(s) / MILLISECONDS_RATIO) | 0; };
exports.getUnixTimeFromDateString = getUnixTimeFromDateString;
var convertToTimestamp = function (n) { return firebase_admin_1.firestore.Timestamp.fromDate(new Date(n)); };
exports.convertToTimestamp = convertToTimestamp;
/**
 * current time stamp in millis
 * @returns {number}
 */
var getCurrentTimeStampInMillis = function () { return Date.now(); };
exports.getCurrentTimeStampInMillis = getCurrentTimeStampInMillis;
function getDisplayDate(timeStamp, format) {
    if (timeStamp === void 0) { timeStamp = (0, exports.getCurrentTime)(); }
    if (format === void 0) { format = 'DD MMM YYYY'; }
    return moment_1["default"].unix(timeStamp).format(format);
}
var getUnixStartTime = function () { return unixStartTime.toDate(); };
exports.getUnixStartTime = getUnixStartTime;
var getFreshDeskTime = function (timestamp) { return getDisplayDate(timestamp, freshDeskTimeFormat); };
exports.getFreshDeskTime = getFreshDeskTime;
function getDaysFrom(timeStamp) {
    logger.logInfo("timeStamp => ".concat(timeStamp));
    var endDate = (0, moment_1["default"])(timeStamp * MILLISECONDS_RATIO);
    return endDate.from(unixStartTime);
}
/**
 * returns timestamp from dateString in DD/MM/YYYY
 * @param {string} dateString
 * @returns {number}
 */
function getTimeStamp(dateString) {
    return (0, moment_1["default"])(dateString, csvTimeStampFormat, true).unix();
}
/**
 *
 * @param date // subscription date
 * @param days // number of days need to add
 */
function addDaysInDate(date, days) {
    return (0, moment_1["default"])(new Date(date.setDate(date.getDate() + days))).toDate();
}
exports.addDaysInDate = addDaysInDate;
/**
 *
 * @param days // number of days in the past
 */
function dateInPastFromNow(days) {
    return (0, moment_1["default"])().subtract(days, 'd').toDate();
}
/**
 * get date from string
 * @param date
 */
function getDateFromString(dateString) {
    var date = (0, moment_1["default"])(parseInt(dateString)).toDate();
    return isNaN(date) ? new Date(0) : date;
}
/**
 * get date from number
 * @param date
 */
function getDateFromNumber(date) {
    return (0, moment_1["default"])(date * MILLISECONDS_RATIO).toDate();
}
function getDaysFromSeconds(seconds) {
    return seconds / (24 * 60 * 60);
}
function getCurrentDate() {
    return new Date();
}
/**
 * time interval in seconds between starts of dates
 */
function getDiffTimeInterval(endDate, startDate) {
    return (0, moment_1["default"])(endDate).startOf('day').diff((0, moment_1["default"])(startDate).startOf('day'), 'days') * exports.ONE_DAY;
}
function toDateType(date) {
    if (!date) {
        return new Date(0);
    }
    var DateNative = _.isObject(date) && 'toDate' in date ? date.toDate() : date;
    if (isNaN(DateNative)) {
        DateNative = null;
    }
    return DateNative !== null && DateNative !== void 0 ? DateNative : new Date(0);
}

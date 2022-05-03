"use strict";
exports.__esModule = true;
exports.Logger = void 0;
var firebase_functions_1 = require("firebase-functions");
var isDevelopment = process.env.FUNCTIONS_ENV === 'development';
var Logger = /** @class */ (function () {
    function Logger(loggingClass) {
        if (loggingClass === void 0) { loggingClass = ''; }
        var _this = this;
        this.ENTER = 'enter';
        this.EXIT = 'exit';
        this.logTag = '';
        this.logInfo = function (message, data) {
            if (data === void 0) { data = null; }
            try {
                var args = [_this.logTag, message];
                if (data !== null)
                    args.push(data);
                isDevelopment && console.info.apply(console, args);
                firebase_functions_1.logger.info.apply(firebase_functions_1.logger, args);
            }
            catch (e) {
                console.error('Error during logInfo:', e);
            }
        };
        this.logWarning = function (message, data) {
            if (data === void 0) { data = null; }
            try {
                var args = [_this.logTag, message];
                if (data !== null)
                    args.push(data);
                isDevelopment && console.warn.apply(console, args);
                firebase_functions_1.logger.warn.apply(firebase_functions_1.logger, args);
            }
            catch (e) {
                console.error('Error during logWarning:', e);
            }
        };
        this.logError = function (method, error, info) {
            if (info === void 0) { info = null; }
            try {
                var args = [];
                if (_this.logTag) {
                    args.push(_this.logTag);
                }
                if (method && !("".concat(method, ":") !== _this.logTag)) {
                    args.push("".concat(method, ":"));
                }
                args.push(error);
                if (info !== null) {
                    args.push(info);
                }
                isDevelopment && console.error.apply(console, args);
                firebase_functions_1.logger.error.apply(firebase_functions_1.logger, args);
            }
            catch (e) {
                console.error('Error during logError:', e);
            }
        };
        this.logDebug = function (method, message) {
            try {
                isDevelopment && console.debug(_this.logTag, message, method);
                firebase_functions_1.logger.debug(_this.logTag, message, method);
            }
            catch (e) {
                console.error('Error during logDebug:', e);
            }
        };
        this.logTag = loggingClass + ': ';
    }
    return Logger;
}());
exports.Logger = Logger;

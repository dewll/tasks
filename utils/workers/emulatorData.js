"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var firestore_2 = require("firebase/firestore");
//import {app} from '../../functions/src/index'
var firebaseConfig = {
    apiKey: "AIzaSyCQo925lNcuyxh55whdwSl0CVAH5pvlaqs",
    authDomain: "co-unitest.firebaseio.com",
    databaseURL: "http://localhost:8080/emulator/?ns=co-unittest",
    projectId: "co-unittest",
    storageBucket: "co-unittest.appspot.com",
    messagingSenderId: "",
    appId: "1:468871978549:ios:7c1fe358edced3affa9b7c",
    measurementId: ""
};
var app = (0, app_1.initializeApp)(firebaseConfig);
//const db = getDatabase(app);
var db = (0, firestore_2.getFirestore)(app);
(0, firestore_2.connectFirestoreEmulator)(db, 'localhost', 8080);
var citiesRef = (0, firestore_1.collection)(db, "cities");
var test = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(citiesRef, "SF"), {
                    name: "San Francisco", state: "CA", country: "USA",
                    capital: true, population: 90000,
                    regions: ["west_coast", "norcal"]
                })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(citiesRef, "LA"), {
                        name: "Los Angeles", state: "CA", country: "USA",
                        capital: false, population: 3900000,
                        regions: ["west_coast", "socal"]
                    })];
            case 2:
                _a.sent();
                console.log('wri');
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(citiesRef, "DC"), {
                        name: "Washington, D.C.", state: null, country: "USA",
                        capital: true, population: 680000,
                        regions: ["east_coast"]
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(citiesRef, "TOK"), {
                        name: "Tokyo", state: null, country: "Japan",
                        capital: true, population: 9000000,
                        regions: ["kanto", "honshu"]
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(citiesRef, "BJ"), {
                        name: "Beijing", state: null, country: "China.",
                        capital: true, population: 21500000,
                        regions: ["jingjinji", "hebei"]
                    })];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var ans = test();
console.log(ans);

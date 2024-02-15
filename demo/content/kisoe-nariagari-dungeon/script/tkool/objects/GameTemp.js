"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Temp = void 0;
var core_1 = require("../core");
var DataManager_1 = require("../managers/DataManager");
var Game_Temp = /** @class */ (function () {
    function Game_Temp() {
        this.initialize();
    }
    Game_Temp.prototype.initialize = function () {
        this._isPlaytest = core_1.Utils.isOptionValid("test");
        this._commonEventId = 0;
        this._destinationX = null;
        this._destinationY = null;
    };
    Game_Temp.prototype.isPlaytest = function () {
        return this._isPlaytest;
    };
    Game_Temp.prototype.reserveCommonEvent = function (commonEventId) {
        this._commonEventId = commonEventId;
    };
    Game_Temp.prototype.clearCommonEvent = function () {
        this._commonEventId = 0;
    };
    Game_Temp.prototype.isCommonEventReserved = function () {
        return this._commonEventId > 0;
    };
    Game_Temp.prototype.reservedCommonEvent = function () {
        return DataManager_1.$dataCommonEvents[this._commonEventId];
    };
    Game_Temp.prototype.setDestination = function (x, y) {
        this._destinationX = x;
        this._destinationY = y;
    };
    Game_Temp.prototype.clearDestination = function () {
        this._destinationX = null;
        this._destinationY = null;
    };
    Game_Temp.prototype.isDestinationValid = function () {
        return this._destinationX !== null;
    };
    Game_Temp.prototype.destinationX = function () {
        return this._destinationX;
    };
    Game_Temp.prototype.destinationY = function () {
        return this._destinationY;
    };
    return Game_Temp;
}());
exports.Game_Temp = Game_Temp;

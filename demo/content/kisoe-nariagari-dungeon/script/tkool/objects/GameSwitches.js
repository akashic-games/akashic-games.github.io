"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Switches = void 0;
var DataManager_1 = require("../managers/DataManager");
var Game_Switches = /** @class */ (function () {
    function Game_Switches() {
        this.initialize();
    }
    Game_Switches.prototype.initialize = function () {
        this.clear();
    };
    Game_Switches.prototype.clear = function () {
        this._data = [];
    };
    Game_Switches.prototype.value = function (switchId) {
        return !!this._data[switchId];
    };
    Game_Switches.prototype.setValue = function (switchId, value) {
        if (switchId > 0 && switchId < DataManager_1.$dataSystem.switches.length) {
            this._data[switchId] = value;
            this.onChange();
        }
    };
    Game_Switches.prototype.onChange = function () {
        DataManager_1.$gameMap.requestRefresh();
    };
    return Game_Switches;
}());
exports.Game_Switches = Game_Switches;

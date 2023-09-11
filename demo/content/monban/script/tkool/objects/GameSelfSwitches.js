"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_SelfSwitches = void 0;
var DataManager_1 = require("../managers/DataManager");
var Game_SelfSwitches = /** @class */ (function () {
    function Game_SelfSwitches() {
        this.initialize();
    }
    Game_SelfSwitches.prototype.initialize = function () {
        this.clear();
    };
    Game_SelfSwitches.prototype.clear = function () {
        this._data = {};
    };
    Game_SelfSwitches.prototype.value = function (key) {
        return !!this._data[key];
    };
    Game_SelfSwitches.prototype.setValue = function (key, value) {
        if (value) {
            this._data[key] = true;
        }
        else {
            delete this._data[key];
        }
        this.onChange();
    };
    Game_SelfSwitches.prototype.onChange = function () {
        DataManager_1.$gameMap.requestRefresh();
    };
    return Game_SelfSwitches;
}());
exports.Game_SelfSwitches = Game_SelfSwitches;

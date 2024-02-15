"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Variables = void 0;
var DataManager_1 = require("../managers/DataManager");
var Game_Variables = /** @class */ (function () {
    function Game_Variables() {
        this.initialize();
    }
    Game_Variables.prototype.initialize = function () {
        this.clear();
    };
    Game_Variables.prototype.clear = function () {
        this._data = [];
    };
    Game_Variables.prototype.value = function (variableId) {
        return this._data[variableId] || 0;
    };
    Game_Variables.prototype.setValue = function (variableId, value) {
        if (variableId > 0 && variableId < DataManager_1.$dataSystem.variables.length) {
            if (typeof value === "number") {
                value = Math.floor(value);
            }
            this._data[variableId] = value;
            this.onChange();
        }
    };
    Game_Variables.prototype.onChange = function () {
        DataManager_1.$gameMap.requestRefresh();
    };
    return Game_Variables;
}());
exports.Game_Variables = Game_Variables;

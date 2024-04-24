"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Variables = void 0;
var globals_1 = require("../managers/globals");
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
        if (variableId > 0 && variableId < globals_1.$dataSystem.variables.length) {
            if (typeof value === "number") {
                value = Math.floor(value);
            }
            this._data[variableId] = value;
            this.onChange();
        }
    };
    Game_Variables.prototype.onChange = function () {
        globals_1.$gameMap.requestRefresh();
    };
    return Game_Variables;
}());
exports.Game_Variables = Game_Variables;
(0, globals_1.set$gameVariablesFactory)(function () {
    return new Game_Variables();
});

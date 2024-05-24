"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_CommonEvent = void 0;
var DataManager_1 = require("../managers/DataManager");
var GameInterpreter_1 = require("./GameInterpreter");
var Game_CommonEvent = /** @class */ (function () {
    function Game_CommonEvent(commonEventId) {
        this.initialize(commonEventId);
    }
    Game_CommonEvent.prototype.initialize = function (commonEventId) {
        this._commonEventId = commonEventId;
        this.refresh();
    };
    Game_CommonEvent.prototype.event = function () {
        return DataManager_1.$dataCommonEvents[this._commonEventId];
    };
    Game_CommonEvent.prototype.list = function () {
        return this.event().list;
    };
    Game_CommonEvent.prototype.refresh = function () {
        if (this.isActive()) {
            if (!this._interpreter) {
                this._interpreter = new GameInterpreter_1.Game_Interpreter();
            }
        }
        else {
            this._interpreter = null;
        }
    };
    Game_CommonEvent.prototype.isActive = function () {
        var event = this.event();
        return event.trigger === 2 && DataManager_1.$gameSwitches.value(event.switchId);
    };
    Game_CommonEvent.prototype.update = function () {
        if (this._interpreter) {
            if (!this._interpreter.isRunning()) {
                this._interpreter.setup(this.list());
            }
            this._interpreter.update();
        }
    };
    return Game_CommonEvent;
}());
exports.Game_CommonEvent = Game_CommonEvent;

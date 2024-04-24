"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Timer = void 0;
var BattleManager_1 = require("../managers/BattleManager");
var globals_1 = require("../managers/globals");
var Game_Timer = /** @class */ (function () {
    function Game_Timer() {
        this.initialize();
    }
    Game_Timer.prototype.initialize = function () {
        this._frames = 0;
        this._working = false;
    };
    Game_Timer.prototype.update = function (sceneActive) {
        if (sceneActive && this._working && this._frames > 0) {
            this._frames--;
            if (this._frames === 0) {
                this.onExpire();
            }
        }
    };
    Game_Timer.prototype.start = function (count) {
        this._frames = count;
        this._working = true;
    };
    Game_Timer.prototype.stop = function () {
        this._working = false;
    };
    Game_Timer.prototype.isWorking = function () {
        return this._working;
    };
    Game_Timer.prototype.seconds = function () {
        return Math.floor(this._frames / 60);
    };
    Game_Timer.prototype.onExpire = function () {
        BattleManager_1.BattleManager.abort();
    };
    return Game_Timer;
}());
exports.Game_Timer = Game_Timer;
(0, globals_1.set$gameTimerFactory)(function () {
    return new Game_Timer();
});

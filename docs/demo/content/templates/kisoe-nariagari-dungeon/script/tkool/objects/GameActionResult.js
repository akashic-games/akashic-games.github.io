"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_ActionResult = void 0;
var DataManager_1 = require("../managers/DataManager");
var Game_ActionResult = /** @class */ (function () {
    function Game_ActionResult() {
        this.initialize();
    }
    Game_ActionResult.prototype.initialize = function () {
        this.clear();
    };
    Game_ActionResult.prototype.clear = function () {
        this.used = false;
        this.missed = false;
        this.evaded = false;
        this.physical = false;
        this.drain = false;
        this.critical = false;
        this.success = false;
        this.hpAffected = false;
        this.hpDamage = 0;
        this.mpDamage = 0;
        this.tpDamage = 0;
        this.addedStates = [];
        this.removedStates = [];
        this.addedBuffs = [];
        this.addedDebuffs = [];
        this.removedBuffs = [];
    };
    Game_ActionResult.prototype.addedStateObjects = function () {
        return this.addedStates.map(function (id) {
            return DataManager_1.$dataStates[id];
        });
    };
    Game_ActionResult.prototype.removedStateObjects = function () {
        return this.removedStates.map(function (id) {
            return DataManager_1.$dataStates[id];
        });
    };
    Game_ActionResult.prototype.isStatusAffected = function () {
        return (this.addedStates.length > 0 ||
            this.removedStates.length > 0 ||
            this.addedBuffs.length > 0 ||
            this.addedDebuffs.length > 0 ||
            this.removedBuffs.length > 0);
    };
    Game_ActionResult.prototype.isHit = function () {
        return this.used && !this.missed && !this.evaded;
    };
    Game_ActionResult.prototype.isStateAdded = function (stateId) {
        // return this.addedStates.contains(stateId);
        return this.addedStates.indexOf(stateId) >= 0;
    };
    Game_ActionResult.prototype.pushAddedState = function (stateId) {
        if (!this.isStateAdded(stateId)) {
            this.addedStates.push(stateId);
        }
    };
    Game_ActionResult.prototype.isStateRemoved = function (stateId) {
        // return this.removedStates.contains(stateId);
        return this.removedStates.indexOf(stateId) >= 0;
    };
    Game_ActionResult.prototype.pushRemovedState = function (stateId) {
        if (!this.isStateRemoved(stateId)) {
            this.removedStates.push(stateId);
        }
    };
    Game_ActionResult.prototype.isBuffAdded = function (paramId) {
        // return this.addedBuffs.contains(paramId);
        return this.addedBuffs.indexOf(paramId) >= 0;
    };
    Game_ActionResult.prototype.pushAddedBuff = function (paramId) {
        if (!this.isBuffAdded(paramId)) {
            this.addedBuffs.push(paramId);
        }
    };
    Game_ActionResult.prototype.isDebuffAdded = function (paramId) {
        // return this.addedDebuffs.contains(paramId);
        return this.addedDebuffs.indexOf(paramId) >= 0;
    };
    Game_ActionResult.prototype.pushAddedDebuff = function (paramId) {
        if (!this.isDebuffAdded(paramId)) {
            this.addedDebuffs.push(paramId);
        }
    };
    Game_ActionResult.prototype.isBuffRemoved = function (paramId) {
        // return this.removedBuffs.contains(paramId);
        return this.removedBuffs.indexOf(paramId) >= 0;
    };
    Game_ActionResult.prototype.pushRemovedBuff = function (paramId) {
        if (!this.isBuffRemoved(paramId)) {
            this.removedBuffs.push(paramId);
        }
    };
    return Game_ActionResult;
}());
exports.Game_ActionResult = Game_ActionResult;

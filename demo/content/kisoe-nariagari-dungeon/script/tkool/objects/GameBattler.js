"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Battler = void 0;
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var GameAction_1 = require("./GameAction");
var GameActionResult_1 = require("./GameActionResult");
var GameBattlerBase_1 = require("./GameBattlerBase");
var Game_Battler = /** @class */ (function (_super) {
    __extends(Game_Battler, _super);
    function Game_Battler() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        if (Object.getPrototypeOf(_this) === Game_Battler.prototype) {
            _this.initialize(args);
        }
        return _this;
    }
    Game_Battler.prototype.initialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.initialize.apply(this, args);
    };
    Game_Battler.prototype.initMembers = function () {
        _super.prototype.initMembers.call(this);
        this._actions = [];
        this._speed = 0;
        this._result = new GameActionResult_1.Game_ActionResult();
        this._actionState = "";
        this._lastTargetIndex = 0;
        this._animations = [];
        this._damagePopup = false;
        this._effectType = null;
        this._motionType = null;
        this._weaponImageId = 0;
        this._motionRefresh = false;
        this._selected = false;
    };
    Game_Battler.prototype.clearAnimations = function () {
        this._animations = [];
    };
    Game_Battler.prototype.clearDamagePopup = function () {
        this._damagePopup = false;
    };
    Game_Battler.prototype.clearWeaponAnimation = function () {
        this._weaponImageId = 0;
    };
    Game_Battler.prototype.clearEffect = function () {
        this._effectType = null;
    };
    Game_Battler.prototype.clearMotion = function () {
        this._motionType = null;
        this._motionRefresh = false;
    };
    Game_Battler.prototype.requestEffect = function (effectType) {
        this._effectType = effectType;
    };
    Game_Battler.prototype.requestMotion = function (motionType) {
        this._motionType = motionType;
    };
    Game_Battler.prototype.requestMotionRefresh = function () {
        this._motionRefresh = true;
    };
    Game_Battler.prototype.select = function () {
        this._selected = true;
    };
    Game_Battler.prototype.deselect = function () {
        this._selected = false;
    };
    Game_Battler.prototype.isAnimationRequested = function () {
        return this._animations.length > 0;
    };
    Game_Battler.prototype.isDamagePopupRequested = function () {
        return this._damagePopup;
    };
    Game_Battler.prototype.isEffectRequested = function () {
        return !!this._effectType;
    };
    Game_Battler.prototype.isMotionRequested = function () {
        return !!this._motionType;
    };
    Game_Battler.prototype.isWeaponAnimationRequested = function () {
        return this._weaponImageId > 0;
    };
    Game_Battler.prototype.isMotionRefreshRequested = function () {
        return this._motionRefresh;
    };
    Game_Battler.prototype.isSelected = function () {
        return this._selected;
    };
    Game_Battler.prototype.effectType = function () {
        return this._effectType;
    };
    Game_Battler.prototype.motionType = function () {
        return this._motionType;
    };
    Game_Battler.prototype.weaponImageId = function () {
        return this._weaponImageId;
    };
    Game_Battler.prototype.shiftAnimation = function () {
        return this._animations.shift();
    };
    Game_Battler.prototype.startAnimation = function (animationId, mirror, delay) {
        var data = { animationId: animationId, mirror: mirror, delay: delay };
        this._animations.push(data);
    };
    Game_Battler.prototype.startDamagePopup = function () {
        this._damagePopup = true;
    };
    Game_Battler.prototype.startWeaponAnimation = function (weaponImageId) {
        this._weaponImageId = weaponImageId;
    };
    Game_Battler.prototype.action = function (index) {
        return this._actions[index];
    };
    Game_Battler.prototype.setAction = function (index, action) {
        this._actions[index] = action;
    };
    Game_Battler.prototype.numActions = function () {
        return this._actions.length;
    };
    Game_Battler.prototype.clearActions = function () {
        this._actions = [];
    };
    Game_Battler.prototype.result = function () {
        return this._result;
    };
    Game_Battler.prototype.clearResult = function () {
        this._result.clear();
    };
    Game_Battler.prototype.refresh = function () {
        GameBattlerBase_1.Game_BattlerBase.prototype.refresh.call(this);
        if (this.hp === 0) {
            this.addState(this.deathStateId());
        }
        else {
            this.removeState(this.deathStateId());
        }
    };
    Game_Battler.prototype.addState = function (stateId) {
        if (this.isStateAddable(stateId)) {
            if (!this.isStateAffected(stateId)) {
                this.addNewState(stateId);
                this.refresh();
            }
            this.resetStateCounts(stateId);
            this._result.pushAddedState(stateId);
        }
    };
    Game_Battler.prototype.isStateAddable = function (stateId) {
        return (this.isAlive() &&
            DataManager_1.$dataStates[stateId] &&
            !this.isStateResist(stateId) &&
            !this._result.isStateRemoved(stateId) &&
            !this.isStateRestrict(stateId));
    };
    Game_Battler.prototype.isStateRestrict = function (stateId) {
        return DataManager_1.$dataStates[stateId].removeByRestriction && this.isRestricted();
    };
    Game_Battler.prototype.onRestrict = function () {
        var _this = this;
        GameBattlerBase_1.Game_BattlerBase.prototype.onRestrict.call(this);
        this.clearActions();
        this.states().forEach(function (state) {
            if (state.removeByRestriction) {
                _this.removeState(state.id);
            }
        });
    };
    Game_Battler.prototype.removeState = function (stateId) {
        if (this.isStateAffected(stateId)) {
            if (stateId === this.deathStateId()) {
                this.revive();
            }
            this.eraseState(stateId);
            this.refresh();
            this._result.pushRemovedState(stateId);
        }
    };
    Game_Battler.prototype.escape = function () {
        if (DataManager_1.$gameParty.inBattle()) {
            this.hide();
        }
        this.clearActions();
        this.clearStates();
        managers_1.SoundManager.playEscape();
    };
    Game_Battler.prototype.addBuff = function (paramId, turns) {
        if (this.isAlive()) {
            this.increaseBuff(paramId);
            if (this.isBuffAffected(paramId)) {
                this.overwriteBuffTurns(paramId, turns);
            }
            this._result.pushAddedBuff(paramId);
            this.refresh();
        }
    };
    Game_Battler.prototype.addDebuff = function (paramId, turns) {
        if (this.isAlive()) {
            this.decreaseBuff(paramId);
            if (this.isDebuffAffected(paramId)) {
                this.overwriteBuffTurns(paramId, turns);
            }
            this._result.pushAddedDebuff(paramId);
            this.refresh();
        }
    };
    Game_Battler.prototype.removeBuff = function (paramId) {
        if (this.isAlive() && this.isBuffOrDebuffAffected(paramId)) {
            this.eraseBuff(paramId);
            this._result.pushRemovedBuff(paramId);
            this.refresh();
        }
    };
    Game_Battler.prototype.removeBattleStates = function () {
        var _this = this;
        this.states().forEach(function (state) {
            if (state.removeAtBattleEnd) {
                _this.removeState(state.id);
            }
        });
    };
    Game_Battler.prototype.removeAllBuffs = function () {
        for (var i = 0; i < this.buffLength(); i++) {
            this.removeBuff(i);
        }
    };
    Game_Battler.prototype.removeStatesAuto = function (timing) {
        var _this = this;
        this.states().forEach(function (state) {
            if (_this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
                _this.removeState(state.id);
            }
        });
    };
    Game_Battler.prototype.removeBuffsAuto = function () {
        for (var i = 0; i < this.buffLength(); i++) {
            if (this.isBuffExpired(i)) {
                this.removeBuff(i);
            }
        }
    };
    Game_Battler.prototype.removeStatesByDamage = function () {
        var _this = this;
        this.states().forEach(function (state) {
            if (state.removeByDamage && Math.floor(100 * g.game.vars.random.generate()) < state.chanceByDamage) {
                _this.removeState(state.id);
            }
        });
    };
    Game_Battler.prototype.makeActionTimes = function () {
        return this.actionPlusSet().reduce(function (r, p) {
            return g.game.vars.random.generate() < p ? r + 1 : r;
        }, 1);
    };
    Game_Battler.prototype.makeActions = function () {
        this.clearActions();
        if (this.canMove()) {
            var actionTimes = this.makeActionTimes();
            this._actions = [];
            for (var i = 0; i < actionTimes; i++) {
                this._actions.push(new GameAction_1.Game_Action(this));
            }
        }
    };
    Game_Battler.prototype.speed = function () {
        return this._speed;
    };
    Game_Battler.prototype.makeSpeed = function () {
        this._speed =
            Math.min.apply(null, this._actions.map(function (action) {
                return action.speed();
            })) || 0;
    };
    Game_Battler.prototype.currentAction = function () {
        return this._actions[0];
    };
    Game_Battler.prototype.removeCurrentAction = function () {
        this._actions.shift();
    };
    Game_Battler.prototype.setLastTarget = function (target) {
        if (target) {
            this._lastTargetIndex = target.index();
        }
        else {
            this._lastTargetIndex = 0;
        }
    };
    Game_Battler.prototype.forceAction = function (skillId, targetIndex) {
        this.clearActions();
        var action = new GameAction_1.Game_Action(this, true);
        action.setSkill(skillId);
        if (targetIndex === -2) {
            action.setTarget(this._lastTargetIndex);
        }
        else if (targetIndex === -1) {
            action.decideRandomTarget();
        }
        else {
            action.setTarget(targetIndex);
        }
        this._actions.push(action);
    };
    Game_Battler.prototype.useItem = function (item) {
        if (managers_1.DataManager.isSkill(item)) {
            this.paySkillCost(item);
        }
        else if (managers_1.DataManager.isItem(item)) {
            this.consumeItem(item);
        }
    };
    Game_Battler.prototype.consumeItem = function (item) {
        DataManager_1.$gameParty.consumeItem(item);
    };
    Game_Battler.prototype.gainHp = function (value) {
        this._result.hpDamage = -value;
        this._result.hpAffected = true;
        this.setHp(this.hp + value);
    };
    Game_Battler.prototype.gainMp = function (value) {
        this._result.mpDamage = -value;
        this.setMp(this.mp + value);
    };
    Game_Battler.prototype.gainTp = function (value) {
        this._result.tpDamage = -value;
        this.setTp(this.tp + value);
    };
    Game_Battler.prototype.gainSilentTp = function (value) {
        this.setTp(this.tp + value);
    };
    Game_Battler.prototype.initTp = function () {
        this.setTp(Math.floor(25 * g.game.vars.random.generate()));
    };
    Game_Battler.prototype.clearTp = function () {
        this.setTp(0);
    };
    Game_Battler.prototype.chargeTpByDamage = function (damageRate) {
        var value = Math.floor(50 * damageRate * this.tcr);
        this.gainSilentTp(value);
    };
    Game_Battler.prototype.regenerateHp = function () {
        var value = Math.floor(this.mhp * this.hrg);
        value = Math.max(value, -this.maxSlipDamage());
        if (value !== 0) {
            this.gainHp(value);
        }
    };
    Game_Battler.prototype.maxSlipDamage = function () {
        return DataManager_1.$dataSystem.optSlipDeath ? this.hp : Math.max(this.hp - 1, 0);
    };
    Game_Battler.prototype.regenerateMp = function () {
        var value = Math.floor(this.mmp * this.mrg);
        if (value !== 0) {
            this.gainMp(value);
        }
    };
    Game_Battler.prototype.regenerateTp = function () {
        var value = Math.floor(100 * this.trg);
        this.gainSilentTp(value);
    };
    Game_Battler.prototype.regenerateAll = function () {
        if (this.isAlive()) {
            this.regenerateHp();
            this.regenerateMp();
            this.regenerateTp();
        }
    };
    Game_Battler.prototype.onBattleStart = function () {
        this.setActionState("undecided");
        this.clearMotion();
        if (!this.isPreserveTp()) {
            this.initTp();
        }
    };
    Game_Battler.prototype.onAllActionsEnd = function () {
        this.clearResult();
        this.removeStatesAuto(1);
        this.removeBuffsAuto();
    };
    Game_Battler.prototype.onTurnEnd = function () {
        this.clearResult();
        this.regenerateAll();
        // if (!BattleManager.isForcedTurn()) {
        // 	this.updateStateTurns();
        // 	this.updateBuffTurns();
        // }
        this.removeStatesAuto(2);
    };
    Game_Battler.prototype.onBattleEnd = function () {
        this.clearResult();
        this.removeBattleStates();
        this.removeAllBuffs();
        this.clearActions();
        if (!this.isPreserveTp()) {
            this.clearTp();
        }
        this.appear();
    };
    Game_Battler.prototype.onDamage = function (value) {
        this.removeStatesByDamage();
        this.chargeTpByDamage(value / this.mhp);
    };
    Game_Battler.prototype.setActionState = function (actionState) {
        this._actionState = actionState;
        this.requestMotionRefresh();
    };
    Game_Battler.prototype.isUndecided = function () {
        return this._actionState === "undecided";
    };
    Game_Battler.prototype.isInputting = function () {
        return this._actionState === "inputting";
    };
    Game_Battler.prototype.isWaiting = function () {
        return this._actionState === "waiting";
    };
    Game_Battler.prototype.isActing = function () {
        return this._actionState === "acting";
    };
    Game_Battler.prototype.isChanting = function () {
        if (this.isWaiting()) {
            return this._actions.some(function (action) {
                return action.isMagicSkill();
            });
        }
        return false;
    };
    Game_Battler.prototype.isGuardWaiting = function () {
        if (this.isWaiting()) {
            return this._actions.some(function (action) {
                return action.isGuard();
            });
        }
        return false;
    };
    Game_Battler.prototype.performActionStart = function (action) {
        if (!action.isGuard()) {
            this.setActionState("acting");
        }
    };
    Game_Battler.prototype.performAction = function (_action) {
        //
    };
    Game_Battler.prototype.performActionEnd = function () {
        this.setActionState("done");
    };
    Game_Battler.prototype.performDamage = function () {
        //
    };
    Game_Battler.prototype.performMiss = function () {
        managers_1.SoundManager.playMiss();
    };
    Game_Battler.prototype.performRecovery = function () {
        managers_1.SoundManager.playRecovery();
    };
    Game_Battler.prototype.performEvasion = function () {
        managers_1.SoundManager.playEvasion();
    };
    Game_Battler.prototype.performMagicEvasion = function () {
        managers_1.SoundManager.playMagicEvasion();
    };
    Game_Battler.prototype.performCounter = function () {
        managers_1.SoundManager.playEvasion();
    };
    Game_Battler.prototype.performReflection = function () {
        managers_1.SoundManager.playReflection();
    };
    Game_Battler.prototype.performSubstitute = function (_target) {
        //
    };
    Game_Battler.prototype.performCollapse = function () {
        //
    };
    return Game_Battler;
}(GameBattlerBase_1.Game_BattlerBase));
exports.Game_Battler = Game_Battler;

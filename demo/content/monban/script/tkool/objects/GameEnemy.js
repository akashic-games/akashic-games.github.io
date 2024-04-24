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
exports.Game_Enemy = void 0;
var Utils_1 = require("../core/Utils");
var globals_1 = require("../managers/globals");
var SoundManager_1 = require("../managers/SoundManager");
var GameBattler_1 = require("./GameBattler");
var Game_Enemy = /** @class */ (function (_super) {
    __extends(Game_Enemy, _super);
    function Game_Enemy(enemyId, x, y) {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Game_Enemy.prototype) {
            _this.initialize(enemyId, x, y);
        }
        return _this;
    }
    Game_Enemy.prototype.initialize = function (enemyId, x, y) {
        _super.prototype.initialize.call(this);
        GameBattler_1.Game_Battler.prototype.initialize.call(this);
        this.setup(enemyId, x, y);
    };
    Game_Enemy.prototype.initMembers = function () {
        _super.prototype.initMembers.call(this);
        this._enemyId = 0;
        this._letter = "";
        this._plural = false;
        this._screenX = 0;
        this._screenY = 0;
    };
    Game_Enemy.prototype.setup = function (enemyId, x, y) {
        this._enemyId = enemyId;
        this._screenX = x;
        this._screenY = y;
        this.recoverAll();
    };
    Game_Enemy.prototype.isEnemy = function () {
        return true;
    };
    Game_Enemy.prototype.friendsUnit = function () {
        return globals_1.$gameTroop;
    };
    Game_Enemy.prototype.opponentsUnit = function () {
        return globals_1.$gameParty;
    };
    Game_Enemy.prototype.index = function () {
        return globals_1.$gameTroop.members().indexOf(this);
    };
    Game_Enemy.prototype.isBattleMember = function () {
        return this.index() >= 0;
    };
    Game_Enemy.prototype.enemyId = function () {
        return this._enemyId;
    };
    Game_Enemy.prototype.enemy = function () {
        return globals_1.$dataEnemies[this._enemyId];
    };
    Game_Enemy.prototype.traitObjects = function () {
        return GameBattler_1.Game_Battler.prototype.traitObjects.call(this).concat(this.enemy());
    };
    Game_Enemy.prototype.paramBase = function (paramId) {
        return this.enemy().params[paramId];
    };
    Game_Enemy.prototype.exp = function () {
        return this.enemy().exp;
    };
    Game_Enemy.prototype.gold = function () {
        return this.enemy().gold;
    };
    Game_Enemy.prototype.makeDropItems = function () {
        var _this = this;
        return this.enemy().dropItems.reduce(function (r, di) {
            if (di.kind > 0 && g.game.vars.random.generate() * di.denominator < _this.dropItemRate()) {
                return r.concat(_this.itemObject(di.kind, di.dataId));
            }
            else {
                return r;
            }
        }, []);
    };
    Game_Enemy.prototype.dropItemRate = function () {
        return globals_1.$gameParty.hasDropItemDouble() ? 2 : 1;
    };
    Game_Enemy.prototype.itemObject = function (kind, dataId) {
        if (kind === 1) {
            return globals_1.$dataItems[dataId];
        }
        else if (kind === 2) {
            return globals_1.$dataWeapons[dataId];
        }
        else if (kind === 3) {
            return globals_1.$dataArmors[dataId];
        }
        else {
            return null;
        }
    };
    Game_Enemy.prototype.isSpriteVisible = function () {
        return true;
    };
    Game_Enemy.prototype.screenX = function () {
        return this._screenX;
    };
    Game_Enemy.prototype.screenY = function () {
        return this._screenY;
    };
    Game_Enemy.prototype.battlerName = function () {
        return this.enemy().battlerName;
    };
    Game_Enemy.prototype.battlerHue = function () {
        return this.enemy().battlerHue;
    };
    Game_Enemy.prototype.originalName = function () {
        return this.enemy().name;
    };
    Game_Enemy.prototype.name = function () {
        return this.originalName() + (this._plural ? this._letter : "");
    };
    Game_Enemy.prototype.isLetterEmpty = function () {
        return this._letter === "";
    };
    Game_Enemy.prototype.setLetter = function (letter) {
        this._letter = letter;
    };
    Game_Enemy.prototype.setPlural = function (plural) {
        this._plural = plural;
    };
    Game_Enemy.prototype.performActionStart = function (action) {
        _super.prototype.performActionStart.call(this, action);
        this.requestEffect("whiten");
    };
    Game_Enemy.prototype.performAction = function (action) {
        _super.prototype.performAction.call(this, action);
    };
    Game_Enemy.prototype.performActionEnd = function () {
        _super.prototype.performActionEnd.call(this);
    };
    Game_Enemy.prototype.performDamage = function () {
        _super.prototype.performDamage.call(this);
        SoundManager_1.SoundManager.playEnemyDamage();
        this.requestEffect("blink");
    };
    Game_Enemy.prototype.performCollapse = function () {
        GameBattler_1.Game_Battler.prototype.performCollapse.call(this);
        switch (this.collapseType()) {
            case 0:
                this.requestEffect("collapse");
                SoundManager_1.SoundManager.playEnemyCollapse();
                break;
            case 1:
                this.requestEffect("bossCollapse");
                SoundManager_1.SoundManager.playBossCollapse1();
                break;
            case 2:
                this.requestEffect("instantCollapse");
                break;
        }
    };
    Game_Enemy.prototype.transform = function (enemyId) {
        var name = this.originalName();
        this._enemyId = enemyId;
        if (this.originalName() !== name) {
            this._letter = "";
            this._plural = false;
        }
        this.refresh();
        if (this.numActions() > 0) {
            this.makeActions();
        }
    };
    Game_Enemy.prototype.meetsCondition = function (action) {
        var param1 = action.conditionParam1;
        var param2 = action.conditionParam2;
        switch (action.conditionType) {
            case 1:
                return this.meetsTurnCondition(param1, param2);
            case 2:
                return this.meetsHpCondition(param1, param2);
            case 3:
                return this.meetsMpCondition(param1, param2);
            case 4:
                return this.meetsStateCondition(param1);
            case 5:
                return this.meetsPartyLevelCondition(param1);
            case 6:
                return this.meetsSwitchCondition(param1);
            default:
                return true;
        }
    };
    Game_Enemy.prototype.meetsTurnCondition = function (param1, param2) {
        var n = globals_1.$gameTroop.turnCount();
        if (param2 === 0) {
            return n === param1;
        }
        else {
            return n > 0 && n >= param1 && n % param2 === param1 % param2;
        }
    };
    Game_Enemy.prototype.meetsHpCondition = function (param1, param2) {
        return this.hpRate() >= param1 && this.hpRate() <= param2;
    };
    Game_Enemy.prototype.meetsMpCondition = function (param1, param2) {
        return this.mpRate() >= param1 && this.mpRate() <= param2;
    };
    Game_Enemy.prototype.meetsStateCondition = function (param) {
        return this.isStateAffected(param);
    };
    Game_Enemy.prototype.meetsPartyLevelCondition = function (param) {
        return globals_1.$gameParty.highestLevel() >= param;
    };
    Game_Enemy.prototype.meetsSwitchCondition = function (param) {
        return globals_1.$gameSwitches.value(param);
    };
    Game_Enemy.prototype.isActionValid = function (action) {
        return this.meetsCondition(action) && this.canUse(globals_1.$dataSkills[action.skillId]);
    };
    Game_Enemy.prototype.selectAction = function (actionList, ratingZero) {
        var sum = actionList.reduce(function (r, a) {
            return r + a.rating - ratingZero;
        }, 0);
        if (sum > 0) {
            var value = Utils_1.Utils.randomInt(sum);
            for (var i = 0; i < actionList.length; i++) {
                var action = actionList[i];
                value -= action.rating - ratingZero;
                if (value < 0) {
                    return action;
                }
            }
        }
        else {
            return null;
        }
    };
    Game_Enemy.prototype.selectAllActions = function (actionList) {
        var ratingMax = Math.max.apply(null, actionList.map(function (a) {
            return a.rating;
        }));
        var ratingZero = ratingMax - 3;
        actionList = actionList.filter(function (a) {
            return a.rating > ratingZero;
        });
        for (var i = 0; i < this.numActions(); i++) {
            this.action(i).setEnemyAction(this.selectAction(actionList, ratingZero));
        }
    };
    Game_Enemy.prototype.makeActions = function () {
        var _this = this;
        GameBattler_1.Game_Battler.prototype.makeActions.call(this);
        if (this.numActions() > 0) {
            var actionList = this.enemy().actions.filter(function (a) {
                return _this.isActionValid(a);
            });
            if (actionList.length > 0) {
                this.selectAllActions(actionList);
            }
        }
        this.setActionState("waiting");
    };
    return Game_Enemy;
}(GameBattler_1.Game_Battler));
exports.Game_Enemy = Game_Enemy;

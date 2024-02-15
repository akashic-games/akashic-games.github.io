"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Action = void 0;
var Graphics_1 = require("../core/Graphics");
var JsonEx_1 = require("../core/JsonEx");
var Tilemap_1 = require("../core/Tilemap");
var TouchInput_1 = require("../core/TouchInput");
var Utils_1 = require("../core/Utils");
var AudioManager_1 = require("../managers/AudioManager");
var BattleManager_1 = require("../managers/BattleManager");
var DataManager_1 = require("../managers/DataManager");
var ImageManager_1 = require("../managers/ImageManager");
var SceneManager_1 = require("../managers/SceneManager");
var SoundManager_1 = require("../managers/SoundManager");
var TextManager_1 = require("../managers/TextManager");
var GameItem_1 = require("./GameItem");
// これらの変数(GameObject)はツクールのスクリプトで利用される可能性があるため、exportせずクラスの外で変数定義
/* eslint-disable @typescript-eslint/no-unused-vars */
var $gameVariables;
var $gameSystem;
var $gameSwitches;
var $gameMessage;
var $gamePlayer;
var $dataCommonEvents;
var $dataTilesets;
var $gameMap;
var $gameTemp;
var $dataEnemies;
var $gameActors;
var $dataAnimations;
var $gameParty;
var $gameTroop;
var $gameTimer;
var $gameSelfSwitches;
var $dataClasses;
var $dataWeapons;
var $dataArmors;
var $dataItems;
var $gameScreen;
var $dataTroops;
var $dataActors;
var $dataSkills;
var $dataStates;
var $dataSystem;
var $dataMapInfos;
var $dataMap;
// これらの変数はツクールのスクリプトでグローバルなクラス名として利用される想定なので、変数の命名規則からは例外的に外すものとする
/* eslint-disable  @typescript-eslint/naming-convention */
var Graphics;
var JsonEx;
var Tilemap;
var TouchInput;
var Utils;
var AudioManager;
var BattleManager;
var DataManager;
var ImageManager;
var SceneManager;
var SoundManager;
var TextManager;
/* eslint-enable @typescript-eslint/naming-convention */
/* eslint-enable @typescript-eslint/no-unused-vars */
// 未定義の全GameObjectに値を代入。ただし定義済みの場合は何もしない
var setGameObjects = function () {
    if ($gameVariables) {
        return;
    }
    $gameVariables = DataManager_1.$gameVariables;
    $gameSystem = DataManager_1.$gameSystem;
    $gameSwitches = DataManager_1.$gameSwitches;
    $gameMessage = DataManager_1.$gameMessage;
    $gamePlayer = DataManager_1.$gamePlayer;
    $dataCommonEvents = DataManager_1.$dataCommonEvents;
    $dataTilesets = DataManager_1.$dataTilesets;
    $gameMap = DataManager_1.$gameMap;
    $gameTemp = DataManager_1.$gameTemp;
    $dataEnemies = DataManager_1.$dataEnemies;
    $gameActors = DataManager_1.$gameActors;
    $dataAnimations = DataManager_1.$dataAnimations;
    $gameParty = DataManager_1.$gameParty;
    $gameTroop = DataManager_1.$gameTroop;
    $gameTimer = DataManager_1.$gameTimer;
    $gameSelfSwitches = DataManager_1.$gameSelfSwitches;
    $dataClasses = DataManager_1.$dataClasses;
    $dataWeapons = DataManager_1.$dataWeapons;
    $dataArmors = DataManager_1.$dataArmors;
    $dataItems = DataManager_1.$dataItems;
    $gameScreen = DataManager_1.$gameScreen;
    $dataTroops = DataManager_1.$dataTroops;
    $dataActors = DataManager_1.$dataActors;
    $dataSkills = DataManager_1.$dataSkills;
    $dataStates = DataManager_1.$dataStates;
    $dataSystem = DataManager_1.$dataSystem;
    $dataMapInfos = DataManager_1.$dataMapInfos;
    $dataMap = DataManager_1.$dataMap;
    Graphics = Graphics_1.Graphics;
    JsonEx = JsonEx_1.JsonEx;
    Tilemap = Tilemap_1.Tilemap;
    TouchInput = TouchInput_1.TouchInput;
    Utils = Utils_1.Utils;
    AudioManager = AudioManager_1.AudioManager;
    BattleManager = BattleManager_1.BattleManager;
    DataManager = DataManager_1.DataManager;
    ImageManager = ImageManager_1.ImageManager;
    SceneManager = SceneManager_1.SceneManager;
    SoundManager = SoundManager_1.SoundManager;
    TextManager = TextManager_1.TextManager;
};
var Game_Action = /** @class */ (function () {
    function Game_Action(subject, forcing) {
        this.initialize(subject, forcing);
    }
    Game_Action.prototype.initialize = function (subject, forcing) {
        this._subjectActorId = 0;
        this._subjectEnemyIndex = -1;
        this._forcing = forcing || false;
        this.setSubject(subject);
        this.clear();
    };
    Game_Action.prototype.clear = function () {
        this._item = new GameItem_1.Game_Item();
        this._targetIndex = -1;
    };
    Game_Action.prototype.setSubject = function (subject) {
        if (subject.isActor()) {
            this._subjectActorId = subject.actorId();
            this._subjectEnemyIndex = -1;
        }
        else {
            this._subjectEnemyIndex = subject.index();
            this._subjectActorId = 0;
        }
    };
    Game_Action.prototype.subject = function () {
        if (this._subjectActorId > 0) {
            return DataManager_1.$gameActors.actor(this._subjectActorId);
        }
        else {
            return DataManager_1.$gameTroop.members()[this._subjectEnemyIndex];
        }
    };
    Game_Action.prototype.friendsUnit = function () {
        return this.subject().friendsUnit();
    };
    Game_Action.prototype.opponentsUnit = function () {
        return this.subject().opponentsUnit();
    };
    Game_Action.prototype.setEnemyAction = function (action) {
        if (action) {
            this.setSkill(action.skillId);
        }
        else {
            this.clear();
        }
    };
    Game_Action.prototype.setAttack = function () {
        this.setSkill(this.subject().attackSkillId());
    };
    Game_Action.prototype.setGuard = function () {
        this.setSkill(this.subject().guardSkillId());
    };
    Game_Action.prototype.setSkill = function (skillId) {
        this._item.setObject(DataManager_1.$dataSkills[skillId]);
    };
    Game_Action.prototype.setItem = function (itemId) {
        this._item.setObject(DataManager_1.$dataItems[itemId]);
    };
    Game_Action.prototype.setItemObject = function (object) {
        this._item.setObject(object);
    };
    Game_Action.prototype.setTarget = function (targetIndex) {
        this._targetIndex = targetIndex;
    };
    Game_Action.prototype.item = function () {
        return this._item.object();
    };
    Game_Action.prototype.isSkill = function () {
        return this._item.isSkill();
    };
    Game_Action.prototype.isItem = function () {
        return this._item.isItem();
    };
    Game_Action.prototype.numRepeats = function () {
        var repeats = this.item().repeats;
        if (this.isAttack()) {
            repeats += this.subject().attackTimesAdd();
        }
        return Math.floor(repeats);
    };
    Game_Action.prototype.checkItemScope = function (list) {
        // return list.contains(this.item().scope);
        return Utils_1.Utils.contains(list, this.item().scope);
    };
    Game_Action.prototype.isForOpponent = function () {
        return this.checkItemScope([1, 2, 3, 4, 5, 6]);
    };
    Game_Action.prototype.isForFriend = function () {
        return this.checkItemScope([7, 8, 9, 10, 11]);
    };
    Game_Action.prototype.isForDeadFriend = function () {
        return this.checkItemScope([9, 10]);
    };
    Game_Action.prototype.isForUser = function () {
        return this.checkItemScope([11]);
    };
    Game_Action.prototype.isForOne = function () {
        return this.checkItemScope([1, 3, 7, 9, 11]);
    };
    Game_Action.prototype.isForRandom = function () {
        return this.checkItemScope([3, 4, 5, 6]);
    };
    Game_Action.prototype.isForAll = function () {
        return this.checkItemScope([2, 8, 10]);
    };
    Game_Action.prototype.needsSelection = function () {
        return this.checkItemScope([1, 7, 9]);
    };
    Game_Action.prototype.numTargets = function () {
        return this.isForRandom() ? this.item().scope - 2 : 0;
    };
    Game_Action.prototype.checkDamageType = function (list) {
        // return list.contains(this.item().damage.type);
        return Utils_1.Utils.contains(list, this.item().damage.type);
    };
    Game_Action.prototype.isHpEffect = function () {
        return this.checkDamageType([1, 3, 5]);
    };
    Game_Action.prototype.isMpEffect = function () {
        return this.checkDamageType([2, 4, 6]);
    };
    Game_Action.prototype.isDamage = function () {
        return this.checkDamageType([1, 2]);
    };
    Game_Action.prototype.isRecover = function () {
        return this.checkDamageType([3, 4]);
    };
    Game_Action.prototype.isDrain = function () {
        return this.checkDamageType([5, 6]);
    };
    Game_Action.prototype.isHpRecover = function () {
        return this.checkDamageType([3]);
    };
    Game_Action.prototype.isMpRecover = function () {
        return this.checkDamageType([4]);
    };
    Game_Action.prototype.isCertainHit = function () {
        return this.item().hitType === Game_Action.HITTYPE_CERTAIN;
    };
    Game_Action.prototype.isPhysical = function () {
        return this.item().hitType === Game_Action.HITTYPE_PHYSICAL;
    };
    Game_Action.prototype.isMagical = function () {
        return this.item().hitType === Game_Action.HITTYPE_MAGICAL;
    };
    Game_Action.prototype.isAttack = function () {
        return this.item() === DataManager_1.$dataSkills[this.subject().attackSkillId()];
    };
    Game_Action.prototype.isGuard = function () {
        return this.item() === DataManager_1.$dataSkills[this.subject().guardSkillId()];
    };
    Game_Action.prototype.isMagicSkill = function () {
        if (this.isSkill()) {
            return Utils_1.Utils.contains(DataManager_1.$dataSystem.magicSkills, this.item().stypeId);
        }
        else {
            return false;
        }
    };
    Game_Action.prototype.decideRandomTarget = function () {
        var target;
        if (this.isForDeadFriend()) {
            target = this.friendsUnit().randomDeadTarget();
        }
        else if (this.isForFriend()) {
            target = this.friendsUnit().randomTarget();
        }
        else {
            target = this.opponentsUnit().randomTarget();
        }
        if (target) {
            this._targetIndex = target.index();
        }
        else {
            this.clear();
        }
    };
    Game_Action.prototype.setConfusion = function () {
        this.setAttack();
    };
    Game_Action.prototype.prepare = function () {
        if (this.subject().isConfused() && !this._forcing) {
            this.setConfusion();
        }
    };
    Game_Action.prototype.isValid = function () {
        return (this._forcing && this.item()) || this.subject().canUse(this.item());
    };
    Game_Action.prototype.speed = function () {
        var agi = this.subject().agi;
        var speed = agi + Utils_1.Utils.randomInt(Math.floor(5 + agi / 4));
        if (this.item()) {
            speed += this.item().speed;
        }
        if (this.isAttack()) {
            speed += this.subject().attackSpeed();
        }
        return speed;
    };
    Game_Action.prototype.makeTargets = function () {
        var targets = [];
        if (!this._forcing && this.subject().isConfused()) {
            targets = [this.confusionTarget()];
        }
        else if (this.isForOpponent()) {
            targets = this.targetsForOpponents();
        }
        else if (this.isForFriend()) {
            targets = this.targetsForFriends();
        }
        return this.repeatTargets(targets);
    };
    Game_Action.prototype.repeatTargets = function (targets) {
        var repeatedTargets = [];
        var repeats = this.numRepeats();
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            if (target) {
                for (var j = 0; j < repeats; j++) {
                    repeatedTargets.push(target);
                }
            }
        }
        return repeatedTargets;
    };
    Game_Action.prototype.confusionTarget = function () {
        switch (this.subject().confusionLevel()) {
            case 1:
                return this.opponentsUnit().randomTarget();
            case 2:
                if (Utils_1.Utils.randomInt(2) === 0) {
                    return this.opponentsUnit().randomTarget();
                }
                return this.friendsUnit().randomTarget();
            default:
                return this.friendsUnit().randomTarget();
        }
    };
    Game_Action.prototype.targetsForOpponents = function () {
        var targets = [];
        var unit = this.opponentsUnit();
        if (this.isForRandom()) {
            for (var i = 0; i < this.numTargets(); i++) {
                targets.push(unit.randomTarget());
            }
        }
        else if (this.isForOne()) {
            if (this._targetIndex < 0) {
                targets.push(unit.randomTarget());
            }
            else {
                targets.push(unit.smoothTarget(this._targetIndex));
            }
        }
        else {
            targets = unit.aliveMembers();
        }
        return targets;
    };
    Game_Action.prototype.targetsForFriends = function () {
        var targets = [];
        var unit = this.friendsUnit();
        if (this.isForUser()) {
            return [this.subject()];
        }
        else if (this.isForDeadFriend()) {
            if (this.isForOne()) {
                targets.push(unit.smoothDeadTarget(this._targetIndex));
            }
            else {
                targets = unit.deadMembers();
            }
        }
        else if (this.isForOne()) {
            if (this._targetIndex < 0) {
                targets.push(unit.randomTarget());
            }
            else {
                targets.push(unit.smoothTarget(this._targetIndex));
            }
        }
        else {
            targets = unit.aliveMembers();
        }
        return targets;
    };
    Game_Action.prototype.evaluate = function () {
        var _this = this;
        var value = 0;
        this.itemTargetCandidates().forEach(function (target) {
            var targetValue = _this.evaluateWithTarget(target);
            if (_this.isForAll()) {
                value += targetValue;
            }
            else if (targetValue > value) {
                value = targetValue;
                _this._targetIndex = target.index();
            }
        });
        value *= this.numRepeats();
        if (value > 0) {
            value += g.game.vars.random.generate();
        }
        return value;
    };
    Game_Action.prototype.itemTargetCandidates = function () {
        if (!this.isValid()) {
            return [];
        }
        else if (this.isForOpponent()) {
            return this.opponentsUnit().aliveMembers();
        }
        else if (this.isForUser()) {
            return [this.subject()];
        }
        else if (this.isForDeadFriend()) {
            return this.friendsUnit().deadMembers();
        }
        else {
            return this.friendsUnit().aliveMembers();
        }
    };
    Game_Action.prototype.evaluateWithTarget = function (target) {
        if (this.isHpEffect()) {
            var value = this.makeDamageValue(target, false);
            if (this.isForOpponent()) {
                return value / Math.max(target.hp, 1);
            }
            else {
                var recovery = Math.min(-value, target.mhp - target.hp);
                return recovery / target.mhp;
            }
        }
    };
    Game_Action.prototype.testApply = function (target) {
        return (this.isForDeadFriend() === target.isDead() &&
            (DataManager_1.$gameParty.inBattle() ||
                this.isForOpponent() ||
                (this.isHpRecover() && target.hp < target.mhp) ||
                (this.isMpRecover() && target.mp < target.mmp) ||
                this.hasItemAnyValidEffects(target)));
    };
    Game_Action.prototype.hasItemAnyValidEffects = function (target) {
        var _this = this;
        return this.item().effects.some(function (effect) {
            return _this.testItemEffect(target, effect);
        });
    };
    Game_Action.prototype.testItemEffect = function (target, effect) {
        switch (effect.code) {
            case Game_Action.EFFECT_RECOVER_HP:
                return target.hp < target.mhp || effect.value1 < 0 || effect.value2 < 0;
            case Game_Action.EFFECT_RECOVER_MP:
                return target.mp < target.mmp || effect.value1 < 0 || effect.value2 < 0;
            case Game_Action.EFFECT_ADD_STATE:
                return !target.isStateAffected(effect.dataId);
            case Game_Action.EFFECT_REMOVE_STATE:
                return target.isStateAffected(effect.dataId);
            case Game_Action.EFFECT_ADD_BUFF:
                return !target.isMaxBuffAffected(effect.dataId);
            case Game_Action.EFFECT_ADD_DEBUFF:
                return !target.isMaxDebuffAffected(effect.dataId);
            case Game_Action.EFFECT_REMOVE_BUFF:
                return target.isBuffAffected(effect.dataId);
            case Game_Action.EFFECT_REMOVE_DEBUFF:
                return target.isDebuffAffected(effect.dataId);
            case Game_Action.EFFECT_LEARN_SKILL:
                return target.isActor() && !target.isLearnedSkill(effect.dataId);
            default:
                return true;
        }
    };
    Game_Action.prototype.itemCnt = function (target) {
        if (this.isPhysical() && target.canMove()) {
            return target.cnt;
        }
        else {
            return 0;
        }
    };
    Game_Action.prototype.itemMrf = function (target) {
        if (this.isMagical()) {
            return target.mrf;
        }
        else {
            return 0;
        }
    };
    Game_Action.prototype.itemHit = function (_target) {
        if (this.isPhysical()) {
            return this.item().successRate * 0.01 * this.subject().hit;
        }
        else {
            return this.item().successRate * 0.01;
        }
    };
    Game_Action.prototype.itemEva = function (target) {
        if (this.isPhysical()) {
            return target.eva;
        }
        else if (this.isMagical()) {
            return target.mev;
        }
        else {
            return 0;
        }
    };
    Game_Action.prototype.itemCri = function (target) {
        return this.item().damage.critical ? this.subject().cri * (1 - target.cev) : 0;
    };
    Game_Action.prototype.apply = function (target) {
        var _this = this;
        var result = target.result();
        this.subject().clearResult();
        result.clear();
        result.used = this.testApply(target);
        result.missed = result.used && g.game.vars.random.generate() >= this.itemHit(target);
        result.evaded = !result.missed && g.game.vars.random.generate() < this.itemEva(target);
        result.physical = this.isPhysical();
        result.drain = this.isDrain();
        if (result.isHit()) {
            if (this.item().damage.type > 0) {
                result.critical = g.game.vars.random.generate() < this.itemCri(target);
                var value = this.makeDamageValue(target, result.critical);
                this.executeDamage(target, value);
            }
            this.item().effects.forEach(function (effect) {
                _this.applyItemEffect(target, effect);
            });
            this.applyItemUserEffect(target);
        }
    };
    Game_Action.prototype.makeDamageValue = function (target, critical) {
        var item = this.item();
        var baseValue = this.evalDamageFormula(target);
        var value = baseValue * this.calcElementRate(target);
        if (this.isPhysical()) {
            value *= target.pdr;
        }
        if (this.isMagical()) {
            value *= target.mdr;
        }
        if (baseValue < 0) {
            value *= target.rec;
        }
        if (critical) {
            value = this.applyCritical(value);
        }
        value = this.applyVariance(value, item.damage.variance);
        value = this.applyGuard(value, target);
        value = Math.round(value);
        return value;
    };
    Game_Action.prototype.evalDamageFormula = function (target) {
        try {
            var item = this.item();
            // これらの変数は戦闘時に後述のeval内にて利用される
            /* eslint-disable @typescript-eslint/no-unused-vars */
            var a = this.subject();
            var b = target;
            var v = DataManager_1.$gameVariables._data;
            /* eslint-enable @typescript-eslint/no-unused-vars */
            // const sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
            var sign = [3, 4].indexOf(item.damage.type) >= 0 ? -1 : 1;
            setGameObjects();
            // eslint-disable-next-line no-eval
            var value = Math.max(eval(item.damage.formula), 0) * sign;
            if (isNaN(value))
                value = 0;
            return value;
        }
        catch (e) {
            console.log(e);
            return 0;
        }
    };
    Game_Action.prototype.calcElementRate = function (target) {
        if (this.item().damage.elementId < 0) {
            return this.elementsMaxRate(target, this.subject().attackElements());
        }
        else {
            return target.elementRate(this.item().damage.elementId);
        }
    };
    Game_Action.prototype.elementsMaxRate = function (target, elements) {
        if (elements.length > 0) {
            return Math.max.apply(null, elements.map(function (elementId) {
                return target.elementRate(elementId);
            }));
        }
        else {
            return 1;
        }
    };
    Game_Action.prototype.applyCritical = function (damage) {
        return damage * 3;
    };
    Game_Action.prototype.applyVariance = function (damage, variance) {
        var amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));
        var v = Utils_1.Utils.randomInt(amp + 1) + Utils_1.Utils.randomInt(amp + 1) - amp;
        return damage >= 0 ? damage + v : damage - v;
    };
    Game_Action.prototype.applyGuard = function (damage, target) {
        return damage / (damage > 0 && target.isGuard() ? 2 * target.grd : 1);
    };
    Game_Action.prototype.executeDamage = function (target, value) {
        var result = target.result();
        if (value === 0) {
            result.critical = false;
        }
        if (this.isHpEffect()) {
            this.executeHpDamage(target, value);
        }
        if (this.isMpEffect()) {
            this.executeMpDamage(target, value);
        }
    };
    Game_Action.prototype.executeHpDamage = function (target, value) {
        if (this.isDrain()) {
            value = Math.min(target.hp, value);
        }
        this.makeSuccess(target);
        target.gainHp(-value);
        if (value > 0) {
            target.onDamage(value);
        }
        this.gainDrainedHp(value);
    };
    Game_Action.prototype.executeMpDamage = function (target, value) {
        if (!this.isMpRecover()) {
            value = Math.min(target.mp, value);
        }
        if (value !== 0) {
            this.makeSuccess(target);
        }
        target.gainMp(-value);
        this.gainDrainedMp(value);
    };
    Game_Action.prototype.gainDrainedHp = function (value) {
        if (this.isDrain()) {
            var gainTarget = this.subject();
            if (this._reflectionTarget !== undefined) {
                gainTarget = this._reflectionTarget;
            }
            gainTarget.gainHp(value);
        }
    };
    Game_Action.prototype.gainDrainedMp = function (value) {
        if (this.isDrain()) {
            var gainTarget = this.subject();
            if (this._reflectionTarget !== undefined) {
                gainTarget = this._reflectionTarget;
            }
            gainTarget.gainMp(value);
        }
    };
    Game_Action.prototype.applyItemEffect = function (target, effect) {
        switch (effect.code) {
            case Game_Action.EFFECT_RECOVER_HP:
                this.itemEffectRecoverHp(target, effect);
                break;
            case Game_Action.EFFECT_RECOVER_MP:
                this.itemEffectRecoverMp(target, effect);
                break;
            case Game_Action.EFFECT_GAIN_TP:
                this.itemEffectGainTp(target, effect);
                break;
            case Game_Action.EFFECT_ADD_STATE:
                this.itemEffectAddState(target, effect);
                break;
            case Game_Action.EFFECT_REMOVE_STATE:
                this.itemEffectRemoveState(target, effect);
                break;
            case Game_Action.EFFECT_ADD_BUFF:
                this.itemEffectAddBuff(target, effect);
                break;
            case Game_Action.EFFECT_ADD_DEBUFF:
                this.itemEffectAddDebuff(target, effect);
                break;
            case Game_Action.EFFECT_REMOVE_BUFF:
                this.itemEffectRemoveBuff(target, effect);
                break;
            case Game_Action.EFFECT_REMOVE_DEBUFF:
                this.itemEffectRemoveDebuff(target, effect);
                break;
            case Game_Action.EFFECT_SPECIAL:
                this.itemEffectSpecial(target, effect);
                break;
            case Game_Action.EFFECT_GROW:
                this.itemEffectGrow(target, effect);
                break;
            case Game_Action.EFFECT_LEARN_SKILL:
                this.itemEffectLearnSkill(target, effect);
                break;
            case Game_Action.EFFECT_COMMON_EVENT:
                this.itemEffectCommonEvent(target, effect);
                break;
        }
    };
    Game_Action.prototype.itemEffectRecoverHp = function (target, effect) {
        var value = (target.mhp * effect.value1 + effect.value2) * target.rec;
        if (this.isItem()) {
            value *= this.subject().pha;
        }
        value = Math.floor(value);
        if (value !== 0) {
            target.gainHp(value);
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectRecoverMp = function (target, effect) {
        var value = (target.mmp * effect.value1 + effect.value2) * target.rec;
        if (this.isItem()) {
            value *= this.subject().pha;
        }
        value = Math.floor(value);
        if (value !== 0) {
            target.gainMp(value);
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectGainTp = function (target, effect) {
        var value = Math.floor(effect.value1);
        if (value !== 0) {
            target.gainTp(value);
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectAddState = function (target, effect) {
        if (effect.dataId === 0) {
            this.itemEffectAddAttackState(target, effect);
        }
        else {
            this.itemEffectAddNormalState(target, effect);
        }
    };
    Game_Action.prototype.itemEffectAddAttackState = function (target, effect) {
        var _this = this;
        this.subject()
            .attackStates()
            .forEach(function (stateId) {
            var chance = effect.value1;
            chance *= target.stateRate(stateId);
            chance *= _this.subject().attackStatesRate(stateId);
            chance *= _this.lukEffectRate(target);
            if (g.game.vars.random.generate() < chance) {
                target.addState(stateId);
                _this.makeSuccess(target);
            }
        }, target);
    };
    Game_Action.prototype.itemEffectAddNormalState = function (target, effect) {
        var chance = effect.value1;
        if (!this.isCertainHit()) {
            chance *= target.stateRate(effect.dataId);
            chance *= this.lukEffectRate(target);
        }
        if (g.game.vars.random.generate() < chance) {
            target.addState(effect.dataId);
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectRemoveState = function (target, effect) {
        var chance = effect.value1;
        if (g.game.vars.random.generate() < chance) {
            target.removeState(effect.dataId);
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectAddBuff = function (target, effect) {
        target.addBuff(effect.dataId, effect.value1);
        this.makeSuccess(target);
    };
    Game_Action.prototype.itemEffectAddDebuff = function (target, effect) {
        var chance = target.debuffRate(effect.dataId) * this.lukEffectRate(target);
        if (g.game.vars.random.generate() < chance) {
            target.addDebuff(effect.dataId, effect.value1);
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectRemoveBuff = function (target, effect) {
        if (target.isBuffAffected(effect.dataId)) {
            target.removeBuff(effect.dataId);
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectRemoveDebuff = function (target, effect) {
        if (target.isDebuffAffected(effect.dataId)) {
            target.removeBuff(effect.dataId);
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectSpecial = function (target, effect) {
        if (effect.dataId === Game_Action.SPECIAL_EFFECT_ESCAPE) {
            target.escape();
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectGrow = function (target, effect) {
        target.addParam(effect.dataId, Math.floor(effect.value1));
        this.makeSuccess(target);
    };
    Game_Action.prototype.itemEffectLearnSkill = function (target, effect) {
        if (target.isActor()) {
            target.learnSkill(effect.dataId);
            this.makeSuccess(target);
        }
    };
    Game_Action.prototype.itemEffectCommonEvent = function (_target, _effect) {
        //
    };
    Game_Action.prototype.makeSuccess = function (target) {
        target.result().success = true;
    };
    Game_Action.prototype.applyItemUserEffect = function (_target) {
        var value = Math.floor(this.item().tpGain * this.subject().tcr);
        this.subject().gainSilentTp(value);
    };
    Game_Action.prototype.lukEffectRate = function (target) {
        return Math.max(1.0 + (this.subject().luk - target.luk) * 0.001, 0.0);
    };
    Game_Action.prototype.applyGlobal = function () {
        this.item().effects.forEach(function (effect) {
            if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
                DataManager_1.$gameTemp.reserveCommonEvent(effect.dataId);
            }
        });
    };
    Game_Action.EFFECT_RECOVER_HP = 11;
    Game_Action.EFFECT_RECOVER_MP = 12;
    Game_Action.EFFECT_GAIN_TP = 13;
    Game_Action.EFFECT_ADD_STATE = 21;
    Game_Action.EFFECT_REMOVE_STATE = 22;
    Game_Action.EFFECT_ADD_BUFF = 31;
    Game_Action.EFFECT_ADD_DEBUFF = 32;
    Game_Action.EFFECT_REMOVE_BUFF = 33;
    Game_Action.EFFECT_REMOVE_DEBUFF = 34;
    Game_Action.EFFECT_SPECIAL = 41;
    Game_Action.EFFECT_GROW = 42;
    Game_Action.EFFECT_LEARN_SKILL = 43;
    Game_Action.EFFECT_COMMON_EVENT = 44;
    Game_Action.SPECIAL_EFFECT_ESCAPE = 0;
    Game_Action.HITTYPE_CERTAIN = 0;
    Game_Action.HITTYPE_PHYSICAL = 1;
    Game_Action.HITTYPE_MAGICAL = 2;
    return Game_Action;
}());
exports.Game_Action = Game_Action;

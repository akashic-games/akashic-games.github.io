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
exports.Game_Actor = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var GameAction_1 = require("./GameAction");
var GameBattler_1 = require("./GameBattler");
var GameItem_1 = require("./GameItem");
var Game_Actor = /** @class */ (function (_super) {
    __extends(Game_Actor, _super);
    function Game_Actor(actorId) {
        var _this = _super.call(this, actorId) || this;
        if (Object.getPrototypeOf(_this) === Game_Actor.prototype) {
            _this.initialize(actorId);
        }
        return _this;
    }
    Object.defineProperty(Game_Actor.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: false,
        configurable: true
    });
    Game_Actor.prototype.initialize = function (actorId) {
        _super.prototype.initialize.call(this, actorId);
        this.setup(actorId);
    };
    Game_Actor.prototype.initMembers = function () {
        _super.prototype.initMembers.call(this);
        this._actorId = 0;
        this._name = "";
        this._nickname = "";
        this._classId = 0;
        this._level = 0;
        this._characterName = "";
        this._characterIndex = 0;
        this._faceName = "";
        this._faceIndex = 0;
        this._battlerName = "";
        this._exp = {};
        this._skills = [];
        this._equips = [];
        this._actionInputIndex = 0;
        this._lastMenuSkill = new GameItem_1.Game_Item();
        this._lastBattleSkill = new GameItem_1.Game_Item();
        this._lastCommandSymbol = "";
    };
    Game_Actor.prototype.setup = function (actorId) {
        var actor = DataManager_1.$dataActors[actorId];
        this._actorId = actorId;
        this._name = actor.name;
        this._nickname = actor.nickname;
        this._profile = actor.profile;
        this._classId = actor.classId;
        this._level = actor.initialLevel;
        this.initImages();
        this.initExp();
        this.initSkills();
        this.initEquips(actor.equips);
        this.clearParamPlus();
        this.recoverAll();
    };
    Game_Actor.prototype.actorId = function () {
        return this._actorId;
    };
    Game_Actor.prototype.actor = function () {
        return DataManager_1.$dataActors[this._actorId];
    };
    Game_Actor.prototype.name = function () {
        return this._name;
    };
    Game_Actor.prototype.setName = function (name) {
        this._name = name;
    };
    Game_Actor.prototype.nickname = function () {
        return this._nickname;
    };
    Game_Actor.prototype.setNickname = function (nickname) {
        this._nickname = nickname;
    };
    Game_Actor.prototype.profile = function () {
        return this._profile;
    };
    Game_Actor.prototype.setProfile = function (profile) {
        this._profile = profile;
    };
    Game_Actor.prototype.characterName = function () {
        return this._characterName;
    };
    Game_Actor.prototype.characterIndex = function () {
        return this._characterIndex;
    };
    Game_Actor.prototype.faceName = function () {
        return this._faceName;
    };
    Game_Actor.prototype.faceIndex = function () {
        return this._faceIndex;
    };
    Game_Actor.prototype.battlerName = function () {
        return this._battlerName;
    };
    Game_Actor.prototype.clearStates = function () {
        GameBattler_1.Game_Battler.prototype.clearStates.call(this);
        this._stateSteps = {};
    };
    Game_Actor.prototype.eraseState = function (stateId) {
        GameBattler_1.Game_Battler.prototype.eraseState.call(this, stateId);
        delete this._stateSteps[stateId];
    };
    Game_Actor.prototype.resetStateCounts = function (stateId) {
        GameBattler_1.Game_Battler.prototype.resetStateCounts.call(this, stateId);
        this._stateSteps[stateId] = DataManager_1.$dataStates[stateId].stepsToRemove;
    };
    Game_Actor.prototype.initImages = function () {
        var actor = this.actor();
        this._characterName = actor.characterName;
        this._characterIndex = actor.characterIndex;
        this._faceName = actor.faceName;
        this._faceIndex = actor.faceIndex;
        this._battlerName = actor.battlerName;
    };
    Game_Actor.prototype.expForLevel = function (level) {
        var c = this.currentClass();
        var basis = c.expParams[0];
        var extra = c.expParams[1];
        // eslint-disable-next-line @typescript-eslint/naming-convention
        var acc_a = c.expParams[2];
        // eslint-disable-next-line @typescript-eslint/naming-convention
        var acc_b = c.expParams[3];
        return Math.round((basis * Math.pow(level - 1, 0.9 + acc_a / 250) * level * (level + 1)) / (6 + Math.pow(level, 2) / 50 / acc_b) +
            (level - 1) * extra);
    };
    Game_Actor.prototype.initExp = function () {
        this._exp[this._classId] = this.currentLevelExp();
    };
    Game_Actor.prototype.currentExp = function () {
        return this._exp[this._classId];
    };
    Game_Actor.prototype.currentLevelExp = function () {
        return this.expForLevel(this._level);
    };
    Game_Actor.prototype.nextLevelExp = function () {
        return this.expForLevel(this._level + 1);
    };
    Game_Actor.prototype.nextRequiredExp = function () {
        return this.nextLevelExp() - this.currentExp();
    };
    Game_Actor.prototype.maxLevel = function () {
        return this.actor().maxLevel;
    };
    Game_Actor.prototype.isMaxLevel = function () {
        return this._level >= this.maxLevel();
    };
    Game_Actor.prototype.initSkills = function () {
        var _this = this;
        this._skills = [];
        this.currentClass().learnings.forEach(function (learning) {
            if (learning.level <= _this._level) {
                _this.learnSkill(learning.skillId);
            }
        });
    };
    Game_Actor.prototype.initEquips = function (equips) {
        var slots = this.equipSlots();
        var maxSlots = slots.length;
        this._equips = [];
        for (var i = 0; i < maxSlots; i++) {
            this._equips[i] = new GameItem_1.Game_Item();
        }
        for (var j = 0; j < equips.length; j++) {
            if (j < maxSlots) {
                this._equips[j].setEquip(slots[j] === 1, equips[j]);
            }
        }
        this.releaseUnequippableItems(true);
        this.refresh();
    };
    Game_Actor.prototype.equipSlots = function () {
        var slots = [];
        for (var i = 1; i < DataManager_1.$dataSystem.equipTypes.length; i++) {
            slots.push(i);
        }
        if (slots.length >= 2 && this.isDualWield()) {
            slots[1] = 1;
        }
        return slots;
    };
    Game_Actor.prototype.equips = function () {
        return this._equips.map(function (item) {
            return item.object();
        });
    };
    Game_Actor.prototype.weapons = function () {
        return this.equips().filter(function (item) {
            return item && managers_1.DataManager.isWeapon(item);
        });
    };
    Game_Actor.prototype.armors = function () {
        return this.equips().filter(function (item) {
            return item && managers_1.DataManager.isArmor(item);
        });
    };
    Game_Actor.prototype.hasWeapon = function (weapon) {
        // return this.weapons().contains(weapon);
        return this.weapons().indexOf(weapon) >= 0;
    };
    Game_Actor.prototype.hasArmor = function (armor) {
        // return this.armors().contains(armor);
        return this.armors().indexOf(armor) >= 0;
    };
    Game_Actor.prototype.isEquipChangeOk = function (slotId) {
        return !this.isEquipTypeLocked(this.equipSlots()[slotId]) && !this.isEquipTypeSealed(this.equipSlots()[slotId]);
    };
    Game_Actor.prototype.changeEquip = function (slotId, item) {
        if (this.tradeItemWithParty(item, this.equips()[slotId]) && (!item || this.equipSlots()[slotId] === item.etypeId)) {
            this._equips[slotId].setObject(item);
            this.refresh();
        }
    };
    Game_Actor.prototype.forceChangeEquip = function (slotId, item) {
        this._equips[slotId].setObject(item);
        this.releaseUnequippableItems(true);
        this.refresh();
    };
    Game_Actor.prototype.tradeItemWithParty = function (newItem, oldItem) {
        if (newItem && !DataManager_1.$gameParty.hasItem(newItem)) {
            return false;
        }
        else {
            DataManager_1.$gameParty.gainItem(oldItem, 1);
            DataManager_1.$gameParty.loseItem(newItem, 1);
            return true;
        }
    };
    Game_Actor.prototype.changeEquipById = function (etypeId, itemId) {
        var slotId = etypeId - 1;
        if (this.equipSlots()[slotId] === 1) {
            this.changeEquip(slotId, DataManager_1.$dataWeapons[itemId]);
        }
        else {
            this.changeEquip(slotId, DataManager_1.$dataArmors[itemId]);
        }
    };
    Game_Actor.prototype.isEquipped = function (item) {
        // return this.equips().contains(item);
        return this.equips().indexOf(item) >= 0;
    };
    Game_Actor.prototype.discardEquip = function (item) {
        var slotId = this.equips().indexOf(item);
        if (slotId >= 0) {
            this._equips[slotId].setObject(null);
        }
    };
    Game_Actor.prototype.releaseUnequippableItems = function (forcing) {
        for (;;) {
            var slots = this.equipSlots();
            var equips = this.equips();
            var changed = false;
            for (var i = 0; i < equips.length; i++) {
                var item = equips[i];
                if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
                    if (!forcing) {
                        this.tradeItemWithParty(null, item);
                    }
                    this._equips[i].setObject(null);
                    changed = true;
                }
            }
            if (!changed) {
                break;
            }
        }
    };
    Game_Actor.prototype.clearEquipments = function () {
        var maxSlots = this.equipSlots().length;
        for (var i = 0; i < maxSlots; i++) {
            if (this.isEquipChangeOk(i)) {
                this.changeEquip(i, null);
            }
        }
    };
    Game_Actor.prototype.optimizeEquipments = function () {
        var maxSlots = this.equipSlots().length;
        this.clearEquipments();
        for (var i = 0; i < maxSlots; i++) {
            if (this.isEquipChangeOk(i)) {
                this.changeEquip(i, this.bestEquipItem(i));
            }
        }
    };
    Game_Actor.prototype.bestEquipItem = function (slotId) {
        var _this = this;
        var etypeId = this.equipSlots()[slotId];
        var items = DataManager_1.$gameParty.equipItems().filter(function (item) {
            return item.etypeId === etypeId && _this.canEquip(item);
        });
        var bestItem = null;
        var bestPerformance = -1000;
        for (var i = 0; i < items.length; i++) {
            var performance = this.calcEquipItemPerformance(items[i]);
            if (performance > bestPerformance) {
                bestPerformance = performance;
                bestItem = items[i];
            }
        }
        return bestItem;
    };
    Game_Actor.prototype.calcEquipItemPerformance = function (item) {
        return item.params.reduce(function (a, b) {
            return a + b;
        });
    };
    Game_Actor.prototype.isSkillWtypeOk = function (skill) {
        var wtypeId1 = skill.requiredWtypeId1;
        var wtypeId2 = skill.requiredWtypeId2;
        if ((wtypeId1 === 0 && wtypeId2 === 0) ||
            (wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1)) ||
            (wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2))) {
            return true;
        }
        else {
            return false;
        }
    };
    Game_Actor.prototype.isWtypeEquipped = function (wtypeId) {
        return this.weapons().some(function (weapon) {
            return weapon.wtypeId === wtypeId;
        });
    };
    Game_Actor.prototype.refresh = function () {
        this.releaseUnequippableItems(false);
        GameBattler_1.Game_Battler.prototype.refresh.call(this);
    };
    Game_Actor.prototype.isActor = function () {
        return true;
    };
    Game_Actor.prototype.friendsUnit = function () {
        return DataManager_1.$gameParty;
    };
    Game_Actor.prototype.opponentsUnit = function () {
        return DataManager_1.$gameTroop;
    };
    Game_Actor.prototype.index = function () {
        return DataManager_1.$gameParty.members().indexOf(this);
    };
    Game_Actor.prototype.isBattleMember = function () {
        return core_1.Utils.contains(DataManager_1.$gameParty.battleMembers(), this);
    };
    Game_Actor.prototype.isFormationChangeOk = function () {
        return true;
    };
    Game_Actor.prototype.currentClass = function () {
        return DataManager_1.$dataClasses[this._classId];
    };
    Game_Actor.prototype.isClass = function (gameClass) {
        return gameClass && this._classId === gameClass.id;
    };
    Game_Actor.prototype.skills = function () {
        var list = [];
        this._skills.concat(this.addedSkills()).forEach(function (id) {
            if ( /* !list.contains($dataSkills[id])*/list.indexOf(DataManager_1.$dataSkills[id]) < 0) {
                list.push(DataManager_1.$dataSkills[id]);
            }
        });
        return list;
    };
    Game_Actor.prototype.usableSkills = function () {
        var _this = this;
        return this.skills().filter(function (skill) {
            return _this.canUse(skill);
        });
    };
    Game_Actor.prototype.traitObjects = function () {
        var objects = GameBattler_1.Game_Battler.prototype.traitObjects.call(this);
        objects = objects.concat([this.actor(), this.currentClass()]);
        var equips = this.equips();
        for (var i = 0; i < equips.length; i++) {
            var item = equips[i];
            if (item) {
                objects.push(item);
            }
        }
        return objects;
    };
    Game_Actor.prototype.attackElements = function () {
        var set = _super.prototype.attackElements.call(this);
        if (this.hasNoWeapons() && !core_1.Utils.contains(set, this.bareHandsElementId())) {
            set.push(this.bareHandsElementId());
        }
        return set;
    };
    Game_Actor.prototype.hasNoWeapons = function () {
        return this.weapons().length === 0;
    };
    Game_Actor.prototype.bareHandsElementId = function () {
        return 1;
    };
    Game_Actor.prototype.paramMax = function (paramId) {
        if (paramId === 0) {
            return 9999; // MHP
        }
        return GameBattler_1.Game_Battler.prototype.paramMax.call(this, paramId);
    };
    Game_Actor.prototype.paramBase = function (paramId) {
        return this.currentClass().params[paramId][this._level];
    };
    Game_Actor.prototype.paramPlus = function (paramId) {
        var value = GameBattler_1.Game_Battler.prototype.paramPlus.call(this, paramId);
        var equips = this.equips();
        for (var i = 0; i < equips.length; i++) {
            var item = equips[i];
            if (item) {
                value += item.params[paramId];
            }
        }
        return value;
    };
    Game_Actor.prototype.attackAnimationId1 = function () {
        if (this.hasNoWeapons()) {
            return this.bareHandsAnimationId();
        }
        else {
            var weapons = this.weapons();
            return weapons[0] ? weapons[0].animationId : 0;
        }
    };
    Game_Actor.prototype.attackAnimationId2 = function () {
        var weapons = this.weapons();
        return weapons[1] ? weapons[1].animationId : 0;
    };
    Game_Actor.prototype.bareHandsAnimationId = function () {
        return 1;
    };
    Game_Actor.prototype.changeExp = function (exp, show) {
        this._exp[this._classId] = Math.max(exp, 0);
        var lastLevel = this._level;
        var lastSkills = this.skills();
        while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
            this.levelUp();
        }
        while (this.currentExp() < this.currentLevelExp()) {
            this.levelDown();
        }
        if (show && this._level > lastLevel) {
            this.displayLevelUp(this.findNewSkills(lastSkills));
        }
        this.refresh();
    };
    Game_Actor.prototype.levelUp = function () {
        var _this = this;
        this._level++;
        this.currentClass().learnings.forEach(function (learning) {
            if (learning.level === _this._level) {
                _this.learnSkill(learning.skillId);
            }
        });
    };
    Game_Actor.prototype.levelDown = function () {
        this._level--;
    };
    Game_Actor.prototype.findNewSkills = function (lastSkills) {
        var newSkills = this.skills();
        for (var i = 0; i < lastSkills.length; i++) {
            var index = newSkills.indexOf(lastSkills[i]);
            if (index >= 0) {
                newSkills.splice(index, 1);
            }
        }
        return newSkills;
    };
    Game_Actor.prototype.displayLevelUp = function (newSkills) {
        var text = core_1.Utils.format(managers_1.TextManager.levelUp, this._name, managers_1.TextManager.level, this._level);
        DataManager_1.$gameMessage.newPage();
        DataManager_1.$gameMessage.add(text);
        newSkills.forEach(function (skill) {
            DataManager_1.$gameMessage.add(core_1.Utils.format(managers_1.TextManager.obtainSkill, skill.name));
        });
    };
    Game_Actor.prototype.gainExp = function (exp) {
        var newExp = this.currentExp() + Math.round(exp * this.finalExpRate());
        this.changeExp(newExp, this.shouldDisplayLevelUp());
    };
    Game_Actor.prototype.finalExpRate = function () {
        return this.exr * (this.isBattleMember() ? 1 : this.benchMembersExpRate());
    };
    Game_Actor.prototype.benchMembersExpRate = function () {
        return DataManager_1.$dataSystem.optExtraExp ? 1 : 0;
    };
    Game_Actor.prototype.shouldDisplayLevelUp = function () {
        return true;
    };
    Game_Actor.prototype.changeLevel = function (level, show) {
        level = core_1.Utils.clamp(level, 1, this.maxLevel());
        level = Math.max(1, Math.min(level, this.maxLevel()));
        this.changeExp(this.expForLevel(level), show);
    };
    Game_Actor.prototype.learnSkill = function (skillId) {
        if (!this.isLearnedSkill(skillId)) {
            this._skills.push(skillId);
            this._skills.sort(function (a, b) {
                return a - b;
            });
        }
    };
    Game_Actor.prototype.forgetSkill = function (skillId) {
        var index = this._skills.indexOf(skillId);
        if (index >= 0) {
            this._skills.splice(index, 1);
        }
    };
    Game_Actor.prototype.isLearnedSkill = function (skillId) {
        // return this._skills.contains(skillId);
        return this._skills.indexOf(skillId) >= 0;
    };
    Game_Actor.prototype.hasSkill = function (skillId) {
        // return this.skills().contains($dataSkills[skillId]);
        return this.skills().indexOf(DataManager_1.$dataSkills[skillId]) >= 0;
    };
    Game_Actor.prototype.changeClass = function (classId, keepExp) {
        if (keepExp) {
            this._exp[classId] = this.currentExp();
        }
        this._classId = classId;
        this.changeExp(this._exp[this._classId] || 0, false);
        this.refresh();
    };
    Game_Actor.prototype.setCharacterImage = function (characterName, characterIndex) {
        this._characterName = characterName;
        this._characterIndex = characterIndex;
    };
    Game_Actor.prototype.setFaceImage = function (faceName, faceIndex) {
        this._faceName = faceName;
        this._faceIndex = faceIndex;
    };
    Game_Actor.prototype.setBattlerImage = function (battlerName) {
        this._battlerName = battlerName;
    };
    Game_Actor.prototype.isSpriteVisible = function () {
        return DataManager_1.$gameSystem.isSideView();
    };
    Game_Actor.prototype.startAnimation = function (animationId, mirror, delay) {
        mirror = !mirror;
        _super.prototype.startAnimation.call(this, animationId, mirror, delay);
    };
    Game_Actor.prototype.performActionStart = function (action) {
        _super.prototype.performActionStart.call(this, action);
    };
    Game_Actor.prototype.performAction = function (action) {
        _super.prototype.performAction.call(this, action);
        if (action.isAttack()) {
            this.performAttack();
        }
        else if (action.isGuard()) {
            this.requestMotion("guard");
        }
        else if (action.isMagicSkill()) {
            this.requestMotion("spell");
        }
        else if (action.isSkill()) {
            this.requestMotion("skill");
        }
        else if (action.isItem()) {
            this.requestMotion("item");
        }
    };
    Game_Actor.prototype.performActionEnd = function () {
        // Game_Battler.prototype.performActionEnd.call(this);
        _super.prototype.performActionEnd.call(this);
    };
    Game_Actor.prototype.performAttack = function () {
        var weapons = this.weapons();
        var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
        var attackMotion = DataManager_1.$dataSystem.attackMotions[wtypeId];
        if (attackMotion) {
            if (attackMotion.type === 0) {
                this.requestMotion("thrust");
            }
            else if (attackMotion.type === 1) {
                this.requestMotion("swing");
            }
            else if (attackMotion.type === 2) {
                this.requestMotion("missile");
            }
            this.startWeaponAnimation(attackMotion.weaponImageId);
        }
    };
    Game_Actor.prototype.performDamage = function () {
        GameBattler_1.Game_Battler.prototype.performDamage.call(this);
        if (this.isSpriteVisible()) {
            this.requestMotion("damage");
        }
        else {
            DataManager_1.$gameScreen.startShake(5, 5, 10);
        }
        managers_1.SoundManager.playActorDamage();
    };
    Game_Actor.prototype.performEvasion = function () {
        GameBattler_1.Game_Battler.prototype.performEvasion.call(this);
        this.requestMotion("evade");
    };
    Game_Actor.prototype.performMagicEvasion = function () {
        GameBattler_1.Game_Battler.prototype.performMagicEvasion.call(this);
        this.requestMotion("evade");
    };
    Game_Actor.prototype.performCounter = function () {
        GameBattler_1.Game_Battler.prototype.performCounter.call(this);
        this.performAttack();
    };
    Game_Actor.prototype.performCollapse = function () {
        GameBattler_1.Game_Battler.prototype.performCollapse.call(this);
        if (DataManager_1.$gameParty.inBattle()) {
            managers_1.SoundManager.playActorCollapse();
        }
    };
    Game_Actor.prototype.performVictory = function () {
        if (this.canMove()) {
            this.requestMotion("victory");
        }
    };
    Game_Actor.prototype.performEscape = function () {
        if (this.canMove()) {
            this.requestMotion("escape");
        }
    };
    Game_Actor.prototype.makeActionList = function () {
        var _this = this;
        var list = [];
        var action = new GameAction_1.Game_Action(this);
        action.setAttack();
        list.push(action);
        this.usableSkills().forEach(function (skill) {
            action = new GameAction_1.Game_Action(_this);
            action.setSkill(skill.id);
            list.push(action);
        });
        return list;
    };
    Game_Actor.prototype.makeAutoBattleActions = function () {
        for (var i = 0; i < this.numActions(); i++) {
            var list = this.makeActionList();
            var maxValue = Number.MIN_VALUE;
            for (var j = 0; j < list.length; j++) {
                var value = list[j].evaluate();
                if (value > maxValue) {
                    maxValue = value;
                    this.setAction(i, list[j]);
                }
            }
        }
        this.setActionState("waiting");
    };
    Game_Actor.prototype.makeConfusionActions = function () {
        for (var i = 0; i < this.numActions(); i++) {
            this.action(i).setConfusion();
        }
        this.setActionState("waiting");
    };
    Game_Actor.prototype.makeActions = function () {
        GameBattler_1.Game_Battler.prototype.makeActions.call(this);
        if (this.numActions() > 0) {
            this.setActionState("undecided");
        }
        else {
            this.setActionState("waiting");
        }
        if (this.isAutoBattle()) {
            this.makeAutoBattleActions();
        }
        else if (this.isConfused()) {
            this.makeConfusionActions();
        }
    };
    Game_Actor.prototype.onPlayerWalk = function () {
        var _this = this;
        this.clearResult();
        this.checkFloorEffect();
        if (DataManager_1.$gamePlayer.isNormal()) {
            this.turnEndOnMap();
            this.states().forEach(function (state) {
                _this.updateStateSteps(state);
            });
            this.showAddedStates();
            this.showRemovedStates();
        }
    };
    Game_Actor.prototype.updateStateSteps = function (state) {
        if (state.removeByWalking) {
            if (this._stateSteps[state.id] > 0) {
                if (--this._stateSteps[state.id] === 0) {
                    this.removeState(state.id);
                }
            }
        }
    };
    Game_Actor.prototype.showAddedStates = function () {
        var _this = this;
        this.result()
            .addedStateObjects()
            .forEach(function (state) {
            if (state.message1) {
                DataManager_1.$gameMessage.add(_this._name + state.message1);
            }
        });
    };
    Game_Actor.prototype.showRemovedStates = function () {
        var _this = this;
        this.result()
            .removedStateObjects()
            .forEach(function (state) {
            if (state.message4) {
                DataManager_1.$gameMessage.add(_this._name + state.message4);
            }
        });
    };
    Game_Actor.prototype.stepsForTurn = function () {
        return 20;
    };
    Game_Actor.prototype.turnEndOnMap = function () {
        if (DataManager_1.$gameParty.steps() % this.stepsForTurn() === 0) {
            this.onTurnEnd();
            if (this.result().hpDamage > 0) {
                this.performMapDamage();
            }
        }
    };
    Game_Actor.prototype.checkFloorEffect = function () {
        if (DataManager_1.$gamePlayer.isOnDamageFloor()) {
            this.executeFloorDamage();
        }
    };
    Game_Actor.prototype.executeFloorDamage = function () {
        var damage = Math.floor(this.basicFloorDamage() * this.fdr);
        damage = Math.min(damage, this.maxFloorDamage());
        this.gainHp(-damage);
        if (damage > 0) {
            this.performMapDamage();
        }
    };
    Game_Actor.prototype.basicFloorDamage = function () {
        return 10;
    };
    Game_Actor.prototype.maxFloorDamage = function () {
        return DataManager_1.$dataSystem.optFloorDeath ? this.hp : Math.max(this.hp - 1, 0);
    };
    Game_Actor.prototype.performMapDamage = function () {
        if (!DataManager_1.$gameParty.inBattle()) {
            DataManager_1.$gameScreen.startFlashForDamage();
        }
    };
    Game_Actor.prototype.clearActions = function () {
        GameBattler_1.Game_Battler.prototype.clearActions.call(this);
        this._actionInputIndex = 0;
    };
    Game_Actor.prototype.inputtingAction = function () {
        return this.action(this._actionInputIndex);
    };
    Game_Actor.prototype.selectNextCommand = function () {
        if (this._actionInputIndex < this.numActions() - 1) {
            this._actionInputIndex++;
            return true;
        }
        else {
            return false;
        }
    };
    Game_Actor.prototype.selectPreviousCommand = function () {
        if (this._actionInputIndex > 0) {
            this._actionInputIndex--;
            return true;
        }
        else {
            return false;
        }
    };
    Game_Actor.prototype.lastMenuSkill = function () {
        return this._lastMenuSkill.object();
    };
    Game_Actor.prototype.setLastMenuSkill = function (skill) {
        this._lastMenuSkill.setObject(skill);
    };
    Game_Actor.prototype.lastBattleSkill = function () {
        return this._lastBattleSkill.object();
    };
    Game_Actor.prototype.setLastBattleSkill = function (skill) {
        this._lastBattleSkill.setObject(skill);
    };
    Game_Actor.prototype.lastCommandSymbol = function () {
        return this._lastCommandSymbol;
    };
    Game_Actor.prototype.setLastCommandSymbol = function (symbol) {
        this._lastCommandSymbol = symbol;
    };
    Game_Actor.prototype.testEscape = function (item) {
        return item.effects.some(function (effect /* , index, ar*/) {
            return effect && effect.code === GameAction_1.Game_Action.EFFECT_SPECIAL;
        });
    };
    Game_Actor.prototype.meetsUsableItemConditions = function (item) {
        // TODO: BattleManager実装
        // if ($gameParty.inBattle() && BattleManager.canEscape() false && this.testEscape(item)) {
        // 	return false;
        // }
        // return Game_BattlerBase.prototype.meetsUsableItemConditions.call(this, item);
        return _super.prototype.meetsUsableItemConditions.call(this, item);
    };
    return Game_Actor;
}(GameBattler_1.Game_Battler));
exports.Game_Actor = Game_Actor;

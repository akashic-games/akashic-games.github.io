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
exports.Game_Party = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var GameItem_1 = require("./GameItem");
var GameUnit_1 = require("./GameUnit");
var Game_Party = /** @class */ (function (_super) {
    __extends(Game_Party, _super);
    function Game_Party() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Game_Party.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Game_Party.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._gold = 0;
        this._steps = 0;
        this._lastItem = new GameItem_1.Game_Item();
        this._menuActorId = 0;
        this._targetActorId = 0;
        this._actors = [];
        this.initAllItems();
    };
    Game_Party.prototype.initAllItems = function () {
        this._items = {};
        this._weapons = {};
        this._armors = {};
    };
    Game_Party.prototype.exists = function () {
        return this._actors.length > 0;
    };
    Game_Party.prototype.size = function () {
        return this.members().length;
    };
    Game_Party.prototype.isEmpty = function () {
        return this.size() === 0;
    };
    Game_Party.prototype.members = function () {
        return this.inBattle() ? this.battleMembers() : this.allMembers();
    };
    Game_Party.prototype.allMembers = function () {
        return this._actors.map(function (id) {
            return DataManager_1.$gameActors.actor(id);
        });
    };
    Game_Party.prototype.battleMembers = function () {
        return this.allMembers()
            .slice(0, this.maxBattleMembers())
            .filter(function (actor) {
            return actor.isAppeared();
        });
    };
    Game_Party.prototype.maxBattleMembers = function () {
        return 4;
    };
    Game_Party.prototype.leader = function () {
        return this.battleMembers()[0];
    };
    Game_Party.prototype.reviveBattleMembers = function () {
        this.battleMembers().forEach(function (actor) {
            if (actor.isDead()) {
                actor.setHp(1);
            }
        });
    };
    Game_Party.prototype.items = function () {
        var list = [];
        for (var id in this._items) {
            if (this._items.hasOwnProperty(id)) {
                list.push(DataManager_1.$dataItems[id]);
            }
        }
        return list;
    };
    Game_Party.prototype.weapons = function () {
        var list = [];
        for (var id in this._weapons) {
            if (this._weapons.hasOwnProperty(id)) {
                list.push(DataManager_1.$dataWeapons[id]);
            }
        }
        return list;
    };
    Game_Party.prototype.armors = function () {
        var list = [];
        for (var id in this._armors) {
            if (this._armors.hasOwnProperty(id)) {
                list.push(DataManager_1.$dataArmors[id]);
            }
        }
        return list;
    };
    Game_Party.prototype.equipItems = function () {
        return this.weapons().concat(this.armors());
    };
    Game_Party.prototype.allItems = function () {
        return this.items().concat(this.equipItems());
    };
    Game_Party.prototype.itemContainer = function (item) {
        if (!item) {
            return null;
        }
        else if (managers_1.DataManager.isItem(item)) {
            return this._items;
        }
        else if (managers_1.DataManager.isWeapon(item)) {
            return this._weapons;
        }
        else if (managers_1.DataManager.isArmor(item)) {
            return this._armors;
        }
        else {
            return null;
        }
    };
    Game_Party.prototype.setupStartingMembers = function () {
        var _this = this;
        this._actors = [];
        DataManager_1.$dataSystem.partyMembers.forEach(function (actorId) {
            if (DataManager_1.$gameActors.actor(actorId)) {
                _this._actors.push(actorId);
            }
        });
    };
    Game_Party.prototype.name = function () {
        var numBattleMembers = this.battleMembers().length;
        if (numBattleMembers === 0) {
            return "";
        }
        else if (numBattleMembers === 1) {
            return this.leader().name();
        }
        else {
            return core_1.Utils.format(managers_1.TextManager.partyName, this.leader().name());
        }
    };
    Game_Party.prototype.setupBattleTest = function () {
        this.setupBattleTestMembers();
        this.setupBattleTestItems();
    };
    Game_Party.prototype.setupBattleTestMembers = function () {
        var _this = this;
        DataManager_1.$dataSystem.testBattlers.forEach(function (battler) {
            var actor = DataManager_1.$gameActors.actor(battler.actorId);
            if (actor) {
                actor.changeLevel(battler.level, false);
                actor.initEquips(battler.equips);
                actor.recoverAll();
                _this.addActor(battler.actorId);
            }
        });
    };
    Game_Party.prototype.setupBattleTestItems = function () {
        var _this = this;
        DataManager_1.$dataItems.forEach(function (item) {
            if (item && item.name.length > 0) {
                _this.gainItem(item, _this.maxItems(item));
            }
        });
    };
    Game_Party.prototype.highestLevel = function () {
        return Math.max.apply(null, this.members().map(function (actor) {
            return actor.level;
        }));
    };
    Game_Party.prototype.addActor = function (actorId) {
        if ( /* !this._actors.contains(actorId)*/this._actors.indexOf(actorId) < 0) {
            this._actors.push(actorId);
            DataManager_1.$gamePlayer.refresh();
            DataManager_1.$gameMap.requestRefresh();
        }
    };
    Game_Party.prototype.removeActor = function (actorId) {
        if ( /* this._actors.contains(actorId)*/this._actors.indexOf(actorId) >= 0) {
            this._actors.splice(this._actors.indexOf(actorId), 1);
            DataManager_1.$gamePlayer.refresh();
            DataManager_1.$gameMap.requestRefresh();
        }
    };
    Game_Party.prototype.gold = function () {
        return this._gold;
    };
    Game_Party.prototype.gainGold = function (amount) {
        this._gold = core_1.Utils.clamp(0, Math.min(this._gold + amount), this.maxGold());
    };
    Game_Party.prototype.loseGold = function (amount) {
        this.gainGold(-amount);
    };
    Game_Party.prototype.maxGold = function () {
        return 99999999;
    };
    Game_Party.prototype.steps = function () {
        return this._steps;
    };
    Game_Party.prototype.increaseSteps = function () {
        this._steps++;
    };
    Game_Party.prototype.numItems = function (item) {
        var container = this.itemContainer(item);
        return container ? container[item.id] || 0 : 0;
    };
    Game_Party.prototype.maxItems = function (_item) {
        return 99;
    };
    Game_Party.prototype.hasMaxItems = function (item) {
        return this.numItems(item) >= this.maxItems(item);
    };
    Game_Party.prototype.hasItem = function (item, includeEquip) {
        if (includeEquip === undefined) {
            includeEquip = false;
        }
        if (this.numItems(item) > 0) {
            return true;
        }
        else if (includeEquip && this.isAnyMemberEquipped(item)) {
            return true;
        }
        else {
            return false;
        }
    };
    Game_Party.prototype.isAnyMemberEquipped = function (item) {
        return this.members().some(function (actor) {
            return core_1.Utils.contains(actor.equips(), item);
        });
    };
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        var container = this.itemContainer(item);
        if (container) {
            var lastNumber = this.numItems(item);
            var newNumber = lastNumber + amount;
            container[item.id] = core_1.Utils.clamp(newNumber, 0, this.maxItems(item));
            if (container[item.id] === 0) {
                delete container[item.id];
            }
            if (includeEquip && newNumber < 0) {
                this.discardMembersEquip(item, -newNumber);
            }
            DataManager_1.$gameMap.requestRefresh();
        }
    };
    Game_Party.prototype.discardMembersEquip = function (item, amount) {
        var n = amount;
        this.members().forEach(function (actor) {
            while (n > 0 && actor.isEquipped(item)) {
                actor.discardEquip(item);
                n--;
            }
        });
    };
    Game_Party.prototype.loseItem = function (item, amount, includeEquip) {
        this.gainItem(item, -amount, includeEquip);
    };
    Game_Party.prototype.consumeItem = function (item) {
        if (managers_1.DataManager.isItem(item) && item.consumable) {
            this.loseItem(item, 1);
        }
    };
    Game_Party.prototype.canUse = function (item) {
        return this.members().some(function (actor) {
            return actor.canUse(item);
        });
    };
    Game_Party.prototype.canInput = function () {
        return this.members().some(function (actor) {
            return actor.canInput();
        });
    };
    Game_Party.prototype.isAllDead = function () {
        if ( /* Game_Unit.prototype.isAllDead.call(this)*/_super.prototype.isAllDead.call(this)) {
            return this.inBattle() || !this.isEmpty();
        }
        else {
            return false;
        }
    };
    Game_Party.prototype.onPlayerWalk = function () {
        this.members().forEach(function (actor) {
            return actor.onPlayerWalk();
        });
    };
    Game_Party.prototype.menuActor = function () {
        var actor = DataManager_1.$gameActors.actor(this._menuActorId);
        if ( /* !this.members().contains(actor)*/this.members().indexOf(actor) < 0) {
            actor = this.members()[0];
        }
        return actor;
    };
    Game_Party.prototype.setMenuActor = function (actor) {
        this._menuActorId = actor.actorId();
    };
    Game_Party.prototype.makeMenuActorNext = function () {
        var index = this.members().indexOf(this.menuActor());
        if (index >= 0) {
            index = (index + 1) % this.members().length;
            this.setMenuActor(this.members()[index]);
        }
        else {
            this.setMenuActor(this.members()[0]);
        }
    };
    Game_Party.prototype.makeMenuActorPrevious = function () {
        var index = this.members().indexOf(this.menuActor());
        if (index >= 0) {
            index = (index + this.members().length - 1) % this.members().length;
            this.setMenuActor(this.members()[index]);
        }
        else {
            this.setMenuActor(this.members()[0]);
        }
    };
    Game_Party.prototype.targetActor = function () {
        var actor = DataManager_1.$gameActors.actor(this._targetActorId);
        if ( /* !this.members().contains(actor)*/this.members().indexOf(actor) < 0) {
            actor = this.members()[0];
        }
        return actor;
    };
    Game_Party.prototype.setTargetActor = function (actor) {
        this._targetActorId = actor.actorId();
    };
    Game_Party.prototype.lastItem = function () {
        return this._lastItem.object();
    };
    Game_Party.prototype.setLastItem = function (item) {
        this._lastItem.setObject(item);
    };
    Game_Party.prototype.swapOrder = function (index1, index2) {
        var temp = this._actors[index1];
        this._actors[index1] = this._actors[index2];
        this._actors[index2] = temp;
        DataManager_1.$gamePlayer.refresh();
    };
    Game_Party.prototype.charactersForSavefile = function () {
        return this.battleMembers().map(function (actor) {
            return [actor.characterName(), actor.characterIndex()];
        });
    };
    Game_Party.prototype.facesForSavefile = function () {
        return this.battleMembers().map(function (actor) {
            return [actor.faceName(), actor.faceIndex()];
        });
    };
    Game_Party.prototype.partyAbility = function (abilityId) {
        return this.battleMembers().some(function (actor) {
            return actor.partyAbility(abilityId);
        });
    };
    Game_Party.prototype.hasEncounterHalf = function () {
        return this.partyAbility(Game_Party.ABILITY_ENCOUNTER_HALF);
    };
    Game_Party.prototype.hasEncounterNone = function () {
        return this.partyAbility(Game_Party.ABILITY_ENCOUNTER_NONE);
    };
    Game_Party.prototype.hasCancelSurprise = function () {
        return this.partyAbility(Game_Party.ABILITY_CANCEL_SURPRISE);
    };
    Game_Party.prototype.hasRaisePreemptive = function () {
        return this.partyAbility(Game_Party.ABILITY_RAISE_PREEMPTIVE);
    };
    Game_Party.prototype.hasGoldDouble = function () {
        return this.partyAbility(Game_Party.ABILITY_GOLD_DOUBLE);
    };
    Game_Party.prototype.hasDropItemDouble = function () {
        return this.partyAbility(Game_Party.ABILITY_DROP_ITEM_DOUBLE);
    };
    Game_Party.prototype.ratePreemptive = function (troopAgi) {
        var rate = this.agility() >= troopAgi ? 0.05 : 0.03;
        if (this.hasRaisePreemptive()) {
            rate *= 4;
        }
        return rate;
    };
    Game_Party.prototype.rateSurprise = function (troopAgi) {
        var rate = this.agility() >= troopAgi ? 0.03 : 0.05;
        if (this.hasCancelSurprise()) {
            rate = 0;
        }
        return rate;
    };
    Game_Party.prototype.performVictory = function () {
        this.members().forEach(function (actor) {
            actor.performVictory();
        });
    };
    Game_Party.prototype.performEscape = function () {
        this.members().forEach(function (actor) {
            actor.performEscape();
        });
    };
    Game_Party.prototype.removeBattleStates = function () {
        this.members().forEach(function (actor) {
            actor.removeBattleStates();
        });
    };
    Game_Party.prototype.requestMotionRefresh = function () {
        this.members().forEach(function (actor) {
            actor.requestMotionRefresh();
        });
    };
    Game_Party.ABILITY_ENCOUNTER_HALF = 0;
    Game_Party.ABILITY_ENCOUNTER_NONE = 1;
    Game_Party.ABILITY_CANCEL_SURPRISE = 2;
    Game_Party.ABILITY_RAISE_PREEMPTIVE = 3;
    Game_Party.ABILITY_GOLD_DOUBLE = 4;
    Game_Party.ABILITY_DROP_ITEM_DOUBLE = 5;
    return Game_Party;
}(GameUnit_1.Game_Unit));
exports.Game_Party = Game_Party;

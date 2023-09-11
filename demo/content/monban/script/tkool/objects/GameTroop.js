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
exports.Game_Troop = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var GameEnemy_1 = require("./GameEnemy");
var GameInterpreter_1 = require("./GameInterpreter");
var GameUnit_1 = require("./GameUnit");
var Game_Troop = /** @class */ (function (_super) {
    __extends(Game_Troop, _super);
    function Game_Troop() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Game_Troop.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Game_Troop.prototype.initialize = function () {
        GameUnit_1.Game_Unit.prototype.initialize.call(this);
        this._interpreter = new GameInterpreter_1.Game_Interpreter();
        this.clear();
    };
    Game_Troop.prototype.isEventRunning = function () {
        return this._interpreter.isRunning();
    };
    Game_Troop.prototype.updateInterpreter = function () {
        this._interpreter.update();
    };
    Game_Troop.prototype.turnCount = function () {
        return this._turnCount;
    };
    Game_Troop.prototype.members = function () {
        return this._enemies;
    };
    Game_Troop.prototype.clear = function () {
        this._interpreter.clear();
        this._troopId = 0;
        this._eventFlags = {};
        this._enemies = [];
        this._turnCount = 0;
        this._namesCount = {};
    };
    Game_Troop.prototype.troop = function () {
        return DataManager_1.$dataTroops[this._troopId];
    };
    Game_Troop.prototype.setup = function (troopId) {
        var _this = this;
        this.clear();
        this._troopId = troopId;
        this._enemies = [];
        this.troop().members.forEach(function (member) {
            if (DataManager_1.$dataEnemies[member.enemyId]) {
                var enemyId = member.enemyId;
                var x = member.x;
                var y = member.y;
                var enemy = new GameEnemy_1.Game_Enemy(enemyId, x, y);
                if (member.hidden) {
                    enemy.hide();
                }
                _this._enemies.push(enemy);
            }
        });
        this.makeUniqueNames();
    };
    Game_Troop.prototype.makeUniqueNames = function () {
        var _this = this;
        var table = this.letterTable();
        this.members().forEach(function (enemy) {
            if (enemy.isAlive() && enemy.isLetterEmpty()) {
                var name = enemy.originalName();
                var n = _this._namesCount[name] || 0;
                enemy.setLetter(table[n % table.length]);
                _this._namesCount[name] = n + 1;
            }
        });
        this.members().forEach(function (enemy) {
            var name = enemy.originalName();
            if (_this._namesCount[name] >= 2) {
                enemy.setPlural(true);
            }
        });
    };
    Game_Troop.prototype.letterTable = function () {
        return DataManager_1.$gameSystem.isCJK() ? Game_Troop.LETTER_TABLE_FULL : Game_Troop.LETTER_TABLE_HALF;
    };
    Game_Troop.prototype.enemyNames = function () {
        var names = [];
        this.members().forEach(function (enemy) {
            var name = enemy.originalName();
            if (enemy.isAlive() && !core_1.Utils.contains(names, name)) {
                names.push(name);
            }
        });
        return names;
    };
    Game_Troop.prototype.meetsConditions = function (page) {
        var c = page.conditions;
        if (!c.turnEnding && !c.turnValid && !c.enemyValid && !c.actorValid && !c.switchValid) {
            return false; // Conditions not set
        }
        if (c.turnEnding) {
            if (!managers_1.BattleManager.isTurnEnd()) {
                return false;
            }
        }
        if (c.turnValid) {
            var n = this._turnCount;
            var a = c.turnA;
            var b = c.turnB;
            if (b === 0 && n !== a) {
                return false;
            }
            if (b > 0 && (n < 1 || n < a || n % b !== a % b)) {
                return false;
            }
        }
        if (c.enemyValid) {
            var enemy = DataManager_1.$gameTroop.members()[c.enemyIndex];
            if (!enemy || enemy.hpRate() * 100 > c.enemyHp) {
                return false;
            }
        }
        if (c.actorValid) {
            var actor = DataManager_1.$gameActors.actor(c.actorId);
            if (!actor || actor.hpRate() * 100 > c.actorHp) {
                return false;
            }
        }
        if (c.switchValid) {
            if (!DataManager_1.$gameSwitches.value(c.switchId)) {
                return false;
            }
        }
        return true;
    };
    Game_Troop.prototype.setupBattleEvent = function () {
        if (!this._interpreter.isRunning()) {
            if (this._interpreter.setupReservedCommonEvent()) {
                return;
            }
            var pages = this.troop().pages;
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (this.meetsConditions(page) && !this._eventFlags[i]) {
                    this._interpreter.setup(page.list);
                    if (page.span <= 1) {
                        this._eventFlags[i] = true;
                    }
                    break;
                }
            }
        }
    };
    Game_Troop.prototype.increaseTurn = function () {
        var pages = this.troop().pages;
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page.span === 1) {
                this._eventFlags[i] = false;
            }
        }
        this._turnCount++;
    };
    // Game_Troop のメンバは必ず Enemy 。
    // キャストの手間をなくすため。 ex) expTotal()
    Game_Troop.prototype.deadMembers = function () {
        return _super.prototype.deadMembers.call(this);
    };
    Game_Troop.prototype.expTotal = function () {
        return this.deadMembers().reduce(function (r, enemy) {
            return r + enemy.exp();
        }, 0);
    };
    Game_Troop.prototype.goldTotal = function () {
        return (this.deadMembers().reduce(function (r, enemy) {
            return r + enemy.gold();
        }, 0) * this.goldRate());
    };
    Game_Troop.prototype.goldRate = function () {
        return DataManager_1.$gameParty.hasGoldDouble() ? 2 : 1;
    };
    Game_Troop.prototype.makeDropItems = function () {
        return this.deadMembers().reduce(function (r, enemy) {
            return r.concat(enemy.makeDropItems());
        }, []);
    };
    Game_Troop.LETTER_TABLE_HALF = [
        " A",
        " B",
        " C",
        " D",
        " E",
        " F",
        " G",
        " H",
        " I",
        " J",
        " K",
        " L",
        " M",
        " N",
        " O",
        " P",
        " Q",
        " R",
        " S",
        " T",
        " U",
        " V",
        " W",
        " X",
        " Y",
        " Z"
    ];
    Game_Troop.LETTER_TABLE_FULL = [
        "Ａ",
        "Ｂ",
        "Ｃ",
        "Ｄ",
        "Ｅ",
        "Ｆ",
        "Ｇ",
        "Ｈ",
        "Ｉ",
        "Ｊ",
        "Ｋ",
        "Ｌ",
        "Ｍ",
        "Ｎ",
        "Ｏ",
        "Ｐ",
        "Ｑ",
        "Ｒ",
        "Ｓ",
        "Ｔ",
        "Ｕ",
        "Ｖ",
        "Ｗ",
        "Ｘ",
        "Ｙ",
        "Ｚ"
    ];
    return Game_Troop;
}(GameUnit_1.Game_Unit));
exports.Game_Troop = Game_Troop;

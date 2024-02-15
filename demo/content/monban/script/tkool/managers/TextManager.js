"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextManager = void 0;
var DataManager_1 = require("./DataManager");
var TextManager = /** @class */ (function () {
    function TextManager() {
    }
    TextManager.basic = function (basicId) {
        return DataManager_1.$dataSystem.terms.basic[basicId] || "";
    };
    TextManager.param = function (paramId) {
        return DataManager_1.$dataSystem.terms.params[paramId] || "";
    };
    TextManager.command = function (commandId) {
        return DataManager_1.$dataSystem.terms.commands[commandId] || "";
    };
    TextManager.message = function (messageId) {
        return DataManager_1.$dataSystem.terms.messages[messageId] || "";
    };
    Object.defineProperty(TextManager, "currencyUnit", {
        get: function () {
            return DataManager_1.$dataSystem.currencyUnit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "level", {
        get: function () {
            return this.basic(0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "levelA", {
        get: function () {
            return this.basic(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "hp", {
        get: function () {
            return this.basic(2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "hpA", {
        get: function () {
            return this.basic(3);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "mp", {
        get: function () {
            return this.basic(4);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "mpA", {
        get: function () {
            return this.basic(5);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "tp", {
        get: function () {
            return this.basic(6);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "tpA", {
        get: function () {
            return this.basic(7);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "exp", {
        get: function () {
            return this.basic(8);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "expA", {
        get: function () {
            return this.basic(9);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "fight", {
        get: function () {
            return this.command(0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "escape", {
        get: function () {
            return this.command(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "attack", {
        get: function () {
            return this.command(2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "guard", {
        get: function () {
            return this.command(3);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "item", {
        get: function () {
            return this.command(4);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "skill", {
        get: function () {
            return this.command(5);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "equip", {
        get: function () {
            return this.command(6);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "status", {
        get: function () {
            return this.command(7);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "formation", {
        get: function () {
            return this.command(8);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "save", {
        get: function () {
            return this.command(9);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "gameEnd", {
        get: function () {
            return this.command(10);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "options", {
        get: function () {
            return this.command(11);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "weapon", {
        get: function () {
            return this.command(12);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "armor", {
        get: function () {
            return this.command(13);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "keyItem", {
        get: function () {
            return this.command(14);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "equip2", {
        get: function () {
            return this.command(15);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "optimize", {
        get: function () {
            return this.command(16);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "clear", {
        get: function () {
            return this.command(17);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "newGame", {
        get: function () {
            return this.command(18);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "continue_", {
        get: function () {
            return this.command(19);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "toTitle", {
        get: function () {
            return this.command(21);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "cancel", {
        get: function () {
            return this.command(22);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "buy", {
        get: function () {
            return this.command(24);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "sell", {
        get: function () {
            return this.command(25);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "alwaysDash", {
        get: function () {
            return this.message("alwaysDash");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "commandRemember", {
        get: function () {
            return this.message("commandRemember");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "bgmVolume", {
        get: function () {
            return this.message("bgmVolume");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "bgsVolume", {
        get: function () {
            return this.message("bgsVolume");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "meVolume", {
        get: function () {
            return this.message("meVolume");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "seVolume", {
        get: function () {
            return this.message("seVolume");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "possession", {
        get: function () {
            return this.message("possession");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "expTotal", {
        get: function () {
            return this.message("expTotal");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "expNext", {
        get: function () {
            return this.message("expNext");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "saveMessage", {
        get: function () {
            return this.message("saveMessage");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "loadMessage", {
        get: function () {
            return this.message("loadMessage");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "file", {
        get: function () {
            return this.message("file");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "partyName", {
        get: function () {
            return this.message("partyName");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "emerge", {
        get: function () {
            return this.message("emerge");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "preemptive", {
        get: function () {
            return this.message("preemptive");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "surprise", {
        get: function () {
            return this.message("surprise");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "escapeStart", {
        get: function () {
            return this.message("escapeStart");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "escapeFailure", {
        get: function () {
            return this.message("escapeFailure");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "victory", {
        get: function () {
            return this.message("victory");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "defeat", {
        get: function () {
            return this.message("defeat");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "obtainExp", {
        get: function () {
            return this.message("obtainExp");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "obtainGold", {
        get: function () {
            return this.message("obtainGold");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "obtainItem", {
        get: function () {
            return this.message("obtainItem");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "levelUp", {
        get: function () {
            return this.message("levelUp");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "obtainSkill", {
        get: function () {
            return this.message("obtainSkill");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "useItem", {
        get: function () {
            return this.message("useItem");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "criticalToEnemy", {
        get: function () {
            return this.message("criticalToEnemy");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "criticalToActor", {
        get: function () {
            return this.message("criticalToActor");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "actorDamage", {
        get: function () {
            return this.message("actorDamage");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "actorRecovery", {
        get: function () {
            return this.message("actorRecovery");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "actorGain", {
        get: function () {
            return this.message("actorGain");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "actorLoss", {
        get: function () {
            return this.message("actorLoss");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "actorDrain", {
        get: function () {
            return this.message("actorDrain");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "actorNoDamage", {
        get: function () {
            return this.message("actorNoDamage");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "actorNoHit", {
        get: function () {
            return this.message("actorNoHit");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "enemyDamage", {
        get: function () {
            return this.message("enemyDamage");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "enemyRecovery", {
        get: function () {
            return this.message("enemyRecovery");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "enemyGain", {
        get: function () {
            return this.message("enemyGain");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "enemyLoss", {
        get: function () {
            return this.message("enemyLoss");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "enemyDrain", {
        get: function () {
            return this.message("enemyDrain");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "enemyNoDamage", {
        get: function () {
            return this.message("enemyNoDamage");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "enemyNoHit", {
        get: function () {
            return this.message("enemyNoHit");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "evasion", {
        get: function () {
            return this.message("evasion");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "magicEvasion", {
        get: function () {
            return this.message("magicEvasion");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "magicReflection", {
        get: function () {
            return this.message("magicReflection");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "counterAttack", {
        get: function () {
            return this.message("counterAttack");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "substitute", {
        get: function () {
            return this.message("substitute");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "buffAdd", {
        get: function () {
            return this.message("buffAdd");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "debuffAdd", {
        get: function () {
            return this.message("debuffAdd");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "buffRemove", {
        get: function () {
            return this.message("buffRemove");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextManager, "actionFailure", {
        get: function () {
            return this.message("actionFailure");
        },
        enumerable: false,
        configurable: true
    });
    return TextManager;
}());
exports.TextManager = TextManager;

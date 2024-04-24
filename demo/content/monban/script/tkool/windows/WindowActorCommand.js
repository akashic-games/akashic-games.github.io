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
exports.Window_ActorCommand = void 0;
var Graphics_1 = require("../core/Graphics");
var globals_1 = require("../managers/globals");
var TextManager_1 = require("../managers/TextManager");
var WindowCommand_1 = require("./WindowCommand");
var Window_ActorCommand = /** @class */ (function (_super) {
    __extends(Window_ActorCommand, _super);
    function Window_ActorCommand() {
        return _super.call(this) || this;
    }
    Window_ActorCommand.prototype.initialize = function () {
        var y = Graphics_1.Graphics.boxHeight - this.windowHeight();
        _super.prototype.initialize.call(this, 0, y);
        this.openness = 0;
        this.deactivate();
        this._actor = null;
    };
    Window_ActorCommand.prototype.windowWidth = function () {
        return 192;
    };
    Window_ActorCommand.prototype.numVisibleRows = function () {
        return 4;
    };
    Window_ActorCommand.prototype.makeCommandList = function () {
        if (this._actor) {
            this.addAttackCommand();
            this.addSkillCommands();
            this.addGuardCommand();
            this.addItemCommand();
        }
    };
    Window_ActorCommand.prototype.addAttackCommand = function () {
        this.addCommand(TextManager_1.TextManager.attack, "attack", this._actor.canAttack());
    };
    Window_ActorCommand.prototype.addSkillCommands = function () {
        var _this = this;
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function (a, b) {
            return a - b;
        });
        skillTypes.forEach(function (stypeId) {
            var name = globals_1.$dataSystem.skillTypes[stypeId];
            _this.addCommand(name, "skill", true, stypeId);
        });
    };
    Window_ActorCommand.prototype.addGuardCommand = function () {
        this.addCommand(TextManager_1.TextManager.guard, "guard", this._actor.canGuard());
    };
    Window_ActorCommand.prototype.addItemCommand = function () {
        this.addCommand(TextManager_1.TextManager.item, "item");
    };
    Window_ActorCommand.prototype.setup = function (actor) {
        this._actor = actor;
        this.clearCommandList();
        this.makeCommandList();
        this.refresh();
        this.selectLast();
        this.activate();
        this.open();
    };
    Window_ActorCommand.prototype.processOk = function () {
        if (this._actor) {
            // TODO: impl
            // if (ConfigManager.commandRemember) {
            // 	this._actor.setLastCommandSymbol(this.currentSymbol());
            // } else {
            // 	this._actor.setLastCommandSymbol("");
            // }
            // とりあえず設定を見ずにこの処理に回す
            this._actor.setLastCommandSymbol("");
        }
        WindowCommand_1.Window_Command.prototype.processOk.call(this);
    };
    Window_ActorCommand.prototype.selectLast = function () {
        this.select(0);
        // TODO: impl
        // if (this._actor && ConfigManager.commandRemember) {
        // 	const symbol = this._actor.lastCommandSymbol();
        // 	this.selectSymbol(symbol);
        // 	if (symbol === "skill") {
        // 		const skill = this._actor.lastBattleSkill();
        // 		if (skill) {
        // 			this.selectExt(skill.stypeId);
        // 		}
        // 	}
        // }
    };
    return Window_ActorCommand;
}(WindowCommand_1.Window_Command));
exports.Window_ActorCommand = Window_ActorCommand;

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
exports.Window_MenuCommand = void 0;
var DataManager_1 = require("../managers/DataManager");
var globals_1 = require("../managers/globals");
var TextManager_1 = require("../managers/TextManager");
var WindowCommand_1 = require("./WindowCommand");
var Window_MenuCommand = /** @class */ (function (_super) {
    __extends(Window_MenuCommand, _super);
    function Window_MenuCommand() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Window_MenuCommand.initCommandPosition = function () {
        this._lastCommandSymbol = null;
    };
    Window_MenuCommand.prototype.initialize = function (x, y) {
        _super.prototype.initialize.call(this, x, y);
        this.selectLast();
    };
    Window_MenuCommand.prototype.windowWidth = function () {
        return 240;
    };
    Window_MenuCommand.prototype.numVisibleRows = function () {
        return this.maxItems();
    };
    Window_MenuCommand.prototype.makeCommandList = function () {
        this.addMainCommands();
        this.addFormationCommand();
        this.addOriginalCommands();
        // オプション機能とセーブ機能は非サポート要件なので、コメントアウト
        // this.addOptionsCommand();
        // this.addSaveCommand();
        this.addGameEndCommand();
    };
    Window_MenuCommand.prototype.addMainCommands = function () {
        var enabled = this.areMainCommandsEnabled();
        if (this.needsCommand("item")) {
            this.addCommand(TextManager_1.TextManager.item, "item", enabled);
        }
        if (this.needsCommand("skill")) {
            this.addCommand(TextManager_1.TextManager.skill, "skill", enabled);
        }
        if (this.needsCommand("equip")) {
            this.addCommand(TextManager_1.TextManager.equip, "equip", enabled);
        }
        if (this.needsCommand("status")) {
            this.addCommand(TextManager_1.TextManager.status, "status", enabled);
        }
    };
    Window_MenuCommand.prototype.addFormationCommand = function () {
        if (this.needsCommand("formation")) {
            var enabled = this.isFormationEnabled();
            this.addCommand(TextManager_1.TextManager.formation, "formation", enabled);
        }
    };
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        //
    };
    // オプション機能は非サポート要件なので、コメントアウト
    // addOptionsCommand() {
    // 	if (this.needsCommand("options")) {
    // 		const enabled = this.isOptionsEnabled();
    // 		this.addCommand(TextManager.options, "options", enabled);
    // 	}
    // }
    // セーブ機能は非サポート要件なので、コメントアウト
    // addSaveCommand() {
    // 	if (this.needsCommand("save")) {
    // 		const enabled = this.isSaveEnabled();
    // 		this.addCommand(TextManager.save, "save", enabled);
    // 	}
    // }
    Window_MenuCommand.prototype.addGameEndCommand = function () {
        var enabled = this.isGameEndEnabled();
        this.addCommand(TextManager_1.TextManager.gameEnd, "gameEnd", enabled);
    };
    Window_MenuCommand.prototype.needsCommand = function (name) {
        var flags = globals_1.$dataSystem.menuCommands;
        if (flags) {
            switch (name) {
                case "item":
                    return flags[0];
                case "skill":
                    return flags[1];
                case "equip":
                    return flags[2];
                case "status":
                    return flags[3];
                case "formation":
                    return flags[4];
                case "save":
                    return flags[5];
            }
        }
        return true;
    };
    Window_MenuCommand.prototype.areMainCommandsEnabled = function () {
        return globals_1.$gameParty.exists();
    };
    Window_MenuCommand.prototype.isFormationEnabled = function () {
        return globals_1.$gameParty.size() >= 2 && globals_1.$gameSystem.isFormationEnabled();
    };
    Window_MenuCommand.prototype.isOptionsEnabled = function () {
        return true;
    };
    Window_MenuCommand.prototype.isSaveEnabled = function () {
        return !DataManager_1.DataManager.isEventTest() && globals_1.$gameSystem.isSaveEnabled();
    };
    Window_MenuCommand.prototype.isGameEndEnabled = function () {
        return true;
    };
    Window_MenuCommand.prototype.processOk = function () {
        Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
        WindowCommand_1.Window_Command.prototype.processOk.call(this);
    };
    Window_MenuCommand.prototype.selectLast = function () {
        this.selectSymbol(Window_MenuCommand._lastCommandSymbol);
    };
    Window_MenuCommand._lastCommandSymbol = null;
    return Window_MenuCommand;
}(WindowCommand_1.Window_Command));
exports.Window_MenuCommand = Window_MenuCommand;

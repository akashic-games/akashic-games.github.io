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
exports.Window_PartyCommand = void 0;
var Graphics_1 = require("../core/Graphics");
var BattleManager_1 = require("../managers/BattleManager");
var TextManager_1 = require("../managers/TextManager");
var WindowCommand_1 = require("./WindowCommand");
var Window_PartyCommand = /** @class */ (function (_super) {
    __extends(Window_PartyCommand, _super);
    function Window_PartyCommand() {
        return _super.call(this) || this;
    }
    Window_PartyCommand.prototype.initialize = function () {
        var y = Graphics_1.Graphics.boxHeight - this.windowHeight();
        _super.prototype.initialize.call(this, 0, y);
        this.openness = 0;
        this.deactivate();
    };
    Window_PartyCommand.prototype.windowWidth = function () {
        return 192;
    };
    Window_PartyCommand.prototype.numVisibleRows = function () {
        return 4;
    };
    Window_PartyCommand.prototype.makeCommandList = function () {
        this.addCommand(TextManager_1.TextManager.fight, "fight");
        this.addCommand(TextManager_1.TextManager.escape, "escape", BattleManager_1.BattleManager.canEscape());
    };
    Window_PartyCommand.prototype.setup = function () {
        this.clearCommandList();
        this.makeCommandList();
        this.refresh();
        this.select(0);
        this.activate();
        this.open();
    };
    return Window_PartyCommand;
}(WindowCommand_1.Window_Command));
exports.Window_PartyCommand = Window_PartyCommand;

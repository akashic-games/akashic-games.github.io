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
exports.Window_TitleCommand = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var WindowCommand_1 = require("./WindowCommand");
var Window_TitleCommand = /** @class */ (function (_super) {
    __extends(Window_TitleCommand, _super);
    function Window_TitleCommand() {
        return _super.call(this) || this;
        // if (Object.getPrototypeOf(this) === Window_TitleCommand.prototype) {
        // 	this.initialize(this.x, this.y);
        // }
    }
    Window_TitleCommand.initCommandPosition = function () {
        this._lastCommandSymbol = null;
    };
    Window_TitleCommand.prototype.initialize = function () {
        _super.prototype.initialize.call(this, 0, 0);
        this.updatePlacement();
        this.openness = 0;
        this.selectLast();
    };
    Window_TitleCommand.prototype.windowWidth = function () {
        return 240;
    };
    Window_TitleCommand.prototype.updatePlacement = function () {
        this.x = (core_1.Graphics.boxWidth - this.width) / 2;
        this.y = core_1.Graphics.boxHeight - this.height - 96;
    };
    Window_TitleCommand.prototype.makeCommandList = function () {
        this.addCommand(managers_1.TextManager.newGame, "newGame");
        this.addCommand(managers_1.TextManager.continue_, "continue", this.isContinueEnabled());
        this.addCommand(managers_1.TextManager.options, "options", false); // TODO: オプション機能未実装のため選択不可とするが、実装したら false を外す
    };
    Window_TitleCommand.prototype.isContinueEnabled = function () {
        return managers_1.DataManager.isAnySavefileExists();
    };
    Window_TitleCommand.prototype.processOk = function () {
        Window_TitleCommand._lastCommandSymbol = this.currentSymbol();
        _super.prototype.processOk.call(this);
    };
    Window_TitleCommand.prototype.selectLast = function () {
        if (Window_TitleCommand._lastCommandSymbol) {
            this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
        }
        else if (this.isContinueEnabled()) {
            this.selectSymbol("continue");
        }
    };
    Window_TitleCommand._lastCommandSymbol = null;
    return Window_TitleCommand;
}(WindowCommand_1.Window_Command));
exports.Window_TitleCommand = Window_TitleCommand;

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
exports.Window_Options = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var WindowCommand_1 = require("./WindowCommand");
var Window_Options = /** @class */ (function (_super) {
    __extends(Window_Options, _super);
    function Window_Options() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Window_Options.prototype.initialize = function () {
        _super.prototype.initialize.call(this, 0, 0);
        this.updatePlacement();
    };
    Window_Options.prototype.windowWidth = function () {
        return 400;
    };
    Window_Options.prototype.windowHeight = function () {
        return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
    };
    Window_Options.prototype.updatePlacement = function () {
        this.x = (core_1.Graphics.boxWidth - this.width) / 2;
        this.y = (core_1.Graphics.boxHeight - this.height) / 2;
    };
    Window_Options.prototype.makeCommandList = function () {
        this.addGeneralOptions();
        this.addVolumeOptions();
    };
    Window_Options.prototype.addGeneralOptions = function () {
        this.addCommand(managers_1.TextManager.alwaysDash, "alwaysDash");
        this.addCommand(managers_1.TextManager.commandRemember, "commandRemember");
    };
    Window_Options.prototype.addVolumeOptions = function () {
        this.addCommand(managers_1.TextManager.bgmVolume, "bgmVolume");
        this.addCommand(managers_1.TextManager.bgsVolume, "bgsVolume");
        this.addCommand(managers_1.TextManager.meVolume, "meVolume");
        this.addCommand(managers_1.TextManager.seVolume, "seVolume");
    };
    Window_Options.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var statusWidth = this.statusWidth();
        var titleWidth = rect.width - statusWidth;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, "left");
        this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, "right");
    };
    Window_Options.prototype.statusWidth = function () {
        return 120;
    };
    Window_Options.prototype.statusText = function (index) {
        var symbol = this.commandSymbol(index);
        var value = this.getConfigValue(symbol);
        if (this.isVolumeSymbol(symbol)) {
            return this.volumeStatusText(value);
        }
        else {
            return this.booleanStatusText(value);
        }
    };
    Window_Options.prototype.isVolumeSymbol = function (symbol) {
        return symbol.indexOf("Volume") !== -1;
    };
    Window_Options.prototype.booleanStatusText = function (value) {
        return value ? "ON" : "OFF";
    };
    Window_Options.prototype.volumeStatusText = function (value) {
        return value + "%";
    };
    Window_Options.prototype.processOk = function () {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        var value = this.getConfigValue(symbol);
        if (this.isVolumeSymbol(symbol)) {
            value += this.volumeOffset();
            if (value > 100) {
                value = 0;
            }
            value = value.clamp(0, 100);
            this.changeValue(symbol, value);
        }
        else {
            this.changeValue(symbol, !value);
        }
    };
    Window_Options.prototype.cursorRight = function (_wrap) {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        var value = this.getConfigValue(symbol);
        if (this.isVolumeSymbol(symbol)) {
            value += this.volumeOffset();
            value = value.clamp(0, 100);
            this.changeValue(symbol, value);
        }
        else {
            this.changeValue(symbol, true);
        }
    };
    Window_Options.prototype.cursorLeft = function (_wrap) {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        var value = this.getConfigValue(symbol);
        if (this.isVolumeSymbol(symbol)) {
            value -= this.volumeOffset();
            value = value.clamp(0, 100);
            this.changeValue(symbol, value);
        }
        else {
            this.changeValue(symbol, false);
        }
    };
    Window_Options.prototype.volumeOffset = function () {
        return 20;
    };
    Window_Options.prototype.changeValue = function (symbol, value) {
        var lastValue = this.getConfigValue(symbol);
        if (lastValue !== value) {
            this.setConfigValue(symbol, value);
            this.redrawItem(this.findSymbol(symbol));
            managers_1.SoundManager.playCursor();
        }
    };
    Window_Options.prototype.getConfigValue = function (_symbol) {
        // オプション設定を保存する手段がないためConfigManagerは未実装なので、一旦0だけ返す
        // return ConfigManager[symbol];
        return 0;
    };
    Window_Options.prototype.setConfigValue = function (_symbol, _volume) {
        // オプション設定を保存する手段がないためConfigManagerは未実装なので、コメントアウト
        // ConfigManager[symbol] = volume;
    };
    return Window_Options;
}(WindowCommand_1.Window_Command));
exports.Window_Options = Window_Options;

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
exports.Window_ChoiceList = void 0;
var Graphics_1 = require("../core/Graphics");
var globals_1 = require("../managers/globals");
var WindowCommand_1 = require("./WindowCommand");
var Window_ChoiceList = /** @class */ (function (_super) {
    __extends(Window_ChoiceList, _super);
    function Window_ChoiceList(messageWindow) {
        return _super.call(this, messageWindow) || this;
    }
    Window_ChoiceList.prototype.initialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._messageWindow = args[0];
        _super.prototype.initialize.call(this, 0, 0);
        this.openness = 0;
        this.deactivate();
        this._background = 0;
    };
    Window_ChoiceList.prototype.start = function () {
        this.updatePlacement();
        this.updateBackground();
        this.refresh();
        this.selectDefault();
        this.open();
        this.activate();
    };
    Window_ChoiceList.prototype.selectDefault = function () {
        this.select(globals_1.$gameMessage.choiceDefaultType());
    };
    Window_ChoiceList.prototype.updatePlacement = function () {
        var positionType = globals_1.$gameMessage.choicePositionType();
        var messageY = this._messageWindow.y;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        switch (positionType) {
            case 0:
                this.x = 0;
                break;
            case 1:
                this.x = (Graphics_1.Graphics.boxWidth - this.width) / 2;
                break;
            case 2:
                this.x = Graphics_1.Graphics.boxWidth - this.width;
                break;
        }
        if (messageY >= Graphics_1.Graphics.boxHeight / 2) {
            this.y = messageY - this.height;
        }
        else {
            this.y = messageY + this._messageWindow.height;
        }
    };
    Window_ChoiceList.prototype.updateBackground = function () {
        this._background = globals_1.$gameMessage.choiceBackground();
        this.setBackgroundType(this._background);
    };
    Window_ChoiceList.prototype.windowWidth = function () {
        var width = this.maxChoiceWidth() + this.padding * 2;
        return Math.min(width, Graphics_1.Graphics.boxWidth);
    };
    Window_ChoiceList.prototype.numVisibleRows = function () {
        var messageY = this._messageWindow.y;
        var messageHeight = this._messageWindow.height;
        var centerY = Graphics_1.Graphics.boxHeight / 2;
        var choices = globals_1.$gameMessage.choices();
        var numLines = choices.length;
        var maxLines = 8;
        if (messageY < centerY && messageY + messageHeight > centerY) {
            maxLines = 4;
        }
        if (numLines > maxLines) {
            numLines = maxLines;
        }
        return numLines;
    };
    Window_ChoiceList.prototype.maxChoiceWidth = function () {
        var maxWidth = 96;
        var choices = globals_1.$gameMessage.choices();
        for (var i = 0; i < choices.length; i++) {
            var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
            if (maxWidth < choiceWidth) {
                maxWidth = choiceWidth;
            }
        }
        return Math.ceil(maxWidth);
    };
    Window_ChoiceList.prototype.textWidthEx = function (text) {
        return this.drawTextEx(text, 0, this.contents.height);
    };
    Window_ChoiceList.prototype.contentsHeight = function () {
        return this.maxItems() * this.itemHeight();
    };
    Window_ChoiceList.prototype.makeCommandList = function () {
        var choices = globals_1.$gameMessage.choices();
        for (var i = 0; i < choices.length; i++) {
            this.addCommand(choices[i], "choice");
        }
    };
    Window_ChoiceList.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        this.drawTextEx(this.commandName(index), rect.x, rect.y);
    };
    Window_ChoiceList.prototype.isCancelEnabled = function () {
        return globals_1.$gameMessage.choiceCancelType() !== -1;
    };
    Window_ChoiceList.prototype.isOkTriggered = function () {
        // TODO: impl
        // return Input.isTriggered("ok");
        return false;
    };
    Window_ChoiceList.prototype.callOkHandler = function () {
        globals_1.$gameMessage.onChoice(this.index());
        this._messageWindow.terminateMessage();
        this.close();
    };
    Window_ChoiceList.prototype.callCancelHandler = function () {
        globals_1.$gameMessage.onChoice(globals_1.$gameMessage.choiceCancelType());
        this._messageWindow.terminateMessage();
        this.close();
    };
    return Window_ChoiceList;
}(WindowCommand_1.Window_Command));
exports.Window_ChoiceList = Window_ChoiceList;

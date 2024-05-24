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
exports.Window_NumberInput = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var sprites_1 = require("../sprites");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_NumberInput = /** @class */ (function (_super) {
    __extends(Window_NumberInput, _super);
    function Window_NumberInput(scene, messageWindow) {
        return _super.call(this, scene, messageWindow) || this;
        // if (Object.getPrototypeOf(this) === Window_NumberInput.prototype) {
        // 	this.initialize(param.messageWindow);
        // }
    }
    Window_NumberInput.prototype.initialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._messageWindow = args[0];
        _super.prototype.initialize.call(this, 0, 0, 0, 0);
        this._number = 0;
        this._maxDigits = 1;
        this.openness = 0;
        this.createButtons();
        this.deactivate();
    };
    Window_NumberInput.prototype.start = function () {
        this._maxDigits = DataManager_1.$gameMessage.numInputMaxDigits();
        this._number = DataManager_1.$gameVariables.value(DataManager_1.$gameMessage.numInputVariableId());
        this._number = core_1.Utils.clamp(this._number, 0, Math.pow(10, this._maxDigits) - 1);
        this.updatePlacement();
        this.placeButtons();
        this.updateButtonsVisiblity();
        this.createContents();
        this.refresh();
        this.open();
        this.activate();
        this.select(0);
    };
    Window_NumberInput.prototype.updatePlacement = function () {
        var messageY = this._messageWindow.y;
        var spacing = 8;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        this.x = (core_1.Graphics.boxWidth - this.width) / 2;
        if (messageY >= core_1.Graphics.boxHeight / 2) {
            this.y = messageY - this.height - spacing;
        }
        else {
            this.y = messageY + this._messageWindow.height + spacing;
        }
    };
    Window_NumberInput.prototype.windowWidth = function () {
        return this.maxCols() * this.itemWidth() + this.padding * 2;
    };
    Window_NumberInput.prototype.windowHeight = function () {
        return this.fittingHeight(1);
    };
    Window_NumberInput.prototype.maxCols = function () {
        return this._maxDigits;
    };
    Window_NumberInput.prototype.maxItems = function () {
        return this._maxDigits;
    };
    Window_NumberInput.prototype.spacing = function () {
        return 0;
    };
    Window_NumberInput.prototype.itemWidth = function () {
        return 32;
    };
    Window_NumberInput.prototype.createButtons = function () {
        var bitmap = managers_1.ImageManager.loadSystem("ButtonSet");
        var buttonWidth = 48;
        var buttonHeight = 48;
        this._buttons = [];
        for (var i = 0; i < 3; i++) {
            var button = new sprites_1.Sprite_Button(this.scene);
            var x = buttonWidth * [1, 2, 4][i];
            var w = buttonWidth * (i === 2 ? 2 : 1);
            button.bitmap = bitmap;
            button.setColdFrame(x, 0, w, buttonHeight);
            button.setHotFrame(x, buttonHeight, w, buttonHeight);
            button.visible = false;
            this._buttons.push(button);
            this.addChild(button);
        }
        this._buttons[0].setClickHandler(this.onButtonDown.bind(this));
        this._buttons[1].setClickHandler(this.onButtonUp.bind(this));
        this._buttons[2].setClickHandler(this.onButtonOk.bind(this));
    };
    Window_NumberInput.prototype.placeButtons = function () {
        var numButtons = this._buttons.length;
        var spacing = 16;
        var totalWidth = -spacing;
        for (var i = 0; i < numButtons; i++) {
            totalWidth += this._buttons[i].width + spacing;
        }
        var x = (this.width - totalWidth) / 2;
        for (var j = 0; j < numButtons; j++) {
            var button = this._buttons[j];
            button.x = x;
            button.y = this.buttonY();
            x += button.width + spacing;
        }
    };
    Window_NumberInput.prototype.updateButtonsVisiblity = function () {
        if (core_1.TouchInput.date > /* Input.date*/ 0) {
            this.showButtons();
        }
        else {
            this.hideButtons();
        }
    };
    Window_NumberInput.prototype.showButtons = function () {
        for (var i = 0; i < this._buttons.length; i++) {
            this._buttons[i].visible = true;
        }
    };
    Window_NumberInput.prototype.hideButtons = function () {
        for (var i = 0; i < this._buttons.length; i++) {
            this._buttons[i].visible = false;
        }
    };
    Window_NumberInput.prototype.buttonY = function () {
        var spacing = 8;
        if (this._messageWindow.y >= core_1.Graphics.boxHeight / 2) {
            return 0 - this._buttons[0].height - spacing;
        }
        else {
            return this.height + spacing;
        }
    };
    Window_NumberInput.prototype.update = function () {
        _super.prototype.update.call(this);
        this.processDigitChange();
    };
    Window_NumberInput.prototype.processDigitChange = function () {
        if (this.isOpenAndActive()) {
            // if (Input.isRepeated("up")) {
            // 	this.changeDigit(true);
            // } else if (Input.isRepeated("down")) {
            // 	this.changeDigit(false);
            // }
        }
    };
    Window_NumberInput.prototype.changeDigit = function (up) {
        var index = this.index();
        var place = Math.pow(10, this._maxDigits - 1 - index);
        var n = Math.floor(this._number / place) % 10;
        this._number -= n * place;
        if (up) {
            n = (n + 1) % 10;
        }
        else {
            n = (n + 9) % 10;
        }
        this._number += n * place;
        this.refresh();
        managers_1.SoundManager.playCursor();
    };
    Window_NumberInput.prototype.isTouchOkEnabled = function () {
        return false;
    };
    Window_NumberInput.prototype.isOkEnabled = function () {
        return true;
    };
    Window_NumberInput.prototype.isCancelEnabled = function () {
        return false;
    };
    Window_NumberInput.prototype.isOkTriggered = function () {
        // return Input.isTriggered("ok");
        return false;
    };
    Window_NumberInput.prototype.processOk = function () {
        managers_1.SoundManager.playOk();
        DataManager_1.$gameVariables.setValue(DataManager_1.$gameMessage.numInputVariableId(), this._number);
        this._messageWindow.terminateMessage();
        this.updateInputData();
        this.deactivate();
        this.close();
    };
    Window_NumberInput.prototype.drawItem = function (index) {
        var rect = this.itemRect(index);
        var align = "center";
        var s = core_1.Utils.padZero(this._number, this._maxDigits);
        var c = s.slice(index, index + 1);
        this.resetTextColor();
        this.drawText(c, rect.x, rect.y, rect.width, align);
    };
    Window_NumberInput.prototype.onButtonUp = function () {
        this.changeDigit(true);
    };
    Window_NumberInput.prototype.onButtonDown = function () {
        this.changeDigit(false);
    };
    Window_NumberInput.prototype.onButtonOk = function () {
        this.processOk();
        this.hideButtons();
    };
    return Window_NumberInput;
}(WindowSelectable_1.Window_Selectable));
exports.Window_NumberInput = Window_NumberInput;

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
exports.Window_ShopNumber = void 0;
var TouchInput_1 = require("../core/TouchInput");
var ImageManager_1 = require("../managers/ImageManager");
var SoundManager_1 = require("../managers/SoundManager");
var TextManager_1 = require("../managers/TextManager");
var SpriteButton_1 = require("../sprites/SpriteButton");
var WindowSelectable_1 = require("./WindowSelectable");
var Window_ShopNumber = /** @class */ (function (_super) {
    __extends(Window_ShopNumber, _super);
    function Window_ShopNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Window_ShopNumber.prototype.initialize = function (x, y, height) {
        var width = this.windowWidth();
        _super.prototype.initialize.call(this, x, y, width, height);
        this._item = null;
        this._max = 1;
        this._price = 0;
        this._number = 1;
        this._currencyUnit = TextManager_1.TextManager.currencyUnit;
        this.createButtons();
    };
    Window_ShopNumber.prototype.windowWidth = function () {
        return 456;
    };
    Window_ShopNumber.prototype.number = function () {
        return this._number;
    };
    Window_ShopNumber.prototype.setup = function (item, max, price) {
        this._item = item;
        this._max = Math.floor(max);
        this._price = price;
        this._number = 1;
        this.placeButtons();
        this.updateButtonsVisiblity();
        this.refresh();
    };
    Window_ShopNumber.prototype.setCurrencyUnit = function (currencyUnit) {
        this._currencyUnit = currencyUnit;
        this.refresh();
    };
    Window_ShopNumber.prototype.createButtons = function () {
        var bitmap = ImageManager_1.ImageManager.loadSystem("ButtonSet");
        var buttonWidth = 48;
        var buttonHeight = 48;
        this._buttons = [];
        for (var i = 0; i < 5; i++) {
            var button = new SpriteButton_1.Sprite_Button();
            var x = buttonWidth * i;
            var w = buttonWidth * (i === 4 ? 2 : 1);
            button.bitmap = bitmap;
            button.setColdFrame(x, 0, w, buttonHeight);
            button.setHotFrame(x, buttonHeight, w, buttonHeight);
            button.visible = false;
            this._buttons.push(button);
            this.addChild(button);
        }
        this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
        this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
        this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
        this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
        this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
    };
    Window_ShopNumber.prototype.placeButtons = function () {
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
    Window_ShopNumber.prototype.updateButtonsVisiblity = function () {
        if (TouchInput_1.TouchInput.date > /* Input.date*/ 0) {
            this.showButtons();
        }
        else {
            this.hideButtons();
        }
    };
    Window_ShopNumber.prototype.showButtons = function () {
        for (var i = 0; i < this._buttons.length; i++) {
            this._buttons[i].visible = true;
        }
    };
    Window_ShopNumber.prototype.hideButtons = function () {
        for (var i = 0; i < this._buttons.length; i++) {
            this._buttons[i].visible = false;
        }
    };
    Window_ShopNumber.prototype.refresh = function () {
        this.contents.clear();
        this.drawItemName(this._item, 0, this.itemY());
        this.drawMultiplicationSign();
        this.drawNumber();
        this.drawTotalPrice();
    };
    Window_ShopNumber.prototype.drawMultiplicationSign = function () {
        var sign = "\u00d7";
        var width = this.textWidth(sign);
        var x = this.cursorX() - width * 2;
        var y = this.itemY();
        this.resetTextColor();
        this.drawText(sign, x, y, width);
    };
    Window_ShopNumber.prototype.drawNumber = function () {
        var x = this.cursorX();
        var y = this.itemY();
        var width = this.cursorWidth() - this.textPadding();
        this.resetTextColor();
        this.drawText(this._number, x, y, width, "right");
    };
    Window_ShopNumber.prototype.drawTotalPrice = function () {
        var total = this._price * this._number;
        var width = this.contentsWidth() - this.textPadding();
        this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY(), width);
    };
    Window_ShopNumber.prototype.itemY = function () {
        return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 1.5);
    };
    Window_ShopNumber.prototype.priceY = function () {
        return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2);
    };
    Window_ShopNumber.prototype.buttonY = function () {
        return Math.round(this.priceY() + this.lineHeight() * 2.5);
    };
    Window_ShopNumber.prototype.cursorWidth = function () {
        var digitWidth = this.textWidth("0");
        return this.maxDigits() * digitWidth + this.textPadding() * 2;
    };
    Window_ShopNumber.prototype.cursorX = function () {
        return this.contentsWidth() - this.cursorWidth() - this.textPadding();
    };
    Window_ShopNumber.prototype.maxDigits = function () {
        return 2;
    };
    Window_ShopNumber.prototype.update = function () {
        _super.prototype.update.call(this);
        this.processNumberChange();
    };
    Window_ShopNumber.prototype.isOkTriggered = function () {
        // return Input.isTriggered("ok");
        return false;
    };
    Window_ShopNumber.prototype.playOkSound = function () {
        //
    };
    Window_ShopNumber.prototype.processNumberChange = function () {
        if (this.isOpenAndActive()) {
            // NOTE: キーボード非対応なのでコメントアウト
            // if (Input.isRepeated('right')) {
            //     this.changeNumber(1);
            // }
            // if (Input.isRepeated('left')) {
            //     this.changeNumber(-1);
            // }
            // if (Input.isRepeated('up')) {
            //     this.changeNumber(10);
            // }
            // if (Input.isRepeated('down')) {
            //     this.changeNumber(-10);
            // }
        }
    };
    Window_ShopNumber.prototype.changeNumber = function (amount) {
        var lastNumber = this._number;
        // this._number = (this._number + amount).clamp(1, this._max);
        this._number = Math.min(this._max, Math.max(this._number + amount, 1));
        if (this._number !== lastNumber) {
            SoundManager_1.SoundManager.playCursor();
            this.refresh();
        }
    };
    Window_ShopNumber.prototype.updateCursor = function () {
        this.setCursorRect(this.cursorX(), this.itemY(), this.cursorWidth(), this.lineHeight());
    };
    Window_ShopNumber.prototype.onButtonUp = function () {
        this.changeNumber(1);
    };
    Window_ShopNumber.prototype.onButtonUp2 = function () {
        this.changeNumber(10);
    };
    Window_ShopNumber.prototype.onButtonDown = function () {
        this.changeNumber(-1);
    };
    Window_ShopNumber.prototype.onButtonDown2 = function () {
        this.changeNumber(-10);
    };
    Window_ShopNumber.prototype.onButtonOk = function () {
        this.processOk();
    };
    return Window_ShopNumber;
}(WindowSelectable_1.Window_Selectable));
exports.Window_ShopNumber = Window_ShopNumber;

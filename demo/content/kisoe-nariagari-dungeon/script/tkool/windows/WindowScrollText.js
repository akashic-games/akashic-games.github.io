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
exports.Window_ScrollText = void 0;
var Graphics_1 = require("../core/Graphics");
var TouchInput_1 = require("../core/TouchInput");
var globals_1 = require("../managers/globals");
var WindowBase_1 = require("./WindowBase");
var Window_ScrollText = /** @class */ (function (_super) {
    __extends(Window_ScrollText, _super);
    function Window_ScrollText() {
        return _super.call(this) || this;
        // if (Object.getPrototypeOf(this) === Window_ScrollText.prototype) {
        // 	this.initialize();
        // }
    }
    Window_ScrollText.prototype.initialize = function () {
        var width = Graphics_1.Graphics.boxWidth;
        var height = Graphics_1.Graphics.boxHeight;
        _super.prototype.initialize.call(this, 0, 0, width, height);
        this.opacity = 0;
        this.hide();
        this._text = "";
        this._allTextHeight = 0;
    };
    Window_ScrollText.prototype.update = function () {
        _super.prototype.update.call(this);
        if (globals_1.$gameMessage.scrollMode()) {
            if (this._text) {
                this.updateMessage();
            }
            if (!this._text && globals_1.$gameMessage.hasText()) {
                this.startMessage();
            }
        }
    };
    Window_ScrollText.prototype.startMessage = function () {
        this._text = globals_1.$gameMessage.allText();
        this.refresh();
        this.show();
    };
    Window_ScrollText.prototype.refresh = function () {
        // const textState = { index: 0 };
        var textState = {
            index: 0,
            text: this.convertEscapeCharacters(this._text)
        };
        this.resetFontSettings();
        this._allTextHeight = this.calcTextHeight(textState, true);
        this.createContents();
        this.origin.y = -this.height;
        this.drawTextEx(this._text, this.textPadding(), 1);
    };
    Window_ScrollText.prototype.contentsHeight = function () {
        return Math.max(this._allTextHeight, 1);
    };
    Window_ScrollText.prototype.updateMessage = function () {
        this.origin.y += this.scrollSpeed();
        if (this.origin.y >= this.contents.height) {
            this.terminateMessage();
        }
    };
    Window_ScrollText.prototype.scrollSpeed = function () {
        var speed = globals_1.$gameMessage.scrollSpeed() / 2;
        if (this.isFastForward()) {
            speed *= this.fastForwardRate();
        }
        return speed;
    };
    Window_ScrollText.prototype.isFastForward = function () {
        if (globals_1.$gameMessage.scrollNoFast()) {
            return false;
        }
        else {
            return (
            /* Input.isPressed("ok") || Input.isPressed("shift") ||*/
            TouchInput_1.TouchInput.isPressed());
        }
    };
    Window_ScrollText.prototype.fastForwardRate = function () {
        return 3;
    };
    Window_ScrollText.prototype.terminateMessage = function () {
        this._text = null;
        globals_1.$gameMessage.clear();
        this.hide();
    };
    return Window_ScrollText;
}(WindowBase_1.Window_Base));
exports.Window_ScrollText = Window_ScrollText;

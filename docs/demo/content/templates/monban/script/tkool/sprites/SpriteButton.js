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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite_Button = void 0;
var core_1 = require("../core");
var Sprite_Button = /** @class */ (function (_super) {
    __extends(Sprite_Button, _super);
    function Sprite_Button(scene) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([scene], args, false)) || this;
    }
    Sprite_Button.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._touching = false;
        this._coldFrame = null;
        this._hotFrame = null;
        this._clickHandler = null;
    };
    Sprite_Button.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateFrame();
        this.processTouch();
    };
    Sprite_Button.prototype.updateFrame = function () {
        var frame;
        if (this._touching) {
            frame = this._hotFrame;
        }
        else {
            frame = this._coldFrame;
        }
        if (frame) {
            this.setFrame(frame.x, frame.y, frame.width, frame.height);
        }
    };
    Sprite_Button.prototype.setColdFrame = function (x, y, width, height) {
        this._coldFrame = new core_1.Rectangle(x, y, width, height);
    };
    Sprite_Button.prototype.setHotFrame = function (x, y, width, height) {
        this._hotFrame = new core_1.Rectangle(x, y, width, height);
    };
    Sprite_Button.prototype.setClickHandler = function (method) {
        this._clickHandler = method;
    };
    Sprite_Button.prototype.callClickHandler = function () {
        if (this._clickHandler) {
            this._clickHandler();
        }
    };
    Sprite_Button.prototype.processTouch = function () {
        if (this.isActive()) {
            if (core_1.TouchInput.isTriggered() && this.isButtonTouched()) {
                this._touching = true;
            }
            if (this._touching) {
                if (core_1.TouchInput.isReleased() || !this.isButtonTouched()) {
                    this._touching = false;
                    if (core_1.TouchInput.isReleased()) {
                        this.callClickHandler();
                    }
                }
            }
        }
        else {
            this._touching = false;
        }
    };
    Sprite_Button.prototype.isActive = function () {
        var node = this;
        while (node) {
            if (!node.visible) {
                return false;
            }
            node = node.parent;
        }
        return true;
    };
    Sprite_Button.prototype.isButtonTouched = function () {
        var x = this.canvasToLocalX(core_1.TouchInput.x);
        var y = this.canvasToLocalY(core_1.TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };
    Sprite_Button.prototype.canvasToLocalX = function (x) {
        var node = this;
        while (node) {
            x -= node.x;
            node = node.parent;
        }
        return x;
    };
    Sprite_Button.prototype.canvasToLocalY = function (y) {
        var node = this;
        while (node) {
            y -= node.y;
            node = node.parent;
        }
        return y;
    };
    return Sprite_Button;
}(core_1.Sprite));
exports.Sprite_Button = Sprite_Button;

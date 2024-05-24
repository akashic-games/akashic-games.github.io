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
exports.Sprite_Balloon = void 0;
var managers_1 = require("../managers");
var SpriteBase_1 = require("./SpriteBase");
var Sprite_Balloon = /** @class */ (function (_super) {
    __extends(Sprite_Balloon, _super);
    function Sprite_Balloon(scene) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([scene], args, false)) || this;
        // if (Object.getPrototypeOf(this) === Sprite_Balloon.prototype) {
        // 	this.initialize();
        // }
    }
    Sprite_Balloon.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.initMembers();
        this.loadBitmap();
    };
    Sprite_Balloon.prototype.initMembers = function () {
        this._balloonId = 0;
        this._duration = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.z = 7;
    };
    Sprite_Balloon.prototype.loadBitmap = function () {
        this.bitmap = managers_1.ImageManager.loadSystem("Balloon");
        this.setFrame(0, 0, 0, 0);
    };
    Sprite_Balloon.prototype.setup = function (balloonId) {
        this._balloonId = balloonId;
        this._duration = 8 * this.speed() + this.waitTime();
    };
    Sprite_Balloon.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this._duration > 0) {
            this._duration--;
            if (this._duration > 0) {
                this.updateFrame();
            }
        }
    };
    Sprite_Balloon.prototype.updateFrame = function () {
        var w = 48;
        var h = 48;
        var sx = this.frameIndex() * w;
        var sy = (this._balloonId - 1) * h;
        this.setFrame(sx, sy, w, h);
    };
    Sprite_Balloon.prototype.speed = function () {
        return 8;
    };
    Sprite_Balloon.prototype.waitTime = function () {
        return 12;
    };
    Sprite_Balloon.prototype.frameIndex = function () {
        var index = (this._duration - this.waitTime()) / this.speed();
        return 7 - Math.max(Math.floor(index), 0);
    };
    Sprite_Balloon.prototype.isPlaying = function () {
        return this._duration > 0;
    };
    return Sprite_Balloon;
}(SpriteBase_1.Sprite_Base));
exports.Sprite_Balloon = Sprite_Balloon;

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
exports.Sprite_StateOverlay = void 0;
var managers_1 = require("../managers");
var SpriteBase_1 = require("./SpriteBase");
var Sprite_StateOverlay = /** @class */ (function (_super) {
    __extends(Sprite_StateOverlay, _super);
    function Sprite_StateOverlay() {
        return _super.call(this) || this;
    }
    Sprite_StateOverlay.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.initMembers();
        this.loadBitmap();
    };
    Sprite_StateOverlay.prototype.initMembers = function () {
        this._battler = null;
        this._overlayIndex = 0;
        this._animationCount = 0;
        this._pattern = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
    };
    Sprite_StateOverlay.prototype.loadBitmap = function () {
        this.bitmap = managers_1.ImageManager.loadSystem("States");
        this.setFrame(0, 0, 0, 0);
    };
    Sprite_StateOverlay.prototype.setup = function (battler) {
        this._battler = battler;
    };
    Sprite_StateOverlay.prototype.update = function () {
        SpriteBase_1.Sprite_Base.prototype.update.call(this);
        this._animationCount++;
        if (this._animationCount >= this.animationWait()) {
            this.updatePattern();
            this.updateFrame();
            this._animationCount = 0;
        }
    };
    Sprite_StateOverlay.prototype.animationWait = function () {
        return 8;
    };
    Sprite_StateOverlay.prototype.updatePattern = function () {
        this._pattern++;
        this._pattern %= 8;
        if (this._battler) {
            this._overlayIndex = this._battler.stateOverlayIndex();
        }
    };
    Sprite_StateOverlay.prototype.updateFrame = function () {
        if (this._overlayIndex > 0) {
            var w = 96;
            var h = 96;
            var sx = this._pattern * w;
            var sy = (this._overlayIndex - 1) * h;
            this.setFrame(sx, sy, w, h);
        }
        else {
            this.setFrame(0, 0, 0, 0);
        }
    };
    return Sprite_StateOverlay;
}(SpriteBase_1.Sprite_Base));
exports.Sprite_StateOverlay = Sprite_StateOverlay;

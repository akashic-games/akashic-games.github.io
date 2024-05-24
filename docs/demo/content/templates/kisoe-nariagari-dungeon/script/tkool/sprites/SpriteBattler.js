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
exports.Sprite_Battler = void 0;
var DataManager_1 = require("../managers/DataManager");
var SpriteBase_1 = require("./SpriteBase");
var SpriteDamage_1 = require("./SpriteDamage");
var Sprite_Battler = /** @class */ (function (_super) {
    __extends(Sprite_Battler, _super);
    function Sprite_Battler(scene) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([scene], args, false)) || this;
    }
    Sprite_Battler.prototype.initialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.initialize.call(this);
        this.initMembers();
        this.setBattler(args[0]);
    };
    Sprite_Battler.prototype.initMembers = function () {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._battler = null;
        this._damages = [];
        this._homeX = 0;
        this._homeY = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._targetOffsetX = NaN;
        this._targetOffsetY = NaN;
        this._movementDuration = 0;
        this._selectionEffectCount = 0;
    };
    Sprite_Battler.prototype.setBattler = function (battler) {
        this._battler = battler;
    };
    Sprite_Battler.prototype.setHome = function (x, y) {
        this._homeX = x;
        this._homeY = y;
        this.updatePosition();
    };
    Sprite_Battler.prototype.update = function () {
        SpriteBase_1.Sprite_Base.prototype.update.call(this);
        if (this._battler) {
            this.updateMain();
            this.updateAnimation();
            this.updateDamagePopup();
            this.updateSelectionEffect();
        }
        else {
            this.bitmap = null;
        }
    };
    Sprite_Battler.prototype.updateVisibility = function () {
        SpriteBase_1.Sprite_Base.prototype.updateVisibility.call(this);
        if (!this._battler || !this._battler.isSpriteVisible()) {
            this.visible = false;
        }
    };
    Sprite_Battler.prototype.updateMain = function () {
        if (this._battler.isSpriteVisible()) {
            this.updateBitmap();
            this.updateFrame();
        }
        this.updateMove();
        this.updatePosition();
    };
    Sprite_Battler.prototype.updateBitmap = function () {
        // nohting to do
    };
    Sprite_Battler.prototype.updateFrame = function () {
        // noting to do
    };
    Sprite_Battler.prototype.updateMove = function () {
        if (this._movementDuration > 0) {
            var d = this._movementDuration;
            this._offsetX = (this._offsetX * (d - 1) + this._targetOffsetX) / d;
            this._offsetY = (this._offsetY * (d - 1) + this._targetOffsetY) / d;
            this._movementDuration--;
            if (this._movementDuration === 0) {
                this.onMoveEnd();
            }
        }
    };
    Sprite_Battler.prototype.updatePosition = function () {
        this.x = this._homeX + this._offsetX;
        this.y = this._homeY + this._offsetY;
    };
    Sprite_Battler.prototype.updateAnimation = function () {
        this.setupAnimation();
    };
    Sprite_Battler.prototype.updateDamagePopup = function () {
        this.setupDamagePopup();
        if (this._damages.length > 0) {
            for (var i = 0; i < this._damages.length; i++) {
                this._damages[i].update();
            }
            if (!this._damages[0].isPlaying()) {
                this.parent.removeChild(this._damages[0]);
                this._damages.shift();
            }
        }
    };
    Sprite_Battler.prototype.updateSelectionEffect = function () {
        var target = this._effectTarget;
        if (this._battler.isSelected()) {
            this._selectionEffectCount++;
            if (this._selectionEffectCount % 30 < 15) {
                target.setBlendColor([255, 255, 255, 64]);
            }
            else {
                target.setBlendColor([0, 0, 0, 0]);
            }
        }
        else if (this._selectionEffectCount > 0) {
            this._selectionEffectCount = 0;
            target.setBlendColor([0, 0, 0, 0]);
        }
    };
    Sprite_Battler.prototype.setupAnimation = function () {
        while (this._battler.isAnimationRequested()) {
            var data = this._battler.shiftAnimation();
            var animation = DataManager_1.$dataAnimations[data.animationId];
            var mirror = data.mirror;
            var delay = animation.position === 3 ? 0 : data.delay;
            this.startAnimation(animation, mirror, delay);
            for (var i = 0; i < this._animationSprites.length; i++) {
                var sprite = this._animationSprites[i];
                sprite.visible = this._battler.isSpriteVisible();
            }
        }
    };
    Sprite_Battler.prototype.setupDamagePopup = function () {
        if (this._battler.isDamagePopupRequested()) {
            if (this._battler.isSpriteVisible()) {
                var sprite = new SpriteDamage_1.Sprite_Damage(this.scene);
                sprite.x = this.x + this.damageOffsetX();
                sprite.y = this.y + this.damageOffsetY();
                sprite.setup(this._battler);
                this._damages.push(sprite);
                this.parent.addChild(sprite);
            }
            this._battler.clearDamagePopup();
            this._battler.clearResult();
        }
    };
    Sprite_Battler.prototype.damageOffsetX = function () {
        return 0;
    };
    Sprite_Battler.prototype.damageOffsetY = function () {
        return 0;
    };
    Sprite_Battler.prototype.startMove = function (x, y, duration) {
        if (this._targetOffsetX !== x || this._targetOffsetY !== y) {
            this._targetOffsetX = x;
            this._targetOffsetY = y;
            this._movementDuration = duration;
            if (duration === 0) {
                this._offsetX = x;
                this._offsetY = y;
            }
        }
    };
    Sprite_Battler.prototype.onMoveEnd = function () {
        // nothing to do.
    };
    Sprite_Battler.prototype.isEffecting = function () {
        return false;
    };
    Sprite_Battler.prototype.isMoving = function () {
        return this._movementDuration > 0;
    };
    Sprite_Battler.prototype.inHomePosition = function () {
        return this._offsetX === 0 && this._offsetY === 0;
    };
    return Sprite_Battler;
}(SpriteBase_1.Sprite_Base));
exports.Sprite_Battler = Sprite_Battler;

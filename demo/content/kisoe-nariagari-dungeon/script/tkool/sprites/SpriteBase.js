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
exports.Sprite_Base = void 0;
var core_1 = require("../core");
var SpriteAnimation_1 = require("./SpriteAnimation");
var Sprite_Base = /** @class */ (function (_super) {
    __extends(Sprite_Base, _super);
    function Sprite_Base() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Sprite_Base.prototype.initialize = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        _super.prototype.initialize.call(this);
        this._animationSprites = [];
        this._effectTarget = this;
        this._hiding = false;
    };
    Sprite_Base.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateVisibility();
        this.updateAnimationSprites();
    };
    Sprite_Base.prototype.hide = function () {
        this._hiding = true;
        this.updateVisibility();
    };
    Sprite_Base.prototype.show = function () {
        this._hiding = false;
        this.updateVisibility();
    };
    Sprite_Base.prototype.updateVisibility = function () {
        this.visible = !this._hiding;
    };
    Sprite_Base.prototype.updateAnimationSprites = function () {
        if (this._animationSprites.length > 0) {
            // const sprites = this._animationSprites.clone();
            var sprites = core_1.Utils.cloneArray(this._animationSprites);
            this._animationSprites = [];
            for (var i = 0; i < sprites.length; i++) {
                var sprite = sprites[i];
                if (sprite.isPlaying()) {
                    this._animationSprites.push(sprite);
                }
                else {
                    sprite.remove();
                }
            }
        }
    };
    Sprite_Base.prototype.startAnimation = function (animation, mirror, delay) {
        var sprite = new SpriteAnimation_1.Sprite_Animation();
        sprite.setup(this._effectTarget, animation, mirror, delay);
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);
    };
    Sprite_Base.prototype.isAnimationPlaying = function () {
        return this._animationSprites.length > 0;
    };
    return Sprite_Base;
}(core_1.Sprite));
exports.Sprite_Base = Sprite_Base;

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
exports.Sprite_Animation = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var Sprite_Animation = /** @class */ (function (_super) {
    __extends(Sprite_Animation, _super);
    function Sprite_Animation() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
        // if (Object.getPrototypeOf(this) === Sprite_Animation.prototype) {
        // 	this.initialize();
        // }
    }
    Sprite_Animation.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._reduceArtifacts = true;
        this.initMembers();
    };
    Sprite_Animation.prototype.initMembers = function () {
        this._target = null;
        this._animation = null;
        this._mirror = false;
        this._delay = 0;
        this._rate = 4;
        this._duration = 0;
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
        this._screenFlashDuration = 0;
        this._hidingDuration = 0;
        this._bitmap1 = null;
        this._bitmap2 = null;
        this._cellSprites = [];
        this._screenFlashSprite = null;
        this._duplicated = false;
        this.z = 8;
    };
    Sprite_Animation.prototype.setup = function (target, animation, mirror, delay) {
        this._target = target;
        this._animation = animation;
        this._mirror = mirror;
        this._delay = delay;
        if (this._animation) {
            this.remove();
            this.setupRate();
            this.setupDuration();
            this.loadBitmaps();
            this.createSprites();
        }
    };
    Sprite_Animation.prototype.remove = function () {
        if (this.parent && this.parent.removeChild(this)) {
            this._target.setBlendColor([0, 0, 0, 0]);
            this._target.show();
        }
    };
    Sprite_Animation.prototype.setupRate = function () {
        this._rate = 4;
    };
    Sprite_Animation.prototype.setupDuration = function () {
        this._duration = this._animation.frames.length * this._rate + 1;
    };
    Sprite_Animation.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateMain();
        this.updateFlash();
        this.updateScreenFlash();
        this.updateHiding();
        Sprite_Animation._checker1 = {};
        Sprite_Animation._checker2 = {};
    };
    Sprite_Animation.prototype.updateFlash = function () {
        if (this._flashDuration > 0) {
            var d = this._flashDuration--;
            this._flashColor[3] *= (d - 1) / d;
            this._target.setBlendColor(this._flashColor);
        }
    };
    Sprite_Animation.prototype.updateScreenFlash = function () {
        if (this._screenFlashDuration > 0) {
            var d = this._screenFlashDuration--;
            if (this._screenFlashSprite) {
                this._screenFlashSprite.x = -this.absoluteX();
                this._screenFlashSprite.y = -this.absoluteY();
                this._screenFlashSprite.opacity *= (d - 1) / d;
                this._screenFlashSprite.visible = this._screenFlashDuration > 0;
            }
        }
    };
    Sprite_Animation.prototype.absoluteX = function () {
        var x = 0;
        var object = this;
        while (object) {
            x += object.x;
            object = object.parent;
        }
        return x;
    };
    Sprite_Animation.prototype.absoluteY = function () {
        var y = 0;
        var object = this;
        while (object) {
            y += object.y;
            object = object.parent;
        }
        return y;
    };
    Sprite_Animation.prototype.updateHiding = function () {
        if (this._hidingDuration > 0) {
            this._hidingDuration--;
            if (this._hidingDuration === 0) {
                this._target.show();
            }
        }
    };
    Sprite_Animation.prototype.isPlaying = function () {
        return this._duration > 0;
    };
    Sprite_Animation.prototype.loadBitmaps = function () {
        var name1 = this._animation.animation1Name;
        var name2 = this._animation.animation2Name;
        var hue1 = this._animation.animation1Hue;
        var hue2 = this._animation.animation2Hue;
        this._bitmap1 = managers_1.ImageManager.loadAnimation(name1, hue1);
        this._bitmap2 = managers_1.ImageManager.loadAnimation(name2, hue2);
    };
    Sprite_Animation.prototype.isReady = function () {
        return this._bitmap1 && this._bitmap1.isReady() && this._bitmap2 && this._bitmap2.isReady();
    };
    Sprite_Animation.prototype.createSprites = function () {
        if (!Sprite_Animation._checker2[this._animation]) {
            this.createCellSprites();
            if (this._animation.position === 3) {
                Sprite_Animation._checker2[this._animation] = true;
            }
            this.createScreenFlashSprite();
        }
        if (Sprite_Animation._checker1[this._animation]) {
            this._duplicated = true;
        }
        else {
            this._duplicated = false;
            if (this._animation.position === 3) {
                Sprite_Animation._checker1[this._animation] = true;
            }
        }
    };
    Sprite_Animation.prototype.createCellSprites = function () {
        this._cellSprites = [];
        for (var i = 0; i < 16; i++) {
            var sprite = new core_1.Sprite();
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            this._cellSprites.push(sprite);
            this.addChild(sprite);
        }
    };
    Sprite_Animation.prototype.createScreenFlashSprite = function () {
        this._screenFlashSprite = new core_1.ScreenSprite();
        this.addChild(this._screenFlashSprite);
    };
    Sprite_Animation.prototype.updateMain = function () {
        if (this.isPlaying() && this.isReady()) {
            if (this._delay > 0) {
                this._delay--;
            }
            else {
                this._duration--;
                this.updatePosition();
                if (this._duration % this._rate === 0) {
                    this.updateFrame();
                }
            }
        }
    };
    Sprite_Animation.prototype.updatePosition = function () {
        if (this._animation.position === 3) {
            // tsc@v2.6.2 だと通らないみたい
            this.x = "width" in this.parent ? this.parent.width / 2 : core_1.Graphics.width;
            this.y = "height" in this.parent ? this.parent.height / 2 : core_1.Graphics.height;
        }
        else {
            var parent = this._target.parent;
            var grandparent = parent ? parent.parent : null;
            this.x = this._target.x;
            this.y = this._target.y;
            if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }
            if (this._animation.position === 0) {
                this.y -= this._target.height;
            }
            else if (this._animation.position === 1) {
                this.y -= this._target.height / 2;
            }
        }
    };
    Sprite_Animation.prototype.updateFrame = function () {
        var _this = this;
        if (this._duration > 0) {
            var frameIndex_1 = this.currentFrameIndex();
            this.updateAllCellSprites(this._animation.frames[frameIndex_1]);
            this._animation.timings.forEach(function (timing) {
                if (timing.frame === frameIndex_1) {
                    _this.processTimingData(timing);
                }
            });
        }
    };
    Sprite_Animation.prototype.currentFrameIndex = function () {
        return this._animation.frames.length - Math.floor((this._duration + this._rate - 1) / this._rate);
    };
    Sprite_Animation.prototype.updateAllCellSprites = function (frame) {
        for (var i = 0; i < this._cellSprites.length; i++) {
            var sprite = this._cellSprites[i];
            if (i < frame.length) {
                this.updateCellSprite(sprite, frame[i]);
            }
            else {
                sprite.visible = false;
            }
        }
    };
    Sprite_Animation.prototype.updateCellSprite = function (sprite, cell) {
        var pattern = cell[0];
        if (pattern >= 0) {
            var sx = (pattern % 5) * 192;
            var sy = Math.floor((pattern % 100) / 5) * 192;
            var mirror = this._mirror;
            sprite.bitmap = pattern < 100 ? this._bitmap1 : this._bitmap2;
            sprite.setFrame(sx, sy, 192, 192);
            sprite.x = cell[1];
            sprite.y = cell[2];
            sprite.rotation = (cell[4] * Math.PI) / 180;
            // sprite.scale.x = cell[3] / 100;
            sprite.scale.x = cell[3] / 100;
            if (cell[5]) {
                // sprite.scale.x *= -1;
                sprite.scale.x *= -1;
            }
            if (mirror) {
                sprite.x *= -1;
                sprite.rotation *= -1;
                // sprite.scale.x *= -1;
                sprite.scale.x *= -1;
            }
            // sprite.scale.y = cell[3] / 100;
            sprite.scale.y = cell[3] / 100;
            sprite.opacity = cell[6];
            // sprite.blendMode = cell[7]; // TODO: impl
            sprite.visible = true;
        }
        else {
            sprite.visible = false;
        }
    };
    Sprite_Animation.prototype.processTimingData = function (timing) {
        var duration = timing.flashDuration * this._rate;
        switch (timing.flashScope) {
            case 1:
                this.startFlash(timing.flashColor, duration);
                break;
            case 2:
                this.startScreenFlash(timing.flashColor, duration);
                break;
            case 3:
                this.startHiding(duration);
                break;
        }
        if (!this._duplicated && timing.se) {
            managers_1.AudioManager.playSe(timing.se);
        }
    };
    Sprite_Animation.prototype.startFlash = function (color, duration) {
        // this._flashColor = color.clone();
        this._flashColor = core_1.Utils.cloneArray(color);
        this._flashDuration = duration;
    };
    Sprite_Animation.prototype.startScreenFlash = function (color, duration) {
        this._screenFlashDuration = duration;
        if (this._screenFlashSprite) {
            this._screenFlashSprite.setColor(color[0], color[1], color[2]);
            this._screenFlashSprite.opacity = color[3];
        }
    };
    Sprite_Animation.prototype.startHiding = function (duration) {
        this._hidingDuration = duration;
        this._target.hide();
    };
    Sprite_Animation._checker1 = {};
    Sprite_Animation._checker2 = {};
    return Sprite_Animation;
}(core_1.Sprite));
exports.Sprite_Animation = Sprite_Animation;

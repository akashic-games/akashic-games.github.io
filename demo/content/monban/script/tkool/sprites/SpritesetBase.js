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
exports.Spriteset_Base = void 0;
var core_1 = require("../core");
var DataManager_1 = require("../managers/DataManager");
var sprites_1 = require("../sprites");
var Spriteset_Base = /** @class */ (function (_super) {
    __extends(Spriteset_Base, _super);
    function Spriteset_Base() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Spriteset_Base.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.setFrame(0, 0, core_1.Graphics.width, core_1.Graphics.height);
        this._tone = [0, 0, 0, 0];
        this.opaque = true;
        this.createLowerLayer();
        this.createToneChanger();
        this.createUpperLayer();
        this.update();
    };
    Spriteset_Base.prototype.createLowerLayer = function () {
        this.createBaseSprite();
    };
    Spriteset_Base.prototype.createUpperLayer = function () {
        this.createPictures();
        this.createTimer();
        this.createScreenSprites();
    };
    Spriteset_Base.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateScreenSprites();
        this.updateToneChanger();
        this.updatePosition();
    };
    Spriteset_Base.prototype.createBaseSprite = function () {
        this._baseSprite = new core_1.Sprite();
        this._baseSprite.setFrame(0, 0, this.width, this.height);
        this._blackScreen = new core_1.ScreenSprite();
        this._blackScreen.opacity = 255;
        this.addChild(this._baseSprite);
        this._baseSprite.addChild(this._blackScreen);
    };
    Spriteset_Base.prototype.createToneChanger = function () {
        if (core_1.Graphics.isWebGL()) {
            this.createWebGLToneChanger();
        }
        else {
            this.createCanvasToneChanger();
        }
    };
    Spriteset_Base.prototype.createWebGLToneChanger = function () {
        // const margin = 48;
        // const width = Graphics.width + margin * 2;
        // const height = Graphics.height + margin * 2;
        // this._toneFilter = new ToneFilter();
        // this._baseSprite.filters = [this._toneFilter];
        // this._baseSprite.filterArea = new Rectangle(-margin, -margin, width, height);
    };
    Spriteset_Base.prototype.createCanvasToneChanger = function () {
        this._toneSprite = new core_1.ToneSprite();
        this.addChild(this._toneSprite);
    };
    Spriteset_Base.prototype.createPictures = function () {
        var width = core_1.Graphics.boxWidth;
        var height = core_1.Graphics.boxHeight;
        var x = (core_1.Graphics.width - width) / 2;
        var y = (core_1.Graphics.height - height) / 2;
        this._pictureContainer = new core_1.Sprite();
        this._pictureContainer.setFrame(x, y, width, height);
        for (var i = 1; i <= DataManager_1.$gameScreen.maxPictures(); i++) {
            this._pictureContainer.addChild(new sprites_1.Sprite_Picture(i));
        }
        this.addChild(this._pictureContainer);
    };
    Spriteset_Base.prototype.createTimer = function () {
        this._timerSprite = new sprites_1.Sprite_Timer();
        this.addChild(this._timerSprite);
    };
    Spriteset_Base.prototype.createScreenSprites = function () {
        this._flashSprite = new core_1.ScreenSprite();
        this._fadeSprite = new core_1.ScreenSprite();
        this.addChild(this._flashSprite);
        this.addChild(this._fadeSprite);
    };
    Spriteset_Base.prototype.updateScreenSprites = function () {
        var color = DataManager_1.$gameScreen.flashColor();
        this._flashSprite.setColor(color[0], color[1], color[2]);
        this._flashSprite.opacity = color[3];
        this._fadeSprite.opacity = 255 - DataManager_1.$gameScreen.brightness();
    };
    Spriteset_Base.prototype.updateToneChanger = function () {
        var tone = DataManager_1.$gameScreen.tone();
        if (!core_1.Utils.equals(this._tone, tone)) {
            this._tone = core_1.Utils.cloneArray(tone);
            if (core_1.Graphics.isWebGL()) {
                this.updateWebGLToneChanger();
            }
            else {
                this.updateCanvasToneChanger();
            }
        }
    };
    Spriteset_Base.prototype.updateWebGLToneChanger = function () {
        // const tone = this._tone;
        // this._toneFilter.reset();
        // this._toneFilter.adjustTone(tone[0], tone[1], tone[2]);
        // this._toneFilter.adjustSaturation(-tone[3]);
    };
    Spriteset_Base.prototype.updateCanvasToneChanger = function () {
        var tone = this._tone;
        this._toneSprite.setTone(tone[0], tone[1], tone[2], tone[3]);
    };
    Spriteset_Base.prototype.updatePosition = function () {
        var screen = DataManager_1.$gameScreen;
        var scale = screen.zoomScale();
        this.scale.x = scale;
        this.scale.y = scale;
        this.x = Math.round(-screen.zoomX() * (scale - 1));
        this.y = Math.round(-screen.zoomY() * (scale - 1));
        this.x += Math.round(screen.shake());
    };
    return Spriteset_Base;
}(core_1.Sprite));
exports.Spriteset_Base = Spriteset_Base;

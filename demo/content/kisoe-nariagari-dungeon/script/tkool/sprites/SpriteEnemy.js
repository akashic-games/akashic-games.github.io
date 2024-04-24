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
exports.Sprite_Enemy = void 0;
var Graphics_1 = require("../core/Graphics");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SoundManager_1 = require("../managers/SoundManager");
var SpriteBattler_1 = require("./SpriteBattler");
var SpriteStateIcon_1 = require("./SpriteStateIcon");
var Sprite_Enemy = /** @class */ (function (_super) {
    __extends(Sprite_Enemy, _super);
    function Sprite_Enemy(enemy) {
        return _super.call(this, enemy) || this;
    }
    Sprite_Enemy.prototype.initialize = function (battler) {
        _super.prototype.initialize.call(this, battler);
    };
    Sprite_Enemy.prototype.initMembers = function () {
        _super.prototype.initMembers.call(this);
        this._enemy = null;
        this._appeared = false;
        this._battlerName = "";
        this._battlerHue = 0;
        this._effectType = null;
        this._effectDuration = 0;
        this._shake = 0;
        this.createStateIconSprite();
    };
    Sprite_Enemy.prototype.createStateIconSprite = function () {
        this._stateIconSprite = new SpriteStateIcon_1.Sprite_StateIcon();
        // これが黒い縦線の正体みたい
        this.addChild(this._stateIconSprite);
    };
    Sprite_Enemy.prototype.setBattler = function (battler) {
        _super.prototype.setBattler.call(this, battler);
        this._enemy = battler;
        this.setHome(battler.screenX(), battler.screenY());
        this._stateIconSprite.setup(battler);
    };
    Sprite_Enemy.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this._enemy) {
            this.updateEffect();
            this.updateStateSprite();
        }
    };
    Sprite_Enemy.prototype.updateBitmap = function () {
        _super.prototype.updateBitmap.call(this);
        var name = this._enemy.battlerName();
        var hue = this._enemy.battlerHue();
        if (this._battlerName !== name || this._battlerHue !== hue) {
            this._battlerName = name;
            this._battlerHue = hue;
            this.loadBitmap(name, hue);
            this.initVisibility();
        }
    };
    Sprite_Enemy.prototype.loadBitmap = function (name, hue) {
        if (globals_1.$gameSystem.isSideView()) {
            this.bitmap = ImageManager_1.ImageManager.loadSvEnemy(name, hue);
        }
        else {
            this.bitmap = ImageManager_1.ImageManager.loadEnemy(name, hue);
        }
    };
    Sprite_Enemy.prototype.updateFrame = function () {
        _super.prototype.updateFrame.call(this);
        var frameHeight = this.bitmap.height;
        if (this._effectType === "bossCollapse") {
            frameHeight = this._effectDuration;
        }
        this.setFrame(0, 0, this.bitmap.width, frameHeight);
    };
    Sprite_Enemy.prototype.updatePosition = function () {
        _super.prototype.updatePosition.call(this);
        this.x += this._shake;
    };
    Sprite_Enemy.prototype.updateStateSprite = function () {
        // this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
        // if (this._stateIconSprite.y < 20 - this.y) {
        // 	this._stateIconSprite.y = 20 - this.y;
        // }
        this._stateIconSprite.x = this.width / 2 - SpriteStateIcon_1.Sprite_StateIcon._iconWidth / 2;
        this._stateIconSprite.y = (-1 * SpriteStateIcon_1.Sprite_StateIcon._iconHeight) / 2;
    };
    Sprite_Enemy.prototype.initVisibility = function () {
        this._appeared = this._enemy.isAlive();
        if (!this._appeared) {
            this.opacity = 0;
        }
    };
    Sprite_Enemy.prototype.setupEffect = function () {
        if (this._appeared && this._enemy.isEffectRequested()) {
            this.startEffect(this._enemy.effectType());
            this._enemy.clearEffect();
        }
        if (!this._appeared && this._enemy.isAlive()) {
            this.startEffect("appear");
        }
        else if (this._appeared && this._enemy.isHidden()) {
            this.startEffect("disappear");
        }
    };
    Sprite_Enemy.prototype.startEffect = function (effectType) {
        this._effectType = effectType;
        switch (this._effectType) {
            case "appear":
                this.startAppear();
                break;
            case "disappear":
                this.startDisappear();
                break;
            case "whiten":
                this.startWhiten();
                break;
            case "blink":
                this.startBlink();
                break;
            case "collapse":
                this.startCollapse();
                break;
            case "bossCollapse":
                this.startBossCollapse();
                break;
            case "instantCollapse":
                this.startInstantCollapse();
                break;
        }
        this.revertToNormal();
    };
    Sprite_Enemy.prototype.startAppear = function () {
        this._effectDuration = 16;
        this._appeared = true;
    };
    Sprite_Enemy.prototype.startDisappear = function () {
        this._effectDuration = 32;
        this._appeared = false;
    };
    Sprite_Enemy.prototype.startWhiten = function () {
        this._effectDuration = 16;
    };
    Sprite_Enemy.prototype.startBlink = function () {
        this._effectDuration = 20;
    };
    Sprite_Enemy.prototype.startCollapse = function () {
        this._effectDuration = 32;
        this._appeared = false;
    };
    Sprite_Enemy.prototype.startBossCollapse = function () {
        this._effectDuration = this.bitmap.height;
        this._appeared = false;
    };
    Sprite_Enemy.prototype.startInstantCollapse = function () {
        this._effectDuration = 16;
        this._appeared = false;
    };
    Sprite_Enemy.prototype.updateEffect = function () {
        this.setupEffect();
        if (this._effectDuration > 0) {
            this._effectDuration--;
            switch (this._effectType) {
                case "whiten":
                    this.updateWhiten();
                    break;
                case "blink":
                    this.updateBlink();
                    break;
                case "appear":
                    this.updateAppear();
                    break;
                case "disappear":
                    this.updateDisappear();
                    break;
                case "collapse":
                    this.updateCollapse();
                    break;
                case "bossCollapse":
                    this.updateBossCollapse();
                    break;
                case "instantCollapse":
                    this.updateInstantCollapse();
                    break;
            }
            if (this._effectDuration === 0) {
                this._effectType = null;
            }
        }
    };
    Sprite_Enemy.prototype.isEffecting = function () {
        return this._effectType !== null;
    };
    Sprite_Enemy.prototype.revertToNormal = function () {
        this._shake = 0;
        this.blendMode = 0;
        this.opacity = 255;
        this.setBlendColor([0, 0, 0, 0]);
    };
    Sprite_Enemy.prototype.updateWhiten = function () {
        var alpha = 128 - (16 - this._effectDuration) * 10;
        this.setBlendColor([255, 255, 255, alpha]);
    };
    Sprite_Enemy.prototype.updateBlink = function () {
        this.opacity = this._effectDuration % 10 < 5 ? 255 : 0;
    };
    Sprite_Enemy.prototype.updateAppear = function () {
        this.opacity = (16 - this._effectDuration) * 16;
    };
    Sprite_Enemy.prototype.updateDisappear = function () {
        this.opacity = 256 - (32 - this._effectDuration) * 10;
    };
    Sprite_Enemy.prototype.updateCollapse = function () {
        this.blendMode = Graphics_1.Graphics.BLEND_ADD;
        this.setBlendColor([255, 128, 128, 128]);
        this.opacity *= this._effectDuration / (this._effectDuration + 1);
    };
    Sprite_Enemy.prototype.updateBossCollapse = function () {
        this._shake = (this._effectDuration % 2) * 4 - 2;
        this.blendMode = Graphics_1.Graphics.BLEND_ADD;
        this.opacity *= this._effectDuration / (this._effectDuration + 1);
        this.setBlendColor([255, 255, 255, 255 - this.opacity]);
        if (this._effectDuration % 20 === 19) {
            SoundManager_1.SoundManager.playBossCollapse2();
        }
    };
    Sprite_Enemy.prototype.updateInstantCollapse = function () {
        this.opacity = 0;
    };
    Sprite_Enemy.prototype.damageOffsetX = function () {
        return 0;
    };
    Sprite_Enemy.prototype.damageOffsetY = function () {
        return -8;
    };
    return Sprite_Enemy;
}(SpriteBattler_1.Sprite_Battler));
exports.Sprite_Enemy = Sprite_Enemy;

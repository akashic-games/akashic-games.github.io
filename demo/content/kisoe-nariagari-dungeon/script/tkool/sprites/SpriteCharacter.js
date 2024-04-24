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
exports.Sprite_Character = void 0;
var Sprite_1 = require("../core/Sprite");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SpriteBalloon_1 = require("./SpriteBalloon");
var SpriteBase_1 = require("./SpriteBase");
var Sprite_Character = /** @class */ (function (_super) {
    __extends(Sprite_Character, _super);
    function Sprite_Character() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
        // if (Object.getPrototypeOf(this) === Sprite_Character.prototype) {
        // 	this.initialize(param.character);
        // }
    }
    Sprite_Character.prototype.initialize = function (character) {
        _super.prototype.initialize.call(this);
        this.initMembers();
        this.setCharacter(character);
    };
    Sprite_Character.prototype.initMembers = function () {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._character = null;
        this._balloonDuration = 0;
        this._tilesetId = 0;
        this._upperBody = null;
        this._lowerBody = null;
    };
    Sprite_Character.prototype.setCharacter = function (character) {
        this._character = character;
    };
    Sprite_Character.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateBitmap();
        this.updateFrame();
        this.updatePosition();
        this.updateAnimation();
        this.updateBalloon();
        this.updateOther();
    };
    Sprite_Character.prototype.updateVisibility = function () {
        _super.prototype.updateVisibility.call(this);
        if (this._character.isTransparent()) {
            this.visible = false;
        }
    };
    Sprite_Character.prototype.isTile = function () {
        // NOTE: オリジナルにはバグがある？ 関数と数を比較している。
        // return this._character.tileId > 0;
        return this._character.tileId() > 0;
    };
    Sprite_Character.prototype.tilesetBitmap = function (tileId) {
        var tileset = globals_1.$gameMap.tileset();
        var setNumber = 5 + Math.floor(tileId / 256);
        return ImageManager_1.ImageManager.loadTileset(tileset.tilesetNames[setNumber]);
    };
    Sprite_Character.prototype.updateBitmap = function () {
        if (this.isImageChanged()) {
            this._tilesetId = globals_1.$gameMap.tilesetId();
            this._tileId = this._character.tileId();
            this._characterName = this._character.characterName();
            this._characterIndex = this._character.characterIndex();
            if (this._tileId > 0) {
                this.setTileBitmap();
            }
            else {
                this.setCharacterBitmap();
            }
        }
    };
    Sprite_Character.prototype.isImageChanged = function () {
        return (this._tilesetId !== globals_1.$gameMap.tilesetId() ||
            this._tileId !== this._character.tileId() ||
            this._characterName !== this._character.characterName() ||
            this._characterIndex !== this._character.characterIndex());
    };
    Sprite_Character.prototype.setTileBitmap = function () {
        this.bitmap = this.tilesetBitmap(this._tileId);
    };
    Sprite_Character.prototype.setCharacterBitmap = function () {
        this.bitmap = ImageManager_1.ImageManager.loadCharacter(this._characterName);
        this._isBigCharacter = ImageManager_1.ImageManager.isBigCharacter(this._characterName);
    };
    Sprite_Character.prototype.updateFrame = function () {
        if (this._tileId > 0) {
            this.updateTileFrame();
        }
        else {
            this.updateCharacterFrame();
        }
    };
    Sprite_Character.prototype.updateTileFrame = function () {
        var pw = this.patternWidth();
        var ph = this.patternHeight();
        var sx = ((Math.floor(this._tileId / 128) % 2) * 8 + (this._tileId % 8)) * pw;
        var sy = (Math.floor((this._tileId % 256) / 8) % 16) * ph;
        this.setFrame(sx, sy, pw, ph);
    };
    Sprite_Character.prototype.updateCharacterFrame = function () {
        var pw = this.patternWidth();
        var ph = this.patternHeight();
        var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
        var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
        this.updateHalfBodySprites();
        if (this._bushDepth > 0) {
            var d = this._bushDepth;
            this._upperBody.setFrame(sx, sy, pw, ph - d);
            this._lowerBody.setFrame(sx, sy + ph - d, pw, d);
            this.setFrame(sx, sy, 0, ph);
        }
        else {
            this.setFrame(sx, sy, pw, ph);
        }
    };
    Sprite_Character.prototype.characterBlockX = function () {
        if (this._isBigCharacter) {
            return 0;
        }
        else {
            var index = this._character.characterIndex();
            return (index % 4) * 3;
        }
    };
    Sprite_Character.prototype.characterBlockY = function () {
        if (this._isBigCharacter) {
            return 0;
        }
        else {
            var index = this._character.characterIndex();
            return Math.floor(index / 4) * 4;
        }
    };
    Sprite_Character.prototype.characterPatternX = function () {
        return this._character.pattern();
    };
    Sprite_Character.prototype.characterPatternY = function () {
        return (this._character.direction() - 2) / 2;
    };
    Sprite_Character.prototype.patternWidth = function () {
        if (this._tileId > 0) {
            return globals_1.$gameMap.tileWidth();
        }
        else if (this._isBigCharacter) {
            return this.bitmap.width / 3;
        }
        else {
            return this.bitmap.width / 12;
        }
    };
    Sprite_Character.prototype.patternHeight = function () {
        if (this._tileId > 0) {
            return globals_1.$gameMap.tileHeight();
        }
        else if (this._isBigCharacter) {
            return this.bitmap.height / 4;
        }
        else {
            return this.bitmap.height / 8;
        }
    };
    Sprite_Character.prototype.updateHalfBodySprites = function () {
        if (this._bushDepth > 0) {
            this.createHalfBodySprites();
            this._upperBody.bitmap = this.bitmap;
            this._upperBody.visible = true;
            this._upperBody.y = -this._bushDepth;
            this._lowerBody.bitmap = this.bitmap;
            this._lowerBody.visible = true;
            this._upperBody.setBlendColor(this.getBlendColor());
            this._lowerBody.setBlendColor(this.getBlendColor());
            this._upperBody.setColorTone(this.getColorTone());
            this._lowerBody.setColorTone(this.getColorTone());
        }
        else if (this._upperBody) {
            this._upperBody.visible = false;
            this._lowerBody.visible = false;
        }
    };
    Sprite_Character.prototype.createHalfBodySprites = function () {
        if (!this._upperBody) {
            this._upperBody = new Sprite_1.Sprite();
            this._upperBody.anchor.x = 0.5;
            this._upperBody.anchor.y = 1;
            this.addChild(this._upperBody);
        }
        if (!this._lowerBody) {
            this._lowerBody = new Sprite_1.Sprite();
            this._lowerBody.anchor.x = 0.5;
            this._lowerBody.anchor.y = 1;
            this._lowerBody.opacity = 128;
            this.addChild(this._lowerBody);
        }
    };
    Sprite_Character.prototype.updatePosition = function () {
        this.x = this._character.screenX();
        this.y = this._character.screenY();
        this.z = this._character.screenZ();
    };
    Sprite_Character.prototype.updateAnimation = function () {
        this.setupAnimation();
        if (!this.isAnimationPlaying()) {
            this._character.endAnimation();
        }
        if (!this.isBalloonPlaying()) {
            this._character.endBalloon();
        }
    };
    Sprite_Character.prototype.updateOther = function () {
        this.opacity = this._character.opacity();
        this.blendMode = this._character.blendMode();
        this._bushDepth = this._character.bushDepth();
    };
    Sprite_Character.prototype.setupAnimation = function () {
        if (this._character.animationId() > 0) {
            var animation = globals_1.$dataAnimations[this._character.animationId()];
            this.startAnimation(animation, false, 0);
            this._character.startAnimation();
        }
    };
    Sprite_Character.prototype.setupBalloon = function () {
        if (this._character.balloonId() > 0) {
            this.startBalloon();
            this._character.startBalloon();
        }
    };
    Sprite_Character.prototype.startBalloon = function () {
        if (!this._balloonSprite) {
            this._balloonSprite = new SpriteBalloon_1.Sprite_Balloon();
        }
        this._balloonSprite.setup(this._character.balloonId());
        this.parent.addChild(this._balloonSprite);
    };
    Sprite_Character.prototype.updateBalloon = function () {
        this.setupBalloon();
        if (this._balloonSprite) {
            this._balloonSprite.x = this.x;
            this._balloonSprite.y = this.y - this.height;
            if (!this._balloonSprite.isPlaying()) {
                this.endBalloon();
            }
        }
    };
    Sprite_Character.prototype.endBalloon = function () {
        if (this._balloonSprite) {
            this.parent.removeChild(this._balloonSprite);
            this._balloonSprite = null;
        }
    };
    Sprite_Character.prototype.isBalloonPlaying = function () {
        return !!this._balloonSprite;
    };
    return Sprite_Character;
}(SpriteBase_1.Sprite_Base));
exports.Sprite_Character = Sprite_Character;

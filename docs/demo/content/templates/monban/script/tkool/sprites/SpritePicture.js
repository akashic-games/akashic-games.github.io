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
exports.Sprite_Picture = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var Sprite_Picture = /** @class */ (function (_super) {
    __extends(Sprite_Picture, _super);
    function Sprite_Picture(scene, pictureId) {
        return _super.call(this, scene, pictureId) || this;
        // if (Object.getPrototypeOf(this) === Sprite_Picture.prototype) {
        // 	this.initialize(param.pictureId);
        // }
    }
    Sprite_Picture.prototype.initialize = function (pictureId) {
        _super.prototype.initialize.call(this);
        this._pictureId = pictureId;
        this._pictureName = "";
        this._isPicture = true;
        this.update();
    };
    Sprite_Picture.prototype.picture = function () {
        return DataManager_1.$gameScreen.picture(this._pictureId);
    };
    Sprite_Picture.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateBitmap();
        if (this.visible) {
            this.updateOrigin();
            this.updatePosition();
            this.updateScale();
            this.updateTone();
            this.updateOther();
        }
    };
    Sprite_Picture.prototype.updateBitmap = function () {
        var picture = this.picture();
        if (picture) {
            var pictureName = picture.name();
            if (this._pictureName !== pictureName) {
                this._pictureName = pictureName;
                this.loadBitmap();
            }
            this.visible = true;
        }
        else {
            this._pictureName = "";
            this.bitmap = null;
            this.visible = false;
        }
    };
    Sprite_Picture.prototype.updateOrigin = function () {
        var picture = this.picture();
        if (picture.origin() === 0) {
            this.anchor.x = 0;
            this.anchor.y = 0;
        }
        else {
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
        }
    };
    Sprite_Picture.prototype.updatePosition = function () {
        var picture = this.picture();
        this.x = Math.floor(picture.x());
        this.y = Math.floor(picture.y());
    };
    Sprite_Picture.prototype.updateScale = function () {
        var picture = this.picture();
        this.scale.x = picture.scaleX() / 100;
        this.scale.y = picture.scaleY() / 100;
    };
    Sprite_Picture.prototype.updateTone = function () {
        var picture = this.picture();
        if (picture.tone()) {
            this.setColorTone(picture.tone());
        }
        else {
            this.setColorTone([0, 0, 0, 0]);
        }
    };
    Sprite_Picture.prototype.updateOther = function () {
        var picture = this.picture();
        this.opacity = picture.opacity();
        // TODO: impl
        // this.blendMode = picture.blendMode();
        this.rotation = (picture.angle() * Math.PI) / 180;
    };
    Sprite_Picture.prototype.loadBitmap = function () {
        this.bitmap = managers_1.ImageManager.loadPicture(this._pictureName);
    };
    return Sprite_Picture;
}(core_1.Sprite));
exports.Sprite_Picture = Sprite_Picture;

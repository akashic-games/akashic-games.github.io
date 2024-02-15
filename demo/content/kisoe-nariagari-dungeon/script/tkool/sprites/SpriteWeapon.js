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
exports.Sprite_Weapon = void 0;
var managers_1 = require("../managers");
var SpriteBase_1 = require("./SpriteBase");
var Sprite_Weapon = /** @class */ (function (_super) {
    __extends(Sprite_Weapon, _super);
    function Sprite_Weapon() {
        return _super.call(this) || this;
    }
    Sprite_Weapon.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.initMembers();
    };
    Sprite_Weapon.prototype.initMembers = function () {
        this._weaponImageId = 0;
        this._animationCount = 0;
        this._pattern = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.x = -16;
    };
    Sprite_Weapon.prototype.setup = function (weaponImageId) {
        this._weaponImageId = weaponImageId;
        this._animationCount = 0;
        this._pattern = 0;
        this.loadBitmap();
        this.updateFrame();
    };
    Sprite_Weapon.prototype.update = function () {
        SpriteBase_1.Sprite_Base.prototype.update.call(this);
        this._animationCount++;
        if (this._animationCount >= this.animationWait()) {
            this.updatePattern();
            this.updateFrame();
            this._animationCount = 0;
        }
    };
    Sprite_Weapon.prototype.animationWait = function () {
        return 12;
    };
    Sprite_Weapon.prototype.updatePattern = function () {
        this._pattern++;
        if (this._pattern >= 3) {
            this._weaponImageId = 0;
        }
    };
    Sprite_Weapon.prototype.loadBitmap = function () {
        var pageId = Math.floor((this._weaponImageId - 1) / 12) + 1;
        if (pageId >= 1) {
            this.bitmap = managers_1.ImageManager.loadSystem("Weapons" + pageId);
        }
        else {
            this.bitmap = managers_1.ImageManager.loadSystem("");
        }
    };
    Sprite_Weapon.prototype.updateFrame = function () {
        if (this._weaponImageId > 0) {
            var index = (this._weaponImageId - 1) % 12;
            var w = 96;
            var h = 64;
            var sx = (Math.floor(index / 6) * 3 + this._pattern) * w;
            var sy = Math.floor(index % 6) * h;
            this.setFrame(sx, sy, w, h);
        }
        else {
            this.setFrame(0, 0, 0, 0);
        }
    };
    Sprite_Weapon.prototype.isPlaying = function () {
        return this._weaponImageId > 0;
    };
    return Sprite_Weapon;
}(SpriteBase_1.Sprite_Base));
exports.Sprite_Weapon = Sprite_Weapon;

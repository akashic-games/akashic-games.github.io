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
exports.Spriteset_Battle = void 0;
var Graphics_1 = require("../core/Graphics");
var Sprite_1 = require("../core/Sprite");
var TilingSprite_1 = require("../core/TilingSprite");
var BattleManager_1 = require("../managers/BattleManager");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SceneManager_1 = require("../managers/SceneManager");
var SpriteActor_1 = require("./SpriteActor");
var SpriteEnemy_1 = require("./SpriteEnemy");
var SpritesetBase_1 = require("./SpritesetBase");
var Spriteset_Battle = /** @class */ (function (_super) {
    __extends(Spriteset_Battle, _super);
    function Spriteset_Battle() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Spriteset_Battle.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this._battlebackLocated = false;
    };
    Spriteset_Battle.prototype.createLowerLayer = function () {
        _super.prototype.createLowerLayer.call(this);
        this.createBackground();
        this.createBattleField();
        this.createBattleback();
        this.createEnemies();
        this.createActors();
    };
    Spriteset_Battle.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite_1.Sprite();
        this._backgroundSprite.bitmap = SceneManager_1.SceneManager.backgroundBitmap();
        this._baseSprite.addChild(this._backgroundSprite);
    };
    Spriteset_Battle.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateActors();
        this.updateBattleback();
    };
    Spriteset_Battle.prototype.createBattleField = function () {
        var width = Graphics_1.Graphics.boxWidth;
        var height = Graphics_1.Graphics.boxHeight;
        var x = (Graphics_1.Graphics.width - width) / 2;
        var y = (Graphics_1.Graphics.height - height) / 2;
        this._battleField = new Sprite_1.Sprite();
        this._battleField.setFrame(x, y, width, height);
        this._battleField.x = x;
        this._battleField.y = y;
        this._baseSprite.addChild(this._battleField);
    };
    Spriteset_Battle.prototype.createBattleback = function () {
        var margin = 32;
        var x = -this._battleField.x - margin;
        var y = -this._battleField.y - margin;
        var width = Graphics_1.Graphics.width + margin * 2;
        var height = Graphics_1.Graphics.height + margin * 2;
        this._back1Sprite = new TilingSprite_1.TilingSprite();
        this._back2Sprite = new TilingSprite_1.TilingSprite();
        this._back1Sprite.bitmap = this.battleback1Bitmap();
        this._back2Sprite.bitmap = this.battleback2Bitmap();
        this._back1Sprite.move(x, y, width, height);
        this._back2Sprite.move(x, y, width, height);
        this._battleField.addChild(this._back1Sprite);
        this._battleField.addChild(this._back2Sprite);
    };
    Spriteset_Battle.prototype.updateBattleback = function () {
        if (!this._battlebackLocated) {
            this.locateBattleback();
            this._battlebackLocated = true;
        }
    };
    Spriteset_Battle.prototype.locateBattleback = function () {
        var width = this._battleField.width;
        var height = this._battleField.height;
        var sprite1 = this._back1Sprite;
        var sprite2 = this._back2Sprite;
        sprite1.origin.x = sprite1.x + (sprite1.bitmap.width - width) / 2;
        sprite2.origin.x = sprite1.y + (sprite2.bitmap.width - width) / 2;
        if (globals_1.$gameSystem.isSideView()) {
            sprite1.origin.y = sprite1.x + sprite1.bitmap.height - height;
            sprite2.origin.y = sprite1.y + sprite2.bitmap.height - height;
        }
    };
    Spriteset_Battle.prototype.battleback1Bitmap = function () {
        return ImageManager_1.ImageManager.loadBattleback1(this.battleback1Name());
    };
    Spriteset_Battle.prototype.battleback2Bitmap = function () {
        return ImageManager_1.ImageManager.loadBattleback2(this.battleback2Name());
    };
    Spriteset_Battle.prototype.battleback1Name = function () {
        if (BattleManager_1.BattleManager.isBattleTest()) {
            return globals_1.$dataSystem.battleback1Name;
        }
        else if (globals_1.$gameMap.battleback1Name()) {
            return globals_1.$gameMap.battleback1Name();
        }
        else if (globals_1.$gameMap.isOverworld()) {
            return this.overworldBattleback1Name();
        }
        else {
            return "";
        }
    };
    Spriteset_Battle.prototype.battleback2Name = function () {
        if (BattleManager_1.BattleManager.isBattleTest()) {
            return globals_1.$dataSystem.battleback2Name;
        }
        else if (globals_1.$gameMap.battleback2Name()) {
            return globals_1.$gameMap.battleback2Name();
        }
        else if (globals_1.$gameMap.isOverworld()) {
            return this.overworldBattleback2Name();
        }
        else {
            return "";
        }
    };
    Spriteset_Battle.prototype.overworldBattleback1Name = function () {
        if (globals_1.$gameMap.battleback1Name() === "")
            return "";
        if (globals_1.$gamePlayer.isInVehicle()) {
            return this.shipBattleback1Name();
        }
        else {
            return this.normalBattleback1Name();
        }
    };
    Spriteset_Battle.prototype.overworldBattleback2Name = function () {
        if (globals_1.$gameMap.battleback2Name() === "")
            return "";
        if (globals_1.$gamePlayer.isInVehicle()) {
            return this.shipBattleback2Name();
        }
        else {
            return this.normalBattleback2Name();
        }
    };
    Spriteset_Battle.prototype.normalBattleback1Name = function () {
        return (this.terrainBattleback1Name(this.autotileType(1)) ||
            this.terrainBattleback1Name(this.autotileType(0)) ||
            this.defaultBattleback1Name());
    };
    Spriteset_Battle.prototype.normalBattleback2Name = function () {
        return (this.terrainBattleback2Name(this.autotileType(1)) ||
            this.terrainBattleback2Name(this.autotileType(0)) ||
            this.defaultBattleback2Name());
    };
    Spriteset_Battle.prototype.terrainBattleback1Name = function (type) {
        switch (type) {
            case 24:
            case 25:
                return "Wasteland";
            case 26:
            case 27:
                return "DirtField";
            case 32:
            case 33:
                return "Desert";
            case 34:
                return "Lava1";
            case 35:
                return "Lava2";
            case 40:
            case 41:
                return "Snowfield";
            case 42:
                return "Clouds";
            case 4:
            case 5:
                return "PoisonSwamp";
            default:
                return null;
        }
    };
    Spriteset_Battle.prototype.terrainBattleback2Name = function (type) {
        switch (type) {
            case 20:
            case 21:
                return "Forest";
            case 22:
            case 30:
            case 38:
                return "Cliff";
            case 24:
            case 25:
            case 26:
            case 27:
                return "Wasteland";
            case 32:
            case 33:
                return "Desert";
            case 34:
            case 35:
                return "Lava";
            case 40:
            case 41:
                return "Snowfield";
            case 42:
                return "Clouds";
            case 4:
            case 5:
                return "PoisonSwamp";
        }
    };
    Spriteset_Battle.prototype.defaultBattleback1Name = function () {
        return "Grassland";
    };
    Spriteset_Battle.prototype.defaultBattleback2Name = function () {
        return "Grassland";
    };
    Spriteset_Battle.prototype.shipBattleback1Name = function () {
        return "Ship";
    };
    Spriteset_Battle.prototype.shipBattleback2Name = function () {
        return "Ship";
    };
    Spriteset_Battle.prototype.autotileType = function (z) {
        return globals_1.$gameMap.autotileType(globals_1.$gamePlayer.x, globals_1.$gamePlayer.y, z);
    };
    Spriteset_Battle.prototype.createEnemies = function () {
        var enemies = globals_1.$gameTroop.members();
        var sprites = [];
        for (var i = 0; i < enemies.length; i++) {
            sprites[i] = new SpriteEnemy_1.Sprite_Enemy(enemies[i]);
        }
        sprites.sort(this.compareEnemySprite.bind(this));
        for (var j = 0; j < sprites.length; j++) {
            this._battleField.addChild(sprites[j]);
        }
        this._enemySprites = sprites;
    };
    Spriteset_Battle.prototype.compareEnemySprite = function (a, b) {
        if (a.y !== b.y) {
            return a.y - b.y;
        }
        else {
            return b.spriteId - a.spriteId;
        }
    };
    Spriteset_Battle.prototype.createActors = function () {
        this._actorSprites = [];
        for (var i = 0; i < globals_1.$gameParty.maxBattleMembers(); i++) {
            this._actorSprites[i] = new SpriteActor_1.Sprite_Actor();
            this._battleField.addChild(this._actorSprites[i]);
        }
    };
    Spriteset_Battle.prototype.updateActors = function () {
        var members = globals_1.$gameParty.battleMembers();
        for (var i = 0; i < this._actorSprites.length; i++) {
            this._actorSprites[i].setBattler(members[i]);
        }
    };
    Spriteset_Battle.prototype.battlerSprites = function () {
        // return this._enemySprites.concat(this._actorSprites);
        return new Array().concat(this._enemySprites, this._actorSprites);
    };
    Spriteset_Battle.prototype.isAnimationPlaying = function () {
        return this.battlerSprites().some(function (sprite) {
            return sprite.isAnimationPlaying();
        });
    };
    Spriteset_Battle.prototype.isEffecting = function () {
        return this.battlerSprites().some(function (sprite) {
            return sprite.isEffecting();
        });
    };
    Spriteset_Battle.prototype.isAnyoneMoving = function () {
        return this.battlerSprites().some(function (sprite) {
            return sprite.isMoving();
        });
    };
    Spriteset_Battle.prototype.isBusy = function () {
        return this.isAnimationPlaying() || this.isAnyoneMoving();
    };
    return Spriteset_Battle;
}(SpritesetBase_1.Spriteset_Base));
exports.Spriteset_Battle = Spriteset_Battle;

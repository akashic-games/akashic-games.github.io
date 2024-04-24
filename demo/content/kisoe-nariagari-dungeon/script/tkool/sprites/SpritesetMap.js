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
exports.Spriteset_Map = void 0;
var Graphics_1 = require("../core/Graphics");
var Sprite_1 = require("../core/Sprite");
var Tilemap_1 = require("../core/Tilemap");
var TilingSprite_1 = require("../core/TilingSprite");
var Utils_1 = require("../core/Utils");
var Weather_1 = require("../core/Weather");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SpriteCharacter_1 = require("./SpriteCharacter");
var SpriteDestination_1 = require("./SpriteDestination");
var SpritesetBase_1 = require("./SpritesetBase");
var Spriteset_Map = /** @class */ (function (_super) {
    __extends(Spriteset_Map, _super);
    function Spriteset_Map() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    Spriteset_Map.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    Spriteset_Map.prototype.createLowerLayer = function () {
        _super.prototype.createLowerLayer.call(this);
        this.createParallax();
        this.createTilemap();
        this.createCharacters();
        this.createShadow();
        this.createDestination();
        this.createWeather();
    };
    Spriteset_Map.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateTileset();
        this.updateParallax();
        this.updateTilemap();
        this.updateShadow();
        this.updateWeather();
    };
    Spriteset_Map.prototype.hideCharacters = function () {
        for (var i = 0; i < this._characterSprites.length; i++) {
            var sprite = this._characterSprites[i];
            if (!sprite.isTile()) {
                sprite.hide();
            }
        }
    };
    Spriteset_Map.prototype.createParallax = function () {
        this._parallax = new TilingSprite_1.TilingSprite();
        this._parallax.move(0, 0, Graphics_1.Graphics.width, Graphics_1.Graphics.height);
        this._baseSprite.addChild(this._parallax);
    };
    Spriteset_Map.prototype.createTilemap = function () {
        // if (Graphics.isWebGL()) {
        // 	this._tilemap = new ShaderTilemap();
        // } else {
        // 	this._tilemap = new Tilemap();
        // }
        this._tilemap = new Tilemap_1.Tilemap();
        this._tilemap.tileWidth = globals_1.$gameMap.tileWidth();
        this._tilemap.tileHeight = globals_1.$gameMap.tileHeight();
        this._tilemap.setData(globals_1.$gameMap.width(), globals_1.$gameMap.height(), globals_1.$gameMap.data());
        this._tilemap.horizontalWrap = globals_1.$gameMap.isLoopHorizontal();
        this._tilemap.verticalWrap = globals_1.$gameMap.isLoopVertical();
        this.loadTileset();
        this._baseSprite.addChild(this._tilemap);
    };
    Spriteset_Map.prototype.loadTileset = function () {
        this._tileset = globals_1.$gameMap.tileset();
        if (this._tileset) {
            var tilesetNames = this._tileset.tilesetNames;
            for (var i = 0; i < tilesetNames.length; i++) {
                this._tilemap.bitmaps[i] = ImageManager_1.ImageManager.loadTileset(tilesetNames[i]);
            }
            var newTilesetFlags = globals_1.$gameMap.tilesetFlags();
            this._tilemap.refreshTileset();
            if ( /* !this._tilemap.flags.equals(newTilesetFlags)*/!Utils_1.Utils.equals(this._tilemap.flags, newTilesetFlags)) {
                this._tilemap.refresh();
            }
            this._tilemap.flags = newTilesetFlags;
        }
    };
    Spriteset_Map.prototype.createCharacters = function () {
        var _this = this;
        this._characterSprites = [];
        globals_1.$gameMap.events().forEach(function (event) {
            _this._characterSprites.push(new SpriteCharacter_1.Sprite_Character(event));
        });
        globals_1.$gameMap.vehicles().forEach(function (vehicle) {
            _this._characterSprites.push(new SpriteCharacter_1.Sprite_Character(vehicle));
        });
        globals_1.$gamePlayer.followers().reverseEach(function (follower) {
            _this._characterSprites.push(new SpriteCharacter_1.Sprite_Character(follower));
        });
        this._characterSprites.push(new SpriteCharacter_1.Sprite_Character(globals_1.$gamePlayer));
        for (var i = 0; i < this._characterSprites.length; i++) {
            this._tilemap.addChild(this._characterSprites[i]);
        }
    };
    Spriteset_Map.prototype.createShadow = function () {
        this._shadowSprite = new Sprite_1.Sprite();
        this._shadowSprite.bitmap = ImageManager_1.ImageManager.loadSystem("Shadow1");
        this._shadowSprite.anchor.x = 0.5;
        this._shadowSprite.anchor.y = 1;
        this._shadowSprite.z = 6;
        this._tilemap.addChild(this._shadowSprite);
    };
    Spriteset_Map.prototype.createDestination = function () {
        this._destinationSprite = new SpriteDestination_1.Sprite_Destination();
        this._destinationSprite.z = 9;
        this._tilemap.addChild(this._destinationSprite);
    };
    Spriteset_Map.prototype.createWeather = function () {
        this._weather = new Weather_1.Weather();
        this.addChild(this._weather);
    };
    Spriteset_Map.prototype.updateTileset = function () {
        if (this._tileset !== globals_1.$gameMap.tileset()) {
            this.loadTileset();
        }
    };
    /*
     * Simple fix for canvas parallax issue, destroy old parallax and readd to  the tree.
     */
    Spriteset_Map.prototype._canvasReAddParallax = function () {
        var index = this._baseSprite.children.indexOf(this._parallax);
        this._baseSprite.removeChild(this._parallax);
        this._parallax = new TilingSprite_1.TilingSprite();
        this._parallax.move(0, 0, Graphics_1.Graphics.width, Graphics_1.Graphics.height);
        this._parallax.bitmap = ImageManager_1.ImageManager.loadParallax(this._parallaxName);
        this._baseSprite.addChildAt(this._parallax, index);
    };
    Spriteset_Map.prototype.updateParallax = function () {
        if (this._parallaxName !== globals_1.$gameMap.parallaxName()) {
            this._parallaxName = globals_1.$gameMap.parallaxName();
            if (this._parallax.bitmap && /* Graphics.isWebGL() != true*/ !Graphics_1.Graphics.isWebGL()) {
                this._canvasReAddParallax();
            }
            else {
                this._parallax.bitmap = ImageManager_1.ImageManager.loadParallax(this._parallaxName);
            }
        }
        if (this._parallax.bitmap) {
            this._parallax.origin.x = globals_1.$gameMap.parallaxOx();
            this._parallax.origin.y = globals_1.$gameMap.parallaxOy();
        }
    };
    Spriteset_Map.prototype.updateTilemap = function () {
        this._tilemap.origin.x = globals_1.$gameMap.displayX() * globals_1.$gameMap.tileWidth();
        this._tilemap.origin.y = globals_1.$gameMap.displayY() * globals_1.$gameMap.tileHeight();
    };
    Spriteset_Map.prototype.updateShadow = function () {
        var airship = globals_1.$gameMap.airship();
        this._shadowSprite.x = airship.shadowX();
        this._shadowSprite.y = airship.shadowY();
        this._shadowSprite.opacity = airship.shadowOpacity();
    };
    Spriteset_Map.prototype.updateWeather = function () {
        this._weather.type = globals_1.$gameScreen.weatherType();
        this._weather.power = globals_1.$gameScreen.weatherPower();
        this._weather.origin.x = globals_1.$gameMap.displayX() * globals_1.$gameMap.tileWidth();
        this._weather.origin.y = globals_1.$gameMap.displayY() * globals_1.$gameMap.tileHeight();
    };
    return Spriteset_Map;
}(SpritesetBase_1.Spriteset_Base));
exports.Spriteset_Map = Spriteset_Map;

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
exports.Sprite_Destination = void 0;
var core_1 = require("../core");
var DataManager_1 = require("../managers/DataManager");
var Sprite_Destination = /** @class */ (function (_super) {
    __extends(Sprite_Destination, _super);
    function Sprite_Destination(scene) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([scene], args, false)) || this;
    }
    Sprite_Destination.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.createBitmap();
        this._frameCount = 0;
    };
    Sprite_Destination.prototype.update = function () {
        _super.prototype.update.call(this);
        if (DataManager_1.$gameTemp.isDestinationValid()) {
            this.updatePosition();
            this.updateAnimation();
            this.visible = true;
        }
        else {
            this._frameCount = 0;
            this.visible = false;
        }
    };
    Sprite_Destination.prototype.createBitmap = function () {
        var tileWidth = DataManager_1.$gameMap.tileWidth();
        var tileHeight = DataManager_1.$gameMap.tileHeight();
        this.bitmap = new core_1.Bitmap(tileWidth, tileHeight);
        this.bitmap.fillAll("white");
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.blendMode = core_1.Graphics.BLEND_ADD;
    };
    Sprite_Destination.prototype.updatePosition = function () {
        var tileWidth = DataManager_1.$gameMap.tileWidth();
        var tileHeight = DataManager_1.$gameMap.tileHeight();
        var x = DataManager_1.$gameTemp.destinationX();
        var y = DataManager_1.$gameTemp.destinationY();
        this.x = (DataManager_1.$gameMap.adjustX(x) + 0.5) * tileWidth;
        this.y = (DataManager_1.$gameMap.adjustY(y) + 0.5) * tileHeight;
    };
    Sprite_Destination.prototype.updateAnimation = function () {
        this._frameCount++;
        this._frameCount %= 20;
        this.opacity = (20 - this._frameCount) * 6;
        this.scale.x = 1 + this._frameCount / 20;
        this.scale.y = this.scale.x;
    };
    return Sprite_Destination;
}(core_1.Sprite));
exports.Sprite_Destination = Sprite_Destination;

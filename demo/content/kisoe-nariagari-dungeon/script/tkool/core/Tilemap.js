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
exports.Tilemap = void 0;
var core_1 = require("../core");
var PIXI_1 = require("../PIXI");
var Tilemap = /** @class */ (function (_super) {
    __extends(Tilemap, _super);
    function Tilemap(scene) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, __spreadArray([scene], args, false)) || this;
        // if (Object.getPrototypeOf(this) === Tilemap.prototype) {
        // 	this.initialize();
        // }
    }
    Tilemap.isVisibleTile = function (tileId) {
        return tileId > 0 && tileId < this.TILE_ID_MAX;
    };
    Tilemap.isAutotile = function (tileId) {
        return tileId >= this.TILE_ID_A1;
    };
    Tilemap.getAutotileKind = function (tileId) {
        return Math.floor((tileId - this.TILE_ID_A1) / 48);
    };
    Tilemap.getAutotileShape = function (tileId) {
        return (tileId - this.TILE_ID_A1) % 48;
    };
    Tilemap.makeAutotileId = function (kind, shape) {
        return this.TILE_ID_A1 + kind * 48 + shape;
    };
    Tilemap.isSameKindTile = function (tileID1, tileID2) {
        if (this.isAutotile(tileID1) && this.isAutotile(tileID2)) {
            return this.getAutotileKind(tileID1) === this.getAutotileKind(tileID2);
        }
        else {
            return tileID1 === tileID2;
        }
    };
    Tilemap.isTileA1 = function (tileId) {
        return tileId >= this.TILE_ID_A1 && tileId < this.TILE_ID_A2;
    };
    Tilemap.isTileA2 = function (tileId) {
        return tileId >= this.TILE_ID_A2 && tileId < this.TILE_ID_A3;
    };
    Tilemap.isTileA3 = function (tileId) {
        return tileId >= this.TILE_ID_A3 && tileId < this.TILE_ID_A4;
    };
    Tilemap.isTileA4 = function (tileId) {
        return tileId >= this.TILE_ID_A4 && tileId < this.TILE_ID_MAX;
    };
    Tilemap.isTileA5 = function (tileId) {
        return tileId >= this.TILE_ID_A5 && tileId < this.TILE_ID_A1;
    };
    Tilemap.isWaterTile = function (tileId) {
        if (this.isTileA1(tileId)) {
            return !(tileId >= this.TILE_ID_A1 + 96 && tileId < this.TILE_ID_A1 + 192);
        }
        else {
            return false;
        }
    };
    Tilemap.isWaterfallTile = function (tileId) {
        if (tileId >= this.TILE_ID_A1 + 192 && tileId < this.TILE_ID_A2) {
            return this.getAutotileKind(tileId) % 2 === 1;
        }
        else {
            return false;
        }
    };
    Tilemap.isGroundTile = function (tileId) {
        return this.isTileA1(tileId) || this.isTileA2(tileId) || this.isTileA5(tileId);
    };
    Tilemap.isShadowingTile = function (tileId) {
        return this.isTileA3(tileId) || this.isTileA4(tileId);
    };
    Tilemap.isRoofTile = function (tileId) {
        return this.isTileA3(tileId) && this.getAutotileKind(tileId) % 16 < 8;
    };
    Tilemap.isWallTopTile = function (tileId) {
        return this.isTileA4(tileId) && this.getAutotileKind(tileId) % 16 < 8;
    };
    Tilemap.isWallSideTile = function (tileId) {
        return (this.isTileA3(tileId) || this.isTileA4(tileId)) && this.getAutotileKind(tileId) % 16 >= 8;
    };
    Tilemap.isWallTile = function (tileId) {
        return this.isWallTopTile(tileId) || this.isWallSideTile(tileId);
    };
    Tilemap.isFloorTypeAutotile = function (tileId) {
        return (this.isTileA1(tileId) && !this.isWaterfallTile(tileId)) || this.isTileA2(tileId) || this.isWallTopTile(tileId);
    };
    Tilemap.isWallTypeAutotile = function (tileId) {
        return this.isRoofTile(tileId) || this.isWallSideTile(tileId);
    };
    Tilemap.isWaterfallTypeAutotile = function (tileId) {
        return this.isWaterfallTile(tileId);
    };
    Tilemap.prototype.initialize = function () {
        this._margin = 20;
        this._width = core_1.Graphics.width + this._margin * 2;
        this._height = core_1.Graphics.height + this._margin * 2;
        this._tileWidth = 48;
        this._tileHeight = 48;
        this._mapWidth = 0;
        this._mapHeight = 0;
        this._mapData = null;
        this._layerWidth = 0;
        this._layerHeight = 0;
        this._lastTiles = [];
        this.bitmaps = [];
        this.origin = new PIXI_1.Point();
        this.flags = [];
        this.animationCount = 0;
        this.horizontalWrap = false;
        this.verticalWrap = false;
        this._initialized = true;
        this._createLayers();
        this.refresh();
    };
    Object.defineProperty(Tilemap.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (this._width !== value) {
                this._width = value;
                this._createLayers();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tilemap.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (this._height !== value) {
                this._height = value;
                this._createLayers();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tilemap.prototype, "tileWidth", {
        get: function () {
            return this._tileWidth;
        },
        set: function (value) {
            if (this._tileWidth !== value) {
                this._tileWidth = value;
                this._createLayers();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tilemap.prototype, "tileHeight", {
        get: function () {
            return this._tileHeight;
        },
        set: function (value) {
            if (this._tileHeight !== value) {
                this._tileHeight = value;
                this._createLayers();
            }
        },
        enumerable: false,
        configurable: true
    });
    Tilemap.prototype.setData = function (width, height, data) {
        this._mapWidth = width;
        this._mapHeight = height;
        this._mapData = data;
    };
    Tilemap.prototype.isReady = function () {
        for (var i = 0; i < this.bitmaps.length; i++) {
            if (this.bitmaps[i] && !this.bitmaps[i].isReady()) {
                return false;
            }
        }
        return true;
    };
    Tilemap.prototype.update = function () {
        this.animationCount++;
        this.animationFrame = Math.floor(this.animationCount / 30);
        this.children.forEach(function (child) {
            if (child.update) {
                child.update();
            }
        });
        for (var i = 0; i < this.bitmaps.length; i++) {
            if (this.bitmaps[i]) {
                this.bitmaps[i].touch();
            }
        }
    };
    Tilemap.prototype.refresh = function () {
        if (!this._initialized) {
            return;
        }
        this._lastTiles.length = 0;
    };
    Tilemap.prototype.refreshTileset = function () {
        // noting to do.
    };
    Tilemap.prototype.updateTransform = function () {
        var ox = Math.floor(this.origin.x);
        var oy = Math.floor(this.origin.y);
        var startX = Math.floor((ox - this._margin) / this._tileWidth);
        var startY = Math.floor((oy - this._margin) / this._tileHeight);
        this._updateLayerPositions(startX, startY);
        if (this._needsRepaint ||
            this._lastAnimationFrame !== this.animationFrame ||
            this._lastStartX !== startX ||
            this._lastStartY !== startY) {
            this._frameUpdated = this._lastAnimationFrame !== this.animationFrame;
            this._lastAnimationFrame = this.animationFrame;
            this._lastStartX = startX;
            this._lastStartY = startY;
            this._paintAllTiles(startX, startY);
            this._needsRepaint = false;
        }
        this._sortChildren();
        _super.prototype.updateTransform.call(this);
    };
    /**
     * @method _createLayers
     * @private
     */
    Tilemap.prototype._createLayers = function () {
        if (!this._initialized) {
            return;
        }
        var width = this._width;
        var height = this._height;
        var margin = this._margin;
        var tileCols = Math.ceil(width / this._tileWidth) + 1;
        var tileRows = Math.ceil(height / this._tileHeight) + 1;
        var layerWidth = tileCols * this._tileWidth;
        var layerHeight = tileRows * this._tileHeight;
        this._lowerBitmap = new core_1.Bitmap(layerWidth, layerHeight);
        this._upperBitmap = new core_1.Bitmap(layerWidth, layerHeight);
        this._layerWidth = layerWidth;
        this._layerHeight = layerHeight;
        /*
         * Z coordinate:
         *
         * 0 : Lower tiles
         * 1 : Lower characters
         * 3 : Normal characters
         * 4 : Upper tiles
         * 5 : Upper characters
         * 6 : Airship shadow
         * 7 : Balloon
         * 8 : Animation
         * 9 : Destination
         */
        this._lowerLayer = new core_1.Sprite(this.scene);
        this._lowerLayer.move(-margin, -margin, width, height);
        this._lowerLayer.z = 0;
        this._upperLayer = new core_1.Sprite(this.scene);
        this._upperLayer.move(-margin, -margin, width, height);
        this._upperLayer.z = 4;
        for (var i = 0; i < 4; i++) {
            this._lowerLayer.addChild(new core_1.Sprite(this.scene, this._lowerBitmap));
            this._upperLayer.addChild(new core_1.Sprite(this.scene, this._upperBitmap));
        }
        this.addChild(this._lowerLayer);
        this.addChild(this._upperLayer);
    };
    Tilemap.prototype._updateLayerPositions = function (_startX, _startY) {
        var m = this._margin;
        var ox = Math.floor(this.origin.x);
        var oy = Math.floor(this.origin.y);
        var x2 = core_1.Utils.mod(ox - m, this._layerWidth);
        var y2 = core_1.Utils.mod(oy - m, this._layerHeight);
        var w1 = this._layerWidth - x2;
        var h1 = this._layerHeight - y2;
        var w2 = this._width - w1;
        var h2 = this._height - h1;
        for (var i = 0; i < 2; i++) {
            var children = void 0;
            if (i === 0) {
                children = this._lowerLayer.children; // Spriteであること前提に見える
            }
            else {
                children = this._upperLayer.children;
            }
            children[0].move(0, 0, w1, h1);
            children[0].setFrame(x2, y2, w1, h1);
            children[1].move(w1, 0, w2, h1);
            children[1].setFrame(0, y2, w2, h1);
            children[2].move(0, h1, w1, h2);
            children[2].setFrame(x2, 0, w1, h2);
            children[3].move(w1, h1, w2, h2);
            children[3].setFrame(0, 0, w2, h2);
        }
    };
    Tilemap.prototype._paintAllTiles = function (startX, startY) {
        var tileCols = Math.ceil(this._width / this._tileWidth) + 1;
        var tileRows = Math.ceil(this._height / this._tileHeight) + 1;
        for (var y = 0; y < tileRows; y++) {
            for (var x = 0; x < tileCols; x++) {
                this._paintTiles(startX, startY, x, y);
            }
        }
    };
    Tilemap.prototype._paintTiles = function (startX, startY, x, y) {
        var tableEdgeVirtualId = 10000;
        var mx = startX + x;
        var my = startY + y;
        var dx = core_1.Utils.mod(mx * this._tileWidth, this._layerWidth);
        var dy = core_1.Utils.mod(my * this._tileHeight, this._layerHeight);
        var lx = dx / this._tileWidth;
        var ly = dy / this._tileHeight;
        var tileId0 = this._readMapData(mx, my, 0);
        var tileId1 = this._readMapData(mx, my, 1);
        var tileId2 = this._readMapData(mx, my, 2);
        var tileId3 = this._readMapData(mx, my, 3);
        var shadowBits = this._readMapData(mx, my, 4);
        var upperTileId1 = this._readMapData(mx, my - 1, 1);
        var lowerTiles = [];
        var upperTiles = [];
        if (this._isHigherTile(tileId0)) {
            upperTiles.push(tileId0);
        }
        else {
            lowerTiles.push(tileId0);
        }
        if (this._isHigherTile(tileId1)) {
            upperTiles.push(tileId1);
        }
        else {
            lowerTiles.push(tileId1);
        }
        lowerTiles.push(-shadowBits);
        if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
            if (!Tilemap.isShadowingTile(tileId0)) {
                lowerTiles.push(tableEdgeVirtualId + upperTileId1);
            }
        }
        if (this._isOverpassPosition(mx, my)) {
            upperTiles.push(tileId2);
            upperTiles.push(tileId3);
        }
        else {
            if (this._isHigherTile(tileId2)) {
                upperTiles.push(tileId2);
            }
            else {
                lowerTiles.push(tileId2);
            }
            if (this._isHigherTile(tileId3)) {
                upperTiles.push(tileId3);
            }
            else {
                lowerTiles.push(tileId3);
            }
        }
        var lastLowerTiles = this._readLastTiles(0, lx, ly);
        if (!core_1.Utils.equals(lowerTiles, lastLowerTiles) || (Tilemap.isTileA1(tileId0) && this._frameUpdated)) {
            this._lowerBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
            for (var i = 0; i < lowerTiles.length; i++) {
                var lowerTileId = lowerTiles[i];
                if (lowerTileId < 0) {
                    this._drawShadow(this._lowerBitmap, shadowBits, dx, dy);
                }
                else if (lowerTileId >= tableEdgeVirtualId) {
                    this._drawTableEdge(this._lowerBitmap, upperTileId1, dx, dy);
                }
                else {
                    this._drawTile(this._lowerBitmap, lowerTileId, dx, dy);
                }
            }
            this._writeLastTiles(0, lx, ly, lowerTiles);
        }
        var lastUpperTiles = this._readLastTiles(1, lx, ly);
        if (!core_1.Utils.equals(upperTiles, lastUpperTiles)) {
            this._upperBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
            for (var j = 0; j < upperTiles.length; j++) {
                this._drawTile(this._upperBitmap, upperTiles[j], dx, dy);
            }
            this._writeLastTiles(1, lx, ly, upperTiles);
        }
    };
    Tilemap.prototype._readLastTiles = function (i, x, y) {
        var array1 = this._lastTiles[i];
        if (array1) {
            var array2 = array1[y];
            if (array2) {
                var tiles = array2[x];
                if (tiles) {
                    return tiles;
                }
            }
        }
        return [];
    };
    /**
     * @method _writeLastTiles
     * @param {Number} i
     * @param {Number} x
     * @param {Number} y
     * @param {Array} tiles
     * @private
     */
    Tilemap.prototype._writeLastTiles = function (i, x, y, tiles) {
        var array1 = this._lastTiles[i];
        if (!array1) {
            array1 = this._lastTiles[i] = [];
        }
        var array2 = array1[y];
        if (!array2) {
            array2 = array1[y] = [];
        }
        array2[x] = tiles;
    };
    Tilemap.prototype._drawTile = function (bitmap, tileId, dx, dy) {
        if (Tilemap.isVisibleTile(tileId)) {
            if (Tilemap.isAutotile(tileId)) {
                this._drawAutotile(bitmap, tileId, dx, dy);
            }
            else {
                this._drawNormalTile(bitmap, tileId, dx, dy);
            }
        }
    };
    Tilemap.prototype._drawNormalTile = function (bitmap, tileId, dx, dy) {
        var setNumber = 0;
        if (Tilemap.isTileA5(tileId)) {
            setNumber = 4;
        }
        else {
            setNumber = 5 + Math.floor(tileId / 256);
        }
        var w = this._tileWidth;
        var h = this._tileHeight;
        var sx = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * w;
        var sy = (Math.floor((tileId % 256) / 8) % 16) * h;
        var source = this.bitmaps[setNumber];
        if (source) {
            console.log("blt, " + sx + ", " + sy + ", " + w + ", " + h + ", " + dx + ", " + dy + ", " + w + ", " + h);
            console.log("dst, " + bitmap.width + "," + bitmap.height);
            bitmap.bltImage(source, sx, sy, w, h, dx, dy, w, h);
        }
        else {
            console.log("skip");
        }
    };
    Tilemap.prototype._drawAutotile = function (bitmap, tileId, dx, dy) {
        var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        var kind = Tilemap.getAutotileKind(tileId);
        var shape = Tilemap.getAutotileShape(tileId);
        var tx = kind % 8;
        var ty = Math.floor(kind / 8);
        var bx = 0;
        var by = 0;
        var setNumber = 0;
        var isTable = false;
        if (Tilemap.isTileA1(tileId)) {
            var waterSurfaceIndex = [0, 1, 2, 1][this.animationFrame % 4];
            setNumber = 0;
            if (kind === 0) {
                bx = waterSurfaceIndex * 2;
                by = 0;
            }
            else if (kind === 1) {
                bx = waterSurfaceIndex * 2;
                by = 3;
            }
            else if (kind === 2) {
                bx = 6;
                by = 0;
            }
            else if (kind === 3) {
                bx = 6;
                by = 3;
            }
            else {
                bx = Math.floor(tx / 4) * 8;
                by = ty * 6 + (Math.floor(tx / 2) % 2) * 3;
                if (kind % 2 === 0) {
                    bx += waterSurfaceIndex * 2;
                }
                else {
                    bx += 6;
                    autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
                    by += this.animationFrame % 3;
                }
            }
        }
        else if (Tilemap.isTileA2(tileId)) {
            setNumber = 1;
            bx = tx * 2;
            by = (ty - 2) * 3;
            isTable = this._isTableTile(tileId);
        }
        else if (Tilemap.isTileA3(tileId)) {
            setNumber = 2;
            bx = tx * 2;
            by = (ty - 6) * 2;
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
        }
        else if (Tilemap.isTileA4(tileId)) {
            setNumber = 3;
            bx = tx * 2;
            by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
            if (ty % 2 === 1) {
                autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
            }
        }
        var table = autotileTable[shape];
        var source = this.bitmaps[setNumber];
        if (table && source) {
            var w1 = this._tileWidth / 2;
            var h1 = this._tileHeight / 2;
            for (var i = 0; i < 4; i++) {
                var qsx = table[i][0];
                var qsy = table[i][1];
                var sx1 = (bx * 2 + qsx) * w1;
                var sy1 = (by * 2 + qsy) * h1;
                var dx1 = dx + (i % 2) * w1;
                var dy1 = dy + Math.floor(i / 2) * h1;
                if (isTable && (qsy === 1 || qsy === 5)) {
                    var qsx2 = qsx;
                    var qsy2 = 3;
                    if (qsy === 1) {
                        qsx2 = [0, 3, 2, 1][qsx];
                    }
                    var sx2 = (bx * 2 + qsx2) * w1;
                    var sy2 = (by * 2 + qsy2) * h1;
                    bitmap.bltImage(source, sx2, sy2, w1, h1, dx1, dy1, w1, h1);
                    dy1 += h1 / 2;
                    bitmap.bltImage(source, sx1, sy1, w1, h1 / 2, dx1, dy1, w1, h1 / 2);
                }
                else {
                    bitmap.bltImage(source, sx1, sy1, w1, h1, dx1, dy1, w1, h1);
                }
            }
        }
    };
    Tilemap.prototype._drawTableEdge = function (bitmap, tileId, dx, dy) {
        if (Tilemap.isTileA2(tileId)) {
            var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
            var kind = Tilemap.getAutotileKind(tileId);
            var shape = Tilemap.getAutotileShape(tileId);
            var tx = kind % 8;
            var ty = Math.floor(kind / 8);
            var setNumber = 1;
            var bx = tx * 2;
            var by = (ty - 2) * 3;
            var table = autotileTable[shape];
            if (table) {
                var source = this.bitmaps[setNumber];
                var w1 = this._tileWidth / 2;
                var h1 = this._tileHeight / 2;
                for (var i = 0; i < 2; i++) {
                    var qsx = table[2 + i][0];
                    var qsy = table[2 + i][1];
                    var sx1 = (bx * 2 + qsx) * w1;
                    var sy1 = (by * 2 + qsy) * h1 + h1 / 2;
                    var dx1 = dx + (i % 2) * w1;
                    var dy1 = dy + Math.floor(i / 2) * h1;
                    bitmap.bltImage(source, sx1, sy1, w1, h1 / 2, dx1, dy1, w1, h1 / 2);
                }
            }
        }
    };
    Tilemap.prototype._drawShadow = function (bitmap, shadowBits, dx, dy) {
        if (shadowBits & 0x0f) {
            var w1 = this._tileWidth / 2;
            var h1 = this._tileHeight / 2;
            var color = "rgba(0,0,0,0.5)";
            for (var i = 0; i < 4; i++) {
                if (shadowBits & (1 << i)) {
                    var dx1 = dx + (i % 2) * w1;
                    var dy1 = dy + Math.floor(i / 2) * h1;
                    bitmap.fillRect(dx1, dy1, w1, h1, color);
                }
            }
        }
    };
    Tilemap.prototype._readMapData = function (x, y, z) {
        if (this._mapData) {
            var width = this._mapWidth;
            var height = this._mapHeight;
            if (this.horizontalWrap) {
                x = core_1.Utils.mod(x, width);
            }
            if (this.verticalWrap) {
                y = core_1.Utils.mod(y, height);
            }
            if (x >= 0 && x < width && y >= 0 && y < height) {
                return this._mapData[(z * height + y) * width + x] || 0;
            }
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    };
    Tilemap.prototype._isHigherTile = function (tileId) {
        return this.flags[tileId] & 0x10;
    };
    Tilemap.prototype._isTableTile = function (tileId) {
        return Tilemap.isTileA2(tileId) && !!(this.flags[tileId] & 0x80);
    };
    Tilemap.prototype._isOverpassPosition = function (_mx, _my) {
        return false;
    };
    Tilemap.prototype._sortChildren = function () {
        this.children.sort(this._compareChildOrder.bind(this));
        var parent = this.pixiEntity;
        this.children.forEach(function (child) {
            child.pixiEntity.remove();
        });
        this.children.forEach(function (child) {
            parent.append(child.pixiEntity);
        });
    };
    Tilemap.prototype._compareChildOrder = function (a, b) {
        if (a.z !== b.z) {
            return a.z - b.z;
        }
        else if (a.y !== b.y) {
            return a.y - b.y;
        }
        else {
            return a.spriteId - b.spriteId;
        }
    };
    Tilemap.TILE_ID_B = 0;
    Tilemap.TILE_ID_C = 256;
    Tilemap.TILE_ID_D = 512;
    Tilemap.TILE_ID_E = 768;
    Tilemap.TILE_ID_A5 = 1536;
    Tilemap.TILE_ID_A1 = 2048;
    Tilemap.TILE_ID_A2 = 2816;
    Tilemap.TILE_ID_A3 = 4352;
    Tilemap.TILE_ID_A4 = 5888;
    Tilemap.TILE_ID_MAX = 8192;
    // Autotile shape number to coordinates of tileset images
    Tilemap.FLOOR_AUTOTILE_TABLE = [
        [
            [2, 4],
            [1, 4],
            [2, 3],
            [1, 3]
        ],
        [
            [2, 0],
            [1, 4],
            [2, 3],
            [1, 3]
        ],
        [
            [2, 4],
            [3, 0],
            [2, 3],
            [1, 3]
        ],
        [
            [2, 0],
            [3, 0],
            [2, 3],
            [1, 3]
        ],
        [
            [2, 4],
            [1, 4],
            [2, 3],
            [3, 1]
        ],
        [
            [2, 0],
            [1, 4],
            [2, 3],
            [3, 1]
        ],
        [
            [2, 4],
            [3, 0],
            [2, 3],
            [3, 1]
        ],
        [
            [2, 0],
            [3, 0],
            [2, 3],
            [3, 1]
        ],
        [
            [2, 4],
            [1, 4],
            [2, 1],
            [1, 3]
        ],
        [
            [2, 0],
            [1, 4],
            [2, 1],
            [1, 3]
        ],
        [
            [2, 4],
            [3, 0],
            [2, 1],
            [1, 3]
        ],
        [
            [2, 0],
            [3, 0],
            [2, 1],
            [1, 3]
        ],
        [
            [2, 4],
            [1, 4],
            [2, 1],
            [3, 1]
        ],
        [
            [2, 0],
            [1, 4],
            [2, 1],
            [3, 1]
        ],
        [
            [2, 4],
            [3, 0],
            [2, 1],
            [3, 1]
        ],
        [
            [2, 0],
            [3, 0],
            [2, 1],
            [3, 1]
        ],
        [
            [0, 4],
            [1, 4],
            [0, 3],
            [1, 3]
        ],
        [
            [0, 4],
            [3, 0],
            [0, 3],
            [1, 3]
        ],
        [
            [0, 4],
            [1, 4],
            [0, 3],
            [3, 1]
        ],
        [
            [0, 4],
            [3, 0],
            [0, 3],
            [3, 1]
        ],
        [
            [2, 2],
            [1, 2],
            [2, 3],
            [1, 3]
        ],
        [
            [2, 2],
            [1, 2],
            [2, 3],
            [3, 1]
        ],
        [
            [2, 2],
            [1, 2],
            [2, 1],
            [1, 3]
        ],
        [
            [2, 2],
            [1, 2],
            [2, 1],
            [3, 1]
        ],
        [
            [2, 4],
            [3, 4],
            [2, 3],
            [3, 3]
        ],
        [
            [2, 4],
            [3, 4],
            [2, 1],
            [3, 3]
        ],
        [
            [2, 0],
            [3, 4],
            [2, 3],
            [3, 3]
        ],
        [
            [2, 0],
            [3, 4],
            [2, 1],
            [3, 3]
        ],
        [
            [2, 4],
            [1, 4],
            [2, 5],
            [1, 5]
        ],
        [
            [2, 0],
            [1, 4],
            [2, 5],
            [1, 5]
        ],
        [
            [2, 4],
            [3, 0],
            [2, 5],
            [1, 5]
        ],
        [
            [2, 0],
            [3, 0],
            [2, 5],
            [1, 5]
        ],
        [
            [0, 4],
            [3, 4],
            [0, 3],
            [3, 3]
        ],
        [
            [2, 2],
            [1, 2],
            [2, 5],
            [1, 5]
        ],
        [
            [0, 2],
            [1, 2],
            [0, 3],
            [1, 3]
        ],
        [
            [0, 2],
            [1, 2],
            [0, 3],
            [3, 1]
        ],
        [
            [2, 2],
            [3, 2],
            [2, 3],
            [3, 3]
        ],
        [
            [2, 2],
            [3, 2],
            [2, 1],
            [3, 3]
        ],
        [
            [2, 4],
            [3, 4],
            [2, 5],
            [3, 5]
        ],
        [
            [2, 0],
            [3, 4],
            [2, 5],
            [3, 5]
        ],
        [
            [0, 4],
            [1, 4],
            [0, 5],
            [1, 5]
        ],
        [
            [0, 4],
            [3, 0],
            [0, 5],
            [1, 5]
        ],
        [
            [0, 2],
            [3, 2],
            [0, 3],
            [3, 3]
        ],
        [
            [0, 2],
            [1, 2],
            [0, 5],
            [1, 5]
        ],
        [
            [0, 4],
            [3, 4],
            [0, 5],
            [3, 5]
        ],
        [
            [2, 2],
            [3, 2],
            [2, 5],
            [3, 5]
        ],
        [
            [0, 2],
            [3, 2],
            [0, 5],
            [3, 5]
        ],
        [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1]
        ]
    ];
    Tilemap.WALL_AUTOTILE_TABLE = [
        [
            [2, 2],
            [1, 2],
            [2, 1],
            [1, 1]
        ],
        [
            [0, 2],
            [1, 2],
            [0, 1],
            [1, 1]
        ],
        [
            [2, 0],
            [1, 0],
            [2, 1],
            [1, 1]
        ],
        [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1]
        ],
        [
            [2, 2],
            [3, 2],
            [2, 1],
            [3, 1]
        ],
        [
            [0, 2],
            [3, 2],
            [0, 1],
            [3, 1]
        ],
        [
            [2, 0],
            [3, 0],
            [2, 1],
            [3, 1]
        ],
        [
            [0, 0],
            [3, 0],
            [0, 1],
            [3, 1]
        ],
        [
            [2, 2],
            [1, 2],
            [2, 3],
            [1, 3]
        ],
        [
            [0, 2],
            [1, 2],
            [0, 3],
            [1, 3]
        ],
        [
            [2, 0],
            [1, 0],
            [2, 3],
            [1, 3]
        ],
        [
            [0, 0],
            [1, 0],
            [0, 3],
            [1, 3]
        ],
        [
            [2, 2],
            [3, 2],
            [2, 3],
            [3, 3]
        ],
        [
            [0, 2],
            [3, 2],
            [0, 3],
            [3, 3]
        ],
        [
            [2, 0],
            [3, 0],
            [2, 3],
            [3, 3]
        ],
        [
            [0, 0],
            [3, 0],
            [0, 3],
            [3, 3]
        ]
    ];
    Tilemap.WATERFALL_AUTOTILE_TABLE = [
        [
            [2, 0],
            [1, 0],
            [2, 1],
            [1, 1]
        ],
        [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1]
        ],
        [
            [2, 0],
            [3, 0],
            [2, 1],
            [3, 1]
        ],
        [
            [0, 0],
            [3, 0],
            [0, 1],
            [3, 1]
        ]
    ];
    return Tilemap;
}(PIXI_1.Container));
exports.Tilemap = Tilemap;

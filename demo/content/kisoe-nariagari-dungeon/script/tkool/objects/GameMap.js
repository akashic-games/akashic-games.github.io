"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_Map = void 0;
var Graphics_1 = require("../core/Graphics");
var Utils_1 = require("../core/Utils");
var AudioManager_1 = require("../managers/AudioManager");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var GameCommonEvent_1 = require("./GameCommonEvent");
var GameEvent_1 = require("./GameEvent");
var GameInterpreter_1 = require("./GameInterpreter");
var GameVehicle_1 = require("./GameVehicle");
var Game_Map = /** @class */ (function () {
    function Game_Map() {
        this.initialize();
    }
    Game_Map.prototype.initialize = function () {
        this._interpreter = new GameInterpreter_1.Game_Interpreter();
        this._mapId = 0;
        this._tilesetId = 0;
        this._events = [];
        this._commonEvents = [];
        this._vehicles = [];
        this._displayX = 0;
        this._displayY = 0;
        this._nameDisplay = true;
        this._scrollDirection = 2;
        this._scrollRest = 0;
        this._scrollSpeed = 4;
        this._parallaxName = "";
        this._parallaxZero = false;
        this._parallaxLoopX = false;
        this._parallaxLoopY = false;
        this._parallaxSx = 0;
        this._parallaxSy = 0;
        this._parallaxX = 0;
        this._parallaxY = 0;
        this._battleback1Name = null;
        this._battleback2Name = null;
        this.createVehicles();
    };
    Game_Map.prototype.setup = function (mapId) {
        if (!globals_1.$dataMap) {
            throw new Error("The map data is not available");
        }
        this._mapId = mapId;
        this._tilesetId = globals_1.$dataMap.tilesetId;
        this._displayX = 0;
        this._displayY = 0;
        this.refereshVehicles();
        this.setupEvents();
        this.setupScroll();
        this.setupParallax();
        this.setupBattleback();
        this._needsRefresh = false;
    };
    Game_Map.prototype.isEventRunning = function () {
        return this._interpreter.isRunning() || this.isAnyEventStarting();
    };
    Game_Map.prototype.tileWidth = function () {
        return 48;
    };
    Game_Map.prototype.tileHeight = function () {
        return 48;
    };
    Game_Map.prototype.mapId = function () {
        return this._mapId;
    };
    Game_Map.prototype.tilesetId = function () {
        return this._tilesetId;
    };
    Game_Map.prototype.displayX = function () {
        return this._displayX;
    };
    Game_Map.prototype.displayY = function () {
        return this._displayY;
    };
    Game_Map.prototype.parallaxName = function () {
        return this._parallaxName;
    };
    Game_Map.prototype.battleback1Name = function () {
        return this._battleback1Name;
    };
    Game_Map.prototype.battleback2Name = function () {
        return this._battleback2Name;
    };
    Game_Map.prototype.requestRefresh = function (_mapId) {
        this._needsRefresh = true;
    };
    Game_Map.prototype.isNameDisplayEnabled = function () {
        return this._nameDisplay;
    };
    Game_Map.prototype.disableNameDisplay = function () {
        this._nameDisplay = false;
    };
    Game_Map.prototype.enableNameDisplay = function () {
        this._nameDisplay = true;
    };
    Game_Map.prototype.createVehicles = function () {
        this._vehicles = [];
        this._vehicles[0] = new GameVehicle_1.Game_Vehicle("boat");
        this._vehicles[1] = new GameVehicle_1.Game_Vehicle("ship");
        this._vehicles[2] = new GameVehicle_1.Game_Vehicle("airship");
    };
    Game_Map.prototype.refereshVehicles = function () {
        this._vehicles.forEach(function (vehicle) {
            vehicle.refresh();
        });
    };
    Game_Map.prototype.vehicles = function () {
        return this._vehicles;
    };
    Game_Map.prototype.vehicle = function (type) {
        if (type === 0 || type === "boat") {
            return this.boat();
        }
        else if (type === 1 || type === "ship") {
            return this.ship();
        }
        else if (type === 2 || type === "airship") {
            return this.airship();
        }
        else {
            return null;
        }
    };
    Game_Map.prototype.boat = function () {
        return this._vehicles[0];
    };
    Game_Map.prototype.ship = function () {
        return this._vehicles[1];
    };
    Game_Map.prototype.airship = function () {
        return this._vehicles[2];
    };
    Game_Map.prototype.setupEvents = function () {
        this._events = [];
        for (var i = 0; i < globals_1.$dataMap.events.length; i++) {
            if (globals_1.$dataMap.events[i]) {
                this._events[i] = new GameEvent_1.Game_Event(this._mapId, i);
            }
        }
        this._commonEvents = this.parallelCommonEvents().map(function (commonEvent) {
            return new GameCommonEvent_1.Game_CommonEvent(commonEvent.id);
        });
        this.refreshTileEvents();
    };
    Game_Map.prototype.events = function () {
        return this._events.filter(function (event) {
            return !!event;
        });
    };
    Game_Map.prototype.event = function (eventId) {
        return this._events[eventId];
    };
    Game_Map.prototype.eraseEvent = function (eventId) {
        this._events[eventId].erase();
    };
    Game_Map.prototype.parallelCommonEvents = function () {
        return globals_1.$dataCommonEvents.filter(function (commonEvent) {
            return commonEvent && commonEvent.trigger === 2;
        });
    };
    Game_Map.prototype.setupScroll = function () {
        this._scrollDirection = 2;
        this._scrollRest = 0;
        this._scrollSpeed = 4;
    };
    Game_Map.prototype.setupParallax = function () {
        this._parallaxName = globals_1.$dataMap.parallaxName || "";
        this._parallaxZero = ImageManager_1.ImageManager.isZeroParallax(this._parallaxName);
        this._parallaxLoopX = globals_1.$dataMap.parallaxLoopX;
        this._parallaxLoopY = globals_1.$dataMap.parallaxLoopY;
        this._parallaxSx = globals_1.$dataMap.parallaxSx;
        this._parallaxSy = globals_1.$dataMap.parallaxSy;
        this._parallaxX = 0;
        this._parallaxY = 0;
    };
    Game_Map.prototype.setupBattleback = function () {
        if (globals_1.$dataMap.specifyBattleback) {
            this._battleback1Name = globals_1.$dataMap.battleback1Name;
            this._battleback2Name = globals_1.$dataMap.battleback2Name;
        }
        else {
            this._battleback1Name = null;
            this._battleback2Name = null;
        }
    };
    Game_Map.prototype.setDisplayPos = function (x, y) {
        if (this.isLoopHorizontal()) {
            this._displayX = Utils_1.Utils.mod(x, this.width());
            this._parallaxX = x;
        }
        else {
            var endX = this.width() - this.screenTileX();
            this._displayX = endX < 0 ? endX / 2 : Utils_1.Utils.clamp(x, 0, endX);
            this._parallaxX = this._displayX;
        }
        if (this.isLoopVertical()) {
            this._displayY = Utils_1.Utils.mod(y, this.height());
            this._parallaxY = y;
        }
        else {
            var endY = this.height() - this.screenTileY();
            this._displayY = endY < 0 ? endY / 2 : Utils_1.Utils.clamp(y, 0, endY);
            this._parallaxY = this._displayY;
        }
    };
    Game_Map.prototype.parallaxOx = function () {
        if (this._parallaxZero) {
            return this._parallaxX * this.tileWidth();
        }
        else if (this._parallaxLoopX) {
            return (this._parallaxX * this.tileWidth()) / 2;
        }
        else {
            return 0;
        }
    };
    Game_Map.prototype.parallaxOy = function () {
        if (this._parallaxZero) {
            return this._parallaxY * this.tileHeight();
        }
        else if (this._parallaxLoopY) {
            return (this._parallaxY * this.tileHeight()) / 2;
        }
        else {
            return 0;
        }
    };
    Game_Map.prototype.tileset = function () {
        return globals_1.$dataTilesets[this._tilesetId];
    };
    Game_Map.prototype.tilesetFlags = function () {
        var tileset = this.tileset();
        if (tileset) {
            return tileset.flags;
        }
        else {
            return [];
        }
    };
    Game_Map.prototype.displayName = function () {
        return globals_1.$dataMap.displayName;
    };
    Game_Map.prototype.width = function () {
        return globals_1.$dataMap.width;
    };
    Game_Map.prototype.height = function () {
        return globals_1.$dataMap.height;
    };
    Game_Map.prototype.data = function () {
        return globals_1.$dataMap.data;
    };
    Game_Map.prototype.isLoopHorizontal = function () {
        return globals_1.$dataMap.scrollType === 2 || globals_1.$dataMap.scrollType === 3;
    };
    Game_Map.prototype.isLoopVertical = function () {
        return globals_1.$dataMap.scrollType === 1 || globals_1.$dataMap.scrollType === 3;
    };
    Game_Map.prototype.isDashDisabled = function () {
        return globals_1.$dataMap.disableDashing;
    };
    Game_Map.prototype.encounterList = function () {
        return globals_1.$dataMap.encounterList;
    };
    Game_Map.prototype.encounterStep = function () {
        return globals_1.$dataMap.encounterStep;
    };
    Game_Map.prototype.isOverworld = function () {
        return this.tileset() && this.tileset().mode === 0;
    };
    Game_Map.prototype.screenTileX = function () {
        return Graphics_1.Graphics.width / this.tileWidth();
    };
    Game_Map.prototype.screenTileY = function () {
        return Graphics_1.Graphics.height / this.tileHeight();
    };
    Game_Map.prototype.adjustX = function (x) {
        if (this.isLoopHorizontal() && x < this._displayX - (this.width() - this.screenTileX()) / 2) {
            return x - this._displayX + globals_1.$dataMap.width;
        }
        else {
            return x - this._displayX;
        }
    };
    Game_Map.prototype.adjustY = function (y) {
        if (this.isLoopVertical() && y < this._displayY - (this.height() - this.screenTileY()) / 2) {
            return y - this._displayY + globals_1.$dataMap.height;
        }
        else {
            return y - this._displayY;
        }
    };
    Game_Map.prototype.roundX = function (x) {
        return this.isLoopHorizontal() ? Utils_1.Utils.mod(x, this.width()) : x;
    };
    Game_Map.prototype.roundY = function (y) {
        return this.isLoopVertical() ? Utils_1.Utils.mod(y, this.height()) : y;
    };
    Game_Map.prototype.xWithDirection = function (x, d) {
        return x + (d === 6 ? 1 : d === 4 ? -1 : 0);
    };
    Game_Map.prototype.yWithDirection = function (y, d) {
        return y + (d === 2 ? 1 : d === 8 ? -1 : 0);
    };
    Game_Map.prototype.roundXWithDirection = function (x, d) {
        return this.roundX(x + (d === 6 ? 1 : d === 4 ? -1 : 0));
    };
    Game_Map.prototype.roundYWithDirection = function (y, d) {
        return this.roundY(y + (d === 2 ? 1 : d === 8 ? -1 : 0));
    };
    Game_Map.prototype.deltaX = function (x1, x2) {
        var result = x1 - x2;
        if (this.isLoopHorizontal() && Math.abs(result) > this.width() / 2) {
            if (result < 0) {
                result += this.width();
            }
            else {
                result -= this.width();
            }
        }
        return result;
    };
    Game_Map.prototype.deltaY = function (y1, y2) {
        var result = y1 - y2;
        if (this.isLoopVertical() && Math.abs(result) > this.height() / 2) {
            if (result < 0) {
                result += this.height();
            }
            else {
                result -= this.height();
            }
        }
        return result;
    };
    Game_Map.prototype.distance = function (x1, y1, x2, y2) {
        return Math.abs(this.deltaX(x1, x2)) + Math.abs(this.deltaY(y1, y2));
    };
    Game_Map.prototype.canvasToMapX = function (x) {
        var tileWidth = this.tileWidth();
        var originX = this._displayX * tileWidth;
        var mapX = Math.floor((originX + x) / tileWidth);
        return this.roundX(mapX);
    };
    Game_Map.prototype.canvasToMapY = function (y) {
        var tileHeight = this.tileHeight();
        var originY = this._displayY * tileHeight;
        var mapY = Math.floor((originY + y) / tileHeight);
        return this.roundY(mapY);
    };
    Game_Map.prototype.autoplay = function () {
        if (globals_1.$dataMap.autoplayBgm) {
            if (globals_1.$gamePlayer.isInVehicle()) {
                globals_1.$gameSystem.saveWalkingBgm2();
            }
            else {
                AudioManager_1.AudioManager.playBgm(globals_1.$dataMap.bgm);
            }
        }
        if (globals_1.$dataMap.autoplayBgs) {
            AudioManager_1.AudioManager.playBgs(globals_1.$dataMap.bgs);
        }
    };
    Game_Map.prototype.refreshIfNeeded = function () {
        if (this._needsRefresh) {
            this.refresh();
        }
    };
    Game_Map.prototype.refresh = function () {
        this.events().forEach(function (event) {
            event.refresh();
        });
        this._commonEvents.forEach(function (event) {
            event.refresh();
        });
        this.refreshTileEvents();
        this._needsRefresh = false;
    };
    Game_Map.prototype.refreshTileEvents = function () {
        this.tileEvents = this.events().filter(function (event) {
            return event.isTile();
        });
    };
    Game_Map.prototype.eventsXy = function (x, y) {
        return this.events().filter(function (event) {
            return event.pos(x, y);
        });
    };
    Game_Map.prototype.eventsXyNt = function (x, y) {
        return this.events().filter(function (event) {
            return event.posNt(x, y);
        });
    };
    Game_Map.prototype.tileEventsXy = function (x, y) {
        return this.tileEvents.filter(function (event) {
            return event.posNt(x, y);
        });
    };
    Game_Map.prototype.eventIdXy = function (x, y) {
        var list = this.eventsXy(x, y);
        return list.length === 0 ? 0 : list[0].eventId();
    };
    Game_Map.prototype.scrollDown = function (distance) {
        if (this.isLoopVertical()) {
            this._displayY += distance;
            this._displayY %= globals_1.$dataMap.height;
            if (this._parallaxLoopY) {
                this._parallaxY += distance;
            }
        }
        else if (this.height() >= this.screenTileY()) {
            var lastY = this._displayY;
            this._displayY = Math.min(this._displayY + distance, this.height() - this.screenTileY());
            this._parallaxY += this._displayY - lastY;
        }
    };
    Game_Map.prototype.scrollLeft = function (distance) {
        if (this.isLoopHorizontal()) {
            this._displayX += globals_1.$dataMap.width - distance;
            this._displayX %= globals_1.$dataMap.width;
            if (this._parallaxLoopX) {
                this._parallaxX -= distance;
            }
        }
        else if (this.width() >= this.screenTileX()) {
            var lastX = this._displayX;
            this._displayX = Math.max(this._displayX - distance, 0);
            this._parallaxX += this._displayX - lastX;
        }
    };
    Game_Map.prototype.scrollRight = function (distance) {
        if (this.isLoopHorizontal()) {
            this._displayX += distance;
            this._displayX %= globals_1.$dataMap.width;
            if (this._parallaxLoopX) {
                this._parallaxX += distance;
            }
        }
        else if (this.width() >= this.screenTileX()) {
            var lastX = this._displayX;
            this._displayX = Math.min(this._displayX + distance, this.width() - this.screenTileX());
            this._parallaxX += this._displayX - lastX;
        }
    };
    Game_Map.prototype.scrollUp = function (distance) {
        if (this.isLoopVertical()) {
            this._displayY += globals_1.$dataMap.height - distance;
            this._displayY %= globals_1.$dataMap.height;
            if (this._parallaxLoopY) {
                this._parallaxY -= distance;
            }
        }
        else if (this.height() >= this.screenTileY()) {
            var lastY = this._displayY;
            this._displayY = Math.max(this._displayY - distance, 0);
            this._parallaxY += this._displayY - lastY;
        }
    };
    Game_Map.prototype.isValid = function (x, y) {
        return x >= 0 && x < this.width() && y >= 0 && y < this.height();
    };
    Game_Map.prototype.checkPassage = function (x, y, bit) {
        var flags = this.tilesetFlags();
        var tiles = this.allTiles(x, y);
        for (var i = 0; i < tiles.length; i++) {
            var flag = flags[tiles[i]];
            if ((flag & 0x10) !== 0)
                // [*] No effect on passage
                continue;
            if ((flag & bit) === 0)
                // [o] Passable
                return true;
            if ((flag & bit) === bit)
                // [x] Impassable
                return false;
        }
        return false;
    };
    Game_Map.prototype.tileId = function (x, y, z) {
        var width = globals_1.$dataMap.width;
        var height = globals_1.$dataMap.height;
        return globals_1.$dataMap.data[(z * height + y) * width + x] || 0;
    };
    Game_Map.prototype.layeredTiles = function (x, y) {
        var tiles = [];
        for (var i = 0; i < 4; i++) {
            tiles.push(this.tileId(x, y, 3 - i));
        }
        return tiles;
    };
    Game_Map.prototype.allTiles = function (x, y) {
        var tiles = this.tileEventsXy(x, y).map(function (event) {
            return event.tileId();
        });
        return tiles.concat(this.layeredTiles(x, y));
    };
    Game_Map.prototype.autotileType = function (x, y, z) {
        var tileId = this.tileId(x, y, z);
        return tileId >= 2048 ? Math.floor((tileId - 2048) / 48) : -1;
    };
    Game_Map.prototype.isPassable = function (x, y, d) {
        return this.checkPassage(x, y, (1 << (d / 2 - 1)) & 0x0f);
    };
    Game_Map.prototype.isBoatPassable = function (x, y) {
        return this.checkPassage(x, y, 0x0200);
    };
    Game_Map.prototype.isShipPassable = function (x, y) {
        return this.checkPassage(x, y, 0x0400);
    };
    Game_Map.prototype.isAirshipLandOk = function (x, y) {
        return this.checkPassage(x, y, 0x0800) && this.checkPassage(x, y, 0x0f);
    };
    Game_Map.prototype.checkLayeredTilesFlags = function (x, y, bit) {
        var flags = this.tilesetFlags();
        return this.layeredTiles(x, y).some(function (tileId) {
            return (flags[tileId] & bit) !== 0;
        });
    };
    Game_Map.prototype.isLadder = function (x, y) {
        return this.isValid(x, y) && this.checkLayeredTilesFlags(x, y, 0x20);
    };
    Game_Map.prototype.isBush = function (x, y) {
        return this.isValid(x, y) && this.checkLayeredTilesFlags(x, y, 0x40);
    };
    Game_Map.prototype.isCounter = function (x, y) {
        return this.isValid(x, y) && this.checkLayeredTilesFlags(x, y, 0x80);
    };
    Game_Map.prototype.isDamageFloor = function (x, y) {
        return this.isValid(x, y) && this.checkLayeredTilesFlags(x, y, 0x100);
    };
    Game_Map.prototype.terrainTag = function (x, y) {
        if (this.isValid(x, y)) {
            var flags = this.tilesetFlags();
            var tiles = this.layeredTiles(x, y);
            for (var i = 0; i < tiles.length; i++) {
                var tag = flags[tiles[i]] >> 12;
                if (tag > 0) {
                    return tag;
                }
            }
        }
        return 0;
    };
    Game_Map.prototype.regionId = function (x, y) {
        return this.isValid(x, y) ? this.tileId(x, y, 5) : 0;
    };
    Game_Map.prototype.startScroll = function (direction, distance, speed) {
        this._scrollDirection = direction;
        this._scrollRest = distance;
        this._scrollSpeed = speed;
    };
    Game_Map.prototype.isScrolling = function () {
        return this._scrollRest > 0;
    };
    Game_Map.prototype.update = function (sceneActive) {
        this.refreshIfNeeded();
        if (sceneActive) {
            this.updateInterpreter();
        }
        this.updateScroll();
        this.updateEvents();
        this.updateVehicles();
        this.updateParallax();
    };
    Game_Map.prototype.updateScroll = function () {
        if (this.isScrolling()) {
            var lastX = this._displayX;
            var lastY = this._displayY;
            this.doScroll(this._scrollDirection, this.scrollDistance());
            if (this._displayX === lastX && this._displayY === lastY) {
                this._scrollRest = 0;
            }
            else {
                this._scrollRest -= this.scrollDistance();
            }
        }
    };
    Game_Map.prototype.scrollDistance = function () {
        return Math.pow(2, this._scrollSpeed) / 256;
    };
    Game_Map.prototype.doScroll = function (direction, distance) {
        switch (direction) {
            case 2:
                this.scrollDown(distance);
                break;
            case 4:
                this.scrollLeft(distance);
                break;
            case 6:
                this.scrollRight(distance);
                break;
            case 8:
                this.scrollUp(distance);
                break;
        }
    };
    Game_Map.prototype.updateEvents = function () {
        this.events().forEach(function (event) {
            event.update();
        });
        this._commonEvents.forEach(function (event) {
            event.update();
        });
    };
    Game_Map.prototype.updateVehicles = function () {
        this._vehicles.forEach(function (vehicle) {
            vehicle.update();
        });
    };
    Game_Map.prototype.updateParallax = function () {
        if (this._parallaxLoopX) {
            this._parallaxX += this._parallaxSx / this.tileWidth() / 2;
        }
        if (this._parallaxLoopY) {
            this._parallaxY += this._parallaxSy / this.tileHeight() / 2;
        }
    };
    Game_Map.prototype.changeTileset = function (tilesetId) {
        this._tilesetId = tilesetId;
        this.refresh();
    };
    Game_Map.prototype.changeBattleback = function (battleback1Name, battleback2Name) {
        this._battleback1Name = battleback1Name;
        this._battleback2Name = battleback2Name;
    };
    Game_Map.prototype.changeParallax = function (name, loopX, loopY, sx, sy) {
        this._parallaxName = name;
        this._parallaxZero = ImageManager_1.ImageManager.isZeroParallax(this._parallaxName);
        if (this._parallaxLoopX && !loopX) {
            this._parallaxX = 0;
        }
        if (this._parallaxLoopY && !loopY) {
            this._parallaxY = 0;
        }
        this._parallaxLoopX = loopX;
        this._parallaxLoopY = loopY;
        this._parallaxSx = sx;
        this._parallaxSy = sy;
    };
    Game_Map.prototype.updateInterpreter = function () {
        for (;;) {
            this._interpreter.update();
            if (this._interpreter.isRunning()) {
                return;
            }
            if (this._interpreter.eventId() > 0) {
                this.unlockEvent(this._interpreter.eventId());
                this._interpreter.clear();
            }
            if (!this.setupStartingEvent()) {
                return;
            }
        }
    };
    Game_Map.prototype.unlockEvent = function (eventId) {
        if (this._events[eventId]) {
            this._events[eventId].unlock();
        }
    };
    Game_Map.prototype.setupStartingEvent = function () {
        this.refreshIfNeeded();
        if (this._interpreter.setupReservedCommonEvent()) {
            return true;
        }
        if (this.setupTestEvent()) {
            return true;
        }
        if (this.setupStartingMapEvent()) {
            return true;
        }
        if (this.setupAutorunCommonEvent()) {
            return true;
        }
        return false;
    };
    Game_Map.prototype.setupTestEvent = function () {
        if (globals_1.$testEvent) {
            this._interpreter.setup(globals_1.$testEvent, 0);
            // TODO: 代入できないのでなんとかする
            // $testEvent は DataManager.$testEvent への参照でだから代入しても意味がない、というエラーかと
            // $testEvent = null;
            return true;
        }
        return false;
    };
    Game_Map.prototype.setupStartingMapEvent = function () {
        var events = this.events();
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            if (event.isStarting()) {
                event.clearStartingFlag();
                this._interpreter.setup(event.list(), event.eventId());
                return true;
            }
        }
        return false;
    };
    Game_Map.prototype.setupAutorunCommonEvent = function () {
        for (var i = 0; i < globals_1.$dataCommonEvents.length; i++) {
            var event = globals_1.$dataCommonEvents[i];
            if (event && event.trigger === 1 && globals_1.$gameSwitches.value(event.switchId)) {
                this._interpreter.setup(event.list);
                return true;
            }
        }
        return false;
    };
    Game_Map.prototype.isAnyEventStarting = function () {
        return this.events().some(function (event) {
            return event.isStarting();
        });
    };
    return Game_Map;
}());
exports.Game_Map = Game_Map;
(0, globals_1.set$gameMapFactory)(function () {
    return new Game_Map();
});

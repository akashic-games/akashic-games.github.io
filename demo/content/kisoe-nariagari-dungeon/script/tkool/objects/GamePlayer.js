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
exports.Game_Player = void 0;
var Graphics_1 = require("../core/Graphics");
var TouchInput_1 = require("../core/TouchInput");
var Utils_1 = require("../core/Utils");
var BattleManager_1 = require("../managers/BattleManager");
var globals_1 = require("../managers/globals");
var GameCharacter_1 = require("./GameCharacter");
var GameFollowers_1 = require("./GameFollowers");
function randomInt(max) {
    return Math.floor(max * g.game.vars.random.generate());
}
var Game_Player = /** @class */ (function (_super) {
    __extends(Game_Player, _super);
    function Game_Player() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Game_Player.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Game_Player.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.setTransparent(globals_1.$dataSystem.optTransparent);
    };
    Game_Player.prototype.initMembers = function () {
        _super.prototype.initMembers.call(this);
        this._vehicleType = "walk";
        this._vehicleGettingOn = false;
        this._vehicleGettingOff = false;
        this._dashing = false;
        this._needsMapReload = false;
        this._transferring = false;
        this._newMapId = 0;
        this._newX = 0;
        this._newY = 0;
        this._newDirection = 0;
        this._fadeType = 0;
        this._followers = new GameFollowers_1.Game_Followers();
        this._encounterCount = 0;
    };
    Game_Player.prototype.clearTransferInfo = function () {
        this._transferring = false;
        this._newMapId = 0;
        this._newX = 0;
        this._newY = 0;
        this._newDirection = 0;
    };
    Game_Player.prototype.followers = function () {
        return this._followers;
    };
    Game_Player.prototype.refresh = function () {
        var actor = globals_1.$gameParty.leader();
        var characterName = actor ? actor.characterName() : "";
        var characterIndex = actor ? actor.characterIndex() : 0;
        this.setImage(characterName, characterIndex);
        this._followers.refresh();
    };
    Game_Player.prototype.isStopping = function () {
        if (this._vehicleGettingOn || this._vehicleGettingOff) {
            return false;
        }
        return GameCharacter_1.Game_Character.prototype.isStopping.call(this);
    };
    Game_Player.prototype.reserveTransfer = function (mapId, x, y, d, fadeType) {
        this._transferring = true;
        this._newMapId = mapId;
        this._newX = x;
        this._newY = y;
        this._newDirection = d;
        this._fadeType = fadeType;
    };
    Game_Player.prototype.requestMapReload = function () {
        this._needsMapReload = true;
    };
    Game_Player.prototype.isTransferring = function () {
        return this._transferring;
    };
    Game_Player.prototype.newMapId = function () {
        return this._newMapId;
    };
    Game_Player.prototype.fadeType = function () {
        return this._fadeType;
    };
    Game_Player.prototype.performTransfer = function () {
        if (this.isTransferring()) {
            this.setDirection(this._newDirection);
            if (this._newMapId !== globals_1.$gameMap.mapId() || this._needsMapReload) {
                globals_1.$gameMap.setup(this._newMapId);
                this._needsMapReload = false;
            }
            this.locate(this._newX, this._newY);
            this.refresh();
            this.clearTransferInfo();
        }
    };
    Game_Player.prototype.isMapPassable = function (x, y, d) {
        var vehicle = this.vehicle();
        if (vehicle) {
            return vehicle.isMapPassable(x, y, d);
        }
        else {
            return GameCharacter_1.Game_Character.prototype.isMapPassable.call(this, x, y, d);
        }
    };
    Game_Player.prototype.vehicle = function () {
        return globals_1.$gameMap.vehicle(this._vehicleType);
    };
    Game_Player.prototype.isInBoat = function () {
        return this._vehicleType === "boat";
    };
    Game_Player.prototype.isInShip = function () {
        return this._vehicleType === "ship";
    };
    Game_Player.prototype.isInAirship = function () {
        return this._vehicleType === "airship";
    };
    Game_Player.prototype.isInVehicle = function () {
        return this.isInBoat() || this.isInShip() || this.isInAirship();
    };
    Game_Player.prototype.isNormal = function () {
        return this._vehicleType === "walk" && !this.isMoveRouteForcing();
    };
    Game_Player.prototype.isDashing = function () {
        return this._dashing;
    };
    Game_Player.prototype.isDebugThrough = function () {
        // return Input.isPressed("control") && $gameTemp.isPlaytest();
        return false;
    };
    Game_Player.prototype.isCollided = function (x, y) {
        if (this.isThrough()) {
            return false;
        }
        else {
            return this.pos(x, y) || this._followers.isSomeoneCollided(x, y);
        }
    };
    Game_Player.prototype.centerX = function () {
        return (Graphics_1.Graphics.width / globals_1.$gameMap.tileWidth() - 1) / 2.0;
    };
    Game_Player.prototype.centerY = function () {
        return (Graphics_1.Graphics.height / globals_1.$gameMap.tileHeight() - 1) / 2.0;
    };
    Game_Player.prototype.center = function (x, y) {
        return globals_1.$gameMap.setDisplayPos(x - this.centerX(), y - this.centerY());
    };
    Game_Player.prototype.locate = function (x, y) {
        _super.prototype.locate.call(this, x, y);
        this.center(x, y);
        this.makeEncounterCount();
        if (this.isInVehicle()) {
            this.vehicle().refresh();
        }
        this._followers.synchronize(x, y, this.direction());
    };
    Game_Player.prototype.increaseSteps = function () {
        _super.prototype.increaseSteps.call(this);
        if (this.isNormal()) {
            globals_1.$gameParty.increaseSteps();
        }
    };
    Game_Player.prototype.makeEncounterCount = function () {
        var n = globals_1.$gameMap.encounterStep();
        this._encounterCount = randomInt(n) + randomInt(n) + 1;
    };
    Game_Player.prototype.makeEncounterTroopId = function () {
        var _this = this;
        var encounterList = [];
        var weightSum = 0;
        globals_1.$gameMap.encounterList().forEach(function (encounter) {
            if (_this.meetsEncounterConditions(encounter)) {
                encounterList.push(encounter);
                weightSum += encounter.weight;
            }
        });
        if (weightSum > 0) {
            var value = randomInt(weightSum);
            for (var i = 0; i < encounterList.length; i++) {
                value -= encounterList[i].weight;
                if (value < 0) {
                    return encounterList[i].troopId;
                }
            }
        }
        return 0;
    };
    Game_Player.prototype.meetsEncounterConditions = function (encounter) {
        return encounter.regionSet.length === 0 || Utils_1.Utils.contains(encounter.regionSet, this.regionId());
    };
    Game_Player.prototype.executeEncounter = function () {
        if (!globals_1.$gameMap.isEventRunning() && this._encounterCount <= 0) {
            this.makeEncounterCount();
            var troopId = this.makeEncounterTroopId();
            if (globals_1.$dataTroops[troopId]) {
                BattleManager_1.BattleManager.setup(troopId, true, false);
                BattleManager_1.BattleManager.onEncounter();
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    Game_Player.prototype.startMapEvent = function (x, y, triggers, normal) {
        if (!globals_1.$gameMap.isEventRunning()) {
            globals_1.$gameMap.eventsXy(x, y).forEach(function (event) {
                if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
                    event.start();
                }
            });
        }
    };
    Game_Player.prototype.moveByInput = function () {
        if (!this.isMoving() && this.canMove()) {
            var direction = this.getInputDirection();
            if (direction > 0) {
                globals_1.$gameTemp.clearDestination();
            }
            else if (globals_1.$gameTemp.isDestinationValid()) {
                var x = globals_1.$gameTemp.destinationX();
                var y = globals_1.$gameTemp.destinationY();
                direction = this.findDirectionTo(x, y);
            }
            if (direction > 0) {
                this.executeMove(direction);
            }
        }
    };
    Game_Player.prototype.canMove = function () {
        if (globals_1.$gameMap.isEventRunning() || globals_1.$gameMessage.isBusy()) {
            return false;
        }
        if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
            return false;
        }
        if (this._vehicleGettingOn || this._vehicleGettingOff) {
            return false;
        }
        if (this.isInVehicle() && !this.vehicle().canMove()) {
            return false;
        }
        return true;
    };
    Game_Player.prototype.getInputDirection = function () {
        // return Input.dir4;
        return 0;
    };
    Game_Player.prototype.executeMove = function (direction) {
        this.moveStraight(direction);
    };
    Game_Player.prototype.update = function (sceneActive) {
        var lastScrolledX = this.scrolledX();
        var lastScrolledY = this.scrolledY();
        var wasMoving = this.isMoving();
        this.updateDashing();
        if (sceneActive) {
            this.moveByInput();
        }
        _super.prototype.update.call(this);
        this.updateScroll(lastScrolledX, lastScrolledY);
        this.updateVehicle();
        if (!this.isMoving()) {
            this.updateNonmoving(wasMoving);
        }
        this._followers.update();
    };
    Game_Player.prototype.updateDashing = function () {
        if (this.isMoving()) {
            return;
        }
        if (this.canMove() && !this.isInVehicle() && !globals_1.$gameMap.isDashDisabled()) {
            this._dashing = this.isDashButtonPressed() || globals_1.$gameTemp.isDestinationValid();
        }
        else {
            this._dashing = false;
        }
    };
    Game_Player.prototype.isDashButtonPressed = function () {
        // const shift = Input.isPressed("shift");
        // if (ConfigManager.alwaysDash) {
        // 	return !shift;
        // } else {
        // 	return shift;
        // }
        return false;
    };
    Game_Player.prototype.updateScroll = function (lastScrolledX, lastScrolledY) {
        var x1 = lastScrolledX;
        var y1 = lastScrolledY;
        var x2 = this.scrolledX();
        var y2 = this.scrolledY();
        if (y2 > y1 && y2 > this.centerY()) {
            globals_1.$gameMap.scrollDown(y2 - y1);
        }
        if (x2 < x1 && x2 < this.centerX()) {
            globals_1.$gameMap.scrollLeft(x1 - x2);
        }
        if (x2 > x1 && x2 > this.centerX()) {
            globals_1.$gameMap.scrollRight(x2 - x1);
        }
        if (y2 < y1 && y2 < this.centerY()) {
            globals_1.$gameMap.scrollUp(y1 - y2);
        }
    };
    Game_Player.prototype.updateVehicle = function () {
        if (this.isInVehicle() && !this.areFollowersGathering()) {
            if (this._vehicleGettingOn) {
                this.updateVehicleGetOn();
            }
            else if (this._vehicleGettingOff) {
                this.updateVehicleGetOff();
            }
            else {
                this.vehicle().syncWithPlayer();
            }
        }
    };
    Game_Player.prototype.updateVehicleGetOn = function () {
        if (!this.areFollowersGathering() && !this.isMoving()) {
            this.setDirection(this.vehicle().direction());
            this.setMoveSpeed(this.vehicle().moveSpeed());
            this._vehicleGettingOn = false;
            this.setTransparent(true);
            if (this.isInAirship()) {
                this.setThrough(true);
            }
            this.vehicle().getOn();
        }
    };
    Game_Player.prototype.updateVehicleGetOff = function () {
        if (!this.areFollowersGathering() && this.vehicle().isLowest()) {
            this._vehicleGettingOff = false;
            this._vehicleType = "walk";
            this.setTransparent(false);
        }
    };
    Game_Player.prototype.updateNonmoving = function (wasMoving) {
        if (!globals_1.$gameMap.isEventRunning()) {
            if (wasMoving) {
                globals_1.$gameParty.onPlayerWalk();
                this.checkEventTriggerHere([1, 2]);
                if (globals_1.$gameMap.setupStartingEvent()) {
                    return;
                }
            }
            if (this.triggerAction()) {
                return;
            }
            if (wasMoving) {
                this.updateEncounterCount();
            }
            else {
                globals_1.$gameTemp.clearDestination();
            }
        }
    };
    Game_Player.prototype.triggerAction = function () {
        if (this.canMove()) {
            if (this.triggerButtonAction()) {
                return true;
            }
            if (this.triggerTouchAction()) {
                return true;
            }
        }
        return false;
    };
    Game_Player.prototype.triggerButtonAction = function () {
        // if (Input.isTriggered("ok")) {
        // 	if (this.getOnOffVehicle()) {
        // 		return true;
        // 	}
        // 	this.checkEventTriggerHere([0]);
        // 	if ($gameMap.setupStartingEvent()) {
        // 		return true;
        // 	}
        // 	this.checkEventTriggerThere([0, 1, 2]);
        // 	if ($gameMap.setupStartingEvent()) {
        // 		return true;
        // 	}
        // }
        return false;
    };
    Game_Player.prototype.triggerTouchAction = function () {
        if (globals_1.$gameTemp.isDestinationValid()) {
            var direction = this.direction();
            var x1 = this.x;
            var y1 = this.y;
            var x2 = globals_1.$gameMap.roundXWithDirection(x1, direction);
            var y2 = globals_1.$gameMap.roundYWithDirection(y1, direction);
            var x3 = globals_1.$gameMap.roundXWithDirection(x2, direction);
            var y3 = globals_1.$gameMap.roundYWithDirection(y2, direction);
            var destX = globals_1.$gameTemp.destinationX();
            var destY = globals_1.$gameTemp.destinationY();
            if (destX === x1 && destY === y1) {
                return this.triggerTouchActionD1(x1, y1);
            }
            else if (destX === x2 && destY === y2) {
                return this.triggerTouchActionD2(x2, y2);
            }
            else if (destX === x3 && destY === y3) {
                return this.triggerTouchActionD3(x2, y2);
            }
        }
        return false;
    };
    Game_Player.prototype.triggerTouchActionD1 = function (x1, y1) {
        if (globals_1.$gameMap.airship().pos(x1, y1)) {
            if (TouchInput_1.TouchInput.isTriggered() && this.getOnOffVehicle()) {
                return true;
            }
        }
        this.checkEventTriggerHere([0]);
        return globals_1.$gameMap.setupStartingEvent();
    };
    Game_Player.prototype.triggerTouchActionD2 = function (x2, y2) {
        if (globals_1.$gameMap.boat().pos(x2, y2) || globals_1.$gameMap.ship().pos(x2, y2)) {
            if (TouchInput_1.TouchInput.isTriggered() && this.getOnVehicle()) {
                return true;
            }
        }
        if (this.isInBoat() || this.isInShip()) {
            if (TouchInput_1.TouchInput.isTriggered() && this.getOffVehicle()) {
                return true;
            }
        }
        this.checkEventTriggerThere([0, 1, 2]);
        return globals_1.$gameMap.setupStartingEvent();
    };
    Game_Player.prototype.triggerTouchActionD3 = function (x2, y2) {
        if (globals_1.$gameMap.isCounter(x2, y2)) {
            this.checkEventTriggerThere([0, 1, 2]);
        }
        return globals_1.$gameMap.setupStartingEvent();
    };
    Game_Player.prototype.updateEncounterCount = function () {
        if (this.canEncounter()) {
            this._encounterCount -= this.encounterProgressValue();
        }
    };
    Game_Player.prototype.canEncounter = function () {
        return (!globals_1.$gameParty.hasEncounterNone() &&
            globals_1.$gameSystem.isEncounterEnabled() &&
            !this.isInAirship() &&
            !this.isMoveRouteForcing() &&
            !this.isDebugThrough());
    };
    Game_Player.prototype.encounterProgressValue = function () {
        var value = globals_1.$gameMap.isBush(this.x, this.y) ? 2 : 1;
        if (globals_1.$gameParty.hasEncounterHalf()) {
            value *= 0.5;
        }
        if (this.isInShip()) {
            value *= 0.5;
        }
        return value;
    };
    Game_Player.prototype.checkEventTriggerHere = function (triggers) {
        if (this.canStartLocalEvents()) {
            this.startMapEvent(this.x, this.y, triggers, false);
        }
    };
    Game_Player.prototype.checkEventTriggerThere = function (triggers) {
        if (this.canStartLocalEvents()) {
            var direction = this.direction();
            var x1 = this.x;
            var y1 = this.y;
            var x2 = globals_1.$gameMap.roundXWithDirection(x1, direction);
            var y2 = globals_1.$gameMap.roundYWithDirection(y1, direction);
            this.startMapEvent(x2, y2, triggers, true);
            if (!globals_1.$gameMap.isAnyEventStarting() && globals_1.$gameMap.isCounter(x2, y2)) {
                var x3 = globals_1.$gameMap.roundXWithDirection(x2, direction);
                var y3 = globals_1.$gameMap.roundYWithDirection(y2, direction);
                this.startMapEvent(x3, y3, triggers, true);
            }
        }
    };
    Game_Player.prototype.checkEventTriggerTouch = function (x, y) {
        if (this.canStartLocalEvents()) {
            this.startMapEvent(x, y, [1, 2], true);
        }
        return false; // 基底クラスはfalseを返しているので追加
    };
    Game_Player.prototype.canStartLocalEvents = function () {
        return !this.isInAirship();
    };
    Game_Player.prototype.getOnOffVehicle = function () {
        if (this.isInVehicle()) {
            return this.getOffVehicle();
        }
        else {
            return this.getOnVehicle();
        }
    };
    Game_Player.prototype.getOnVehicle = function () {
        var direction = this.direction();
        var x1 = this.x;
        var y1 = this.y;
        var x2 = globals_1.$gameMap.roundXWithDirection(x1, direction);
        var y2 = globals_1.$gameMap.roundYWithDirection(y1, direction);
        if (globals_1.$gameMap.airship().pos(x1, y1)) {
            this._vehicleType = "airship";
        }
        else if (globals_1.$gameMap.ship().pos(x2, y2)) {
            this._vehicleType = "ship";
        }
        else if (globals_1.$gameMap.boat().pos(x2, y2)) {
            this._vehicleType = "boat";
        }
        if (this.isInVehicle()) {
            this._vehicleGettingOn = true;
            if (!this.isInAirship()) {
                this.forceMoveForward();
            }
            this.gatherFollowers();
        }
        return this._vehicleGettingOn;
    };
    Game_Player.prototype.getOffVehicle = function () {
        if (this.vehicle().isLandOk(this.x, this.y, this.direction())) {
            if (this.isInAirship()) {
                this.setDirection(2);
            }
            this._followers.synchronize(this.x, this.y, this.direction());
            this.vehicle().getOff();
            if (!this.isInAirship()) {
                this.forceMoveForward();
                this.setTransparent(false);
            }
            this._vehicleGettingOff = true;
            this.setMoveSpeed(4);
            this.setThrough(false);
            this.makeEncounterCount();
            this.gatherFollowers();
        }
        return this._vehicleGettingOff;
    };
    Game_Player.prototype.forceMoveForward = function () {
        this.setThrough(true);
        this.moveForward();
        this.setThrough(false);
    };
    Game_Player.prototype.isOnDamageFloor = function () {
        return globals_1.$gameMap.isDamageFloor(this.x, this.y) && !this.isInAirship();
    };
    Game_Player.prototype.moveStraight = function (d) {
        if (this.canPass(this.x, this.y, d)) {
            this._followers.updateMove();
        }
        _super.prototype.moveStraight.call(this, d);
    };
    Game_Player.prototype.moveDiagonally = function (horz, vert) {
        if (this.canPassDiagonally(this.x, this.y, horz, vert)) {
            this._followers.updateMove();
        }
        _super.prototype.moveDiagonally.call(this, horz, vert);
    };
    Game_Player.prototype.jump = function (xPlus, yPlus) {
        _super.prototype.jump.call(this, xPlus, yPlus);
        this._followers.jumpAll();
    };
    Game_Player.prototype.showFollowers = function () {
        this._followers.show();
    };
    Game_Player.prototype.hideFollowers = function () {
        this._followers.hide();
    };
    Game_Player.prototype.gatherFollowers = function () {
        this._followers.gather();
    };
    Game_Player.prototype.areFollowersGathering = function () {
        return this._followers.areGathering();
    };
    Game_Player.prototype.areFollowersGathered = function () {
        return this._followers.areGathered();
    };
    return Game_Player;
}(GameCharacter_1.Game_Character));
exports.Game_Player = Game_Player;
(0, globals_1.set$gamePlayerFactory)(function () {
    return new Game_Player();
});

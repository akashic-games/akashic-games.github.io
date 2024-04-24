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
exports.Game_Character = void 0;
var Graphics_1 = require("../core/Graphics");
var JsonEx_1 = require("../core/JsonEx");
var Tilemap_1 = require("../core/Tilemap");
var TouchInput_1 = require("../core/TouchInput");
var Utils_1 = require("../core/Utils");
var AudioManager_1 = require("../managers/AudioManager");
var BattleManager_1 = require("../managers/BattleManager");
var DataManager_1 = require("../managers/DataManager");
var globals_1 = require("../managers/globals");
var ImageManager_1 = require("../managers/ImageManager");
var SceneManager_1 = require("../managers/SceneManager");
var SoundManager_1 = require("../managers/SoundManager");
var TextManager_1 = require("../managers/TextManager");
var GameCharacterBase_1 = require("./GameCharacterBase");
// これらの変数(GameObject)はツクールのスクリプトで利用される可能性があるため、exportせずクラスの外で変数定義
/* eslint-disable @typescript-eslint/no-unused-vars */
var $gameVariables;
var $gameSystem;
var $gameSwitches;
var $gameMessage;
var $gamePlayer;
var $dataCommonEvents;
var $dataTilesets;
var $gameMap;
var $gameTemp;
var $dataEnemies;
var $gameActors;
var $dataAnimations;
var $gameParty;
var $gameTroop;
var $gameTimer;
var $gameSelfSwitches;
var $dataClasses;
var $dataWeapons;
var $dataArmors;
var $dataItems;
var $gameScreen;
var $dataTroops;
var $dataActors;
var $dataSkills;
var $dataStates;
var $dataSystem;
var $dataMapInfos;
var $dataMap;
// これらの変数はツクールのスクリプトでグローバルなクラス名として利用される想定なので、変数の命名規則からは例外的に外すものとする
/* eslint-disable  @typescript-eslint/naming-convention */
var Graphics;
var JsonEx;
var Tilemap;
var TouchInput;
var Utils;
var AudioManager;
var BattleManager;
var DataManager;
var ImageManager;
var SceneManager;
var SoundManager;
var TextManager;
/* eslint-enable @typescript-eslint/naming-convention */
/* eslint-enable @typescript-eslint/no-unused-vars */
// 未定義の全GameObjectに値を代入
function setGameObjects() {
    $gameVariables = globals_1.$gameVariables;
    $gameSystem = globals_1.$gameSystem;
    $gameSwitches = globals_1.$gameSwitches;
    $gameMessage = globals_1.$gameMessage;
    $gamePlayer = globals_1.$gamePlayer;
    $dataCommonEvents = globals_1.$dataCommonEvents;
    $dataTilesets = globals_1.$dataTilesets;
    $gameMap = globals_1.$gameMap;
    $gameTemp = globals_1.$gameTemp;
    $dataEnemies = globals_1.$dataEnemies;
    $gameActors = globals_1.$gameActors;
    $dataAnimations = globals_1.$dataAnimations;
    $gameParty = globals_1.$gameParty;
    $gameTroop = globals_1.$gameTroop;
    $gameTimer = globals_1.$gameTimer;
    $gameSelfSwitches = globals_1.$gameSelfSwitches;
    $dataClasses = globals_1.$dataClasses;
    $dataWeapons = globals_1.$dataWeapons;
    $dataArmors = globals_1.$dataArmors;
    $dataItems = globals_1.$dataItems;
    $gameScreen = globals_1.$gameScreen;
    $dataTroops = globals_1.$dataTroops;
    $dataActors = globals_1.$dataActors;
    $dataSkills = globals_1.$dataSkills;
    $dataStates = globals_1.$dataStates;
    $dataSystem = globals_1.$dataSystem;
    $dataMapInfos = globals_1.$dataMapInfos;
    $dataMap = globals_1.$dataMap;
    Graphics = Graphics_1.Graphics;
    JsonEx = JsonEx_1.JsonEx;
    Tilemap = Tilemap_1.Tilemap;
    TouchInput = TouchInput_1.TouchInput;
    Utils = Utils_1.Utils;
    AudioManager = AudioManager_1.AudioManager;
    BattleManager = BattleManager_1.BattleManager;
    DataManager = DataManager_1.DataManager;
    ImageManager = ImageManager_1.ImageManager;
    SceneManager = SceneManager_1.SceneManager;
    SoundManager = SoundManager_1.SoundManager;
    TextManager = TextManager_1.TextManager;
}
// スクリプト(eval)で利用するグローバル変数の初期化を可能にする
if (!DataManager_1.DataManager._onReset.contains(setGameObjects)) {
    DataManager_1.DataManager._onReset.add(setGameObjects);
}
function randomInt(max) {
    return Math.floor(max * g.game.vars.random.generate());
}
var Game_Character = /** @class */ (function (_super) {
    __extends(Game_Character, _super);
    function Game_Character() {
        var _this = _super.call(this) || this;
        if (Object.getPrototypeOf(_this) === Game_Character.prototype) {
            _this.initialize();
        }
        return _this;
    }
    Game_Character.prototype.initialize = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        _super.prototype.initialize.call(this);
    };
    Game_Character.prototype.initMembers = function () {
        _super.prototype.initMembers.call(this);
        this._moveRouteForcing = false;
        this._moveRoute = null;
        this._moveRouteIndex = 0;
        this._originalMoveRoute = null;
        this._originalMoveRouteIndex = 0;
        this._waitCount = 0;
    };
    Game_Character.prototype.memorizeMoveRoute = function () {
        this._originalMoveRoute = this._moveRoute;
        this._originalMoveRouteIndex = this._moveRouteIndex;
    };
    Game_Character.prototype.restoreMoveRoute = function () {
        this._moveRoute = this._originalMoveRoute;
        this._moveRouteIndex = this._originalMoveRouteIndex;
        this._originalMoveRoute = null;
    };
    Game_Character.prototype.isMoveRouteForcing = function () {
        return this._moveRouteForcing;
    };
    Game_Character.prototype.setMoveRoute = function (moveRoute) {
        this._moveRoute = moveRoute;
        this._moveRouteIndex = 0;
        this._moveRouteForcing = false;
    };
    Game_Character.prototype.forceMoveRoute = function (moveRoute) {
        if (!this._originalMoveRoute) {
            this.memorizeMoveRoute();
        }
        this._moveRoute = moveRoute;
        this._moveRouteIndex = 0;
        this._moveRouteForcing = true;
        this._waitCount = 0;
    };
    Game_Character.prototype.updateStop = function () {
        _super.prototype.updateStop.call(this);
        if (this._moveRouteForcing) {
            this.updateRoutineMove();
        }
    };
    Game_Character.prototype.updateRoutineMove = function () {
        if (this._waitCount > 0) {
            this._waitCount--;
        }
        else {
            this.setMovementSuccess(true);
            var command = this._moveRoute.list[this._moveRouteIndex];
            if (command) {
                this.processMoveCommand(command);
                this.advanceMoveRouteIndex();
            }
        }
    };
    Game_Character.prototype.processMoveCommand = function (command) {
        var gc = Game_Character;
        var params = command.parameters;
        switch (command.code) {
            case gc.ROUTE_END:
                this.processRouteEnd();
                break;
            case gc.ROUTE_MOVE_DOWN:
                this.moveStraight(2);
                break;
            case gc.ROUTE_MOVE_LEFT:
                this.moveStraight(4);
                break;
            case gc.ROUTE_MOVE_RIGHT:
                this.moveStraight(6);
                break;
            case gc.ROUTE_MOVE_UP:
                this.moveStraight(8);
                break;
            case gc.ROUTE_MOVE_LOWER_L:
                this.moveDiagonally(4, 2);
                break;
            case gc.ROUTE_MOVE_LOWER_R:
                this.moveDiagonally(6, 2);
                break;
            case gc.ROUTE_MOVE_UPPER_L:
                this.moveDiagonally(4, 8);
                break;
            case gc.ROUTE_MOVE_UPPER_R:
                this.moveDiagonally(6, 8);
                break;
            case gc.ROUTE_MOVE_RANDOM:
                this.moveRandom();
                break;
            case gc.ROUTE_MOVE_TOWARD:
                this.moveTowardPlayer();
                break;
            case gc.ROUTE_MOVE_AWAY:
                this.moveAwayFromPlayer();
                break;
            case gc.ROUTE_MOVE_FORWARD:
                this.moveForward();
                break;
            case gc.ROUTE_MOVE_BACKWARD:
                this.moveBackward();
                break;
            case gc.ROUTE_JUMP:
                this.jump(params[0], params[1]);
                break;
            case gc.ROUTE_WAIT:
                this._waitCount = params[0] - 1;
                break;
            case gc.ROUTE_TURN_DOWN:
                this.setDirection(2);
                break;
            case gc.ROUTE_TURN_LEFT:
                this.setDirection(4);
                break;
            case gc.ROUTE_TURN_RIGHT:
                this.setDirection(6);
                break;
            case gc.ROUTE_TURN_UP:
                this.setDirection(8);
                break;
            case gc.ROUTE_TURN_90D_R:
                this.turnRight90();
                break;
            case gc.ROUTE_TURN_90D_L:
                this.turnLeft90();
                break;
            case gc.ROUTE_TURN_180D:
                this.turn180();
                break;
            case gc.ROUTE_TURN_90D_R_L:
                this.turnRightOrLeft90();
                break;
            case gc.ROUTE_TURN_RANDOM:
                this.turnRandom();
                break;
            case gc.ROUTE_TURN_TOWARD:
                this.turnTowardPlayer();
                break;
            case gc.ROUTE_TURN_AWAY:
                this.turnAwayFromPlayer();
                break;
            case gc.ROUTE_SWITCH_ON:
                globals_1.$gameSwitches.setValue(params[0], true);
                break;
            case gc.ROUTE_SWITCH_OFF:
                globals_1.$gameSwitches.setValue(params[0], false);
                break;
            case gc.ROUTE_CHANGE_SPEED:
                this.setMoveSpeed(params[0]);
                break;
            case gc.ROUTE_CHANGE_FREQ:
                this.setMoveFrequency(params[0]);
                break;
            case gc.ROUTE_WALK_ANIME_ON:
                this.setWalkAnime(true);
                break;
            case gc.ROUTE_WALK_ANIME_OFF:
                this.setWalkAnime(false);
                break;
            case gc.ROUTE_STEP_ANIME_ON:
                this.setStepAnime(true);
                break;
            case gc.ROUTE_STEP_ANIME_OFF:
                this.setStepAnime(false);
                break;
            case gc.ROUTE_DIR_FIX_ON:
                this.setDirectionFix(true);
                break;
            case gc.ROUTE_DIR_FIX_OFF:
                this.setDirectionFix(false);
                break;
            case gc.ROUTE_THROUGH_ON:
                this.setThrough(true);
                break;
            case gc.ROUTE_THROUGH_OFF:
                this.setThrough(false);
                break;
            case gc.ROUTE_TRANSPARENT_ON:
                this.setTransparent(true);
                break;
            case gc.ROUTE_TRANSPARENT_OFF:
                this.setTransparent(false);
                break;
            case gc.ROUTE_CHANGE_IMAGE:
                this.setImage(params[0], params[1]);
                break;
            case gc.ROUTE_CHANGE_OPACITY:
                this.setOpacity(params[0]);
                break;
            case gc.ROUTE_CHANGE_BLEND_MODE:
                this.setBlendMode(params[0]);
                break;
            case gc.ROUTE_PLAY_SE:
                AudioManager_1.AudioManager.playSe(params[0]);
                break;
            case gc.ROUTE_SCRIPT:
                // eslint-disable-next-line no-eval
                eval(params[0]); // TODO: evalしている!!
                break;
        }
    };
    Game_Character.prototype.deltaXFrom = function (x) {
        return globals_1.$gameMap.deltaX(this.x, x);
    };
    Game_Character.prototype.deltaYFrom = function (y) {
        return globals_1.$gameMap.deltaY(this.y, y);
    };
    Game_Character.prototype.moveRandom = function () {
        var d = 2 + randomInt(4) * 2;
        if (this.canPass(this.x, this.y, d)) {
            this.moveStraight(d);
        }
    };
    Game_Character.prototype.moveTowardCharacter = function (character) {
        var sx = this.deltaXFrom(character.x);
        var sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            this.moveStraight(sx > 0 ? 4 : 6);
            if (!this.isMovementSucceeded() && sy !== 0) {
                this.moveStraight(sy > 0 ? 8 : 2);
            }
        }
        else if (sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
            if (!this.isMovementSucceeded() && sx !== 0) {
                this.moveStraight(sx > 0 ? 4 : 6);
            }
        }
    };
    Game_Character.prototype.moveAwayFromCharacter = function (character) {
        var sx = this.deltaXFrom(character.x);
        var sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            this.moveStraight(sx > 0 ? 6 : 4);
            if (!this.isMovementSucceeded() && sy !== 0) {
                this.moveStraight(sy > 0 ? 2 : 8);
            }
        }
        else if (sy !== 0) {
            this.moveStraight(sy > 0 ? 2 : 8);
            if (!this.isMovementSucceeded() && sx !== 0) {
                this.moveStraight(sx > 0 ? 6 : 4);
            }
        }
    };
    Game_Character.prototype.turnTowardCharacter = function (character) {
        var sx = this.deltaXFrom(character.x);
        var sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            this.setDirection(sx > 0 ? 4 : 6);
        }
        else if (sy !== 0) {
            this.setDirection(sy > 0 ? 8 : 2);
        }
    };
    Game_Character.prototype.turnAwayFromCharacter = function (character) {
        var sx = this.deltaXFrom(character.x);
        var sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            this.setDirection(sx > 0 ? 6 : 4);
        }
        else if (sy !== 0) {
            this.setDirection(sy > 0 ? 2 : 8);
        }
    };
    Game_Character.prototype.turnTowardPlayer = function () {
        this.turnTowardCharacter(globals_1.$gamePlayer);
    };
    Game_Character.prototype.turnAwayFromPlayer = function () {
        this.turnAwayFromCharacter(globals_1.$gamePlayer);
    };
    Game_Character.prototype.moveTowardPlayer = function () {
        this.moveTowardCharacter(globals_1.$gamePlayer);
    };
    Game_Character.prototype.moveAwayFromPlayer = function () {
        this.moveAwayFromCharacter(globals_1.$gamePlayer);
    };
    Game_Character.prototype.moveForward = function () {
        this.moveStraight(this.direction());
    };
    Game_Character.prototype.moveBackward = function () {
        var lastDirectionFix = this.isDirectionFixed();
        this.setDirectionFix(true);
        this.moveStraight(this.reverseDir(this.direction()));
        this.setDirectionFix(lastDirectionFix);
    };
    Game_Character.prototype.processRouteEnd = function () {
        if (this._moveRoute.repeat) {
            this._moveRouteIndex = -1;
        }
        else if (this._moveRouteForcing) {
            this._moveRouteForcing = false;
            this.restoreMoveRoute();
        }
    };
    Game_Character.prototype.advanceMoveRouteIndex = function () {
        var moveRoute = this._moveRoute;
        if (moveRoute && (this.isMovementSucceeded() || moveRoute.skippable)) {
            var numCommands = moveRoute.list.length - 1;
            this._moveRouteIndex++;
            if (moveRoute.repeat && this._moveRouteIndex >= numCommands) {
                this._moveRouteIndex = 0;
            }
        }
    };
    Game_Character.prototype.turnRight90 = function () {
        switch (this.direction()) {
            case 2:
                this.setDirection(4);
                break;
            case 4:
                this.setDirection(8);
                break;
            case 6:
                this.setDirection(2);
                break;
            case 8:
                this.setDirection(6);
                break;
        }
    };
    Game_Character.prototype.turnLeft90 = function () {
        switch (this.direction()) {
            case 2:
                this.setDirection(6);
                break;
            case 4:
                this.setDirection(2);
                break;
            case 6:
                this.setDirection(8);
                break;
            case 8:
                this.setDirection(4);
                break;
        }
    };
    Game_Character.prototype.turn180 = function () {
        this.setDirection(this.reverseDir(this.direction()));
    };
    Game_Character.prototype.turnRightOrLeft90 = function () {
        switch (randomInt(2)) {
            case 0:
                this.turnRight90();
                break;
            case 1:
                this.turnLeft90();
                break;
        }
    };
    Game_Character.prototype.turnRandom = function () {
        this.setDirection(2 + randomInt(4) * 2);
    };
    Game_Character.prototype.swap = function (character) {
        var newX = character.x;
        var newY = character.y;
        character.locate(this.x, this.y);
        this.locate(newX, newY);
    };
    Game_Character.prototype.findDirectionTo = function (goalX, goalY) {
        var searchLimit = this.searchLimit();
        var mapWidth = globals_1.$gameMap.width();
        var nodeList = [];
        var openList = [];
        var closedList = [];
        var start = {};
        var best = start;
        if (this.x === goalX && this.y === goalY) {
            return 0;
        }
        start.parent = null;
        start.x = this.x;
        start.y = this.y;
        start.g = 0;
        start.f = globals_1.$gameMap.distance(start.x, start.y, goalX, goalY);
        nodeList.push(start);
        openList.push(start.y * mapWidth + start.x);
        while (nodeList.length > 0) {
            var bestIndex = 0;
            for (var i = 0; i < nodeList.length; i++) {
                if (nodeList[i].f < nodeList[bestIndex].f) {
                    bestIndex = i;
                }
            }
            var current = nodeList[bestIndex];
            var x1 = current.x;
            var y1 = current.y;
            var pos1 = y1 * mapWidth + x1;
            var g1 = current.g;
            nodeList.splice(bestIndex, 1);
            openList.splice(openList.indexOf(pos1), 1);
            closedList.push(pos1);
            if (current.x === goalX && current.y === goalY) {
                best = current;
                break;
            }
            if (g1 >= searchLimit) {
                continue;
            }
            for (var j = 0; j < 4; j++) {
                var direction = 2 + j * 2;
                var x2 = globals_1.$gameMap.roundXWithDirection(x1, direction);
                var y2 = globals_1.$gameMap.roundYWithDirection(y1, direction);
                var pos2 = y2 * mapWidth + x2;
                if (Utils_1.Utils.contains(closedList, pos2)) {
                    continue;
                }
                if (!this.canPass(x1, y1, direction)) {
                    continue;
                }
                var g2 = g1 + 1;
                var index2 = openList.indexOf(pos2);
                if (index2 < 0 || g2 < nodeList[index2].g) {
                    var neighbor = void 0;
                    if (index2 >= 0) {
                        neighbor = nodeList[index2];
                    }
                    else {
                        neighbor = {};
                        nodeList.push(neighbor);
                        openList.push(pos2);
                    }
                    neighbor.parent = current;
                    neighbor.x = x2;
                    neighbor.y = y2;
                    neighbor.g = g2;
                    neighbor.f = g2 + globals_1.$gameMap.distance(x2, y2, goalX, goalY);
                    if (!best || neighbor.f - neighbor.g < best.f - best.g) {
                        best = neighbor;
                    }
                }
            }
        }
        var node = best;
        while (node.parent && node.parent !== start) {
            node = node.parent;
        }
        var deltaX1 = globals_1.$gameMap.deltaX(node.x, start.x);
        var deltaY1 = globals_1.$gameMap.deltaY(node.y, start.y);
        if (deltaY1 > 0) {
            return 2;
        }
        else if (deltaX1 < 0) {
            return 4;
        }
        else if (deltaX1 > 0) {
            return 6;
        }
        else if (deltaY1 < 0) {
            return 8;
        }
        var deltaX2 = this.deltaXFrom(goalX);
        var deltaY2 = this.deltaYFrom(goalY);
        if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
            return deltaX2 > 0 ? 4 : 6;
        }
        else if (deltaY2 !== 0) {
            return deltaY2 > 0 ? 8 : 2;
        }
        return 0;
    };
    Game_Character.prototype.searchLimit = function () {
        return 12;
    };
    Game_Character.ROUTE_END = 0;
    Game_Character.ROUTE_MOVE_DOWN = 1;
    Game_Character.ROUTE_MOVE_LEFT = 2;
    Game_Character.ROUTE_MOVE_RIGHT = 3;
    Game_Character.ROUTE_MOVE_UP = 4;
    Game_Character.ROUTE_MOVE_LOWER_L = 5;
    Game_Character.ROUTE_MOVE_LOWER_R = 6;
    Game_Character.ROUTE_MOVE_UPPER_L = 7;
    Game_Character.ROUTE_MOVE_UPPER_R = 8;
    Game_Character.ROUTE_MOVE_RANDOM = 9;
    Game_Character.ROUTE_MOVE_TOWARD = 10;
    Game_Character.ROUTE_MOVE_AWAY = 11;
    Game_Character.ROUTE_MOVE_FORWARD = 12;
    Game_Character.ROUTE_MOVE_BACKWARD = 13;
    Game_Character.ROUTE_JUMP = 14;
    Game_Character.ROUTE_WAIT = 15;
    Game_Character.ROUTE_TURN_DOWN = 16;
    Game_Character.ROUTE_TURN_LEFT = 17;
    Game_Character.ROUTE_TURN_RIGHT = 18;
    Game_Character.ROUTE_TURN_UP = 19;
    Game_Character.ROUTE_TURN_90D_R = 20;
    Game_Character.ROUTE_TURN_90D_L = 21;
    Game_Character.ROUTE_TURN_180D = 22;
    Game_Character.ROUTE_TURN_90D_R_L = 23;
    Game_Character.ROUTE_TURN_RANDOM = 24;
    Game_Character.ROUTE_TURN_TOWARD = 25;
    Game_Character.ROUTE_TURN_AWAY = 26;
    Game_Character.ROUTE_SWITCH_ON = 27;
    Game_Character.ROUTE_SWITCH_OFF = 28;
    Game_Character.ROUTE_CHANGE_SPEED = 29;
    Game_Character.ROUTE_CHANGE_FREQ = 30;
    Game_Character.ROUTE_WALK_ANIME_ON = 31;
    Game_Character.ROUTE_WALK_ANIME_OFF = 32;
    Game_Character.ROUTE_STEP_ANIME_ON = 33;
    Game_Character.ROUTE_STEP_ANIME_OFF = 34;
    Game_Character.ROUTE_DIR_FIX_ON = 35;
    Game_Character.ROUTE_DIR_FIX_OFF = 36;
    Game_Character.ROUTE_THROUGH_ON = 37;
    Game_Character.ROUTE_THROUGH_OFF = 38;
    Game_Character.ROUTE_TRANSPARENT_ON = 39;
    Game_Character.ROUTE_TRANSPARENT_OFF = 40;
    Game_Character.ROUTE_CHANGE_IMAGE = 41;
    Game_Character.ROUTE_CHANGE_OPACITY = 42;
    Game_Character.ROUTE_CHANGE_BLEND_MODE = 43;
    Game_Character.ROUTE_PLAY_SE = 44;
    Game_Character.ROUTE_SCRIPT = 45;
    return Game_Character;
}(GameCharacterBase_1.Game_CharacterBase));
exports.Game_Character = Game_Character;

"use strict";
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
exports.Game_Interpreter = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var scenes_1 = require("../scenes");
var SceneMenu_1 = require("../scenes/SceneMenu");
var SceneShop_1 = require("../scenes/SceneShop");
var windows_1 = require("../windows");
var GameCharacter_1 = require("./GameCharacter");
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
/* eslint-enable @typescript-eslint/no-unused-vars */
// 未定義の全GameObjectに値を代入。ただし定義済みの場合は何もしない
var setGameObjects = function () {
    if ($gameVariables) {
        return;
    }
    $gameVariables = DataManager_1.$gameVariables;
    $gameSystem = DataManager_1.$gameSystem;
    $gameSwitches = DataManager_1.$gameSwitches;
    $gameMessage = DataManager_1.$gameMessage;
    $gamePlayer = DataManager_1.$gamePlayer;
    $dataCommonEvents = DataManager_1.$dataCommonEvents;
    $dataTilesets = DataManager_1.$dataTilesets;
    $gameMap = DataManager_1.$gameMap;
    $gameTemp = DataManager_1.$gameTemp;
    $dataEnemies = DataManager_1.$dataEnemies;
    $gameActors = DataManager_1.$gameActors;
    $dataAnimations = DataManager_1.$dataAnimations;
    $gameParty = DataManager_1.$gameParty;
    $gameTroop = DataManager_1.$gameTroop;
    $gameTimer = DataManager_1.$gameTimer;
    $gameSelfSwitches = DataManager_1.$gameSelfSwitches;
    $dataClasses = DataManager_1.$dataClasses;
    $dataWeapons = DataManager_1.$dataWeapons;
    $dataArmors = DataManager_1.$dataArmors;
    $dataItems = DataManager_1.$dataItems;
    $gameScreen = DataManager_1.$gameScreen;
    $dataTroops = DataManager_1.$dataTroops;
    $dataActors = DataManager_1.$dataActors;
    $dataSkills = DataManager_1.$dataSkills;
    $dataStates = DataManager_1.$dataStates;
    $dataSystem = DataManager_1.$dataSystem;
    $dataMapInfos = DataManager_1.$dataMapInfos;
    $dataMap = DataManager_1.$dataMap;
};
var Game_Interpreter = /** @class */ (function () {
    function Game_Interpreter(depth) {
        this.initialize(depth);
    }
    Game_Interpreter.requestImages = function (list, commonList) {
        if (!list)
            return;
        list.forEach(function (command) {
            var params = command.parameters;
            switch (command.code) {
                // Show Text
                case 101:
                    managers_1.ImageManager.requestFace(params[0]);
                    break;
                // Common Event
                case 117:
                    var commonEvent = DataManager_1.$dataCommonEvents[params[0]];
                    if (commonEvent) {
                        if (!commonList) {
                            commonList = [];
                        }
                        if (!core_1.Utils.contains(commonList, params[0])) {
                            commonList.push(params[0]);
                            Game_Interpreter.requestImages(commonEvent.list, commonList);
                        }
                    }
                    break;
                // Change Party Member
                case 129:
                    var actor = DataManager_1.$gameActors.actor(params[0]);
                    if (actor && params[1] === 0) {
                        var name_1 = actor.characterName();
                        managers_1.ImageManager.requestCharacter(name_1);
                    }
                    break;
                // Set Movement Route
                case 205:
                    if (params[1]) {
                        params[1].list.forEach(function (command) {
                            var params = command.parameters;
                            if (command.code === GameCharacter_1.Game_Character.ROUTE_CHANGE_IMAGE) {
                                managers_1.ImageManager.requestCharacter(params[0]);
                            }
                        });
                    }
                    break;
                // Show Animation, Show Battle Animation
                case 212:
                case 337:
                    if (params[1]) {
                        var animation = DataManager_1.$dataAnimations[params[1]];
                        var name1 = animation.animation1Name;
                        var name2 = animation.animation2Name;
                        var hue1 = animation.animation1Hue;
                        var hue2 = animation.animation2Hue;
                        managers_1.ImageManager.requestAnimation(name1, hue1);
                        managers_1.ImageManager.requestAnimation(name2, hue2);
                    }
                    break;
                // Change Player Followers
                case 216:
                    if (params[0] === 0) {
                        DataManager_1.$gamePlayer.followers().forEach(function (follower) {
                            var name = follower.characterName();
                            managers_1.ImageManager.requestCharacter(name);
                        });
                    }
                    break;
                // Show Picture
                case 231:
                    managers_1.ImageManager.requestPicture(params[1]);
                    break;
                // Change Tileset
                case 282:
                    var tileset = DataManager_1.$dataTilesets[params[0]];
                    tileset.tilesetNames.forEach(function (tilesetName) {
                        managers_1.ImageManager.requestTileset(tilesetName);
                    });
                    break;
                // Change Battle Back
                case 283:
                    if (DataManager_1.$gameParty.inBattle()) {
                        managers_1.ImageManager.requestBattleback1(params[0]);
                        managers_1.ImageManager.requestBattleback2(params[1]);
                    }
                    break;
                // Change Parallax
                case 284:
                    if (!DataManager_1.$gameParty.inBattle()) {
                        managers_1.ImageManager.requestParallax(params[0]);
                    }
                    break;
                // Change Actor Images
                case 322:
                    managers_1.ImageManager.requestCharacter(params[1]);
                    managers_1.ImageManager.requestFace(params[3]);
                    managers_1.ImageManager.requestSvActor(params[5]);
                    break;
                // Change Vehicle Image
                case 323:
                    var vehicle = DataManager_1.$gameMap.vehicle(params[0]);
                    if (vehicle) {
                        managers_1.ImageManager.requestCharacter(params[1]);
                    }
                    break;
                // Enemy Transform
                case 336:
                    var enemy = DataManager_1.$dataEnemies[params[1]];
                    var name = enemy.battlerName;
                    var hue = enemy.battlerHue;
                    if (DataManager_1.$gameSystem.isSideView()) {
                        managers_1.ImageManager.requestSvEnemy(name, hue);
                    }
                    else {
                        managers_1.ImageManager.requestEnemy(name, hue);
                    }
                    break;
            }
        });
    };
    Game_Interpreter.prototype.initialize = function (depth) {
        this._depth = depth || 0;
        this.checkOverflow();
        this.clear();
        this._branch = {};
        this._params = [];
        this._indent = 0;
        this._frameCount = 0;
        this._freezeChecker = 0;
    };
    Game_Interpreter.prototype.checkOverflow = function () {
        if (this._depth >= 100) {
            throw new Error("Common event calls exceeded the limit");
        }
    };
    Game_Interpreter.prototype.clear = function () {
        this._mapId = 0;
        this._eventId = 0;
        this._list = null;
        this._index = 0;
        this._waitCount = 0;
        this._waitMode = "";
        this._comments = "";
        this._character = null;
        this._childInterpreter = null;
    };
    Game_Interpreter.prototype.setup = function (list, eventId) {
        this.clear();
        this._mapId = DataManager_1.$gameMap.mapId();
        this._eventId = eventId || 0;
        this._list = list;
        Game_Interpreter.requestImages(list);
    };
    Game_Interpreter.prototype.eventId = function () {
        return this._eventId;
    };
    Game_Interpreter.prototype.isOnCurrentMap = function () {
        return this._mapId === DataManager_1.$gameMap.mapId();
    };
    Game_Interpreter.prototype.setupReservedCommonEvent = function () {
        if (DataManager_1.$gameTemp.isCommonEventReserved()) {
            this.setup(DataManager_1.$gameTemp.reservedCommonEvent().list);
            DataManager_1.$gameTemp.clearCommonEvent();
            return true;
        }
        else {
            return false;
        }
    };
    Game_Interpreter.prototype.isRunning = function () {
        return !!this._list;
    };
    Game_Interpreter.prototype.update = function () {
        while (this.isRunning()) {
            if (this.updateChild() || this.updateWait()) {
                break;
            }
            if (managers_1.SceneManager.isSceneChanging()) {
                break;
            }
            if (!this.executeCommand()) {
                break;
            }
            if (this.checkFreeze()) {
                break;
            }
        }
    };
    Game_Interpreter.prototype.updateChild = function () {
        if (this._childInterpreter) {
            this._childInterpreter.update();
            if (this._childInterpreter.isRunning()) {
                return true;
            }
            else {
                this._childInterpreter = null;
            }
        }
        return false;
    };
    Game_Interpreter.prototype.updateWait = function () {
        return this.updateWaitCount() || this.updateWaitMode();
    };
    Game_Interpreter.prototype.updateWaitCount = function () {
        if (this._waitCount > 0) {
            this._waitCount--;
            return true;
        }
        return false;
    };
    Game_Interpreter.prototype.updateWaitMode = function () {
        var waiting = false;
        switch (this._waitMode) {
            case "message":
                waiting = DataManager_1.$gameMessage.isBusy();
                break;
            case "transfer":
                waiting = DataManager_1.$gamePlayer.isTransferring();
                break;
            case "scroll":
                waiting = DataManager_1.$gameMap.isScrolling();
                break;
            case "route":
                waiting = this._character.isMoveRouteForcing();
                break;
            case "animation":
                waiting = this._character.isAnimationPlaying();
                break;
            case "balloon":
                waiting = this._character.isBalloonPlaying();
                break;
            case "gather":
                waiting = DataManager_1.$gamePlayer.areFollowersGathering();
                break;
            case "action":
                waiting = managers_1.BattleManager.isActionForced();
                break;
            case "video":
                waiting = core_1.Graphics.isVideoPlaying();
                break;
            case "image":
                waiting = !managers_1.ImageManager.isReady();
                break;
        }
        if (!waiting) {
            this._waitMode = "";
        }
        return waiting;
    };
    Game_Interpreter.prototype.setWaitMode = function (waitMode) {
        this._waitMode = waitMode;
    };
    Game_Interpreter.prototype.wait = function (duration) {
        this._waitCount = duration;
    };
    Game_Interpreter.prototype.fadeSpeed = function () {
        return 24;
    };
    Game_Interpreter.prototype.executeCommand = function () {
        var command = this.currentCommand();
        if (command) {
            this._params = command.parameters;
            this._indent = command.indent;
            var methodName = "command" + command.code;
            if (typeof this[methodName] === "function") {
                if (!this[methodName]()) {
                    return false;
                }
            }
            this._index++;
        }
        else {
            this.terminate();
        }
        return true;
    };
    Game_Interpreter.prototype.checkFreeze = function () {
        if (this._frameCount !== core_1.Graphics.frameCount) {
            this._frameCount = core_1.Graphics.frameCount;
            this._freezeChecker = 0;
        }
        if (this._freezeChecker++ >= 100000) {
            return true;
        }
        else {
            return false;
        }
    };
    Game_Interpreter.prototype.terminate = function () {
        this._list = null;
        this._comments = "";
    };
    Game_Interpreter.prototype.skipBranch = function () {
        while (this._list[this._index + 1].indent > this._indent) {
            this._index++;
        }
    };
    Game_Interpreter.prototype.currentCommand = function () {
        return this._list[this._index];
    };
    Game_Interpreter.prototype.nextEventCode = function () {
        var command = this._list[this._index + 1];
        if (command) {
            return command.code;
        }
        else {
            return 0;
        }
    };
    Game_Interpreter.prototype.iterateActorId = function (param, callback) {
        if (param === 0) {
            DataManager_1.$gameParty.members().forEach(callback);
        }
        else {
            var actor = DataManager_1.$gameActors.actor(param);
            if (actor) {
                callback(actor);
            }
        }
    };
    Game_Interpreter.prototype.iterateActorEx = function (param1, param2, callback) {
        if (param1 === 0) {
            this.iterateActorId(param2, callback);
        }
        else {
            this.iterateActorId(DataManager_1.$gameVariables.value(param2), callback);
        }
    };
    Game_Interpreter.prototype.iterateActorIndex = function (param, callback) {
        if (param < 0) {
            DataManager_1.$gameParty.members().forEach(callback);
        }
        else {
            var actor = DataManager_1.$gameParty.members()[param];
            if (actor) {
                callback(actor);
            }
        }
    };
    Game_Interpreter.prototype.iterateEnemyIndex = function (param, callback) {
        if (param < 0) {
            DataManager_1.$gameTroop.members().forEach(callback);
        }
        else {
            var enemy = DataManager_1.$gameTroop.members()[param];
            if (enemy) {
                callback(enemy);
            }
        }
    };
    Game_Interpreter.prototype.iterateBattler = function (param1, param2, callback) {
        if (DataManager_1.$gameParty.inBattle()) {
            if (param1 === 0) {
                this.iterateEnemyIndex(param2, callback);
            }
            else {
                this.iterateActorId(param2, callback);
            }
        }
    };
    Game_Interpreter.prototype.character = function (param) {
        if (DataManager_1.$gameParty.inBattle()) {
            return null;
        }
        else if (param < 0) {
            return DataManager_1.$gamePlayer;
        }
        else if (this.isOnCurrentMap()) {
            return DataManager_1.$gameMap.event(param > 0 ? param : this._eventId);
        }
        else {
            return null;
        }
    };
    Game_Interpreter.prototype.operateValue = function (operation, operandType, operand) {
        var value = operandType === 0 ? operand : DataManager_1.$gameVariables.value(operand);
        return operation === 0 ? value : -value;
    };
    Game_Interpreter.prototype.changeHp = function (target, value, allowDeath) {
        if (target.isAlive()) {
            if (!allowDeath && target.hp <= -value) {
                value = 1 - target.hp;
            }
            target.gainHp(value);
            if (target.isDead()) {
                target.performCollapse();
            }
        }
    };
    // Show Text
    Game_Interpreter.prototype.command101 = function () {
        if (!DataManager_1.$gameMessage.isBusy()) {
            DataManager_1.$gameMessage.setFaceImage(this._params[0], this._params[1]);
            DataManager_1.$gameMessage.setBackground(this._params[2]);
            DataManager_1.$gameMessage.setPositionType(this._params[3]);
            while (this.nextEventCode() === 401) {
                // Text data
                this._index++;
                DataManager_1.$gameMessage.add(this.currentCommand().parameters[0]);
            }
            switch (this.nextEventCode()) {
                case 102: // Show Choices
                    this._index++;
                    this.setupChoices(this.currentCommand().parameters);
                    break;
                case 103: // Input Number
                    this._index++;
                    this.setupNumInput(this.currentCommand().parameters);
                    break;
                case 104: // Select Item
                    this._index++;
                    this.setupItemChoice(this.currentCommand().parameters);
                    break;
            }
            this._index++;
            this.setWaitMode("message");
        }
        return false;
    };
    // Show Choices
    Game_Interpreter.prototype.command102 = function () {
        if (!DataManager_1.$gameMessage.isBusy()) {
            this.setupChoices(this._params);
            this._index++;
            this.setWaitMode("message");
        }
        return false;
    };
    Game_Interpreter.prototype.setupChoices = function (params) {
        var _this = this;
        var choices = __spreadArray([], params[0], true);
        var cancelType = params[1];
        var defaultType = params.length > 2 ? params[2] : 0;
        var positionType = params.length > 3 ? params[3] : 2;
        var background = params.length > 4 ? params[4] : 0;
        if (cancelType >= choices.length) {
            cancelType = -2;
        }
        DataManager_1.$gameMessage.setChoices(choices, defaultType, cancelType);
        DataManager_1.$gameMessage.setChoiceBackground(background);
        DataManager_1.$gameMessage.setChoicePositionType(positionType);
        DataManager_1.$gameMessage.setChoiceCallback(function (n) {
            _this._branch[_this._indent] = n;
        });
    };
    // When [**]
    Game_Interpreter.prototype.command402 = function () {
        if (this._branch[this._indent] !== this._params[0]) {
            this.skipBranch();
        }
        return true;
    };
    // When Cancel
    Game_Interpreter.prototype.command403 = function () {
        if (this._branch[this._indent] >= 0) {
            this.skipBranch();
        }
        return true;
    };
    // Input Number
    Game_Interpreter.prototype.command103 = function () {
        if (!DataManager_1.$gameMessage.isBusy()) {
            this.setupNumInput(this._params);
            this._index++;
            this.setWaitMode("message");
        }
        return false;
    };
    Game_Interpreter.prototype.setupNumInput = function (params) {
        DataManager_1.$gameMessage.setNumberInput(params[0], params[1]);
    };
    // Select Item
    Game_Interpreter.prototype.command104 = function () {
        if (!DataManager_1.$gameMessage.isBusy()) {
            this.setupItemChoice(this._params);
            this._index++;
            this.setWaitMode("message");
        }
        return false;
    };
    Game_Interpreter.prototype.setupItemChoice = function (params) {
        DataManager_1.$gameMessage.setItemChoice(params[0], params[1] || 2);
    };
    // Show Scrolling Text
    Game_Interpreter.prototype.command105 = function () {
        if (!DataManager_1.$gameMessage.isBusy()) {
            DataManager_1.$gameMessage.setScroll(this._params[0], this._params[1]);
            while (this.nextEventCode() === 405) {
                this._index++;
                DataManager_1.$gameMessage.add(this.currentCommand().parameters[0]);
            }
            this._index++;
            this.setWaitMode("message");
        }
        return false;
    };
    // Comment
    Game_Interpreter.prototype.command108 = function () {
        this._comments = [this._params[0]];
        while (this.nextEventCode() === 408) {
            this._index++;
            this._comments.push(this.currentCommand().parameters[0]);
        }
        return true;
    };
    // Conditional Branch
    Game_Interpreter.prototype.command111 = function () {
        var result = false;
        switch (this._params[0]) {
            case 0: // Switch
                result = DataManager_1.$gameSwitches.value(this._params[1]) === (this._params[2] === 0);
                break;
            case 1: // Variable
                var value1 = DataManager_1.$gameVariables.value(this._params[1]);
                var value2 = void 0;
                if (this._params[2] === 0) {
                    value2 = this._params[3];
                }
                else {
                    value2 = DataManager_1.$gameVariables.value(this._params[3]);
                }
                switch (this._params[4]) {
                    case 0: // Equal to
                        result = value1 === value2;
                        break;
                    case 1: // Greater than or Equal to
                        result = value1 >= value2;
                        break;
                    case 2: // Less than or Equal to
                        result = value1 <= value2;
                        break;
                    case 3: // Greater than
                        result = value1 > value2;
                        break;
                    case 4: // Less than
                        result = value1 < value2;
                        break;
                    case 5: // Not Equal to
                        result = value1 !== value2;
                        break;
                }
                break;
            case 2: // Self Switch
                if (this._eventId > 0) {
                    var key = [this._mapId, this._eventId, this._params[1]];
                    result = DataManager_1.$gameSelfSwitches.value(key) === (this._params[2] === 0);
                }
                break;
            case 3: // Timer
                if (DataManager_1.$gameTimer.isWorking()) {
                    if (this._params[2] === 0) {
                        result = DataManager_1.$gameTimer.seconds() >= this._params[1];
                    }
                    else {
                        result = DataManager_1.$gameTimer.seconds() <= this._params[1];
                    }
                }
                break;
            case 4: // Actor
                var actor = DataManager_1.$gameActors.actor(this._params[1]);
                if (actor) {
                    var n = this._params[3];
                    switch (this._params[2]) {
                        case 0: // In the Party
                            result = core_1.Utils.contains(DataManager_1.$gameParty.members(), actor);
                            break;
                        case 1: // Name
                            result = actor.name() === n;
                            break;
                        case 2: // Class
                            result = actor.isClass(DataManager_1.$dataClasses[n]);
                            break;
                        case 3: // Skill
                            result = actor.hasSkill(n);
                            break;
                        case 4: // Weapon
                            result = actor.hasWeapon(DataManager_1.$dataWeapons[n]);
                            break;
                        case 5: // Armor
                            result = actor.hasArmor(DataManager_1.$dataArmors[n]);
                            break;
                        case 6: // State
                            result = actor.isStateAffected(n);
                            break;
                    }
                }
                break;
            case 5: // Enemy
                var enemy = DataManager_1.$gameTroop.members()[this._params[1]];
                if (enemy) {
                    switch (this._params[2]) {
                        case 0: // Appeared
                            result = enemy.isAlive();
                            break;
                        case 1: // State
                            result = enemy.isStateAffected(this._params[3]);
                            break;
                    }
                }
                break;
            case 6: // Character
                var character = this.character(this._params[1]);
                if (character) {
                    result = character.direction() === this._params[2];
                }
                break;
            case 7: // Gold
                switch (this._params[2]) {
                    case 0: // Greater than or equal to
                        result = DataManager_1.$gameParty.gold() >= this._params[1];
                        break;
                    case 1: // Less than or equal to
                        result = DataManager_1.$gameParty.gold() <= this._params[1];
                        break;
                    case 2: // Less than
                        result = DataManager_1.$gameParty.gold() < this._params[1];
                        break;
                }
                break;
            case 8: // Item
                result = DataManager_1.$gameParty.hasItem(DataManager_1.$dataItems[this._params[1]]);
                break;
            case 9: // Weapon
                result = DataManager_1.$gameParty.hasItem(DataManager_1.$dataWeapons[this._params[1]], this._params[2]);
                break;
            case 10: // Armor
                result = DataManager_1.$gameParty.hasItem(DataManager_1.$dataArmors[this._params[1]], this._params[2]);
                break;
            case 11: // Button
                // result = Input.isPressed(this._params[1]);
                result = false; // TODO: impl
                break;
            case 12: // Script
                setGameObjects();
                // eslint-disable-next-line no-eval
                result = !!eval(this._params[1]);
                break;
            case 13: // Vehicle
                result = DataManager_1.$gamePlayer.vehicle() === DataManager_1.$gameMap.vehicle(this._params[1]);
                break;
        }
        this._branch[this._indent] = result;
        if (this._branch[this._indent] === false) {
            this.skipBranch();
        }
        return true;
    };
    // Else
    Game_Interpreter.prototype.command411 = function () {
        if (this._branch[this._indent] !== false) {
            this.skipBranch();
        }
        return true;
    };
    // Loop
    Game_Interpreter.prototype.command112 = function () {
        return true;
    };
    // Repeat Above
    Game_Interpreter.prototype.command413 = function () {
        do {
            this._index--;
        } while (this.currentCommand().indent !== this._indent);
        return true;
    };
    // Break Loop
    Game_Interpreter.prototype.command113 = function () {
        var depth = 0;
        while (this._index < this._list.length - 1) {
            this._index++;
            var command = this.currentCommand();
            if (command.code === 112)
                depth++;
            if (command.code === 413) {
                if (depth > 0)
                    depth--;
                else
                    break;
            }
        }
        return true;
    };
    // Exit Event Processing
    Game_Interpreter.prototype.command115 = function () {
        this._index = this._list.length;
        return true;
    };
    // Common Event
    Game_Interpreter.prototype.command117 = function () {
        var commonEvent = DataManager_1.$dataCommonEvents[this._params[0]];
        if (commonEvent) {
            var eventId = this.isOnCurrentMap() ? this._eventId : 0;
            this.setupChild(commonEvent.list, eventId);
        }
        return true;
    };
    Game_Interpreter.prototype.setupChild = function (list, eventId) {
        this._childInterpreter = new Game_Interpreter(this._depth + 1);
        this._childInterpreter.setup(list, eventId);
    };
    // Label
    Game_Interpreter.prototype.command118 = function () {
        return true;
    };
    // Jump to Label
    Game_Interpreter.prototype.command119 = function () {
        var labelName = this._params[0];
        for (var i = 0; i < this._list.length; i++) {
            var command = this._list[i];
            if (command.code === 118 && command.parameters[0] === labelName) {
                this.jumpTo(i);
                return;
            }
        }
        return true;
    };
    Game_Interpreter.prototype.jumpTo = function (index) {
        var lastIndex = this._index;
        var startIndex = Math.min(index, lastIndex);
        var endIndex = Math.max(index, lastIndex);
        var indent = this._indent;
        for (var i = startIndex; i <= endIndex; i++) {
            var newIndent = this._list[i].indent;
            if (newIndent !== indent) {
                this._branch[indent] = null;
                indent = newIndent;
            }
        }
        this._index = index;
    };
    // Control Switches
    Game_Interpreter.prototype.command121 = function () {
        for (var i = this._params[0]; i <= this._params[1]; i++) {
            DataManager_1.$gameSwitches.setValue(i, this._params[2] === 0);
        }
        return true;
    };
    // Control Variables
    Game_Interpreter.prototype.command122 = function () {
        var value = 0;
        switch (this._params[3] // Operand
        ) {
            case 0: // Constant
                value = this._params[4];
                break;
            case 1: // Variable
                value = DataManager_1.$gameVariables.value(this._params[4]);
                break;
            case 2: // Random
                value = this._params[5] - this._params[4] + 1;
                for (var i = this._params[0]; i <= this._params[1]; i++) {
                    this.operateVariable(i, this._params[2], this._params[4] + core_1.Utils.randomInt(value));
                }
                return true;
            // break; // Unreachable code detected.
            case 3: // Game Data
                value = this.gameDataOperand(this._params[4], this._params[5], this._params[6]);
                break;
            case 4: // Script
                setGameObjects();
                // eslint-disable-next-line no-eval
                value = eval(this._params[4]);
                break;
        }
        for (var i = this._params[0]; i <= this._params[1]; i++) {
            this.operateVariable(i, this._params[2], value);
        }
        return true;
    };
    Game_Interpreter.prototype.gameDataOperand = function (type, param1, param2) {
        switch (type) {
            case 0: // Item
                return DataManager_1.$gameParty.numItems(DataManager_1.$dataItems[param1]);
            case 1: // Weapon
                return DataManager_1.$gameParty.numItems(DataManager_1.$dataWeapons[param1]);
            case 2: // Armor
                return DataManager_1.$gameParty.numItems(DataManager_1.$dataArmors[param1]);
            case 3: // Actor
                var actor = DataManager_1.$gameActors.actor(param1);
                if (actor) {
                    switch (param2) {
                        case 0: // Level
                            return actor.level;
                        case 1: // EXP
                            return actor.currentExp();
                        case 2: // HP
                            return actor.hp;
                        case 3: // MP
                            return actor.mp;
                        default: // Parameter
                            if (param2 >= 4 && param2 <= 11) {
                                return actor.param(param2 - 4);
                            }
                    }
                }
                break;
            case 4: // Enemy
                var enemy = DataManager_1.$gameTroop.members()[param1];
                if (enemy) {
                    switch (param2) {
                        case 0: // HP
                            return enemy.hp;
                        case 1: // MP
                            return enemy.mp;
                        default: // Parameter
                            if (param2 >= 2 && param2 <= 9) {
                                return enemy.param(param2 - 2);
                            }
                    }
                }
                break;
            case 5: // Character
                var character = this.character(param1);
                if (character) {
                    switch (param2) {
                        case 0: // Map X
                            return character.x;
                        case 1: // Map Y
                            return character.y;
                        case 2: // Direction
                            return character.direction();
                        case 3: // Screen X
                            return character.screenX();
                        case 4: // Screen Y
                            return character.screenY();
                    }
                }
                break;
            case 6: // Party
                actor = DataManager_1.$gameParty.members()[param1];
                return actor ? actor.actorId() : 0;
            case 7: // Other
                switch (param1) {
                    case 0: // Map ID
                        return DataManager_1.$gameMap.mapId();
                    case 1: // Party Members
                        return DataManager_1.$gameParty.size();
                    case 2: // Gold
                        return DataManager_1.$gameParty.gold();
                    case 3: // Steps
                        return DataManager_1.$gameParty.steps();
                    case 4: // Play Time
                        return DataManager_1.$gameSystem.playtime();
                    case 5: // Timer
                        return DataManager_1.$gameTimer.seconds();
                    case 6: // Save Count
                        return DataManager_1.$gameSystem.saveCount();
                    case 7: // Battle Count
                        return DataManager_1.$gameSystem.battleCount();
                    case 8: // Win Count
                        return DataManager_1.$gameSystem.winCount();
                    case 9: // Escape Count
                        return DataManager_1.$gameSystem.escapeCount();
                }
                break;
        }
        return 0;
    };
    Game_Interpreter.prototype.operateVariable = function (variableId, operationType, value) {
        try {
            var oldValue = DataManager_1.$gameVariables.value(variableId);
            switch (operationType) {
                case 0: // Set
                    DataManager_1.$gameVariables.setValue(variableId, (oldValue = value));
                    break;
                case 1: // Add
                    DataManager_1.$gameVariables.setValue(variableId, oldValue + value);
                    break;
                case 2: // Sub
                    DataManager_1.$gameVariables.setValue(variableId, oldValue - value);
                    break;
                case 3: // Mul
                    DataManager_1.$gameVariables.setValue(variableId, oldValue * value);
                    break;
                case 4: // Div
                    DataManager_1.$gameVariables.setValue(variableId, oldValue / value);
                    break;
                case 5: // Mod
                    DataManager_1.$gameVariables.setValue(variableId, oldValue % value);
                    break;
            }
        }
        catch (e) {
            DataManager_1.$gameVariables.setValue(variableId, 0);
        }
    };
    // Control Self Switch
    Game_Interpreter.prototype.command123 = function () {
        if (this._eventId > 0) {
            var key = [this._mapId, this._eventId, this._params[0]];
            DataManager_1.$gameSelfSwitches.setValue(key, this._params[1] === 0);
        }
        return true;
    };
    // Control Timer
    Game_Interpreter.prototype.command124 = function () {
        if (this._params[0] === 0) {
            // Start
            DataManager_1.$gameTimer.start(this._params[1] * 60);
        }
        else {
            // Stop
            DataManager_1.$gameTimer.stop();
        }
        return true;
    };
    // Change Gold
    Game_Interpreter.prototype.command125 = function () {
        var value = this.operateValue(this._params[0], this._params[1], this._params[2]);
        DataManager_1.$gameParty.gainGold(value);
        return true;
    };
    // Change Items
    Game_Interpreter.prototype.command126 = function () {
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        DataManager_1.$gameParty.gainItem(DataManager_1.$dataItems[this._params[0]], value);
        return true;
    };
    // Change Weapons
    Game_Interpreter.prototype.command127 = function () {
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        DataManager_1.$gameParty.gainItem(DataManager_1.$dataWeapons[this._params[0]], value, this._params[4]);
        return true;
    };
    // Change Armors
    Game_Interpreter.prototype.command128 = function () {
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        DataManager_1.$gameParty.gainItem(DataManager_1.$dataArmors[this._params[0]], value, this._params[4]);
        return true;
    };
    // Change Party Member
    Game_Interpreter.prototype.command129 = function () {
        var actor = DataManager_1.$gameActors.actor(this._params[0]);
        if (actor) {
            if (this._params[1] === 0) {
                // Add
                if (this._params[2]) {
                    // Initialize
                    DataManager_1.$gameActors.actor(this._params[0]).setup(this._params[0]);
                }
                DataManager_1.$gameParty.addActor(this._params[0]);
            }
            else {
                // Remove
                DataManager_1.$gameParty.removeActor(this._params[0]);
            }
        }
        return true;
    };
    // Change Battle BGM
    Game_Interpreter.prototype.command132 = function () {
        DataManager_1.$gameSystem.setBattleBgm(this._params[0]);
        return true;
    };
    // Change Victory ME
    Game_Interpreter.prototype.command133 = function () {
        DataManager_1.$gameSystem.setVictoryMe(this._params[0]);
        return true;
    };
    // Change Save Access
    Game_Interpreter.prototype.command134 = function () {
        if (this._params[0] === 0) {
            DataManager_1.$gameSystem.disableSave();
        }
        else {
            DataManager_1.$gameSystem.enableSave();
        }
        return true;
    };
    // Change Menu Access
    Game_Interpreter.prototype.command135 = function () {
        if (this._params[0] === 0) {
            DataManager_1.$gameSystem.disableMenu();
        }
        else {
            DataManager_1.$gameSystem.enableMenu();
        }
        return true;
    };
    // Change Encounter Disable
    Game_Interpreter.prototype.command136 = function () {
        if (this._params[0] === 0) {
            DataManager_1.$gameSystem.disableEncounter();
        }
        else {
            DataManager_1.$gameSystem.enableEncounter();
        }
        DataManager_1.$gamePlayer.makeEncounterCount();
        return true;
    };
    // Change Formation Access
    Game_Interpreter.prototype.command137 = function () {
        if (this._params[0] === 0) {
            DataManager_1.$gameSystem.disableFormation();
        }
        else {
            DataManager_1.$gameSystem.enableFormation();
        }
        return true;
    };
    // Change Window Color
    Game_Interpreter.prototype.command138 = function () {
        DataManager_1.$gameSystem.setWindowTone(this._params[0]);
        return true;
    };
    // Change Defeat ME
    Game_Interpreter.prototype.command139 = function () {
        DataManager_1.$gameSystem.setDefeatMe(this._params[0]);
        return true;
    };
    // Change Vehicle BGM
    Game_Interpreter.prototype.command140 = function () {
        var vehicle = DataManager_1.$gameMap.vehicle(this._params[0]);
        if (vehicle) {
            vehicle.setBgm(this._params[1]);
        }
        return true;
    };
    // Transfer Player
    Game_Interpreter.prototype.command201 = function () {
        if (!DataManager_1.$gameParty.inBattle() && !DataManager_1.$gameMessage.isBusy()) {
            var mapId = void 0;
            var x = void 0;
            var y = void 0;
            if (this._params[0] === 0) {
                // Direct designation
                mapId = this._params[1];
                x = this._params[2];
                y = this._params[3];
            }
            else {
                // Designation with variables
                mapId = DataManager_1.$gameVariables.value(this._params[1]);
                x = DataManager_1.$gameVariables.value(this._params[2]);
                y = DataManager_1.$gameVariables.value(this._params[3]);
            }
            DataManager_1.$gamePlayer.reserveTransfer(mapId, x, y, this._params[4], this._params[5]);
            this.setWaitMode("transfer");
            this._index++;
        }
        return false;
    };
    // Set Vehicle Location
    Game_Interpreter.prototype.command202 = function () {
        var mapId;
        var x;
        var y;
        if (this._params[1] === 0) {
            // Direct designation
            mapId = this._params[2];
            x = this._params[3];
            y = this._params[4];
        }
        else {
            // Designation with variables
            mapId = DataManager_1.$gameVariables.value(this._params[2]);
            x = DataManager_1.$gameVariables.value(this._params[3]);
            y = DataManager_1.$gameVariables.value(this._params[4]);
        }
        var vehicle = DataManager_1.$gameMap.vehicle(this._params[0]);
        if (vehicle) {
            vehicle.setLocation(mapId, x, y);
        }
        return true;
    };
    // Set Event Location
    Game_Interpreter.prototype.command203 = function () {
        var character = this.character(this._params[0]);
        if (character) {
            if (this._params[1] === 0) {
                // Direct designation
                character.locate(this._params[2], this._params[3]);
            }
            else if (this._params[1] === 1) {
                // Designation with variables
                var x = DataManager_1.$gameVariables.value(this._params[2]);
                var y = DataManager_1.$gameVariables.value(this._params[3]);
                character.locate(x, y);
            }
            else {
                // Exchange with another event
                var character2 = this.character(this._params[2]);
                if (character2) {
                    character.swap(character2);
                }
            }
            if (this._params[4] > 0) {
                character.setDirection(this._params[4]);
            }
        }
        return true;
    };
    // Scroll Map
    Game_Interpreter.prototype.command204 = function () {
        if (!DataManager_1.$gameParty.inBattle()) {
            if (DataManager_1.$gameMap.isScrolling()) {
                this.setWaitMode("scroll");
                return false;
            }
            DataManager_1.$gameMap.startScroll(this._params[0], this._params[1], this._params[2]);
        }
        return true;
    };
    // Set Movement Route
    Game_Interpreter.prototype.command205 = function () {
        DataManager_1.$gameMap.refreshIfNeeded();
        this._character = this.character(this._params[0]);
        if (this._character) {
            this._character.forceMoveRoute(this._params[1]);
            if (this._params[1].wait) {
                this.setWaitMode("route");
            }
        }
        return true;
    };
    // Getting On and Off Vehicles
    Game_Interpreter.prototype.command206 = function () {
        DataManager_1.$gamePlayer.getOnOffVehicle();
        return true;
    };
    // Change Transparency
    Game_Interpreter.prototype.command211 = function () {
        DataManager_1.$gamePlayer.setTransparent(this._params[0] === 0);
        return true;
    };
    // Show Animation
    Game_Interpreter.prototype.command212 = function () {
        this._character = this.character(this._params[0]);
        if (this._character) {
            this._character.requestAnimation(this._params[1]);
            if (this._params[2]) {
                this.setWaitMode("animation");
            }
        }
        return true;
    };
    // Show Balloon Icon
    Game_Interpreter.prototype.command213 = function () {
        this._character = this.character(this._params[0]);
        if (this._character) {
            this._character.requestBalloon(this._params[1]);
            if (this._params[2]) {
                this.setWaitMode("balloon");
            }
        }
        return true;
    };
    // Erase Event
    Game_Interpreter.prototype.command214 = function () {
        if (this.isOnCurrentMap() && this._eventId > 0) {
            DataManager_1.$gameMap.eraseEvent(this._eventId);
        }
        return true;
    };
    // Change Player Followers
    Game_Interpreter.prototype.command216 = function () {
        if (this._params[0] === 0) {
            DataManager_1.$gamePlayer.showFollowers();
        }
        else {
            DataManager_1.$gamePlayer.hideFollowers();
        }
        DataManager_1.$gamePlayer.refresh();
        return true;
    };
    // Gather Followers
    Game_Interpreter.prototype.command217 = function () {
        if (!DataManager_1.$gameParty.inBattle()) {
            DataManager_1.$gamePlayer.gatherFollowers();
            this.setWaitMode("gather");
        }
        return true;
    };
    // Fadeout Screen
    Game_Interpreter.prototype.command221 = function () {
        if (!DataManager_1.$gameMessage.isBusy()) {
            DataManager_1.$gameScreen.startFadeOut(this.fadeSpeed());
            this.wait(this.fadeSpeed());
            this._index++;
        }
        return false;
    };
    // Fadein Screen
    Game_Interpreter.prototype.command222 = function () {
        if (!DataManager_1.$gameMessage.isBusy()) {
            DataManager_1.$gameScreen.startFadeIn(this.fadeSpeed());
            this.wait(this.fadeSpeed());
            this._index++;
        }
        return false;
    };
    // Tint Screen
    Game_Interpreter.prototype.command223 = function () {
        DataManager_1.$gameScreen.startTint(this._params[0], this._params[1]);
        if (this._params[2]) {
            this.wait(this._params[1]);
        }
        return true;
    };
    // Flash Screen
    Game_Interpreter.prototype.command224 = function () {
        DataManager_1.$gameScreen.startFlash(this._params[0], this._params[1]);
        if (this._params[2]) {
            this.wait(this._params[1]);
        }
        return true;
    };
    // Shake Screen
    Game_Interpreter.prototype.command225 = function () {
        DataManager_1.$gameScreen.startShake(this._params[0], this._params[1], this._params[2]);
        if (this._params[3]) {
            this.wait(this._params[2]);
        }
        return true;
    };
    // Wait
    Game_Interpreter.prototype.command230 = function () {
        this.wait(this._params[0]);
        return true;
    };
    // Show Picture
    Game_Interpreter.prototype.command231 = function () {
        var x;
        var y;
        if (this._params[3] === 0) {
            // Direct designation
            x = this._params[4];
            y = this._params[5];
        }
        else {
            // Designation with variables
            x = DataManager_1.$gameVariables.value(this._params[4]);
            y = DataManager_1.$gameVariables.value(this._params[5]);
        }
        DataManager_1.$gameScreen.showPicture(this._params[0], this._params[1], this._params[2], x, y, this._params[6], this._params[7], this._params[8], this._params[9]);
        return true;
    };
    // Move Picture
    Game_Interpreter.prototype.command232 = function () {
        var x;
        var y;
        if (this._params[3] === 0) {
            // Direct designation
            x = this._params[4];
            y = this._params[5];
        }
        else {
            // Designation with variables
            x = DataManager_1.$gameVariables.value(this._params[4]);
            y = DataManager_1.$gameVariables.value(this._params[5]);
        }
        DataManager_1.$gameScreen.movePicture(this._params[0], this._params[2], x, y, this._params[6], this._params[7], this._params[8], this._params[9], this._params[10]);
        if (this._params[11]) {
            this.wait(this._params[10]);
        }
        return true;
    };
    // Rotate Picture
    Game_Interpreter.prototype.command233 = function () {
        DataManager_1.$gameScreen.rotatePicture(this._params[0], this._params[1]);
        return true;
    };
    // Tint Picture
    Game_Interpreter.prototype.command234 = function () {
        DataManager_1.$gameScreen.tintPicture(this._params[0], this._params[1], this._params[2]);
        if (this._params[3]) {
            this.wait(this._params[2]);
        }
        return true;
    };
    // Erase Picture
    Game_Interpreter.prototype.command235 = function () {
        DataManager_1.$gameScreen.erasePicture(this._params[0]);
        return true;
    };
    // Set Weather Effect
    Game_Interpreter.prototype.command236 = function () {
        if (!DataManager_1.$gameParty.inBattle()) {
            DataManager_1.$gameScreen.changeWeather(this._params[0], this._params[1], this._params[2]);
            if (this._params[3]) {
                this.wait(this._params[2]);
            }
        }
        return true;
    };
    // Play BGM
    Game_Interpreter.prototype.command241 = function () {
        managers_1.AudioManager.playBgm(this._params[0]);
        return true;
    };
    // Fadeout BGM
    Game_Interpreter.prototype.command242 = function () {
        managers_1.AudioManager.fadeOutBgm(this._params[0]);
        return true;
    };
    // Save BGM
    Game_Interpreter.prototype.command243 = function () {
        DataManager_1.$gameSystem.saveBgm();
        return true;
    };
    // Resume BGM
    Game_Interpreter.prototype.command244 = function () {
        DataManager_1.$gameSystem.replayBgm();
        return true;
    };
    // Play BGS
    Game_Interpreter.prototype.command245 = function () {
        managers_1.AudioManager.playBgs(this._params[0]);
        return true;
    };
    // Fadeout BGS
    Game_Interpreter.prototype.command246 = function () {
        managers_1.AudioManager.fadeOutBgs(this._params[0]);
        return true;
    };
    // Play ME
    Game_Interpreter.prototype.command249 = function () {
        managers_1.AudioManager.playMe(this._params[0]);
        return true;
    };
    // Play SE
    Game_Interpreter.prototype.command250 = function () {
        managers_1.AudioManager.playSe(this._params[0]);
        return true;
    };
    // Stop SE
    Game_Interpreter.prototype.command251 = function () {
        managers_1.AudioManager.stopSe();
        return true;
    };
    // Play Movie
    Game_Interpreter.prototype.command261 = function () {
        if (!DataManager_1.$gameMessage.isBusy()) {
            var name = this._params[0];
            if (name.length > 0) {
                var ext = this.videoFileExt();
                core_1.Graphics.playVideo("movies/" + name + ext);
                this.setWaitMode("video");
            }
            this._index++;
        }
        return false;
    };
    Game_Interpreter.prototype.videoFileExt = function () {
        if (core_1.Graphics.canPlayVideoType("video/webm") && !core_1.Utils.isMobileDevice()) {
            return ".webm";
        }
        else {
            return ".mp4";
        }
    };
    // Change Map Name Display
    Game_Interpreter.prototype.command281 = function () {
        if (this._params[0] === 0) {
            DataManager_1.$gameMap.enableNameDisplay();
        }
        else {
            DataManager_1.$gameMap.disableNameDisplay();
        }
        return true;
    };
    // Change Tileset
    Game_Interpreter.prototype.command282 = function () {
        var _this = this;
        var tileset = DataManager_1.$dataTilesets[this._params[0]];
        if (!this._imageReservationId) {
            this._imageReservationId = core_1.Utils.generateRuntimeId();
        }
        var allReady = tileset.tilesetNames
            .map(function (tilesetName) {
            return managers_1.ImageManager.reserveTileset(tilesetName, 0, _this._imageReservationId);
        })
            .every(function (bitmap) { return bitmap.isReady(); });
        if (allReady) {
            DataManager_1.$gameMap.changeTileset(this._params[0]);
            managers_1.ImageManager.releaseReservation(this._imageReservationId);
            this._imageReservationId = null;
            return true;
        }
        else {
            return false;
        }
    };
    // Change Battle Back
    Game_Interpreter.prototype.command283 = function () {
        DataManager_1.$gameMap.changeBattleback(this._params[0], this._params[1]);
        return true;
    };
    // Change Parallax
    Game_Interpreter.prototype.command284 = function () {
        DataManager_1.$gameMap.changeParallax(this._params[0], this._params[1], this._params[2], this._params[3], this._params[4]);
        return true;
    };
    // Get Location Info
    Game_Interpreter.prototype.command285 = function () {
        var x;
        var y;
        var value;
        if (this._params[2] === 0) {
            // Direct designation
            x = this._params[3];
            y = this._params[4];
        }
        else {
            // Designation with variables
            x = DataManager_1.$gameVariables.value(this._params[3]);
            y = DataManager_1.$gameVariables.value(this._params[4]);
        }
        switch (this._params[1]) {
            case 0: // Terrain Tag
                value = DataManager_1.$gameMap.terrainTag(x, y);
                break;
            case 1: // Event ID
                value = DataManager_1.$gameMap.eventIdXy(x, y);
                break;
            case 2: // Tile ID (Layer 1)
            case 3: // Tile ID (Layer 2)
            case 4: // Tile ID (Layer 3)
            case 5: // Tile ID (Layer 4)
                value = DataManager_1.$gameMap.tileId(x, y, this._params[1] - 2);
                break;
            default: // Region ID
                value = DataManager_1.$gameMap.regionId(x, y);
                break;
        }
        DataManager_1.$gameVariables.setValue(this._params[0], value);
        return true;
    };
    // Battle Processing
    Game_Interpreter.prototype.command301 = function () {
        var _this = this;
        if (!DataManager_1.$gameParty.inBattle()) {
            var troopId = void 0;
            if (this._params[0] === 0) {
                // Direct designation
                troopId = this._params[1];
            }
            else if (this._params[0] === 1) {
                // Designation with a variable
                troopId = DataManager_1.$gameVariables.value(this._params[1]);
            }
            else {
                // Same as Random Encounter
                troopId = DataManager_1.$gamePlayer.makeEncounterTroopId();
            }
            if (DataManager_1.$dataTroops[troopId]) {
                managers_1.BattleManager.setup(troopId, this._params[2], this._params[3]);
                managers_1.BattleManager.setEventCallback(function (n) {
                    _this._branch[_this._indent] = n;
                });
                DataManager_1.$gamePlayer.makeEncounterCount();
                managers_1.SceneManager.push(scenes_1.Scene_Battle);
            }
        }
        return true;
    };
    // If Win
    Game_Interpreter.prototype.command601 = function () {
        if (this._branch[this._indent] !== 0) {
            this.skipBranch();
        }
        return true;
    };
    // If Escape
    Game_Interpreter.prototype.command602 = function () {
        if (this._branch[this._indent] !== 1) {
            this.skipBranch();
        }
        return true;
    };
    // If Lose
    Game_Interpreter.prototype.command603 = function () {
        if (this._branch[this._indent] !== 2) {
            this.skipBranch();
        }
        return true;
    };
    // Shop Processing
    Game_Interpreter.prototype.command302 = function () {
        if (!DataManager_1.$gameParty.inBattle()) {
            var goods = [this._params];
            while (this.nextEventCode() === 605) {
                this._index++;
                goods.push(this.currentCommand().parameters);
            }
            managers_1.SceneManager.push(SceneShop_1.Scene_Shop);
            managers_1.SceneManager.prepareNextScene(goods, this._params[4]);
        }
        return true;
    };
    // Name Input Processing
    Game_Interpreter.prototype.command303 = function () {
        // 名前入力も今の所サポートしていないのでコメントアウト
        // if (!$gameParty.inBattle()) {
        // 	if ($dataActors[this._params[0]]) {
        // 		SceneManager.push(Scene_Name);
        // 		SceneManager.prepareNextScene(this._params[0], this._params[1]);
        // 	}
        // }
        return true;
    };
    // Change HP
    Game_Interpreter.prototype.command311 = function () {
        var _this = this;
        var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], function (actor) {
            _this.changeHp(actor, value, _this._params[5]);
        });
        return true;
    };
    // Change MP
    Game_Interpreter.prototype.command312 = function () {
        var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], function (actor) {
            actor.gainMp(value);
        });
        return true;
    };
    // Change TP
    Game_Interpreter.prototype.command326 = function () {
        var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], function (actor) {
            actor.gainTp(value);
        });
        return true;
    };
    // Change State
    Game_Interpreter.prototype.command313 = function () {
        var _this = this;
        this.iterateActorEx(this._params[0], this._params[1], function (actor) {
            var alreadyDead = actor.isDead();
            if (_this._params[2] === 0) {
                actor.addState(_this._params[3]);
            }
            else {
                actor.removeState(_this._params[3]);
            }
            if (actor.isDead() && !alreadyDead) {
                actor.performCollapse();
            }
            actor.clearResult();
        });
        return true;
    };
    // Recover All
    Game_Interpreter.prototype.command314 = function () {
        this.iterateActorEx(this._params[0], this._params[1], function (actor) {
            actor.recoverAll();
        });
        return true;
    };
    // Change EXP
    Game_Interpreter.prototype.command315 = function () {
        var _this = this;
        var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], function (actor) {
            actor.changeExp(actor.currentExp() + value, _this._params[5]);
        });
        return true;
    };
    // Change Level
    Game_Interpreter.prototype.command316 = function () {
        var _this = this;
        var value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], function (actor) {
            actor.changeLevel(actor.level + value, _this._params[5]);
        });
        return true;
    };
    // Change Parameter
    Game_Interpreter.prototype.command317 = function () {
        var _this = this;
        var value = this.operateValue(this._params[3], this._params[4], this._params[5]);
        this.iterateActorEx(this._params[0], this._params[1], function (actor) {
            actor.addParam(_this._params[2], value);
        });
        return true;
    };
    // Change Skill
    Game_Interpreter.prototype.command318 = function () {
        var _this = this;
        this.iterateActorEx(this._params[0], this._params[1], function (actor) {
            if (_this._params[2] === 0) {
                actor.learnSkill(_this._params[3]);
            }
            else {
                actor.forgetSkill(_this._params[3]);
            }
        });
        return true;
    };
    // Change Equipment
    Game_Interpreter.prototype.command319 = function () {
        var actor = DataManager_1.$gameActors.actor(this._params[0]);
        if (actor) {
            actor.changeEquipById(this._params[1], this._params[2]);
        }
        return true;
    };
    // Change Name
    Game_Interpreter.prototype.command320 = function () {
        var actor = DataManager_1.$gameActors.actor(this._params[0]);
        if (actor) {
            actor.setName(this._params[1]);
        }
        return true;
    };
    // Change Class
    Game_Interpreter.prototype.command321 = function () {
        var actor = DataManager_1.$gameActors.actor(this._params[0]);
        if (actor && DataManager_1.$dataClasses[this._params[1]]) {
            actor.changeClass(this._params[1], this._params[2]);
        }
        return true;
    };
    // Change Actor Images
    Game_Interpreter.prototype.command322 = function () {
        var actor = DataManager_1.$gameActors.actor(this._params[0]);
        if (actor) {
            actor.setCharacterImage(this._params[1], this._params[2]);
            actor.setFaceImage(this._params[3], this._params[4]);
            actor.setBattlerImage(this._params[5]);
        }
        DataManager_1.$gamePlayer.refresh();
        return true;
    };
    // Change Vehicle Image
    Game_Interpreter.prototype.command323 = function () {
        var vehicle = DataManager_1.$gameMap.vehicle(this._params[0]);
        if (vehicle) {
            vehicle.setImage(this._params[1], this._params[2]);
        }
        return true;
    };
    // Change Nickname
    Game_Interpreter.prototype.command324 = function () {
        var actor = DataManager_1.$gameActors.actor(this._params[0]);
        if (actor) {
            actor.setNickname(this._params[1]);
        }
        return true;
    };
    // Change Profile
    Game_Interpreter.prototype.command325 = function () {
        var actor = DataManager_1.$gameActors.actor(this._params[0]);
        if (actor) {
            actor.setProfile(this._params[1]);
        }
        return true;
    };
    // Change Enemy HP
    Game_Interpreter.prototype.command331 = function () {
        var _this = this;
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        this.iterateEnemyIndex(this._params[0], function (enemy) {
            _this.changeHp(enemy, value, _this._params[4]);
        });
        return true;
    };
    // Change Enemy MP
    Game_Interpreter.prototype.command332 = function () {
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        this.iterateEnemyIndex(this._params[0], function (enemy) {
            enemy.gainMp(value);
        });
        return true;
    };
    // Change Enemy TP
    Game_Interpreter.prototype.command342 = function () {
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        this.iterateEnemyIndex(this._params[0], function (enemy) {
            enemy.gainTp(value);
        });
        return true;
    };
    // Change Enemy State
    Game_Interpreter.prototype.command333 = function () {
        var _this = this;
        this.iterateEnemyIndex(this._params[0], function (enemy) {
            var alreadyDead = enemy.isDead();
            if (_this._params[1] === 0) {
                enemy.addState(_this._params[2]);
            }
            else {
                enemy.removeState(_this._params[2]);
            }
            if (enemy.isDead() && !alreadyDead) {
                enemy.performCollapse();
            }
            enemy.clearResult();
        });
        return true;
    };
    // Enemy Recover All
    Game_Interpreter.prototype.command334 = function () {
        this.iterateEnemyIndex(this._params[0], function (enemy) {
            enemy.recoverAll();
        });
        return true;
    };
    // Enemy Appear
    Game_Interpreter.prototype.command335 = function () {
        this.iterateEnemyIndex(this._params[0], function (enemy) {
            enemy.appear();
            DataManager_1.$gameTroop.makeUniqueNames();
        });
        return true;
    };
    // Enemy Transform
    Game_Interpreter.prototype.command336 = function () {
        var _this = this;
        this.iterateEnemyIndex(this._params[0], function (enemy) {
            enemy.transform(_this._params[1]);
            DataManager_1.$gameTroop.makeUniqueNames();
        });
        return true;
    };
    // Show Battle Animation
    Game_Interpreter.prototype.command337 = function () {
        var _this = this;
        if (this._params[2] === true) {
            this.iterateEnemyIndex(-1, function (enemy) {
                if (enemy.isAlive()) {
                    enemy.startAnimation(_this._params[1], false, 0);
                }
            });
        }
        else {
            this.iterateEnemyIndex(this._params[0], function (enemy) {
                if (enemy.isAlive()) {
                    enemy.startAnimation(_this._params[1], false, 0);
                }
            });
        }
        return true;
    };
    // Force Action
    Game_Interpreter.prototype.command339 = function () {
        var _this = this;
        this.iterateBattler(this._params[0], this._params[1], function (battler) {
            if (!battler.isDeathStateAffected()) {
                battler.forceAction(_this._params[2], _this._params[3]);
                managers_1.BattleManager.forceAction(battler);
                _this.setWaitMode("action");
            }
        });
        return true;
    };
    // Abort Battle
    Game_Interpreter.prototype.command340 = function () {
        managers_1.BattleManager.abort();
        return true;
    };
    // Open Menu Screen
    Game_Interpreter.prototype.command351 = function () {
        if (!DataManager_1.$gameParty.inBattle()) {
            managers_1.SceneManager.push(SceneMenu_1.Scene_Menu);
            windows_1.Window_MenuCommand.initCommandPosition();
        }
        return true;
    };
    // Open Save Screen
    Game_Interpreter.prototype.command352 = function () {
        // セーブ機能は今の所サポートしていないのでコメントアウト
        // if (!$gameParty.inBattle()) {
        // 	SceneManager.push(Scene_Save);
        // }
        return true;
    };
    // Game Over
    Game_Interpreter.prototype.command353 = function () {
        managers_1.SceneManager.goto(scenes_1.Scene_Gameover);
        return true;
    };
    // Return to Title Screen
    Game_Interpreter.prototype.command354 = function () {
        managers_1.SceneManager.goto(scenes_1.Scene_Title);
        return true;
    };
    // Script
    Game_Interpreter.prototype.command355 = function () {
        var script = this.currentCommand().parameters[0] + "\n";
        while (this.nextEventCode() === 655) {
            this._index++;
            script += this.currentCommand().parameters[0] + "\n";
        }
        setGameObjects();
        // eslint-disable-next-line no-eval
        eval(script);
        return true;
    };
    // Plugin Command
    Game_Interpreter.prototype.command356 = function () {
        var args = this._params[0].split(" ");
        var command = args.shift();
        this.pluginCommand(command, args);
        return true;
    };
    Game_Interpreter.prototype.pluginCommand = function (_command, _args) {
        // to be overridden by plugins
    };
    return Game_Interpreter;
}());
exports.Game_Interpreter = Game_Interpreter;

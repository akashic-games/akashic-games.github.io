"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = exports.$testEvent = exports.$gamePlayer = exports.$gameMap = exports.$gameTroop = exports.$gameParty = exports.$gameActors = exports.$gameSelfSwitches = exports.$gameVariables = exports.$gameSwitches = exports.$gameMessage = exports.$gameTimer = exports.$gameScreen = exports.$gameSystem = exports.$gameTemp = exports.$dataMap = exports.$dataMapInfos = exports.$dataSystem = exports.$dataCommonEvents = exports.$dataTilesets = exports.$dataAnimations = exports.$dataStates = exports.$dataTroops = exports.$dataEnemies = exports.$dataArmors = exports.$dataWeapons = exports.$dataItems = exports.$dataSkills = exports.$dataClasses = exports.$dataActors = void 0;
var core_1 = require("../core");
var objects_1 = require("../objects");
var GameSwitches_1 = require("../objects/GameSwitches");
var ImageManager_1 = require("./ImageManager");
var StorageManager_1 = require("./StorageManager");
exports.$dataActors = null;
exports.$dataClasses = null;
exports.$dataSkills = null;
exports.$dataItems = null;
exports.$dataWeapons = null;
exports.$dataArmors = null;
exports.$dataEnemies = null;
exports.$dataTroops = null;
exports.$dataStates = null;
exports.$dataAnimations = null;
exports.$dataTilesets = null;
exports.$dataCommonEvents = null;
exports.$dataSystem = null;
exports.$dataMapInfos = null;
exports.$dataMap = null;
exports.$gameTemp = null;
exports.$gameSystem = null;
exports.$gameScreen = null;
exports.$gameTimer = null;
exports.$gameMessage = null;
exports.$gameSwitches = null;
exports.$gameVariables = null;
exports.$gameSelfSwitches = null;
exports.$gameActors = null;
exports.$gameParty = null;
exports.$gameTroop = null;
exports.$gameMap = null;
exports.$gamePlayer = null;
exports.$testEvent = null;
var DataManager = /** @class */ (function () {
    function DataManager() {
    }
    DataManager.loadDatabase = function () {
        // const test = this.isBattleTest() || this.isEventTest();
        // const prefix = test ? "Test_" : "";
        var prefix = "";
        for (var i = 0; i < this._databaseFiles.length; i++) {
            var name = this._databaseFiles[i].name;
            var src = this._databaseFiles[i].src;
            this.loadDataFile(name, prefix + src);
        }
        // if (this.isEventTest()) {
        // 	this.loadDataFile("$testEvent", prefix + "Event.json");
        // }
    };
    DataManager.loadDataFile = function (name, src) {
        // var xhr = new XMLHttpRequest();
        // var url = 'data/' + src;
        // xhr.open('GET', url);
        // xhr.overrideMimeType('application/json');
        // xhr.onload = function() {
        // 	if (xhr.status < 400) {
        // 		window[name] = JSON.parse(xhr.responseText);
        // 		console.log("DataManager loaded: " + name);
        // 		DataManager.onLoad(window[name]);
        // 	}
        // };
        // xhr.onerror = this._mapLoader || function() {
        // 	DataManager._errorUrl = DataManager._errorUrl || url;
        // };
        // window[name] = null;
        // xhr.send();
        // TODO: なんとかして放り込む
        // window[name] = JSON.parse(xhr.responseText);
        console.log("DataManager loaded: " + name);
        this._requestedDataNames.push({ name: name, src: src });
    };
    DataManager.isDatabaseLoaded = function () {
        // this.checkError();
        // for (let i = 0; i < this._databaseFiles.length; i++) {
        // 	if (!window[this._databaseFiles[i].name]) {
        // 		return false;
        // 	}
        // }
        return true;
    };
    DataManager.loadMapData = function (mapId) {
        if (mapId > 0) {
            // const filename = 'Map%1.json'.format(mapId.padZero(3));
            var padded = mapId + "";
            for (var i = padded.length; i < 3; i++) {
                padded = "0" + padded;
            }
            var filename = "Map" + padded + ".json";
            // this._mapLoader = ResourceHandler.createLoader('data/' + filename, this.loadDataFile.bind(this, '$dataMap', filename));
            this.loadDataFile("$dataMap", filename);
        }
        else {
            this.makeEmptyMap();
        }
    };
    DataManager.makeEmptyMap = function () {
        exports.$dataMap = {};
        exports.$dataMap.data = [];
        exports.$dataMap.events = [];
        exports.$dataMap.width = 100;
        exports.$dataMap.height = 100;
        exports.$dataMap.scrollType = 3;
    };
    DataManager.isMapLoaded = function () {
        this.checkError();
        return !!exports.$dataMap;
    };
    DataManager.onLoad = function (object) {
        var array;
        if (object === exports.$dataMap) {
            this.extractMetadata(object);
            array = object.events;
        }
        else {
            array = object;
        }
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                var data = array[i];
                if (data && data.note !== undefined) {
                    this.extractMetadata(data);
                }
            }
        }
        if (object === exports.$dataSystem) {
            // 一旦無視。
            // Decrypter.hasEncryptedImages = !!object.hasEncryptedImages;
            // Decrypter.hasEncryptedAudio = !!object.hasEncryptedAudio;
            // encrypted かどうかで動作を変えたくてこの様になっているみたい
            // Scene_boot側で明示的に呼び出す
            // Scene_Boot.loadSystemImages();
        }
    };
    DataManager.extractMetadata = function (data) {
        var re = /<([^<>:]+)(:?)([^>]*)>/g;
        data.meta = {};
        for (;;) {
            var match = re.exec(data.note);
            if (match) {
                if (match[2] === ":") {
                    data.meta[match[1]] = match[3];
                }
                else {
                    data.meta[match[1]] = true;
                }
            }
            else {
                break;
            }
        }
    };
    DataManager.checkError = function () {
        if (DataManager._errorUrl) {
            throw new Error("Failed to load: " + DataManager._errorUrl);
        }
    };
    DataManager.isBattleTest = function () {
        return core_1.Utils.isOptionValid("btest");
    };
    DataManager.isEventTest = function () {
        return core_1.Utils.isOptionValid("etest");
    };
    DataManager.isSkill = function (item) {
        // return item && $dataSkills.contains(item);
        return item && exports.$dataSkills.indexOf(item) >= 0;
    };
    DataManager.isItem = function (item) {
        // return item && $dataItems.contains(item);
        return item && exports.$dataItems.indexOf(item) >= 0;
    };
    DataManager.isWeapon = function (item) {
        // return item && $dataWeapons.contains(item);
        return item && exports.$dataWeapons.indexOf(item) >= 0;
    };
    DataManager.isArmor = function (item) {
        // return item && $dataArmors.contains(item);
        return item && exports.$dataArmors.indexOf(item) >= 0;
    };
    DataManager.createGameObjects = function () {
        exports.$gameTemp = new objects_1.Game_Temp();
        exports.$gameSystem = new objects_1.Game_System();
        exports.$gameScreen = new objects_1.Game_Screen();
        exports.$gameTimer = new objects_1.Game_Timer();
        exports.$gameMessage = new objects_1.Game_Message();
        exports.$gameSwitches = new GameSwitches_1.Game_Switches();
        exports.$gameVariables = new objects_1.Game_Variables();
        exports.$gameSelfSwitches = new objects_1.Game_SelfSwitches();
        exports.$gameActors = new objects_1.Game_Actors();
        exports.$gameParty = new objects_1.Game_Party();
        exports.$gameTroop = new objects_1.Game_Troop();
        exports.$gameMap = new objects_1.Game_Map();
        exports.$gamePlayer = new objects_1.Game_Player();
    };
    DataManager.setupNewGame = function () {
        this.createGameObjects();
        this.selectSavefileForNewGame();
        exports.$gameParty.setupStartingMembers();
        exports.$gamePlayer.reserveTransfer(exports.$dataSystem.startMapId, exports.$dataSystem.startX, exports.$dataSystem.startY);
        core_1.Graphics.frameCount = 0;
    };
    DataManager.setupBattleTest = function () {
        // this.createGameObjects();
        // $gameParty.setupBattleTest();
        // BattleManager.setup($dataSystem.testTroopId, true, false);
        // BattleManager.setBattleTest(true);
        // BattleManager.playBattleBgm();
    };
    DataManager.setupEventTest = function () {
        // this.createGameObjects();
        // this.selectSavefileForNewGame();
        // $gameParty.setupStartingMembers();
        // $gamePlayer.reserveTransfer(-1, 8, 6);
        // $gamePlayer.setTransparent(false);
    };
    DataManager.loadGlobalInfo = function () {
        var json;
        try {
            json = StorageManager_1.StorageManager.load(0);
        }
        catch (e) {
            console.error(e);
            return [];
        }
        if (json) {
            var globalInfo = JSON.parse(json);
            for (var i = 1; i <= this.maxSavefiles(); i++) {
                if (!StorageManager_1.StorageManager.exists(i)) {
                    delete globalInfo[i];
                }
            }
            return globalInfo;
        }
        else {
            return [];
        }
    };
    DataManager.saveGlobalInfo = function (info) {
        StorageManager_1.StorageManager.save(0, JSON.stringify(info));
    };
    DataManager.isThisGameFile = function (savefileId) {
        var globalInfo = this.loadGlobalInfo();
        if (globalInfo && globalInfo[savefileId]) {
            if (StorageManager_1.StorageManager.isLocalMode()) {
                return true;
            }
            else {
                var savefile = globalInfo[savefileId];
                return savefile.globalId === this._globalId && savefile.title === exports.$dataSystem.gameTitle;
            }
        }
        else {
            return false;
        }
    };
    DataManager.isAnySavefileExists = function () {
        var globalInfo = this.loadGlobalInfo();
        if (globalInfo) {
            for (var i = 1; i < globalInfo.length; i++) {
                if (this.isThisGameFile(i)) {
                    return true;
                }
            }
        }
        return false;
    };
    DataManager.latestSavefileId = function () {
        var globalInfo = this.loadGlobalInfo();
        var savefileId = 1;
        var timestamp = 0;
        if (globalInfo) {
            for (var i = 1; i < globalInfo.length; i++) {
                if (this.isThisGameFile(i) && globalInfo[i].timestamp > timestamp) {
                    timestamp = globalInfo[i].timestamp;
                    savefileId = i;
                }
            }
        }
        return savefileId;
    };
    DataManager.loadAllSavefileImages = function () {
        var globalInfo = this.loadGlobalInfo();
        if (globalInfo) {
            for (var i = 1; i < globalInfo.length; i++) {
                if (this.isThisGameFile(i)) {
                    var info = globalInfo[i];
                    this.loadSavefileImages(info);
                }
            }
        }
    };
    DataManager.loadSavefileImages = function (info) {
        if (info.characters) {
            for (var i = 0; i < info.characters.length; i++) {
                ImageManager_1.ImageManager.reserveCharacter(info.characters[i][0]);
            }
        }
        if (info.faces) {
            for (var j = 0; j < info.faces.length; j++) {
                ImageManager_1.ImageManager.reserveFace(info.faces[j][0]);
            }
        }
    };
    DataManager.maxSavefiles = function () {
        return 20;
    };
    DataManager.saveGame = function (savefileId) {
        try {
            StorageManager_1.StorageManager.backup(savefileId);
            return this.saveGameWithoutRescue(savefileId);
        }
        catch (e) {
            console.error(e);
            try {
                StorageManager_1.StorageManager.remove(savefileId);
                StorageManager_1.StorageManager.restoreBackup(savefileId);
            }
            catch (e2) {
                //
            }
            return false;
        }
    };
    DataManager.loadGame = function (savefileId) {
        try {
            return this.loadGameWithoutRescue(savefileId);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    };
    DataManager.loadSavefileInfo = function (savefileId) {
        var globalInfo = this.loadGlobalInfo();
        return globalInfo && globalInfo[savefileId] ? globalInfo[savefileId] : null;
    };
    DataManager.lastAccessedSavefileId = function () {
        return this._lastAccessedId;
    };
    DataManager.saveGameWithoutRescue = function (_savefileId) {
        // const json = JsonEx.stringify(this.makeSaveContents());
        // if (json.length >= 200000) {
        // 	console.warn("Save data too big!");
        // }
        // StorageManager.save(savefileId, json);
        // this._lastAccessedId = savefileId;
        // const globalInfo = this.loadGlobalInfo() || [];
        // globalInfo[savefileId] = this.makeSavefileInfo();
        // this.saveGlobalInfo(globalInfo);
        return false;
    };
    DataManager.loadGameWithoutRescue = function (_savefileId) {
        // const globalInfo = this.loadGlobalInfo();
        // if (this.isThisGameFile(savefileId)) {
        // 	const json = StorageManager.load(savefileId);
        // 	this.createGameObjects();
        // 	this.extractSaveContents(JsonEx.parse(json));
        // 	this._lastAccessedId = savefileId;
        // 	return true;
        // } else {
        // 	return false;
        // }
        return false;
    };
    DataManager.selectSavefileForNewGame = function () {
        var globalInfo = this.loadGlobalInfo();
        this._lastAccessedId = 1;
        if (globalInfo) {
            var numSavefiles = Math.max(0, globalInfo.length - 1);
            if (numSavefiles < this.maxSavefiles()) {
                this._lastAccessedId = numSavefiles + 1;
            }
            else {
                var timestamp = Number.MAX_VALUE;
                for (var i = 1; i < globalInfo.length; i++) {
                    if (!globalInfo[i]) {
                        this._lastAccessedId = i;
                        break;
                    }
                    if (globalInfo[i].timestamp < timestamp) {
                        timestamp = globalInfo[i].timestamp;
                        this._lastAccessedId = i;
                    }
                }
            }
        }
    };
    DataManager.makeSavefileInfo = function () {
        var info = {};
        info.globalId = this._globalId;
        info.title = exports.$dataSystem.gameTitle;
        info.characters = exports.$gameParty.charactersForSavefile();
        info.faces = exports.$gameParty.facesForSavefile();
        info.playtime = exports.$gameSystem.playtimeText();
        info.timestamp = Date.now();
        return info;
    };
    DataManager.makeSaveContents = function () {
        // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
        var contents = {};
        contents.system = exports.$gameSystem;
        contents.screen = exports.$gameScreen;
        contents.timer = exports.$gameTimer;
        contents.switches = exports.$gameSwitches;
        contents.variables = exports.$gameVariables;
        contents.selfSwitches = exports.$gameSelfSwitches;
        contents.actors = exports.$gameActors;
        contents.party = exports.$gameParty;
        contents.map = exports.$gameMap;
        contents.player = exports.$gamePlayer;
        return contents;
    };
    DataManager.extractSaveContents = function (contents) {
        exports.$gameSystem = contents.system;
        exports.$gameScreen = contents.screen;
        exports.$gameTimer = contents.timer;
        exports.$gameSwitches = contents.switches;
        exports.$gameVariables = contents.variables;
        exports.$gameSelfSwitches = contents.selfSwitches;
        exports.$gameActors = contents.actors;
        exports.$gameParty = contents.party;
        exports.$gameMap = contents.map;
        exports.$gamePlayer = contents.player;
    };
    DataManager._globalId = "RPGMV";
    DataManager._lastAccessedId = 1;
    DataManager._errorUrl = null;
    DataManager._requestedDataNames = [];
    DataManager._databaseFiles = [
        { name: "$dataActors", src: "Actors.json" },
        { name: "$dataClasses", src: "Classes.json" },
        { name: "$dataSkills", src: "Skills.json" },
        { name: "$dataItems", src: "Items.json" },
        { name: "$dataWeapons", src: "Weapons.json" },
        { name: "$dataArmors", src: "Armors.json" },
        { name: "$dataEnemies", src: "Enemies.json" },
        { name: "$dataTroops", src: "Troops.json" },
        { name: "$dataStates", src: "States.json" },
        { name: "$dataAnimations", src: "Animations.json" },
        { name: "$dataTilesets", src: "Tilesets.json" },
        { name: "$dataCommonEvents", src: "CommonEvents.json" },
        { name: "$dataSystem", src: "System.json" },
        { name: "$dataMapInfos", src: "MapInfos.json" }
    ];
    return DataManager;
}());
exports.DataManager = DataManager;

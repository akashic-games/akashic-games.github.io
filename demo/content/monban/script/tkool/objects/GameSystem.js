"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game_System = void 0;
var core_1 = require("../core");
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var Game_System = /** @class */ (function () {
    function Game_System() {
        this.initialize();
    }
    Game_System.prototype.initialize = function () {
        this._saveEnabled = true;
        this._menuEnabled = true;
        this._encounterEnabled = true;
        this._formationEnabled = true;
        this._battleCount = 0;
        this._winCount = 0;
        this._escapeCount = 0;
        this._saveCount = 0;
        this._versionId = 0;
        this._framesOnSave = 0;
        this._bgmOnSave = null;
        this._bgsOnSave = null;
        this._windowTone = null;
        this._battleBgm = null;
        this._victoryMe = null;
        this._defeatMe = null;
        this._savedBgm = null;
        this._walkingBgm = null;
    };
    Game_System.prototype.isJapanese = function () {
        return DataManager_1.$dataSystem.locale.match(/^ja/);
    };
    Game_System.prototype.isChinese = function () {
        return DataManager_1.$dataSystem.locale.match(/^zh/);
    };
    Game_System.prototype.isKorean = function () {
        return DataManager_1.$dataSystem.locale.match(/^ko/);
    };
    Game_System.prototype.isCJK = function () {
        return DataManager_1.$dataSystem.locale.match(/^(ja|zh|ko)/);
    };
    Game_System.prototype.isRussian = function () {
        return DataManager_1.$dataSystem.locale.match(/^ru/);
    };
    Game_System.prototype.isSideView = function () {
        return DataManager_1.$dataSystem.optSideView;
    };
    Game_System.prototype.isSaveEnabled = function () {
        return this._saveEnabled;
    };
    Game_System.prototype.disableSave = function () {
        this._saveEnabled = false;
    };
    Game_System.prototype.enableSave = function () {
        this._saveEnabled = true;
    };
    Game_System.prototype.isMenuEnabled = function () {
        return this._menuEnabled;
    };
    Game_System.prototype.disableMenu = function () {
        this._menuEnabled = false;
    };
    Game_System.prototype.enableMenu = function () {
        this._menuEnabled = true;
    };
    Game_System.prototype.isEncounterEnabled = function () {
        return this._encounterEnabled;
    };
    Game_System.prototype.disableEncounter = function () {
        this._encounterEnabled = false;
    };
    Game_System.prototype.enableEncounter = function () {
        this._encounterEnabled = true;
    };
    Game_System.prototype.isFormationEnabled = function () {
        return this._formationEnabled;
    };
    Game_System.prototype.disableFormation = function () {
        this._formationEnabled = false;
    };
    Game_System.prototype.enableFormation = function () {
        this._formationEnabled = true;
    };
    Game_System.prototype.battleCount = function () {
        return this._battleCount;
    };
    Game_System.prototype.winCount = function () {
        return this._winCount;
    };
    Game_System.prototype.escapeCount = function () {
        return this._escapeCount;
    };
    Game_System.prototype.saveCount = function () {
        return this._saveCount;
    };
    Game_System.prototype.versionId = function () {
        return this._versionId;
    };
    Game_System.prototype.windowTone = function () {
        return this._windowTone || DataManager_1.$dataSystem.windowTone;
    };
    Game_System.prototype.setWindowTone = function (value) {
        this._windowTone = value;
    };
    Game_System.prototype.battleBgm = function () {
        return this._battleBgm || DataManager_1.$dataSystem.battleBgm;
    };
    Game_System.prototype.setBattleBgm = function (value) {
        this._battleBgm = value;
    };
    Game_System.prototype.victoryMe = function () {
        return this._victoryMe || DataManager_1.$dataSystem.victoryMe;
    };
    Game_System.prototype.setVictoryMe = function (value) {
        this._victoryMe = value;
    };
    Game_System.prototype.defeatMe = function () {
        return this._defeatMe || DataManager_1.$dataSystem.defeatMe;
    };
    Game_System.prototype.setDefeatMe = function (value) {
        this._defeatMe = value;
    };
    Game_System.prototype.onBattleStart = function () {
        this._battleCount++;
    };
    Game_System.prototype.onBattleWin = function () {
        this._winCount++;
    };
    Game_System.prototype.onBattleEscape = function () {
        this._escapeCount++;
    };
    Game_System.prototype.onBeforeSave = function () {
        this._saveCount++;
        this._versionId = DataManager_1.$dataSystem.versionId;
        this._framesOnSave = core_1.Graphics.frameCount;
        this._bgmOnSave = managers_1.AudioManager.saveBgm();
        this._bgsOnSave = managers_1.AudioManager.saveBgs();
    };
    Game_System.prototype.onAfterLoad = function () {
        core_1.Graphics.frameCount = this._framesOnSave;
        managers_1.AudioManager.playBgm(this._bgmOnSave);
        managers_1.AudioManager.playBgs(this._bgsOnSave);
    };
    Game_System.prototype.playtime = function () {
        return Math.floor(core_1.Graphics.frameCount / 60);
    };
    Game_System.prototype.playtimeText = function () {
        var hour = Math.floor(this.playtime() / 60 / 60);
        var min = Math.floor(this.playtime() / 60) % 60;
        var sec = this.playtime() % 60;
        return core_1.Utils.padZero(hour, 2) + ":" + core_1.Utils.padZero(min, 2) + ":" + core_1.Utils.padZero(sec, 2);
    };
    Game_System.prototype.saveBgm = function () {
        this._savedBgm = managers_1.AudioManager.saveBgm();
    };
    Game_System.prototype.replayBgm = function () {
        if (this._savedBgm) {
            managers_1.AudioManager.replayBgm(this._savedBgm);
        }
    };
    Game_System.prototype.saveWalkingBgm = function () {
        this._walkingBgm = managers_1.AudioManager.saveBgm();
    };
    Game_System.prototype.replayWalkingBgm = function () {
        if (this._walkingBgm) {
            managers_1.AudioManager.playBgm(this._walkingBgm);
        }
    };
    Game_System.prototype.saveWalkingBgm2 = function () {
        this._walkingBgm = DataManager_1.$dataMap.bgm;
    };
    return Game_System;
}());
exports.Game_System = Game_System;

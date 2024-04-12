"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundManager = void 0;
var managers_1 = require("../managers");
var DataManager_1 = require("../managers/DataManager");
var SoundManager = /** @class */ (function () {
    function SoundManager() {
    }
    SoundManager.preloadImportantSounds = function () {
        this.loadSystemSound(0);
        this.loadSystemSound(1);
        this.loadSystemSound(2);
        this.loadSystemSound(3);
    };
    SoundManager.loadSystemSound = function (n) {
        if (DataManager_1.$dataSystem) {
            managers_1.AudioManager.loadStaticSe(DataManager_1.$dataSystem.sounds[n]);
        }
    };
    SoundManager.playSystemSound = function (n) {
        if (DataManager_1.$dataSystem) {
            managers_1.AudioManager.playStaticSe(DataManager_1.$dataSystem.sounds[n]);
        }
    };
    SoundManager.playCursor = function () {
        this.playSystemSound(0);
    };
    SoundManager.playOk = function () {
        this.playSystemSound(1);
    };
    SoundManager.playCancel = function () {
        this.playSystemSound(2);
    };
    SoundManager.playBuzzer = function () {
        this.playSystemSound(3);
    };
    SoundManager.playEquip = function () {
        this.playSystemSound(4);
    };
    SoundManager.playSave = function () {
        this.playSystemSound(5);
    };
    SoundManager.playLoad = function () {
        this.playSystemSound(6);
    };
    SoundManager.playBattleStart = function () {
        this.playSystemSound(7);
    };
    SoundManager.playEscape = function () {
        this.playSystemSound(8);
    };
    SoundManager.playEnemyAttack = function () {
        this.playSystemSound(9);
    };
    SoundManager.playEnemyDamage = function () {
        this.playSystemSound(10);
    };
    SoundManager.playEnemyCollapse = function () {
        this.playSystemSound(11);
    };
    SoundManager.playBossCollapse1 = function () {
        this.playSystemSound(12);
    };
    SoundManager.playBossCollapse2 = function () {
        this.playSystemSound(13);
    };
    SoundManager.playActorDamage = function () {
        this.playSystemSound(14);
    };
    SoundManager.playActorCollapse = function () {
        this.playSystemSound(15);
    };
    SoundManager.playRecovery = function () {
        this.playSystemSound(16);
    };
    SoundManager.playMiss = function () {
        this.playSystemSound(17);
    };
    SoundManager.playEvasion = function () {
        this.playSystemSound(18);
    };
    SoundManager.playMagicEvasion = function () {
        this.playSystemSound(19);
    };
    SoundManager.playReflection = function () {
        this.playSystemSound(20);
    };
    SoundManager.playShop = function () {
        this.playSystemSound(21);
    };
    SoundManager.playUseItem = function () {
        this.playSystemSound(22);
    };
    SoundManager.playUseSkill = function () {
        this.playSystemSound(23);
    };
    return SoundManager;
}());
exports.SoundManager = SoundManager;

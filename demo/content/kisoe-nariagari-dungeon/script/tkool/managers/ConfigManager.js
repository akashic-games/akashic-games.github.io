"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
var Utils_1 = require("../core/Utils");
var AudioManager_1 = require("./AudioManager");
var StorageManager_1 = require("./StorageManager");
var ConfigManager = /** @class */ (function () {
    function ConfigManager() {
    }
    Object.defineProperty(ConfigManager, "bgmVolume", {
        get: function () {
            return AudioManager_1.AudioManager.bgmVolume;
        },
        set: function (value) {
            AudioManager_1.AudioManager.bgmVolume = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigManager, "bgsVolume", {
        get: function () {
            return AudioManager_1.AudioManager.bgsVolume;
        },
        set: function (value) {
            AudioManager_1.AudioManager.bgsVolume = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigManager, "meVolume", {
        get: function () {
            return AudioManager_1.AudioManager.meVolume;
        },
        set: function (value) {
            AudioManager_1.AudioManager.meVolume = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigManager, "seVolume", {
        get: function () {
            return AudioManager_1.AudioManager.seVolume;
        },
        set: function (value) {
            AudioManager_1.AudioManager.seVolume = value;
        },
        enumerable: false,
        configurable: true
    });
    ConfigManager.load = function () {
        var json;
        var config = {};
        try {
            json = StorageManager_1.StorageManager.load(-1);
        }
        catch (e) {
            console.error(e);
        }
        if (json) {
            config = JSON.parse(json);
        }
        ConfigManager.applyData(config);
    };
    ConfigManager.save = function () {
        StorageManager_1.StorageManager.save(-1, JSON.stringify(ConfigManager.makeData()));
    };
    ConfigManager.makeData = function () {
        var config = {};
        config.alwaysDash = this.alwaysDash;
        config.commandRemember = this.commandRemember;
        config.bgmVolume = this.bgmVolume;
        config.bgsVolume = this.bgsVolume;
        config.meVolume = this.meVolume;
        config.seVolume = this.seVolume;
        return config;
    };
    ConfigManager.applyData = function (config) {
        this.alwaysDash = this.readFlag(config, "alwaysDash");
        this.commandRemember = this.readFlag(config, "commandRemember");
        this.bgmVolume = this.readVolume(config, "bgmVolume");
        this.bgsVolume = this.readVolume(config, "bgsVolume");
        this.meVolume = this.readVolume(config, "meVolume");
        this.seVolume = this.readVolume(config, "seVolume");
    };
    ConfigManager.readFlag = function (config, name) {
        return !!config[name];
    };
    ConfigManager.readVolume = function (config, name) {
        var value = config[name];
        if (value !== undefined) {
            return Utils_1.Utils.clamp(Number(value), 0, 100);
        }
        else {
            return 100;
        }
    };
    ConfigManager.alwaysDash = false;
    ConfigManager.commandRemember = false;
    return ConfigManager;
}());
exports.ConfigManager = ConfigManager;

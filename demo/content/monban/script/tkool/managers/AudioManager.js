"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioManager = void 0;
var core_1 = require("../core");
var AudioManager = /** @class */ (function () {
    function AudioManager() {
    }
    Object.defineProperty(AudioManager, "masterVolume", {
        get: function () {
            return this._masterVolume;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "masterVolue", {
        set: function (value) {
            this._masterVolume = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "bgmVolume", {
        get: function () {
            return this._bgmVolume;
        },
        set: function (value) {
            this._bgmVolume = value;
            this.updateBgmParameters(this._currentBgm);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "bgsVolume", {
        get: function () {
            return this._bgsVolume;
        },
        set: function (value) {
            this._bgsVolume = value;
            this.updateBgsParameters(this._currentBgs);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "meVolume", {
        get: function () {
            return this._meVolume;
        },
        set: function (value) {
            this._meVolume = value;
            this.updateMeParameters(this._currentMe);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AudioManager, "seVolume", {
        get: function () {
            return this._seVolume;
        },
        set: function (value) {
            this._seVolume = value;
        },
        enumerable: false,
        configurable: true
    });
    AudioManager.playBgm = function (bgm, pos) {
        if (this.isCurrentBgm(bgm)) {
            this.updateBgmParameters(bgm);
        }
        else {
            this.stopBgm();
            var asset = void 0;
            try {
                asset = g.game.scene().asset.getAudio(core_1.Utils.assetPathOfName("audio/bgm/" + bgm.name));
            }
            catch (_e) {
                return;
            }
            // akashic-engineでシーク再生はサポートしていないため、コメントアウト
            // if (pos) {
            // 	asset.offset = pos;
            // }
            this._bgmBuffer = {
                name: bgm.name,
                playContext: g.game.audio.create(asset)
            };
            this.updateBgmParameters(bgm);
            if (!this._meBuffer) {
                this._bgmBuffer.playContext.play();
                this._addSoundStatus(this._bgmBuffer);
            }
        }
        this.updateCurrentBgm(bgm, pos);
    };
    AudioManager.replayBgm = function (bgm) {
        if (this.isCurrentBgm(bgm)) {
            this.updateBgmParameters(bgm);
        }
        else {
            this.playBgm(bgm, bgm.pos);
            if (this._bgmBuffer) {
                // this._bgmBuffer.fadeIn(this._replayFadeTime);
                // フェードインの長さの単位がRPGツクールMVでは秒になっているのでミリ秒に変換する
                // 元コードでfadeInBgm()関数呼び出しを行っていないので、同様に呼び出しを行わずにフェードイン処理を行う
                var playContext = this._bgmBuffer.playContext;
                g.AudioUtil.fadeIn(g.game, playContext, this._replayFadeTime * 1000, playContext._volume);
            }
        }
    };
    AudioManager.isCurrentBgm = function (bgm) {
        return this._currentBgm && this._bgmBuffer && this._currentBgm.name === bgm.name;
    };
    AudioManager.updateBgmParameters = function (bgm) {
        this.updateBufferParameters(this._bgmBuffer, this._bgmVolume, bgm);
    };
    AudioManager.updateCurrentBgm = function (bgm, pos) {
        this._currentBgm = {
            name: bgm.name,
            volume: bgm.volume,
            pitch: bgm.pitch,
            pan: bgm.pan,
            pos: pos
        };
    };
    AudioManager.stopBgm = function () {
        if (this._bgmBuffer) {
            this._bgmBuffer.playContext.stop();
            this._bgmBuffer = null;
            this._currentBgm = null;
        }
    };
    AudioManager.fadeOutBgm = function (duration) {
        if (this._bgmBuffer && this._currentBgm) {
            // フェードアウトの長さの単位がRPGツクールMVでは秒になっているのでミリ秒に変換する
            g.AudioUtil.fadeOut(g.game, this._bgmBuffer.playContext, duration * 1000);
            this._currentBgm = null;
        }
    };
    AudioManager.fadeInBgm = function (duration, to) {
        if (to === void 0) { to = 1; }
        if (this._bgmBuffer && this._currentBgm) {
            // フェードインの長さの単位がRPGツクールMVでは秒になっているのでミリ秒に変換する
            g.AudioUtil.fadeIn(g.game, this._bgmBuffer.playContext, duration * 1000, to);
        }
    };
    AudioManager.playBgs = function (bgs, pos) {
        if (this.isCurrentBgs(bgs)) {
            this.updateBgsParameters(bgs);
        }
        else {
            this.stopBgs();
            var asset = void 0;
            try {
                asset = g.game.scene().asset.getAudio(core_1.Utils.assetPathOfName("audio/bgs/" + bgs.name));
            }
            catch (_e) {
                return;
            }
            // akashic-engineでシーク再生はサポートしていないため、コメントアウト
            // if (pos) {
            // 	asset.offset = pos;
            // }
            this._bgsBuffer = {
                name: bgs.name,
                playContext: g.game.audio.create(asset)
            };
            this.updateBgsParameters(bgs);
            this._bgsBuffer.playContext.play();
            this._addSoundStatus(this._bgsBuffer);
        }
        this.updateCurrentBgs(bgs, pos);
    };
    AudioManager.replayBgs = function (bgs) {
        if (this.isCurrentBgs(bgs)) {
            this.updateBgsParameters(bgs);
        }
        else {
            this.playBgs(bgs, bgs.pos);
            if (this._bgsBuffer) {
                // this._bgsBuffer.fadeIn(this._replayFadeTime);
                // フェードインの長さの単位がRPGツクールMVでは秒になっているのでミリ秒に変換する
                // 元コードでfadeInBgs()関数呼び出しを行っていないので、同様に呼び出しを行わずにフェードイン処理を行う
                var playContext = this._bgsBuffer.playContext;
                g.AudioUtil.fadeIn(g.game, playContext, this._replayFadeTime * 1000, playContext._volume);
            }
        }
    };
    AudioManager.isCurrentBgs = function (bgs) {
        return this._currentBgs && this._bgsBuffer && this._currentBgs.name === bgs.name;
    };
    AudioManager.updateBgsParameters = function (bgs) {
        this.updateBufferParameters(this._bgsBuffer, this._bgsVolume, bgs);
    };
    AudioManager.updateCurrentBgs = function (bgs, pos) {
        this._currentBgs = {
            name: bgs.name,
            volume: bgs.volume,
            pitch: bgs.pitch,
            pan: bgs.pan,
            pos: pos
        };
    };
    AudioManager.stopBgs = function () {
        if (this._bgsBuffer) {
            this._bgsBuffer.playContext.stop();
            this._bgsBuffer = null;
            this._currentBgs = null;
        }
    };
    AudioManager.fadeOutBgs = function (duration) {
        if (this._bgsBuffer && this._currentBgs) {
            // フェードアウトの長さの単位がRPGツクールMVでは秒になっているのでミリ秒に変換する
            g.AudioUtil.fadeOut(g.game, this._bgsBuffer.playContext, duration * 1000);
            this._currentBgs = null;
        }
    };
    AudioManager.fadeInBgs = function (duration, to) {
        if (to === void 0) { to = 1; }
        if (this._bgsBuffer && this._currentBgs) {
            // フェードインの長さの単位がRPGツクールMVでは秒になっているのでミリ秒に変換する
            g.AudioUtil.fadeIn(g.game, this._bgsBuffer.playContext, duration * 1000, to);
        }
    };
    AudioManager.playMe = function (me) {
        var _this = this;
        this.stopMe();
        var asset;
        try {
            asset = g.game.scene().asset.getAudio(core_1.Utils.assetPathOfName("audio/me/" + me.name));
        }
        catch (_e) {
            return;
        }
        if (this._bgmBuffer && this._currentBgm) {
            // akashic-engineでシーク再生はサポートしていないため、コメントアウト
            // this._currentBgm.pos = this._bgmBuffer.seek();
            this._bgmBuffer.playContext.stop();
        }
        this._meBuffer = {
            name: me.name,
            playContext: g.game.audio.create(asset)
        };
        this.updateMeParameters(me);
        this._meBuffer.playContext.play();
        this._meBuffer.playContext.onStop.add(function () { return _this.stopMe(); });
        this._addSoundStatus(this._meBuffer);
    };
    AudioManager.updateMeParameters = function (me) {
        this.updateBufferParameters(this._meBuffer, this._meVolume, me);
    };
    AudioManager.fadeOutMe = function (duration) {
        if (this._meBuffer) {
            // フェードアウトの長さの単位がRPGツクールMVでは秒になっているのでミリ秒に変換する
            g.AudioUtil.fadeOut(g.game, this._meBuffer.playContext, duration * 1000);
        }
    };
    AudioManager.stopMe = function () {
        var _a;
        if (this._meBuffer) {
            this._meBuffer.playContext.stop();
            this._meBuffer = null;
            if (this._bgmBuffer && this._currentBgm && ((_a = this._soundStatusMap[this._bgmBuffer.name]) === null || _a === void 0 ? void 0 : _a.isPlaying) === false) {
                // akashic-engineでシーク再生はサポートしていないため、コメントアウト
                // this._bgmBuffer.asset.offset = this._currentBgm.pos || 0;
                this.updateBgmParameters(this._currentBgm);
                this.fadeInBgm(this._replayFadeTime, this._bgmBuffer.playContext._volume);
            }
        }
    };
    AudioManager.playSe = function (se) {
        var _this = this;
        var asset;
        try {
            asset = g.game.scene().asset.getAudio(core_1.Utils.assetPathOfName("audio/se/" + se.name));
        }
        catch (_e) {
            return;
        }
        this._seBuffers = this._seBuffers.filter(function (audio) { var _a; return (_a = _this._soundStatusMap[audio.name]) === null || _a === void 0 ? void 0 : _a.isPlaying; });
        var buffer = {
            name: se.name,
            playContext: g.game.audio.create(asset)
        };
        this.updateSeParameters(buffer, se);
        buffer.playContext.play();
        this._addSoundStatus(buffer);
        this._seBuffers.push(buffer);
    };
    AudioManager.updateSeParameters = function (buffer, se) {
        this.updateBufferParameters(buffer, this._seVolume, se);
    };
    AudioManager.stopSe = function () {
        this._seBuffers.forEach(function (buffer) { return buffer.playContext.stop(); });
        this._seBuffers = [];
    };
    AudioManager.playStaticSe = function (se) {
        if (se.name) {
            this.loadStaticSe(se);
            for (var _i = 0, _a = this._staticBuffers; _i < _a.length; _i++) {
                var buffer = _a[_i];
                if (buffer.name === se.name) {
                    buffer.playContext.stop();
                    this.updateSeParameters(buffer, se);
                    buffer.playContext.play();
                    break;
                }
            }
        }
    };
    AudioManager.loadStaticSe = function (se) {
        var asset;
        try {
            asset = g.game.scene().asset.getAudio(core_1.Utils.assetPathOfName("audio/se/" + se.name));
        }
        catch (_e) {
            return;
        }
        if (this.isStaticSe(se)) {
            return;
        }
        var buffer = {
            name: se.name,
            playContext: g.game.audio.create(asset)
        };
        this._staticBuffers.push(buffer);
    };
    AudioManager.isStaticSe = function (se) {
        return this._staticBuffers.some(function (buffer) { return buffer.name === se.name; });
    };
    AudioManager.stopAll = function () {
        this.stopMe();
        this.stopBgm();
        this.stopBgs();
        this.stopSe();
    };
    AudioManager.saveBgm = function () {
        if (this._currentBgm) {
            var bgm = this._currentBgm;
            return {
                name: bgm.name,
                volume: bgm.volume,
                pitch: bgm.pitch,
                pan: bgm.pan
                // akashic-engineでシーク再生はサポートしていないため、コメントアウト
                // pos: this._bgmBuffer ? this._bgmBuffer.seek() : 0
            };
        }
        else {
            return this.makeEmptyAudioObject();
        }
    };
    AudioManager.saveBgs = function () {
        if (this._currentBgs) {
            var bgs = this._currentBgs;
            return {
                name: bgs.name,
                volume: bgs.volume,
                pitch: bgs.pitch,
                pan: bgs.pan
                // pos: this._bgsBuffer ? this._bgsBuffer.seek() : 0
            };
        }
        else {
            return this.makeEmptyAudioObject();
        }
    };
    AudioManager.makeEmptyAudioObject = function () {
        return { name: "", volume: 0, pitch: 0 };
    };
    AudioManager.updateBufferParameters = function (buffer, configVolume, audio) {
        if (buffer && audio) {
            buffer.playContext.changeVolume((configVolume * (audio.volume || 0)) / 10000);
            // akashic-engineで非サポートのためコメントアウト
            // buffer.pitch = (audio.pitch || 0) / 100;
            // buffer.pan = (audio.pan || 0) / 100;
        }
    };
    AudioManager._addSoundStatus = function (audio) {
        var _this = this;
        audio.playContext.onPlay.add(function () {
            _this._soundStatusMap[audio.name] = { isPlaying: true };
        });
        audio.playContext.onStop.add(function () {
            _this._soundStatusMap[audio.name] = { isPlaying: false };
        });
    };
    AudioManager._soundStatusMap = Object.create(null);
    AudioManager._masterVolume = 1; // (min: 0, max: 1)
    AudioManager._bgmVolume = 100;
    AudioManager._bgsVolume = 100;
    AudioManager._meVolume = 100;
    AudioManager._seVolume = 100;
    AudioManager._currentBgm = null;
    AudioManager._currentBgs = null;
    AudioManager._bgmBuffer = null;
    AudioManager._bgsBuffer = null;
    AudioManager._meBuffer = null;
    AudioManager._seBuffers = [];
    AudioManager._staticBuffers = [];
    AudioManager._replayFadeTime = 0.5;
    AudioManager._currentMe = null;
    return AudioManager;
}());
exports.AudioManager = AudioManager;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioPresenter = void 0;
var Global_1 = require("./Global");
var AudioPresenter = /** @class */function () {
  function AudioPresenter(_scene) {
    this._s = null;
    this.bgmPlayer = null;
    this._s = _scene;
  }
  AudioPresenter.initialize = function (_s) {
    AudioPresenter.instance = new AudioPresenter(_s);
  };
  AudioPresenter.prototype.playBGM = function (name) {
    if (Global_1.Global.instance.muteSound) {
      return;
    }
    if (this.bgmPlayer !== null) {
      if (this.bgmPlayer.id === name) {
        return;
      } else {
        this.stopBGM();
      }
    }
    this.bgmPlayer = this._s.asset.getAudioById(name);
    this.bgmPlayer.play();
  };
  AudioPresenter.prototype.stopBGM = function () {
    if (this.bgmPlayer === null) {
      return;
    }
    this.bgmPlayer.stop();
    this.bgmPlayer = null;
  };
  AudioPresenter.prototype.playJINGLE = function (name) {
    if (Global_1.Global.instance.muteSound) {
      return;
    }
    return this._s.asset.getAudioById(name).play();
  };
  AudioPresenter.prototype.playSE = function (name) {
    if (Global_1.Global.instance.muteSound) {
      return;
    }
    return this._s.asset.getAudioById(name).play();
  };
  return AudioPresenter;
}();
exports.AudioPresenter = AudioPresenter;
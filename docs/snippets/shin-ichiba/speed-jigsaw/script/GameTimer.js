"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameTimer = void 0;
var NumberValue_1 = require("./NumberValue");
var SpriteFactory_1 = require("./SpriteFactory");
var GameTimer = /** @class */function () {
  function GameTimer(_s) {
    this.finishCallback = [];
    this.pause = false;
    var ci = SpriteFactory_1.SpriteFactory.createClockIcon(_s);
    var nv = NumberValue_1.NumberFont.instance;
    var ti = nv.genelateLabel28(_s);
    var r = new g.E({
      scene: _s,
      x: 0,
      y: 0
    });
    r.append(ci);
    ti.x = ci.width;
    ti.y = 4;
    ti.modified();
    r.append(ti);
    r.hide();
    _s.append(r);
    this.clockIcon = ci;
    this.timer = ti;
    this.rootEntity = r;
    this._s = _s;
  }
  Object.defineProperty(GameTimer.prototype, "Pause", {
    get: function get() {
      return this.pause;
    },
    set: function set(v) {
      this.pause = v;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GameTimer.prototype, "tv", {
    set: function set(value) {
      var v = value;
      if (GameTimer.DISPLAY_MAX < v) {
        v = GameTimer.DISPLAY_MAX;
      }
      this.timer.text = (v | 0).toString();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GameTimer.prototype, "now", {
    get: function get() {
      return this.timerValue | 0;
    },
    enumerable: false,
    configurable: true
  });
  GameTimer.prototype.destroy = function () {
    if (!this.clockIcon.destroyed()) {
      this.clockIcon.destroy();
    }
  };
  GameTimer.prototype.show = function (px, py, startSecond) {
    this.clockIcon.show();
    this.tv = startSecond;
    this.timer.invalidate();
    this.rootEntity.x = px;
    this.rootEntity.y = py;
    this.rootEntity.modified();
    this.rootEntity.show();
    this.timerValue = startSecond;
  };
  GameTimer.prototype.start = function () {
    var _this = this;
    var _s = this._s;
    if (this.timerEventIdentifier != null) {
      _s.clearInterval(this.timerEventIdentifier);
    }
    var ev = _s.setInterval(function () {
      if (_this.pause) {
        return;
      }
      _this.timerValue--;
      if (0 <= _this.timerValue) {
        _this.tv = _this.timerValue;
      }
      _this.timer.invalidate();
      if (_this.timerValue < 0) {
        if (_this.timerEventIdentifier != null) {
          _s.clearInterval(_this.timerEventIdentifier);
        }
        _this.finishCallback.forEach(function (e) {
          return e();
        });
      }
    }, 1000, this);
    this.timerEventIdentifier = ev;
    return this;
  };
  GameTimer.DISPLAY_MAX = 99;
  return GameTimer;
}();
exports.GameTimer = GameTimer;
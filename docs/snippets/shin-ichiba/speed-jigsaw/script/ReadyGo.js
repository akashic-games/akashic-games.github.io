"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadyGo = void 0;
var akashic_timeline_1 = require("@akashic-extension/akashic-timeline");
var AudioPresenter_1 = require("./AudioPresenter");
var SpriteFactory_1 = require("./SpriteFactory");
var ReadyGo = /** @class */function () {
  function ReadyGo(scene) {
    this.finishCallback = new Array();
    this.rootEntity = new g.E({
      scene: scene
    });
    this._s = scene;
    var _r = SpriteFactory_1.SpriteFactory.createReady(this._s);
    _r.x = (scene.game.width - _r.width) / 2;
    _r.y = (scene.game.height - _r.height) / 2;
    _r.modified();
    _r.hide();
    var _g = SpriteFactory_1.SpriteFactory.createStart(this._s);
    _g.x = (scene.game.width - _g.width) / 2;
    _g.y = (scene.game.height - _g.height) / 2;
    _g.modified();
    _g.hide();
    this.rootEntity.append(_r);
    this.rootEntity.append(_g);
    this.ready = _r;
    this.go = _g;
  }
  ReadyGo.prototype.show = function () {
    var _this = this;
    AudioPresenter_1.AudioPresenter.instance.playSE("se_005A_mono");
    this.ready.show();
    this.fadeAction(this._s, this.ready, 500, 250, function () {
      _this.go.show();
      _this.fadeAction(_this._s, _this.go, 500, 250, function () {
        _this.finishCallback.forEach(function (x) {
          return x();
        });
      });
    });
    return this;
  };
  ReadyGo.prototype.fadeAction = function (_s, _es, delay, stop, cb) {
    var _this = this;
    var tt = new akashic_timeline_1.Timeline(this._s);
    var _hdelay = delay / 2;
    _es.scale(0);
    _es.modified();
    if (0 < stop) {
      tt.create(_es, {
        modified: _es.modified,
        destroyed: _es.destroyed
      }).scaleTo(1, 1, _hdelay).wait(stop).fadeOut(_hdelay, akashic_timeline_1.Easing.easeOutQuad).con().scaleTo(1.5, 1.5, _hdelay).every(function (_e, p) {
        if (p <= 1) {
          if (cb != null) {
            cb.bind(_this)();
          }
          if (!tt.destroyed()) {
            tt.destroy(); // 呼べる？
          }
        }
      }, delay + stop);
    } else {
      tt.create(_es, {
        modified: _es.modified,
        destroyed: _es.destroyed
      }).scaleTo(1, 1, _hdelay).fadeOut(_hdelay, akashic_timeline_1.Easing.easeOutQuad).con().scaleTo(1.5, 1.5, _hdelay).every(function (_e, p) {
        if (p <= 1) {
          if (cb != null) {
            cb.bind(_this)();
          }
          tt.destroy(); // 呼べる？
        }
      }, delay + stop);
    }
  };
  ReadyGo.prototype.fadeInAction = function (_s, _es, delay, cb) {
    var _this = this;
    var tt = new akashic_timeline_1.Timeline(this._s);
    tt.create(_es, {
      modified: _es.modified,
      destroyed: _es.destroyed
    }).fadeOut(delay, akashic_timeline_1.Easing.easeOutQuad).every(function (_e, p) {
      if (1 <= p) {
        if (cb != null) {
          cb.bind(_this)();
        }
      }
    }, delay);
  };
  ReadyGo.prototype.fadeOutAction = function (_s, _es, delay, cb) {
    var _this = this;
    var tt = new akashic_timeline_1.Timeline(this._s);
    tt.create(_es, {
      modified: _es.modified,
      destroyed: _es.destroyed
    }).fadeOut(delay, akashic_timeline_1.Easing.easeOutQuad).every(function (_e, p) {
      if (p <= 1) {
        if (cb != null) {
          cb.bind(_this)();
        }
      }
    }, delay);
  };
  ReadyGo.prototype.destroy = function () {
    var arr = [this.ready, this.go, this.rootEntity];
    arr.forEach(function (x) {
      if (!x.destroyed()) {
        x.destroy();
      }
    });
  };
  return ReadyGo;
}();
exports.ReadyGo = ReadyGo;
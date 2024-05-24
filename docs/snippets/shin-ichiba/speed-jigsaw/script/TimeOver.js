"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOver = void 0;
var akashic_timeline_1 = require("@akashic-extension/akashic-timeline");
var AudioPresenter_1 = require("./AudioPresenter");
var SpriteFactory_1 = require("./SpriteFactory");
var TimeOver = /** @class */function () {
  function TimeOver(_s) {
    this.finishCallback = new Array();
    this._s = _s;
    this.rootEntity = new g.E({
      scene: _s
    });
    var _t = SpriteFactory_1.SpriteFactory.createTimeUp(_s);
    _t.x = (_s.game.width - _t.width) / 2;
    _t.y = (_s.game.height - _t.height) / 2;
    _t.modified();
    _t.hide();
    this.timeUp = _t;
    this.rootEntity.append(_t);
  }
  TimeOver.prototype.show = function (intime, wait) {
    var _this = this;
    var tt = new akashic_timeline_1.Timeline(this._s);
    AudioPresenter_1.AudioPresenter.instance.playSE("se_006B_mono");
    var _tu = this.timeUp;
    _tu.scale(1.5);
    _tu.opacity = 0;
    _tu.modified();
    _tu.show();
    tt.create(this.timeUp, {
      modified: this.timeUp.modified,
      destroyed: this.timeUp.destroyed
    }).scaleTo(1, 1, intime).con().fadeIn(intime).wait(wait).every(function (_e, p) {
      if (1 <= p) {
        tt.destroy();
        _this.finishCallback.forEach(function (c) {
          return c();
        });
        _tu.hide();
      }
    }, intime + wait);
    return this;
  };
  return TimeOver;
}();
exports.TimeOver = TimeOver;
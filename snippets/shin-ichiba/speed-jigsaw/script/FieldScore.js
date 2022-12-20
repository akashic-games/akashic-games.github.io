"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldScore = void 0;
var NumberValue_1 = require("./NumberValue");
var SpriteFactory_1 = require("./SpriteFactory");
var FieldScore = /** @class */function () {
  function FieldScore(_s) {
    this.rootEntity = new g.E({
      scene: _s,
      x: 0,
      y: 0
    });
  }
  Object.defineProperty(FieldScore.prototype, "value", {
    set: function set(_v) {
      this.label.text = _v.toString();
      this.label.invalidate();
      this.label.x = this.pt.x - this.label.width;
      this.label.y = 5;
      this.label.modified();
    },
    enumerable: false,
    configurable: true
  });
  FieldScore.prototype.init = function (_s) {
    var _f = NumberValue_1.NumberFont.instance;
    var _l = _f.genelateLabel28(_s);
    this.label = _l;
    this.font = _f;
    var _pt = SpriteFactory_1.SpriteFactory.createPtImage(_s);
    _pt.x = -_pt.width;
    _pt.y = 10;
    _pt.modified();
    this.pt = _pt;
    this.rootEntity.append(_pt);
    this.rootEntity.append(_l);
  };
  FieldScore.prototype.dispose = function () {
    if (this.label.destroyed()) {
      return;
    }
    this.label.destroy();
    this.font.destroy();
    this.pt.destroy();
  };
  FieldScore.prototype.show = function (_s, sx, sy) {
    this.rootEntity.x = sx;
    this.rootEntity.y = sy;
    this.rootEntity.modified();
  };
  return FieldScore;
}();
exports.FieldScore = FieldScore;
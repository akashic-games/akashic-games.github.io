"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboView = void 0;
var NumberValue_1 = require("./NumberValue");
var SpriteFactory_1 = require("./SpriteFactory");
var ComboView = /** @class */function (_super) {
  __extends(ComboView, _super);
  function ComboView(s, v) {
    if (v === void 0) {
      v = 0;
    }
    var _this = _super.call(this, {
      scene: s
    }) || this;
    _this.label = null;
    var base = SpriteFactory_1.SpriteFactory.createComboYellowBase(s);
    _this.append(base);
    var info = NumberValue_1.NumberFont.generate(s, NumberValue_1.NumberType.Y28);
    _this.label = info.label;
    _this.label.fontSize = 36;
    _this.label.invalidate();
    _this.append(_this.label);
    _this.Value = v;
    return _this;
  }
  Object.defineProperty(ComboView.prototype, "Value", {
    set: function set(v) {
      this.label.text = (v | 0).toString();
      this.label.invalidate();
      var n = this.label.text.length - 1;
      this.label.x = ComboView.NUM_OFFSET_X - n * this.label.fontSize;
      this.label.y = ComboView.NUM_OFFSET_Y;
      this.label.modified();
    },
    enumerable: false,
    configurable: true
  });
  ComboView.NUM_OFFSET_X = 152;
  ComboView.NUM_OFFSET_Y = 1;
  return ComboView;
}(g.E);
exports.ComboView = ComboView;
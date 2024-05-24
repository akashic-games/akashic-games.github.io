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
exports.RemainPieceView = void 0;
var NumberValue_1 = require("./NumberValue");
var SpriteFactory_1 = require("./SpriteFactory");
var RemainPieceView = /** @class */function (_super) {
  __extends(RemainPieceView, _super);
  function RemainPieceView(s, num) {
    if (num === void 0) {
      num = 0;
    }
    var _this = _super.call(this, {
      scene: s
    }) || this;
    var frm = SpriteFactory_1.SpriteFactory.createRemainPieceFrame(s);
    _this.append(frm);
    var l = NumberValue_1.NumberFont.instance.genelateLabel28(s);
    _this.append(l);
    _this.label = l;
    _this.Num = num;
    return _this;
  }
  Object.defineProperty(RemainPieceView.prototype, "Num", {
    set: function set(v) {
      var l = this.label;
      l.text = (v | 0).toString();
      l.invalidate();
      l.x = RemainPieceView.LABEL_X - (l.text.length - 1) * l.fontSize;
      l.y = RemainPieceView.LABEL_Y;
      l.modified();
    },
    enumerable: false,
    configurable: true
  });
  RemainPieceView.LABEL_X = 96;
  RemainPieceView.LABEL_Y = 18;
  return RemainPieceView;
}(g.E);
exports.RemainPieceView = RemainPieceView;
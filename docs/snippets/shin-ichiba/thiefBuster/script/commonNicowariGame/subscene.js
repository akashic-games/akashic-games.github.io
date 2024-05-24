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
exports.Subscene = void 0;
/**
 * 具体的なシーンの処理と表示を行う抽象クラス
 */
var Subscene = /** @class */function (_super) {
  __extends(Subscene, _super);
  function Subscene(_scene) {
    return _super.call(this, {
      scene: _scene
    }) || this;
  }
  return Subscene;
}(g.E);
exports.Subscene = Subscene;
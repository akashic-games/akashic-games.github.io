"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameFont = void 0;
var GameFont = /** @class */function () {
  function GameFont() {
    this.fontSize = 34;
    this.font = null;
    this.boldFont = null;
  }
  GameFont.prototype.initialize = function (_s) {
    var _f = this.createFont(this.fontSize);
    this.font = _f;
    var _bf = this.createFont(this.fontSize, true);
    this.boldFont = _bf;
    this._s = _s;
  };
  GameFont.prototype.generateLabel = function (col, isBold) {
    if (isBold === void 0) {
      isBold = false;
    }
    return this.generateLabelWithSize(this.font.size, col, isBold);
  };
  GameFont.prototype.generateLabelWithSize = function (size, col, isBold) {
    if (isBold === void 0) {
      isBold = false;
    }
    var useFont = isBold ? this.boldFont : this.font;
    return new g.Label({
      scene: this._s,
      font: useFont,
      text: "",
      fontSize: size,
      textColor: col,
      touchable: true,
      x: this.font.size / 2,
      y: -(this.font.size / 2)
    });
  };
  GameFont.prototype.createFont = function (_size, isBold) {
    if (isBold === void 0) {
      isBold = false;
    }
    var weight = isBold ? "bold" : "normal";
    return new g.DynamicFont({
      game: g.game,
      fontFamily: "sans-serif",
      size: _size,
      fontWeight: weight
    });
  };
  GameFont.instance = new GameFont();
  return GameFont;
}();
exports.GameFont = GameFont;
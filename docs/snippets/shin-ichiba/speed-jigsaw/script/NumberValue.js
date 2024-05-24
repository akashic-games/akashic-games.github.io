"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberFont = exports.NumberFontData = exports.NumberType = void 0;
var Util_1 = require("./Util");
var NumberType;
(function (NumberType) {
  NumberType[NumberType["W28"] = 0] = "W28";
  NumberType[NumberType["W72"] = 1] = "W72";
  NumberType[NumberType["Y28"] = 2] = "Y28";
  NumberType[NumberType["R28"] = 3] = "R28";
})(NumberType = exports.NumberType || (exports.NumberType = {}));
var FontInfo = /** @class */function () {
  function FontInfo() {
    this.glyphWidth = 0;
    this.glyphHeight = 0;
    this.map = "";
  }
  return FontInfo;
}();
var NumberFontData = /** @class */function () {
  function NumberFontData(f, l) {
    this.label = null;
    this.font = null;
    this.label = l;
    this.font = f;
  }
  NumberFontData.prototype.destroy = function () {
    if (!this.label.destroyed()) {
      this.label.destroy();
    }
    if (!this.font.destroyed()) {
      this.font.destroy();
    }
  };
  return NumberFontData;
}();
exports.NumberFontData = NumberFontData;
var NumberFont = /** @class */function () {
  function NumberFont() {}
  NumberFont.generate = function (s, type) {
    var fi = NumberFont.fontInfo[type];
    var f = new g.BitmapFont({
      src: s.asset.getImageById(NumberFont.IMAGE_NAME),
      map: Util_1.Util.readJSON(s, fi.map),
      defaultGlyphWidth: fi.glyphWidth,
      defaultGlyphHeight: fi.glyphHeight
    });
    var l = new g.Label({
      scene: s,
      font: f,
      text: "",
      fontSize: fi.glyphWidth
    });
    return new NumberFontData(f, l);
  };
  Object.defineProperty(NumberFont, "instance", {
    get: function get() {
      if (NumberFont._instance == null) {
        NumberFont._instance = new NumberFont();
      }
      return NumberFont._instance;
    },
    enumerable: false,
    configurable: true
  });
  NumberFont.prototype.initialize = function (_s) {
    this.font28 = new g.BitmapFont({
      src: _s.asset.getImageById(NumberFont.IMAGE_NAME),
      map: Util_1.Util.readJSON(_s, "glyph28"),
      defaultGlyphWidth: 28,
      defaultGlyphHeight: 32
    });
    this.font72 = new g.BitmapFont({
      src: _s.asset.getImageById(NumberFont.IMAGE_NAME),
      map: Util_1.Util.readJSON(_s, "glyph72"),
      defaultGlyphWidth: 72,
      defaultGlyphHeight: 82
    });
  };
  NumberFont.prototype.genelateLabel28 = function (_s) {
    return new g.Label({
      scene: _s,
      font: this.font28,
      text: "",
      fontSize: 28
    });
  };
  NumberFont.prototype.genelateLabel72 = function (_s) {
    return new g.Label({
      scene: _s,
      font: this.font72,
      text: "",
      fontSize: 72
    });
  };
  NumberFont.prototype.destroy = function () {
    if (!this.font28.destroyed()) {
      this.font28.destroy();
    }
    if (!this.font72.destroyed()) {
      this.font72.destroy();
    }
  };
  NumberFont.IMAGE_NAME = "ui_common";
  NumberFont._instance = null;
  NumberFont.fontInfo = [
  // w28
  {
    glyphWidth: 28,
    glyphHeight: 32,
    map: "glyph28"
  }, {
    glyphWidth: 72,
    glyphHeight: 82,
    map: "glyph72"
  }, {
    glyphWidth: 32,
    glyphHeight: 36,
    map: "glyph32_yellow"
  }];
  return NumberFont;
}();
exports.NumberFont = NumberFont;
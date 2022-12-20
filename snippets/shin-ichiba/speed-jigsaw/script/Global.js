"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Global = void 0;
var Global = /** @class */function () {
  function Global() {
    this.score = 0;
    this.totalTimeLimit = 82;
    this.muteSound = false;
    this.difficulty = 1;
    this.random = g.game.random;
    this.DEBUG = false;
  }
  Global.init = function () {
    Global.instance = new Global();
  };
  Global.prototype.log = function (l) {
    if (this.DEBUG) {
      console.log(l);
    }
  };
  return Global;
}();
exports.Global = Global;
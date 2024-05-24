"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AStage = void 0;
var AStage = /** @class */function () {
  function AStage() {
    this.finishCallback = [];
  }
  AStage.prototype.finishStage = function () {
    this.finishCallback.forEach(function (cb) {
      cb();
    });
  };
  return AStage;
}();
exports.AStage = AStage;
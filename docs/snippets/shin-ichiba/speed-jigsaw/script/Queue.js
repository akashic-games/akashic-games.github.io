"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = void 0;
var Queue = /** @class */function () {
  function Queue() {
    this.data = [];
    this.data = [];
  }
  Object.defineProperty(Queue.prototype, "IsEmpty", {
    get: function get() {
      return this.data.length < 1;
    },
    enumerable: false,
    configurable: true
  });
  Queue.prototype.push = function (v) {
    this.data.push(v);
  };
  Queue.prototype.peek = function () {
    return this.data[0];
  };
  Queue.prototype.pop = function () {
    var r = this.peek();
    this.data.shift();
    return r;
  };
  return Queue;
}();
exports.Queue = Queue;
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
exports.ManualScene = void 0;
var AStage_1 = require("./AStage");
var SpriteFactory_1 = require("./SpriteFactory");
var ManualScene = /** @class */function (_super) {
  __extends(ManualScene, _super);
  function ManualScene(scene) {
    var _this = _super.call(this) || this;
    _this.scene = scene;
    return _this;
  }
  ManualScene.prototype.activate = function (_s) {
    var _this = this;
    var s = SpriteFactory_1.SpriteFactory.createManual(_s);
    s.x = (_s.game.width - s.width) / 2;
    s.y = (_s.game.height - s.height) / 2;
    s.modified();
    _s.setTimeout(function () {
      _this.finishStage();
    }, 5000, this);
    this.title = s;
    _s.append(s);
    this.scene = _s;
  };
  ManualScene.prototype.dispose = function () {
    if (this.title.destroyed()) {
      return;
    }
    this.title.destroy();
  };
  return ManualScene;
}(AStage_1.AStage);
exports.ManualScene = ManualScene;
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
exports.TitleScene = void 0;
var AStage_1 = require("./AStage");
var AudioPresenter_1 = require("./AudioPresenter");
var SpriteFactory_1 = require("./SpriteFactory");
var TitleScene = /** @class */function (_super) {
  __extends(TitleScene, _super);
  function TitleScene(scene) {
    var _this = _super.call(this) || this;
    _this.scene = scene;
    return _this;
  }
  TitleScene.prototype.activate = function (_s) {
    var _this = this;
    AudioPresenter_1.AudioPresenter.instance.playBGM("bgm_130");
    var s = SpriteFactory_1.SpriteFactory.createTitle(_s);
    s.touchable = true;
    s.x = (_s.game.width - s.width) / 2;
    s.y = (_s.game.height - s.height) / 2;
    s.modified();
    _s.setTimeout(function () {
      AudioPresenter_1.AudioPresenter.instance.playSE("se_002c");
      _s.setTimeout(function () {
        // 次のシーンへ行く何か
        _this.finishStage();
      }, 1000);
    }, 5000);
    this.title = s;
    _s.append(s);
    this.scene = _s;
  };
  TitleScene.prototype.dispose = function () {
    if (this.title.destroyed()) {
      return;
    }
    this.title.destroy();
  };
  return TitleScene;
}(AStage_1.AStage);
exports.TitleScene = TitleScene;
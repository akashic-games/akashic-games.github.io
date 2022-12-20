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
exports.FieldScene = void 0;
var tl = require("@akashic-extension/akashic-timeline");
var AStage_1 = require("./AStage");
var AudioPresenter_1 = require("./AudioPresenter");
var ComboView_1 = require("./ComboView");
var FieldScore_1 = require("./FieldScore");
var GameField_1 = require("./GameField");
var GameTimer_1 = require("./GameTimer");
var Global_1 = require("./Global");
var OuterParamReceiver_1 = require("./OuterParamReceiver");
var Queue_1 = require("./Queue");
var ReadyGo_1 = require("./ReadyGo");
var TimeOver_1 = require("./TimeOver");
var Util_1 = require("./Util");
var FieldScene = /** @class */function (_super) {
  __extends(FieldScene, _super);
  function FieldScene(_scene) {
    var _this = _super.call(this) || this;
    _this.level = 1;
    _this.score = 0;
    _this.combo = 0;
    _this.BG = [];
    _this.scene = null;
    _this.readyGo = null;
    _this.comboView = null;
    _this.elapsedStartTime = 0;
    _this.answerElapsedTime = 0;
    _this.seethroughRemainTime = 0;
    _this.gf = new Queue_1.Queue();
    _this.pause = false;
    _this.pictureNumberTable = [];
    _this.lastSelectPictureNumber = -1;
    _this.scene = _scene;
    return _this;
  }
  FieldScene.prototype.activate = function (_scene) {
    var _this = this;
    this.pause = false;
    var _sv = new FieldScore_1.FieldScore(_scene);
    for (var i = 0, max = FieldScene.BG_NUM; i < max; ++i) {
      var _e = new g.E({
        scene: _scene
      });
      this.BG.push(_e);
    }
    for (var i = 0, max = FieldScene.BG_NUM; i < max; ++i) {
      _scene.append(this.BG[max - i - 1]);
    }
    _sv.init(_scene);
    this.BG[1].append(_sv.rootEntity);
    _sv.show(_scene, FieldScene.FIELDSCORE_POS_X, FieldScene.FIELDSCORE_POS_Y);
    _sv.value = this.score;
    this.scoreView = _sv;
    var gt = Global_1.Global.instance.totalTimeLimit - FieldScene.TIMER_MERGIN;
    if (FieldScene.TIMER_MAX < gt) {
      gt = FieldScene.TIMER_MAX;
    }
    var cv = new ComboView_1.ComboView(_scene);
    cv.x = 201;
    cv.y = 4;
    cv.modified();
    this.BG[1].append(cv);
    this.comboView = cv;
    var t = new GameTimer_1.GameTimer(_scene);
    t.show(FieldScene.GAMETIMER_POS_X, FieldScene.GAMETIMER_POS_Y, gt);
    var _ft = new g.FilledRect({
      scene: _scene,
      width: _scene.game.width,
      height: _scene.game.height,
      cssColor: "#000000",
      opacity: 0,
      touchable: true
    });
    this.BG[0].append(_ft);
    this.fieldTouchMask = _ft;
    this.BG[1].append(t.rootEntity);
    this.timer = t;
    var _readygo = new ReadyGo_1.ReadyGo(_scene);
    this.readyGo = _readygo;
    this.combo = 0;
    this.BG[0].append(_readygo.rootEntity);
    var difficulty = Global_1.Global.instance.difficulty;
    if (Global_1.Global.instance.DEBUG) {
      difficulty = 4;
    }
    if (difficulty < 1) {
      difficulty = 1;
    }
    this.level = Math.max(1, Math.min(10, difficulty));
    // 最初の設定
    var remainTime = this.generateRemainTime(this.level);
    this.seethroughRemainTime = remainTime;
    this.createGameField(this.level, remainTime, FieldScene.FIRSTGAME_DELAY);
    this.scene.setInterval(function () {
      _this.elapsedStartTime += 100;
    }, 100);
    _readygo.show().finishCallback.push(this.gameStartInit.bind(this));
  };
  FieldScene.prototype.gameStartInit = function () {
    var _this = this;
    var t = this.timer;
    // 		this.elapsedStartTime = t.now;
    this.gf.peek().gameStart();
    this.questStart();
    t.start().finishCallback.push(function () {
      if (!Global_1.Global.instance.DEBUG) {
        _this.fieldTouchMask.show();
        var _eff = new TimeOver_1.TimeOver(_this.scene);
        _this.BG[0].append(_eff.rootEntity);
        _eff.show(250, 500).finishCallback.push(function () {
          _this.fieldTouchMask.show();
          _this.sceneFinish();
        });
      }
    });
    AudioPresenter_1.AudioPresenter.instance.playBGM("bgm_130");
    this.fieldTouchMask.hide();
  };
  FieldScene.prototype.dispose = function () {
    if (this.BG[3].destroyed()) {
      return;
    }
    this.BG[3].destroy();
    this.BG[2].destroy();
    this.BG[1].destroy();
  };
  FieldScene.prototype.generateRemainTime = function (lv) {
    // 1 + (難易度 * 0.5秒)...?
    var time = (10 - (lv - 1)) * 0.5 + 1;
    if (time < 1) {
      time = 1;
    }
    if (6 < time) {
      time = 6;
    }
    return time * 1000;
  };
  FieldScene.prototype.createGameField = function (level, _remain, startDelay) {
    var _this = this;
    if (startDelay === void 0) {
      startDelay = 0;
    }
    Global_1.Global.instance.log("createGameField:" + level);
    var g = new GameField_1.GameField(this.scene, this.getPictureNumber(), level, startDelay);
    g.onPieceMatchCheck.push(function (_idx, result, remainp) {
      if (result) {
        _this.combo++;
        var score = _this.generateAppendScore(remainp === 0);
        var comboBonus = 0;
        if (1 < _this.combo) {
          comboBonus = _this.combo * FieldScene.COMBO_SCORE_RATIO;
        }
        _this.addScore(score + comboBonus);
      } else {
        _this.combo = 0;
      }
      _this.comboView.Value = _this.combo;
    });
    g.clearCallback.push(function () {
      _this.allRemain(750);
    });
    if (!this.gf.IsEmpty) {
      g.x = this.scene.game.width;
      g.modified();
    }
    this.BG[3].append(g);
    this.gf.push(g);
  };
  FieldScene.prototype.allRemain = function (delay) {
    var _this = this;
    this.scene.setTimeout(function () {
      if (!Global_1.Global.instance.DEBUG) {
        if (_this.timer.now <= 0) {
          return;
        }
      }
      _this.levelUpAction();
      _this.createGameField(_this.level, 0, FieldScene.GAME_DELAY);
      _this.transitNextQuestionAsync(FieldScene.TRANSIT_WAIT);
    }, delay);
  };
  FieldScene.prototype.levelUpAction = function () {
    this.level++;
    if (FieldScene.MAX_LEVEL <= this.level) {
      this.level = FieldScene.MAX_LEVEL;
    }
  };
  FieldScene.prototype.generateAppendScore = function (isClear) {
    if (isClear === void 0) {
      isClear = false;
    }
    var nt = this.elapsedStartTime;
    var score = FieldScene.SCORE_TOP - ((nt - this.answerElapsedTime) / 100 | 0);
    if (score < 0) {
      score = 1;
    }
    if (isClear) {
      score += FieldScene.STAGE_CLEAR_BONUS;
    }
    return score | 0;
  };
  FieldScene.prototype.addScore = function (add) {
    this.score += add;
    this.scoreView.value = this.score;
    OuterParamReceiver_1.OuterParamReceiver.setGlobalScore(this.score);
  };
  FieldScene.prototype.transitNextQuestionAsync = function (animationTime) {
    var _this = this;
    var _tl = new tl.Timeline(this.scene);
    var bgId = 3;
    _tl.create(this.BG[bgId], {
      modified: this.BG[bgId].modified,
      destroyed: this.BG[bgId].destroyed
    }).moveX(-this.scene.game.width, animationTime, tl.Easing.easeOutQuad).con().every(function (_e, p) {
      if (p < 1) {
        return;
      }
      _this.BG[bgId].x = 0;
      _this.BG[bgId].modified();
      var disposedObject = _this.gf.pop();
      disposedObject.dispose();
      var currentObject = _this.gf.peek();
      currentObject.x = 0;
      currentObject.modified();
      currentObject.gameStart();
      _this.questStart();
      _tl.destroy();
    }, animationTime);
  };
  FieldScene.prototype.sceneFinish = function () {
    Global_1.Global.instance.score = this.score;
    AudioPresenter_1.AudioPresenter.instance.stopBGM();
    for (var n = 1, max = 3; n <= max; ++n) {
      this.BG[n].opacity = 0;
      this.BG[n].modified();
    }
    this.finishStage();
  };
  FieldScene.prototype.questStart = function () {
    this.fieldTouchMask.hide();
    this.answerElapsedTime = this.elapsedStartTime;
  };
  FieldScene.prototype.getPictureNumber = function () {
    if (this.pictureNumberTable.length < 1) {
      this.pictureNumberTable = Util_1.Util.shuffle(Util_1.Util.range(0, 5));
      if (this.pictureNumberTable[0] === this.lastSelectPictureNumber) {
        var n = this.pictureNumberTable[0];
        this.pictureNumberTable[0] = 5;
        this.pictureNumberTable.push(n);
      }
    }
    this.lastSelectPictureNumber = this.pictureNumberTable.pop();
    return this.lastSelectPictureNumber;
  };
  FieldScene.TIMER_MERGIN = 22;
  FieldScene.TIMER_MAX = 99;
  FieldScene.MAX_LEVEL = 10;
  FieldScene.BG_NUM = 4;
  FieldScene.FIELDSCORE_POS_X = 552;
  FieldScene.FIELDSCORE_POS_Y = 0;
  FieldScene.GAMETIMER_POS_X = 82;
  FieldScene.GAMETIMER_POS_Y = 4;
  FieldScene.FIRSTGAME_DELAY = 1500;
  FieldScene.GAME_DELAY = 1000;
  FieldScene.TRANSIT_WAIT = 800;
  FieldScene.COMBO_SCORE_RATIO = 5;
  FieldScene.SCORE_TOP = 100;
  FieldScene.STAGE_CLEAR_BONUS = 300;
  return FieldScene;
}(AStage_1.AStage);
exports.FieldScene = FieldScene;
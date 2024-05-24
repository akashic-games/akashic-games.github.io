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
exports.GameField = exports.LevelData = void 0;
var AudioPresenter_1 = require("./AudioPresenter");
var Global_1 = require("./Global");
var Picture_1 = require("./Picture");
var PieceSelectField_1 = require("./PieceSelectField");
var RemainPieceView_1 = require("./RemainPieceView");
var SpriteFactory_1 = require("./SpriteFactory");
var Util_1 = require("./Util");
var LevelParam = /** @class */function () {
  function LevelParam() {}
  return LevelParam;
}();
var LevelData = /** @class */function () {
  function LevelData() {}
  LevelData.getLevelInfo = function (lv) {
    var nlv = Math.max(LevelData.LEVEL_MIN, Math.min(lv, Math.min(LevelData.LEVEL_MAX, LevelData.levelInfo.length))) - 1;
    return LevelData.levelInfo[nlv];
  };
  LevelData.LEVEL_MIN = 1;
  LevelData.LEVEL_MAX = 10;
  LevelData.levelInfo = [{
    divX: 2,
    divY: 2,
    pieceSize: PieceSelectField_1.PieceSize.L
  }, {
    divX: 3,
    divY: 3,
    pieceSize: PieceSelectField_1.PieceSize.M
  }, {
    divX: 3,
    divY: 3,
    pieceSize: PieceSelectField_1.PieceSize.M
  }, {
    divX: 4,
    divY: 4,
    pieceSize: PieceSelectField_1.PieceSize.S
  }, {
    divX: 4,
    divY: 4,
    pieceSize: PieceSelectField_1.PieceSize.S
  }, {
    divX: 4,
    divY: 4,
    pieceSize: PieceSelectField_1.PieceSize.S
  }, {
    divX: 4,
    divY: 4,
    pieceSize: PieceSelectField_1.PieceSize.S
  }, {
    divX: 4,
    divY: 4,
    pieceSize: PieceSelectField_1.PieceSize.S
  }, {
    divX: 4,
    divY: 4,
    pieceSize: PieceSelectField_1.PieceSize.S
  }, {
    divX: 4,
    divY: 4,
    pieceSize: PieceSelectField_1.PieceSize.S
  }];
  return LevelData;
}();
exports.LevelData = LevelData;
var GameField = /** @class */function (_super) {
  __extends(GameField, _super);
  function GameField(s, pictureId, level, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    var _this = _super.call(this, {
      scene: s
    }) || this;
    _this.onPieceMatchCheck = [];
    _this.clearCallback = [];
    _this.touchLayer = null;
    _this.pieceLayer = null;
    _this.baseLayer = null;
    _this.pic = null;
    _this.pieceField = null;
    _this.remainView = null;
    _this.selectPieceIndex = -1;
    _this.pieceNum = 0;
    Global_1.Global.instance.log("GameField: " + pictureId.toString());
    _this.baseLayer = new g.E({
      scene: s
    });
    _this.append(_this.baseLayer);
    _this.touchLayer = new g.E({
      scene: s
    });
    var lvinfo = LevelData.getLevelInfo(level);
    _this.createFieldImage(_this.baseLayer);
    var pic = new Picture_1.Picture(s, pictureId, lvinfo.divX, lvinfo.divY);
    pic.x = GameField.PIC_OFFSET_X;
    pic.y = GameField.PIC_OFFSET_Y;
    pic.modified();
    _this.baseLayer.append(pic);
    _this.pieceNum = pic.Pieces.length;
    var rpv = new RemainPieceView_1.RemainPieceView(s);
    rpv.x = GameField.SELECTFRAME_BASE_X - GameField.POS_X;
    rpv.y = -1;
    rpv.modified();
    _this.remainView = rpv;
    _this.baseLayer.append(rpv);
    var pf = new PieceSelectField_1.PieceSelectField(s, lvinfo.pieceSize, pic.Pieces);
    pf.x = GameField.SELECTFRAME_BASE_X - GameField.POS_X;
    pf.y = GameField.SELECTFRAME_BASE_Y - GameField.POS_Y;
    pf.onTouchGetPiece.push(function (idx) {
      Global_1.Global.instance.log("onTouchGetPiece(" + idx + ")");
      _this.selectPieceIndex = idx;
      return true;
    });
    pf.onSlideInFinish.push(function (f, p) {
      if (pf.selectFrameIndex !== f) {
        return;
      }
      Global_1.Global.instance.log("onSlideInFinish(" + f + "," + p + ")");
      _this.selectPieceIndex = p;
    });
    _this.onPieceMatchCheck.push(function (idx, success, remain) {
      var seId = "se_004";
      var tx = _this.touchLayer.children[idx];
      tx.tag = 0;
      tx.opacity = 0;
      tx.modified();
      if (success) {
        seId = "se_003";
        _this.pieceNum--;
        if (0 <= _this.pieceNum) {
          rpv.Num = _this.pieceNum;
        }
        var p = pic.Pieces[idx];
        _this.createCorrectPieceAndAction(_this.baseLayer, p, tx);
        p.hide();
        pf.releaseSelectObject();
        if (0 < remain) {
          // 次のpiece
          pf.get();
        } else {
          if (_this.pieceNum <= 0) {
            _this.clearCallback.forEach(function (x) {
              return x();
            });
          } else {
            _this.scene.setTimeout(function () {
              pf.setNextSelectFrame();
            }, 10);
          }
        }
      }
      AudioPresenter_1.AudioPresenter.instance.playSE(seId);
    });
    rpv.Num = pf.RemainNum;
    _this.baseLayer.append(pf);
    _this.pieceField = pf;
    _this.createFrameTouchField(_this.touchLayer, lvinfo.divX, lvinfo.divY);
    _this.touchLayer.x = pic.x;
    _this.touchLayer.y = pic.y;
    _this.touchLayer.modified();
    _this.baseLayer.append(_this.touchLayer);
    _this.baseLayer.x = GameField.POS_X;
    _this.baseLayer.y = GameField.POS_Y;
    _this.baseLayer.modified();
    if (0 < delay) {
      s.setTimeout(function () {
        if (_this.destroyed()) {
          return;
        }
        if (pic.destroyed()) {
          return;
        }
        var pi = pic.Image;
        pi.onUpdate.add(function () {
          pi.opacity = Util_1.Util.lerp(pi.opacity, 0, 0.3, 0.08);
        });
      }, delay);
    }
    return _this;
  }
  GameField.prototype.dispose = function () {
    this.destroy();
  };
  GameField.prototype.gameStart = function () {
    this.pieceField.get();
  };
  GameField.prototype.createFieldImage = function (e) {
    var base = SpriteFactory_1.SpriteFactory.createPictureFrame(this.scene);
    e.append(base);
  };
  GameField.prototype.createFrameTouchField = function (e, divX, divY) {
    var _this = this;
    var dw = Picture_1.Picture.IMAGE_PIX / divX | 0;
    var dh = Picture_1.Picture.IMAGE_PIX / divY | 0;
    for (var dy = 0; dy < divY; ++dy) {
      var _loop_1 = function _loop_1(dx) {
        var idx = dx + dy * divX;
        var panel = new g.FilledRect({
          scene: this_1.scene,
          x: dx * dw,
          y: dy * dh,
          width: dw,
          height: dh,
          cssColor: "#c0c000",
          opacity: 0,
          touchable: true
        });
        panel.tag = 0;
        panel.onUpdate.add(function () {
          panel.opacity = Util_1.Util.lerp(panel.opacity, panel.tag, 0.4);
          panel.modified();
        });
        panel.onPointDown.add(function () {
          panel.tag = 0.5;
        });
        panel.onPointUp.add(function () {
          if (_this.selectPieceIndex !== idx) {
            panel.tag = 0;
            panel.opacity = 0;
            panel.modified();
          }
          var disable = _this.OnTouchCallback(idx);
          if (disable) {
            panel.touchable = false;
          }
        });
        e.append(panel);
      };
      var this_1 = this;
      for (var dx = 0; dx < divX; ++dx) {
        _loop_1(dx);
      }
    }
  };
  GameField.prototype.OnTouchCallback = function (idx) {
    var _this = this;
    Global_1.Global.instance.log("fieldTouch: " + idx + " / " + this.selectPieceIndex);
    if (this.selectPieceIndex < 0) {
      return;
    }
    var remainNum = this.pieceField.RemainNum;
    this.onPieceMatchCheck.forEach(function (x) {
      x(idx, idx === _this.selectPieceIndex, remainNum);
    });
    return idx === this.selectPieceIndex;
  };
  GameField.prototype.createCorrectPieceAndAction = function (e, p, t) {
    var move = 0.4;
    var th = 0.03;
    var tp = {
      x: t.x,
      y: t.y
    };
    var nss = g.SpriteFactory.createSpriteFromE(this.scene, p);
    var ns = new g.E({
      scene: this.scene
    });
    var wp = Util_1.Util.getWorldPos(p);
    nss.x = p.children[0].x;
    nss.y = p.children[0].y;
    nss.modified();
    ns.append(nss);
    ns.x = wp.x;
    ns.y = wp.y;
    ns.modified();
    e.append(ns);
    if (t.parent !== undefined) {
      if (t.parent !== null) {
        var te = t.parent;
        if (te instanceof g.E) {
          tp.x += te.x;
          tp.y += te.y;
        }
      }
    }
    ns.onUpdate.add(function () {
      // 目的地へ移動する
      ns.x = Util_1.Util.lerp(ns.x, tp.x, move, th);
      ns.y = Util_1.Util.lerp(ns.y, tp.y, move, th);
      ns.modified();
    });
    ns.show();
  };
  GameField.POS_X = 69;
  GameField.POS_Y = 51;
  GameField.PIC_OFFSET_X = 15;
  GameField.PIC_OFFSET_Y = 15;
  GameField.SELECTFRAME_BASE_X = 385;
  GameField.SELECTFRAME_BASE_Y = 118;
  GameField.COMBO_BASE_X = 201; // 191;
  GameField.COMBO_BASE_Y = 3; // 7;
  return GameField;
}(g.E);
exports.GameField = GameField;
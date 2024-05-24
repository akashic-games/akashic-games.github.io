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
exports.PieceSelectField = exports.PieceSize = void 0;
var akashic_timeline_1 = require("@akashic-extension/akashic-timeline");
var Global_1 = require("./Global");
var SpriteFactory_1 = require("./SpriteFactory");
var Util_1 = require("./Util");
var PieceSize;
(function (PieceSize) {
  PieceSize[PieceSize["L"] = 0] = "L";
  PieceSize[PieceSize["M"] = 1] = "M";
  PieceSize[PieceSize["S"] = 2] = "S";
})(PieceSize = exports.PieceSize || (exports.PieceSize = {}));
var PieceSelectField = /** @class */function (_super) {
  __extends(PieceSelectField, _super);
  function PieceSelectField(s, pieceSize, pieces) {
    var _this = _super.call(this, {
      scene: s
    }) || this;
    _this.selectFrameIndex = -1;
    _this.onSlideInFinish = [];
    _this.onTouchGetPiece = [];
    _this.indexTable = [];
    _this.pieceTable = [];
    _this.pieceLayer = null;
    _this.touchLayer = null;
    _this.frameL = null;
    _this.frameM = null;
    _this.frameS = [];
    _this.selectFrame = [];
    _this.pieceEntryIndex = [];
    _this.currentShowIndex = -1;
    _this.lastSelect = [];
    _this.requestCount = 0;
    // 出す順番
    _this.indexTable = Util_1.Util.shuffle(Util_1.Util.range(0, pieces.length));
    _this.pieceTable = pieces;
    _this.pieceLayer = new g.E({
      scene: s
    });
    _this.append(_this.pieceLayer);
    var tpTbl = PieceSelectField.touchPosTbl[pieceSize];
    _this.touchLayer = new g.E({
      scene: s
    });
    tpTbl.forEach(function (x) {
      var lfl = _this.createSelectFrame(pieceSize);
      lfl.x = x.x;
      lfl.y = x.y;
      lfl.modified();
      _this.selectFrame.push(lfl);
      _this.touchLayer.append(lfl);
      _this.pieceEntryIndex.push(-1);
    });
    var tf = _this.initTouchLayers(_this.touchLayer, _this.selectFrame[0], tpTbl);
    var tf2sf = [];
    for (var i = 0; i < tf.length; ++i) {
      tf2sf[tf[i].id] = i;
    }
    _this.append(_this.touchLayer);
    tf.forEach(function (_tf, tfidx) {
      _tf.onPointDown.add(function () {
        _this.selectFrame.forEach(function (x, idx) {
          x.opacity = tf2sf[_tf.id] === idx ? 1 : 0;
          x.modified();
        });
      });
      _tf.onPointUp.add(function () {
        var touchDisableRequest = false;
        var pieceIdx = _this.pieceEntryIndex[tfidx];
        Global_1.Global.instance.log("selectFrameIndex: " + _this.selectFrameIndex + " => " + tfidx);
        _this.selectFrameIndex = tfidx;
        _this.pushSelect(tfidx, pieceIdx);
        _this.onTouchGetPiece.forEach(function (x) {
          return touchDisableRequest = x(pieceIdx) || touchDisableRequest;
        });
        _this.touchLayer.children.forEach(function (e, i) {
          return e.touchable = tfidx !== i;
        });
      });
    });
    _this.onSlideInFinish.push(function (_gi, idx) {
      _this.currentShowIndex = idx;
      tf.forEach(function (_tf) {
        return _tf.touchable = true;
      });
    });
    return _this;
  }
  Object.defineProperty(PieceSelectField.prototype, "RemainNum", {
    get: function get() {
      return this.indexTable.length;
    },
    enumerable: false,
    configurable: true
  });
  PieceSelectField.prototype.get = function () {
    var _this = this;
    var tl = new akashic_timeline_1.Timeline(this.scene);
    var layer = new g.E({
      scene: this.scene
    });
    var index = this.indexTable.pop();
    var np = this.pieceTable[index];
    var getIndexTbl = [];
    this.pieceEntryIndex.forEach(function (v, i) {
      if (v === -1) {
        getIndexTbl.push(i);
      }
    });
    var getIndex = getIndexTbl.pop();
    var frame = this.selectFrame[getIndex];
    var px = frame.x + (frame.width - np.width) / 2;
    var py = frame.y + (frame.height - np.height) / 2;
    this.pieceLayer.append(layer);
    layer.append(np);
    layer.x = px;
    layer.y = g.game.height + np.height;
    layer.modified();
    this.pieceEntryIndex[getIndex] = index;
    var time = PieceSelectField.SLIDEIN_ANIM_WAIT;
    tl.create(layer, {
      modified: layer.modified,
      destroyed: layer.destroyed
    }).moveTo(px, py, time, akashic_timeline_1.Easing.easeOutQuart).con().every(function (_e, p) {
      if (p < 1) {
        return;
      }
      _this.onSlideInFinish.forEach(function (x) {
        return x(getIndex, index);
      });
      tl.destroy();
    }, time);
    this.requestCount++;
    if (0 < getIndexTbl.length) {
      this.get();
    }
  };
  PieceSelectField.prototype.setNextSelectFrame = function () {
    var _this = this;
    this.selectFrame.forEach(function (x) {
      x.opacity = 0;
      x.modified();
    });
    this.pieceEntryIndex.some(function (x, idx) {
      var sf = _this.selectFrame[idx];
      if (x < 0) {
        return false;
      }
      sf.opacity = 1;
      sf.modified();
      Global_1.Global.instance.log("setNextSelectFrame(" + x + ")");
      _this.onTouchGetPiece.forEach(function (sx) {
        return sx(x);
      });
      _this.currentShowIndex = idx;
      _this.selectFrameIndex = idx;
      return true;
    });
  };
  PieceSelectField.prototype.releaseSelectObject = function () {
    Global_1.Global.instance.log("releaseSelectObject(" + this.selectFrameIndex + ")");
    this.pieceEntryIndex[this.selectFrameIndex] = -1;
  };
  PieceSelectField.prototype.pushSelect = function (frameIdx, pieceIdx) {
    this.lastSelect.push({
      frameIdx: frameIdx,
      pieceIdx: pieceIdx
    });
  };
  PieceSelectField.prototype.popSelect = function () {
    return this.lastSelect.pop();
  };
  PieceSelectField.prototype.clearSelect = function () {
    this.lastSelect = [];
  };
  PieceSelectField.prototype.createSelectFrame = function (size) {
    var p = null;
    switch (size) {
      case PieceSize.L:
        p = SpriteFactory_1.SpriteFactory.createSelectFrameL(this.scene);
        break;
      case PieceSize.M:
        p = SpriteFactory_1.SpriteFactory.createSelectFrameM(this.scene);
        break;
      case PieceSize.S:
        p = SpriteFactory_1.SpriteFactory.createSelectFrameS(this.scene);
    }
    p.opacity = 0;
    p.modified();
    return p;
  };
  PieceSelectField.prototype.selectFrameInit = function (r, f) {
    f.x = -(f.width / 2);
    f.y = -(f.height / 2);
    f.modified();
    f.hide();
    r.append(f);
    r.width = f.width;
    r.height = f.height;
    r.modified();
    r.touchable = true;
    this.append(r);
  };
  PieceSelectField.prototype.initTouchLayers = function (r, f, pos) {
    var _this = this;
    var touchFields = [];
    pos.forEach(function (p) {
      var tf = new g.FilledRect({
        scene: _this.scene,
        width: f.width,
        height: f.height,
        cssColor: "#ff0000",
        opacity: Global_1.Global.instance.DEBUG ? 0 : 0,
        x: p.x,
        y: p.y
      });
      r.append(tf);
      touchFields.push(tf);
    });
    return touchFields;
  };
  PieceSelectField.SLIDEIN_ANIM_WAIT = 200;
  PieceSelectField.touchPosTbl = [[{
    x: 0,
    y: 0
  }], [{
    x: -24,
    y: 50
  }, {
    x: 90,
    y: -6
  }], [{
    x: 107,
    y: -10
  }, {
    x: 107,
    y: 114
  }, {
    x: -24,
    y: 100
  }, {
    x: -24,
    y: -12
  }]];
  return PieceSelectField;
}(g.E);
exports.PieceSelectField = PieceSelectField;
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
exports.Picture = exports.MaskDir = void 0;
var Global_1 = require("./Global");
var PieceSelectField_1 = require("./PieceSelectField");
var SpriteFactory_1 = require("./SpriteFactory");
var Util_1 = require("./Util");
var MaskDir;
(function (MaskDir) {
  MaskDir[MaskDir["NONE"] = 0] = "NONE";
  MaskDir[MaskDir["UP"] = 1] = "UP";
  MaskDir[MaskDir["RIGHT"] = 2] = "RIGHT";
  MaskDir[MaskDir["DOWN"] = 4] = "DOWN";
  MaskDir[MaskDir["LEFT"] = 8] = "LEFT";
})(MaskDir = exports.MaskDir || (exports.MaskDir = {}));
var Picture = /** @class */function (_super) {
  __extends(Picture, _super);
  function Picture(s, imageId, divX, divY) {
    var _this = _super.call(this, {
      scene: s
    }) || this;
    _this.image = null;
    _this.parts = [];
    _this.linesEntity = null;
    var imgs = _this.createImage(Picture.IMAGE_NAME, imageId, divX, divY);
    _this.image = imgs.image;
    _this.parts = imgs.div;
    _this.linesEntity = new g.E({
      scene: s
    });
    imgs.lines.forEach(function (l) {
      return _this.linesEntity.append(l);
    });
    _this.append(_this.linesEntity);
    _this.append(_this.image);
    return _this;
  }
  Object.defineProperty(Picture.prototype, "Pieces", {
    get: function get() {
      return this.parts;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Picture.prototype, "Image", {
    get: function get() {
      return this.image;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Picture.prototype, "getLines", {
    get: function get() {
      return this.linesEntity;
    },
    enumerable: false,
    configurable: true
  });
  Picture.prototype.createImage = function (imageName, imageId, divX, divY) {
    var _this = this;
    var s = this.scene;
    var sx = 1 + imageId % 3 * Picture.IMAGE_PIX;
    var sy = 1 + (imageId / 3 | 0) * Picture.IMAGE_PIX;
    Global_1.Global.instance.log("createImage(" + sx + "," + sy + ")");
    var img = new g.Sprite({
      scene: s,
      src: s.asset.getImageById(imageName),
      srcX: sx,
      srcY: sy,
      width: Picture.IMAGE_PIX,
      height: Picture.IMAGE_PIX,
      srcWidth: Picture.IMAGE_PIX,
      srcHeight: Picture.IMAGE_PIX
    });
    var dw = img.width / divX | 0;
    var dh = img.height / divY | 0;
    var psize = PieceSelectField_1.PieceSize.L;
    switch (divX) {
      // FIXME: ちょっと雑
      case 3:
        psize = PieceSelectField_1.PieceSize.M;
        break;
      case 4:
        psize = PieceSelectField_1.PieceSize.S;
        break;
    }
    // 全部作って
    var dtbl = [];
    for (var y = 0; y < divY; ++y) {
      for (var x = 0; x < divX; ++x) {
        dtbl.push(this.getConvexAndDepressData(x, y, {
          width: divX,
          height: divY
        }));
      }
    }
    var ctbl = Util_1.Util.repeat(0, dtbl.length);
    Util_1.Util.shuffle(Util_1.Util.range(0, dtbl.length)).forEach(function (idx) {
      var neigbars = _this.getPiecesNeighborsIndex(idx, divX, divY);
      var depress = dtbl[idx];
      var convex = 0;
      neigbars.forEach(function (v, i) {
        var dir = [MaskDir.UP, MaskDir.RIGHT, MaskDir.DOWN, MaskDir.LEFT];
        var rev = [MaskDir.DOWN, MaskDir.LEFT, MaskDir.UP, MaskDir.RIGHT];
        if (v === -1) {
          return;
        }
        if ((dtbl[v] & rev[i]) === 0) {
          return;
        }
        depress &= ~dir[i];
        convex |= dir[i];
      });
      dtbl[idx] = depress;
      ctbl[idx] = convex;
    });
    // 誤差を取る
    var divImages = [];
    for (var y = 0; y < divY; ++y) {
      for (var x = 0; x < divX; ++x) {
        var idx = x + y * divX;
        var dspr = null;
        var finfo = {
          x: sx + x * dw,
          y: sy + y * dh,
          width: dw,
          height: dh
        };
        dspr = this.createDepressPiece(imageName, finfo, psize, dtbl[idx]);
        dspr = this.createConvexPiece(imageName, finfo, dspr, psize, ctbl[idx]);
        divImages.push(dspr);
      }
    }
    // convexを元に下地を作る
    var lines = [];
    var _loop_1 = function _loop_1(i, max) {
      var px = i % divX;
      var py = i / divX | 0;
      var convex = ctbl[i];
      var sprT = this_1.getConvexLineTbl(psize);
      [MaskDir.UP, MaskDir.RIGHT, MaskDir.DOWN, MaskDir.LEFT].forEach(function (x, idx) {
        if ((convex & x) === 0) {
          return;
        }
        var offsetX = 0;
        var offsetY = 0;
        var lspr = sprT[idx];
        if (x === MaskDir.RIGHT) {
          offsetX = dw - lspr.width / 2 | 0;
        } else if (x === MaskDir.LEFT) {
          offsetX = -(lspr.width / 2 | 0);
        }
        if (x === MaskDir.UP) {
          offsetY = -(lspr.height / 2 | 0);
        } else if (x === MaskDir.DOWN) {
          offsetY = dh - (lspr.height / 2 | 0);
        }
        lspr.x = px * dw + offsetX;
        lspr.y = py * dh + offsetY;
        lspr.modified();
        lines.push(lspr);
      });
    };
    var this_1 = this;
    for (var i = 0, max = ctbl.length; i < max; ++i) {
      _loop_1(i, max);
    }
    return {
      image: img,
      div: divImages,
      lines: lines
    };
  };
  Picture.prototype.getPiecesNeighborsIndex = function (pidx, w, h) {
    var upPiece = -1;
    var rightPiece = -1;
    var downPiece = -1;
    var leftPiece = -1;
    var x = pidx % w;
    var y = pidx / w | 0;
    var idx = x + y * w;
    var right = x + 1 < w;
    var left = 0 <= x - 1;
    var up = 0 <= y - 1;
    var down = y + 1 < h;
    if (right) {
      rightPiece = idx + 1;
    }
    if (left) {
      leftPiece = idx - 1;
    }
    if (up) {
      upPiece = idx - w;
    }
    if (down) {
      downPiece = idx + w;
    }
    return [upPiece, rightPiece, downPiece, leftPiece];
  };
  Picture.prototype.createConvexPiece = function (assetName, info, piece, pieceSize, convex) {
    if (convex === void 0) {
      convex = 0;
    }
    var s = this.scene;
    // convex == 1248 => 上右下左
    var maskP = this.getMaskPieceTbl(pieceSize);
    var earTbl = [{
      x: info.x,
      y: info.y - maskP[0].height,
      width: info.width,
      height: maskP[0].height
    }, {
      x: info.x + info.width,
      y: info.y,
      width: maskP[0].width,
      height: info.height
    }, {
      x: info.x,
      y: info.y + info.height,
      width: info.width,
      height: maskP[0].height
    }, {
      x: info.x - maskP[0].width,
      y: info.y,
      width: maskP[0].width,
      height: info.height
    }];
    var earPTbl = [{
      x: (info.width - maskP[0].width) / 2 | 0,
      y: 0
    }, {
      x: 0,
      y: (info.height - maskP[0].height) / 2 | 0
    }, {
      x: (info.width - maskP[0].width) / 2 | 0,
      y: 0
    }, {
      x: 0,
      y: (info.height - maskP[0].height) / 2 | 0
    }];
    var rootE = new g.E({
      scene: this.scene
    });
    // piece元作成
    rootE.append(piece);
    [MaskDir.UP, MaskDir.RIGHT, MaskDir.DOWN, MaskDir.LEFT].forEach(function (x, i) {
      if ((convex & x) === 0) {
        return;
      }
      var et = earTbl[i];
      // 抜き用ノリシロ作成
      var ear = new g.Sprite({
        scene: s,
        src: s.asset.getImageById(assetName),
        srcX: et.x,
        srcY: et.y,
        srcWidth: et.width,
        srcHeight: et.height,
        width: et.width,
        height: et.height
      });
      var mergeE = new g.E({
        scene: s
      });
      maskP[i].x = earPTbl[i].x;
      maskP[i].y = earPTbl[i].y;
      maskP[i].modified();
      // maskPとノリシロをmerge
      ear.compositeOperation = "source-atop";
      ear.modified();
      mergeE.append(maskP[i]);
      mergeE.append(ear);
      // createspritefromeでnewノリシロ作成
      var newEar = g.SpriteFactory.createSpriteFromE(s, mergeE);
      // createspritefromeでpiece + ノリシロ作成
      newEar.x = et.x - info.x;
      newEar.y = et.y - info.y;
      newEar.modified();
      rootE.append(newEar);
    });
    var pieceSprite = g.SpriteFactory.createSpriteFromE(s, rootE);
    var se = new g.E({
      scene: s
    });
    var pw = 0;
    var ph = 0;
    if ((convex & MaskDir.UP) !== 0) {
      se.y += maskP[0].height;
      ph += maskP[0].height;
    }
    if ((convex & MaskDir.DOWN) !== 0) {
      ph += maskP[0].height;
    }
    if ((convex & MaskDir.LEFT) !== 0) {
      se.x += maskP[0].width;
      pw += maskP[0].width;
    }
    if ((convex & MaskDir.RIGHT) !== 0) {
      pw += maskP[0].width;
    }
    pieceSprite.modified();
    rootE.destroy();
    se.append(pieceSprite);
    se.width = piece.width + pw;
    se.height = piece.height + ph;
    se.modified();
    return se;
  };
  Picture.prototype.createDepressPiece = function (assetName, info, psize, depress) {
    if (depress === void 0) {
      depress = 0;
    }
    var s = this.scene;
    var maskP = this.getMaskPieceTbl(psize);
    var holeTbl = [{
      x: (info.width - maskP[0].width) / 2 | 0,
      y: 0
    }, {
      x: info.width - maskP[0].width,
      y: (info.height - maskP[0].height) / 2 | 0
    }, {
      x: (info.width - maskP[0].width) / 2 | 0,
      y: info.height - maskP[0].height
    }, {
      x: 0,
      y: (info.height - maskP[0].height) / 2 | 0
    }];
    // piece元作成
    var piece = new g.Sprite({
      scene: s,
      src: s.asset.getImageById(assetName),
      srcX: info.x,
      srcY: info.y,
      width: info.width,
      height: info.height,
      srcWidth: info.width,
      srcHeight: info.height
    });
    [MaskDir.UP, MaskDir.RIGHT, MaskDir.DOWN, MaskDir.LEFT].forEach(function (x, i) {
      var maskpi = (i + 2) % 4;
      if ((depress & x) === 0) {
        return;
      }
      var mergeE = new g.E({
        scene: s
      });
      var mp = maskP[maskpi]; // g.Util.createSpriteFromE(s, mpe);
      mp.x = holeTbl[i].x;
      mp.y = holeTbl[i].y;
      mp.modified();
      mp.compositeOperation = "xor";
      mp.modified();
      mergeE.append(piece);
      mergeE.append(mp);
      mergeE.width = piece.width;
      mergeE.height = piece.height;
      mergeE.modified();
      piece = g.SpriteFactory.createSpriteFromE(s, mergeE);
    });
    var se = new g.E({
      scene: s
    });
    se.append(piece);
    se.width = piece.width;
    se.height = piece.height;
    se.modified();
    return se;
  };
  Picture.prototype.getMaskPieceTbl = function (size) {
    var tbl = [];
    switch (size) {
      case PieceSelectField_1.PieceSize.L:
        tbl = SpriteFactory_1.SpriteFactory.createMaskL(this.scene);
        break;
      case PieceSelectField_1.PieceSize.M:
        tbl = SpriteFactory_1.SpriteFactory.createMaskM(this.scene);
        break;
      case PieceSelectField_1.PieceSize.S:
        tbl = SpriteFactory_1.SpriteFactory.createMaskS(this.scene);
        break;
      default:
        throw new Error("unknown size: " + size);
    }
    return tbl;
  };
  Picture.prototype.getConvexLineTbl = function (size) {
    var tbl = [];
    switch (size) {
      case PieceSelectField_1.PieceSize.L:
        tbl = SpriteFactory_1.SpriteFactory.createGuideL(this.scene);
        break;
      case PieceSelectField_1.PieceSize.M:
        tbl = SpriteFactory_1.SpriteFactory.createGuideM(this.scene);
        break;
      case PieceSelectField_1.PieceSize.S:
        tbl = SpriteFactory_1.SpriteFactory.createGuideS(this.scene);
        break;
      default:
        throw new Error("unknown size: " + size);
    }
    return tbl;
  };
  Picture.prototype.getConvexAndDepressData = function (px, py, field) {
    var maskDirT = [MaskDir.UP, MaskDir.RIGHT, MaskDir.DOWN, MaskDir.LEFT];
    if (px < 1) {
      // 左には付かない
      maskDirT = maskDirT.filter(function (n) {
        return n !== MaskDir.LEFT;
      });
    }
    if (field.width - 1 <= px) {
      // 右には付かない
      maskDirT = maskDirT.filter(function (n) {
        return n !== MaskDir.RIGHT;
      });
    }
    if (py < 1) {
      // 上には付かない
      maskDirT = maskDirT.filter(function (n) {
        return n !== MaskDir.UP;
      });
    }
    if (field.height - 1 <= py) {
      // 下には付かない
      maskDirT = maskDirT.filter(function (n) {
        return n !== MaskDir.DOWN;
      });
    }
    var data = 0;
    maskDirT.forEach(function (x) {
      return data |= x;
    });
    return data;
  };
  Picture.IMAGE_PIX = 253;
  Picture.IMAGE_NAME = "ui_2";
  return Picture;
}(g.E);
exports.Picture = Picture;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpriteFactory = void 0;
var SpriteFactory = /** @class */function () {
  function SpriteFactory() {}
  SpriteFactory.createTitle = function (_scene) {
    return SpriteFactory.createSpriteCore(_scene, "ui", 1, 289, 321, 519);
  };
  SpriteFactory.createManual = function (_scene) {
    return SpriteFactory.createSpriteCore(_scene, "ui", 1, 614, 453, 866);
  };
  SpriteFactory.createPictureFrame = function (_s) {
    return SpriteFactory.createSpriteCore(_s, "ui", 2, 2, 288, 288);
  };
  SpriteFactory.createRemainPieceFrame = function (s) {
    return SpriteFactory.createSpriteCore(s, "ui", 289, 1, 489, 65);
  };
  SpriteFactory.createSelectFrameL = function (s) {
    return SpriteFactory.createSpriteCore(s, "ui", 289, 66, 487, 264);
  };
  SpriteFactory.createSelectFrameM = function (s) {
    return SpriteFactory.createSpriteCore(s, "ui", 490, 1, 656, 167);
  };
  SpriteFactory.createSelectFrameS = function (s) {
    return SpriteFactory.createSpriteCore(s, "ui", 657, 1, 787, 131);
  };
  SpriteFactory.createMaskL = function (s) {
    var uv = [{
      left: 87,
      top: 571,
      right: 129,
      bottom: 613
    }, {
      left: 1,
      top: 571,
      right: 43,
      bottom: 613
    }, {
      left: 130,
      top: 571,
      right: 172,
      bottom: 613
    }, {
      left: 44,
      top: 571,
      right: 86,
      bottom: 613
    }];
    var sprT = [];
    uv.forEach(function (x) {
      sprT.push(SpriteFactory.createSpriteCore(s, "ui", x.left, x.top, x.right, x.bottom));
    });
    return sprT;
  };
  SpriteFactory.createMaskM = function (s) {
    var uv = [{
      left: 1,
      top: 542,
      right: 29,
      bottom: 570
    }, {
      left: 30,
      top: 542,
      right: 58,
      bottom: 570
    }, {
      left: 88,
      top: 542,
      right: 116,
      bottom: 570
    }, {
      left: 59,
      top: 542,
      right: 87,
      bottom: 570
    }];
    var sprT = [];
    uv.forEach(function (x) {
      sprT.push(SpriteFactory.createSpriteCore(s, "ui", x.left, x.top, x.right, x.bottom));
    });
    return sprT;
  };
  SpriteFactory.createMaskS = function (s) {
    var uv = [{
      left: 23,
      top: 520,
      right: 44,
      bottom: 541
    }, {
      left: 1,
      top: 520,
      right: 22,
      bottom: 541
    }, {
      left: 67,
      top: 520,
      right: 88,
      bottom: 541
    }, {
      left: 45,
      top: 520,
      right: 66,
      bottom: 541
    }];
    var sprT = [];
    uv.forEach(function (x) {
      sprT.push(SpriteFactory.createSpriteCore(s, "ui", x.left, x.top, x.right, x.bottom));
    });
    return sprT;
  };
  SpriteFactory.createGuideL = function (s) {
    var uv = [{
      left: 621,
      top: 330,
      right: 747,
      bottom: 415
    }, {
      left: 322,
      top: 289,
      right: 407,
      bottom: 415
    }, {
      left: 494,
      top: 330,
      right: 620,
      bottom: 415
    }, {
      left: 408,
      top: 289,
      right: 493,
      bottom: 415
    }];
    var sprT = [];
    uv.forEach(function (x) {
      sprT.push(SpriteFactory.createSpriteCore(s, "ui", x.left, x.top, x.right, x.bottom));
    });
    return sprT;
  };
  SpriteFactory.createGuideM = function (s) {
    var uv = [{
      left: 523,
      top: 416,
      right: 607,
      bottom: 473
    }, {
      left: 322,
      top: 416,
      right: 379,
      bottom: 500
    }, {
      left: 438,
      top: 416,
      right: 522,
      bottom: 473
    }, {
      left: 380,
      top: 416,
      right: 437,
      bottom: 500
    }];
    var sprT = [];
    uv.forEach(function (x) {
      sprT.push(SpriteFactory.createSpriteCore(s, "ui", x.left, x.top, x.right, x.bottom));
    });
    return sprT;
  };
  SpriteFactory.createGuideS = function (s) {
    var uv = [{
      left: 501,
      top: 501,
      right: 564,
      bottom: 544
    }, {
      left: 349,
      top: 501,
      right: 392,
      bottom: 564
    }, {
      left: 437,
      top: 501,
      right: 500,
      bottom: 544
    }, {
      left: 393,
      top: 501,
      right: 436,
      bottom: 564
    }];
    var sprT = [];
    uv.forEach(function (x) {
      sprT.push(SpriteFactory.createSpriteCore(s, "ui", x.left, x.top, x.right, x.bottom));
    });
    return sprT;
  };
  SpriteFactory.createAnimationSprite = function (_scene, srow, scolumn, row, column, show) {
    if (show === void 0) {
      show = true;
    }
    var spriteTable = [];
    var sw = 76;
    var sh = 78;
    var bx = 1 + srow * sw;
    var by = 538 + scolumn * sh + 1;
    var spr = null;
    for (var y = 0, ymax = column; y < ymax; ++y) {
      for (var x = 0, xmax = row; x < xmax; ++x) {
        var nbx = bx + x * sw + x;
        var nby = by + y * sh + y;
        spr = SpriteFactory.createSpriteCore(_scene, "ui", nbx, nby, nbx + sw, nby + sh);
        if (!show) {
          spr.hide();
        }
        spriteTable.push(spr);
      }
    }
    return spriteTable;
  };
  SpriteFactory.createRestNUMFrame = function (_s) {
    return SpriteFactory.createSprite(_s, 784, 1, 944, 47);
  };
  SpriteFactory.createSCOREFrame = function (_s) {
    return SpriteFactory.createSprite(_s, 1, 188, 446, 356);
  };
  SpriteFactory.createClockIcon = function (_s) {
    return SpriteFactory.createSprite(_s, 1, 524, 37, 560);
  };
  SpriteFactory.createPtImage = function (_s) {
    return SpriteFactory.createSprite(_s, 38, 524, 66, 552);
  };
  SpriteFactory.createComboRedBase = function (_s) {
    return SpriteFactory.createSprite(_s, 67, 524, 173, 554);
  };
  SpriteFactory.createComboYellowBase = function (_s) {
    return SpriteFactory.createSprite(_s, 174, 524, 297, 562);
  };
  SpriteFactory.createReady = function (_s) {
    return SpriteFactory.createSprite(_s, 447, 188, 691, 284);
  };
  SpriteFactory.createStart = function (_s) {
    return SpriteFactory.createSprite(_s, 447, 285, 733, 364);
  };
  SpriteFactory.createTimeUp = function (_s) {
    return SpriteFactory.createSprite(_s, 478, 444, 826, 539);
  };
  SpriteFactory.createSprite = function (_scene, sx, sy, ex, ey) {
    return this.createSpriteCore(_scene, "ui_common", sx, sy, ex, ey);
  };
  SpriteFactory.createSpriteCore = function (_s, name, sx, sy, ex, ey) {
    var sw = ex - sx;
    var sh = ey - sy;
    return new g.Sprite({
      scene: _s,
      src: _s.asset.getImageById(name),
      srcX: sx,
      srcY: sy,
      srcWidth: sw,
      srcHeight: sh,
      width: sw,
      height: sh
    });
  };
  return SpriteFactory;
}();
exports.SpriteFactory = SpriteFactory;
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilingSprite = void 0;
var core_1 = require("../core");
var PIXI_1 = require("../PIXI");
// TilingSprite は本来以下のように派生したクラス。
//   PIXI.Sprite <- PIXI.extras.TilingSprite <- PIXI.extras.PictureTilingSprite <- TilingSprite
// https://pixijs.download/v4.8.1/docs/PIXI.extras.TilingSprite.html
// PictureTilingSprite は pixi-picture.js に存在するが、プラグイン名を変更した以外 TilingSprite と変わらない。
// PIXI.extras.TilingSprite, PIXI.extras.PictureTilingSprite, TilingSprite をまとめて模倣する
// http://pixijs.download/release/docs/extras_TilingSprite.js.html
var TilingSprite = /** @class */ (function (_super) {
    __extends(TilingSprite, _super);
    function TilingSprite(bitmap) {
        return _super.call(this, bitmap) || this;
    }
    TilingSprite.prototype.initialize = function (bitmap) {
        // const texture = new Texture(new BaseTexture());
        _super.prototype.initialize.call(this, bitmap);
        this._bitmap = null;
        this._width = 0;
        this._height = 0;
        this._frame = new PIXI_1.Rectangle();
        this.spriteId = core_1.Sprite._counter++;
        this.tilePosition = new PIXI_1.Point();
        this.origin = new PIXI_1.Point();
        this.bitmap = bitmap;
    };
    // pixi-picture.jsをみると `PictureTilingSprite` は `TilingSprite` そのままにみえる。
    // TilingSprite.prototype._renderCanvas_PIXI = PIXI.extras.PictureTilingSprite.prototype._renderCanvas;
    // TilingSprite.prototype._renderWebGL_PIXI = PIXI.extras.PictureTilingSprite.prototype._renderWebGL;
    // _renderCanvas(renderer) {
    // 	if (this._bitmap) {
    // 		this._bitmap.touch();
    // 	}
    // 	if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
    // 		this._renderCanvas_PIXI(renderer);
    // 	}
    // }
    TilingSprite.prototype.renderSelf = function (renderer, _camera) {
        if (this._bitmap) {
            this._bitmap.touch();
        }
        // 本来０との比較だが、1x1はテクスチャが与えられないときの仮のテクスチャのサイズなので無視してみる
        if (this.texture.frame.width > 1 && this.texture.frame.height > 1) {
            // ソースを読んでみて、
            //   http://pixijs.download/release/docs/extras_TilingSprite.js.html
            // 基本的挙動はこういうものだろう、というものを実装してみる。
            // パラメータはいくつか端折っているが、本質的にこのようなものっぽい。
            // NOTE: _frame は無視している。おそらく _frame で指定された領域が
            // baseTexture のサイズに広がっているかのような挙動が正しい
            renderer.save();
            // viewPosition: 視界の左上座標
            var viewPositin = { x: -this.tilePosition.x, y: -this.tilePosition.y };
            var iw = this.bitmap.surface.width;
            var ih = this.bitmap.surface.height;
            var sx = Math.floor(viewPositin.x / iw) * iw - viewPositin.x;
            var sy = Math.floor(viewPositin.y / ih) * ih - viewPositin.y;
            // let num: number = 0;
            for (var y = sy; y < this._height; y += ih) {
                for (var x = sx; x < this._width; x += iw) {
                    renderer.drawImage(this.bitmap.surface, 0, 0, iw, ih, x, y);
                    // num++;
                }
            }
            renderer.restore();
        }
        return true;
    };
    Object.defineProperty(TilingSprite.prototype, "bitmap", {
        // _renderWebGL(renderer) {
        // 	if (this._bitmap) {
        // 		this._bitmap.touch();
        // 	}
        // 	if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
        // 		if (this._bitmap) {
        // 			this._bitmap.checkDirty();
        // 		}
        // 		this._renderWebGL_PIXI(renderer);
        // 	}
        // }
        get: function () {
            return this._bitmap;
        },
        set: function (value) {
            if (this._bitmap !== value) {
                this._bitmap = value;
                if (this._bitmap) {
                    this._bitmap.addLoadListener(this._onBitmapLoad.bind(this));
                }
                else {
                    this.texture.frame = PIXI_1.Rectangle.emptyRectangle;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TilingSprite.prototype, "opacity", {
        get: function () {
            return this.alpha * 255;
        },
        set: function (value) {
            this.alpha = core_1.Utils.clamp(value, 0, 255) / 255;
        },
        enumerable: false,
        configurable: true
    });
    // Containerと変わらない実装なのでコメントアウト
    // update() {
    // 	this.children.forEach(function(child) {
    // 		if (child.update) {
    // 			child.update();
    // 		}
    // 	});
    // };
    TilingSprite.prototype.move = function (x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this._width = width || 0;
        this._height = height || 0;
    };
    TilingSprite.prototype.setFrame = function (x, y, width, height) {
        this._frame.x = x;
        this._frame.y = y;
        this._frame.width = width;
        this._frame.height = height;
        this._refresh();
    };
    TilingSprite.prototype.updateTransform = function () {
        this.tilePosition.x = Math.round(-this.origin.x);
        this.tilePosition.y = Math.round(-this.origin.y);
        this.updateTransformTS();
    };
    // updateTransformTS = PIXI.extras.TilingSprite.prototype.updateTransform;
    TilingSprite.prototype.updateTransformTS = function () {
        // PIXI.extras.TilingSprite は PIXI.Container そのままのはず…
        PIXI_1.Container.prototype.updateTransform.call(this);
    };
    TilingSprite.prototype._onBitmapLoad = function () {
        this.texture.baseTexture = this._bitmap.baseTexture;
        this._refresh();
    };
    TilingSprite.prototype._refresh = function () {
        var frame = this._frame.clone();
        if (frame.width === 0 && frame.height === 0 && this._bitmap) {
            frame.width = this._bitmap.width;
            frame.height = this._bitmap.height;
        }
        this.texture.frame = frame;
        // this.texture._updateID++;
        this.tilingTexture = null;
    };
    return TilingSprite;
}(core_1.Sprite));
exports.TilingSprite = TilingSprite;

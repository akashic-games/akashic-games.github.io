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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
var PIXI = require("../PIXI");
var Rectangle_1 = require("./Rectangle");
var Utils_1 = require("./Utils");
// export interface SpriteParameterObject extends PIXI.ContainerParameterObject {
// 	bitmap?: Bitmap;
// }
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    function Sprite() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
        // Spriteの初期化前はgetter/setterが処理をスキップするためのフラグ。
        // 親コンストラクタがgetter/setterにアクセスするため。
        // this._constructed = true;
        // 初期化処理は生成されるクラスが起動し、各クラスのinitializeが親クラスのinitializeを呼び出す。
        // そのためこのように自身が生成されたクラスそのものであるか確認する。
        // if (Object.getPrototypeOf(this) === Sprite.prototype) {
        // 	this.initialize(bitmap);
        // }
    }
    Object.defineProperty(Sprite.prototype, "anchor", {
        // _renderCanvas_PIXI = PIXI.Sprite.prototype._renderCanvas;
        // _renderWebGL_PIXI = PIXI.Sprite.prototype._renderWebGL;
        // see: http://pixijs.download/dev/docs/PIXI.Sprite.html#anchor
        get: function () {
            return this._anchor;
        },
        set: function (value) {
            this._anchor.set(value.x, value.y);
        },
        enumerable: false,
        configurable: true
    });
    // NOTE: 派生クラスの initialize() の引数がとても自由なのでこのようにする
    Sprite.prototype.initialize = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var bitmap = args[0];
        // var texture = new PIXI.Texture(new PIXI.BaseTexture());
        // PIXI.Sprite.call(this, texture);
        this.texture = new PIXI.Texture();
        this._bitmap = null;
        this._frame = new Rectangle_1.Rectangle();
        this._realFrame = new Rectangle_1.Rectangle();
        this._blendColor = [0, 0, 0, 0];
        this._colorTone = [0, 0, 0, 0];
        this._canvas = null;
        this._context = null;
        this._tintTexture = null;
        this._isPicture = false;
        this.spriteId = Sprite._counter++;
        this.opaque = false;
        this.bitmap = bitmap;
        this._anchor = new PIXI.ObservablePoint(function (subject) {
            _this.pixiEntity.anchorX = subject.x;
            _this.pixiEntity.anchorY = subject.y;
            _this.modified();
        });
        // pixiEntityに伝搬
        this.anchor.x = 0;
        this.anchor.y = 0;
    };
    Object.defineProperty(Sprite.prototype, "bitmap", {
        get: function () {
            return this._bitmap;
        },
        set: function (value) {
            if (this._bitmap !== value) {
                this._bitmap = value;
                if (value) {
                    this._refreshFrame = true;
                    value.addLoadListener(this._onBitmapLoad.bind(this));
                }
                else {
                    this._refreshFrame = false;
                    // TODO: 空の矩形を描画できるようにする
                    // this.texture.frame = Rectangle.emptyRectangle;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () {
            this._frame = this._frame || new Rectangle_1.Rectangle();
            return this._frame.width;
        },
        set: function (value) {
            this._frame = this._frame || new Rectangle_1.Rectangle();
            this._frame.width = value;
            this._refresh();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () {
            this._frame = this._frame || new Rectangle_1.Rectangle();
            return this._frame.height;
        },
        set: function (value) {
            this._frame = this._frame || new Rectangle_1.Rectangle();
            this._frame.height = value;
            this._refresh();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "surface", {
        get: function () {
            if (this._surface) {
                return this._surface;
            }
            else if (this.bitmap && this.bitmap.isReady()) {
                return this.bitmap.surface;
            }
            else {
                return null;
            }
        },
        enumerable: false,
        configurable: true
    });
    // TilingSprite が４つ引数を持つので
    // TilingSprite.prototype = Object.create(PIXI.extras.PictureTilingSprite.prototype);
    Sprite.prototype.move = function (x, y, _width, _height) {
        this.x = x;
        this.y = y;
        this.pixiEntity.modified();
    };
    Sprite.prototype.setFrame = function (x, y, width, height) {
        this._refreshFrame = false;
        var frame = this._frame;
        if (x !== frame.x || y !== frame.y || width !== frame.width || height !== frame.height) {
            frame.x = x;
            frame.y = y;
            frame.width = width;
            frame.height = height;
            this._refresh();
        }
    };
    Sprite.prototype.getBlendColor = function () {
        return JSON.parse(JSON.stringify(this._blendColor));
    };
    Sprite.prototype.setBlendColor = function (color) {
        if (!(color instanceof Array)) {
            throw new Error("Argument must be an array");
        }
        // if (!this._blendColor.equals(color)) {
        // 	this._blendColor = color.clone();
        // 	this._refresh();
        // }
        if (!Utils_1.Utils.isArrayEqual(this._blendColor, color)) {
            this._blendColor = __spreadArray([], color, true);
            this._refresh();
        }
    };
    Sprite.prototype.getColorTone = function () {
        return JSON.parse(JSON.stringify(this._colorTone));
    };
    Sprite.prototype.setColorTone = function (_tone) {
        // if (!(tone instanceof Array)) {
        // 	throw new Error('Argument must be an array');
        // }
        // if (!this._colorTone.equals(tone)) {
        // 	this._colorTone = tone.clone();
        // 	this._refresh();
        // }
    };
    Sprite.prototype._onBitmapLoad = function (bitmapLoaded) {
        if (bitmapLoaded === this._bitmap) {
            if (this._refreshFrame && this._bitmap) {
                this._refreshFrame = false;
                this._frame.width = this._bitmap.width;
                this._frame.height = this._bitmap.height;
            }
        }
        this._refresh();
    };
    Sprite.prototype._refresh = function () {
        // if (! this._constructed) {
        // 	return;
        // }
        // frame が bitmap の外にはみ出したりしたときのためにクリッピングする
        // クリッピングされた領域が realFrame となり、最終的に
        // this.texture.frame に格納される
        var frameX = Math.floor(this._frame.x);
        var frameY = Math.floor(this._frame.y);
        var frameW = Math.floor(this._frame.width);
        var frameH = Math.floor(this._frame.height);
        var bitmapW = this._bitmap ? this._bitmap.width : 0;
        var bitmapH = this._bitmap ? this._bitmap.height : 0;
        var realX = Utils_1.Utils.clamp(frameX, 0, bitmapW);
        var realY = Utils_1.Utils.clamp(frameY, 0, bitmapH);
        var realW = Utils_1.Utils.clamp(frameW - realX + frameX, 0, bitmapW - realX);
        var realH = Utils_1.Utils.clamp(frameH - realY + frameY, 0, bitmapH - realY);
        this._realFrame.x = realX;
        this._realFrame.y = realY;
        this._realFrame.width = realW;
        this._realFrame.height = realH;
        this.pivot.x = frameX - realX;
        this.pivot.y = frameY - realY;
        this._surface = null;
        if (realW > 0 && realH > 0) {
            if (this._needsTint()) {
                this._createTinter(realW, realH);
                this._executeTint(realX, realY, realW, realH);
                // 描画時に参照する surface を切り替える対応が `get surface()` で行われるため、`this.texture.baseTexture` の差し替えに対応する処理は不要
                // this._tintTexture.update();
                // this.texture.baseTexture = this._tintTexture;
                this.texture.frame = new Rectangle_1.Rectangle(0, 0, realW, realH);
            }
            else {
                // 描画時に参照する surface を切り替える対応が `get surface()` で行われるため、`this.texture.baseTexture` の差し替えに対応する処理は不要
                // if (this._bitmap) {
                // 	this.texture.baseTexture = this._bitmap.baseTexture;
                // }
                this.texture.frame = this._realFrame;
            }
        }
        else if (this._bitmap) {
            this.texture.frame = /* PIXI.Rectangle.emptyRectangle*/ Rectangle_1.Rectangle.emptyRectangle;
        }
        else {
            this.texture.baseTexture.width = Math.max(this.texture.baseTexture.width, this._frame.x + this._frame.width);
            this.texture.baseTexture.height = Math.max(this.texture.baseTexture.height, this._frame.y + this._frame.height);
            this.texture.frame = this._frame;
            // たぶんこの大きさにリサイズしたサーフェスを用意するべき？
            this._surface = g.game.resourceFactory.createSurface(this.texture.baseTexture.width, this.texture.baseTexture.height);
        }
        this.pixiEntity.width = realW;
        this.pixiEntity.height = realH;
        this.pixiEntity.modified();
        // this.texture._updateID++;
    };
    Sprite.prototype._isInBitmapRect = function (x, y, w, h) {
        return this._bitmap && x + w > 0 && y + h > 0 && x < this._bitmap.width && y < this._bitmap.height;
    };
    Sprite.prototype._needsTint = function () {
        var tone = this._colorTone;
        return !!(tone[0] || tone[1] || tone[2] || tone[3] || this._blendColor[3] > 0);
    };
    Sprite.prototype._createTinter = function (w, h) {
        // if (!this._canvas) {
        // 	this._canvas = document.createElement('canvas');
        // 	this._context = this._canvas.getContext('2d');
        // }
        // this._canvas.width = w;
        // this._canvas.height = h;
        // if (!this._tintTexture) {
        // 	this._tintTexture = new PIXI.BaseTexture(this._canvas);
        // }
        // this._tintTexture.width = w;
        // this._tintTexture.height = h;
        // this._tintTexture.scaleMode = this._bitmap.baseTexture.scaleMode;
        if (this._surface) {
            if (this._surface.width !== w || this._surface.height !== h) {
                this._surface.destroy();
                this._surface = g.game.resourceFactory.createSurface(w, h);
            }
        }
        else {
            this._surface = g.game.resourceFactory.createSurface(w, h);
        }
    };
    /**
     * @method _executeTint
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     * @private
     */
    Sprite.prototype._executeTint = function (x, y, w, h) {
        // const context = this._context;
        // const tone = this._colorTone;
        // const color = this._blendColor;
        // context.globalCompositeOperation = "copy";
        // context.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);
        var renderer = this._surface.renderer();
        renderer.begin();
        renderer.save();
        var tone = this._colorTone;
        var color = this._blendColor;
        renderer.setCompositeOperation("copy");
        renderer.drawImage(this._bitmap.surface, x, y, w, h, 0, 0);
        // if (Graphics.canUseSaturationBlend()) {
        // 	const gray = Math.max(0, tone[3]);
        // 	context.globalCompositeOperation = "saturation";
        // 	context.fillStyle = "rgba(255,255,255," + gray / 255 + ")";
        // 	context.fillRect(0, 0, w, h);
        // }
        // const r1 = Math.max(0, tone[0]);
        // const g1 = Math.max(0, tone[1]);
        // const b1 = Math.max(0, tone[2]);
        // context.globalCompositeOperation = "lighter";
        // context.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
        // context.fillRect(0, 0, w, h);
        var r1 = Math.max(0, tone[0]);
        var g1 = Math.max(0, tone[1]);
        var b1 = Math.max(0, tone[2]);
        renderer.setCompositeOperation("lighter");
        var cssColor = Utils_1.Utils.rgbToCssColor(r1, g1, b1);
        renderer.fillRect(0, 0, w, h, cssColor);
        // if (Graphics.canUseDifferenceBlend()) {
        // 	context.globalCompositeOperation = "difference";
        // 	context.fillStyle = "white";
        // 	context.fillRect(0, 0, w, h);
        // 	const r2 = Math.max(0, -tone[0]);
        // 	const g2 = Math.max(0, -tone[1]);
        // 	const b2 = Math.max(0, -tone[2]);
        // 	context.globalCompositeOperation = "lighter";
        // 	context.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
        // 	context.fillRect(0, 0, w, h);
        // 	context.globalCompositeOperation = "difference";
        // 	context.fillStyle = "white";
        // 	context.fillRect(0, 0, w, h);
        // }
        // const r3 = Math.max(0, color[0]);
        // const g3 = Math.max(0, color[1]);
        // const b3 = Math.max(0, color[2]);
        // const a3 = Math.max(0, color[3]);
        // context.globalCompositeOperation = "source-atop";
        // context.fillStyle = Utils.rgbToCssColor(r3, g3, b3);
        // context.globalAlpha = a3 / 255;
        // context.fillRect(0, 0, w, h);
        // context.globalCompositeOperation = "destination-in";
        // context.globalAlpha = 1;
        // context.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);
        var r3 = Math.max(0, color[0]);
        var g3 = Math.max(0, color[1]);
        var b3 = Math.max(0, color[2]);
        var a3 = Math.max(0, color[3]);
        renderer.setCompositeOperation("source-atop");
        cssColor = Utils_1.Utils.rgbToCssColor(r3, g3, b3);
        renderer.setOpacity(a3 / 255);
        renderer.fillRect(0, 0, w, h, cssColor);
        renderer.setCompositeOperation("experimental-destination-in");
        renderer.setOpacity(1);
        renderer.drawImage(this.bitmap.surface, x, y, w, h, 0, 0);
        renderer.restore();
        renderer.end();
    };
    // _renderCanvas(renderer: any) {
    // 	if (this.bitmap) {
    // 		this.bitmap.touch();
    // 	}
    // 	if (this.bitmap && !this.bitmap.isReady()) {
    // 		return;
    // 	}
    // 	// 親クラスの実装を呼び出している
    // 	if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
    // 		this._renderCanvas_PIXI(renderer);
    // 	}
    // }
    Sprite.prototype.renderSelf = function (renderer, _camera) {
        if (this.surface) {
            // NOTE: 戦闘中の敵の頭上に現れるステータスアイコンのゴミ対策
            //
            // ステータス異常がないとき img_system_IconSet.png (0, 0, 32, 32) の領域が表示される。
            // これは完全に透明な領域だが、黒い縦線が表示されるケースが有る（スライム二匹で確認）。
            // これは隣接するアイコンの黒枠が表示されたものになる（着色して確認した）。
            // Akashicではスプライトシートでは隣接する画像との間に隙間を開けることを推奨している。
            //
            // 変換行列の一部成分を整数化するとゴミが消えることを見つけたので、ここではそのように
            // して対策している。ブラウザの機能を調節用いているので、本当はご法度である。今後の課題。
            //
            // TODO: ↑なんとかする
            // const ctx = (renderer as any).context;
            // const mtrx = ctx.getTransform();
            // mtrx.e = mtrx.e | 0;
            // mtrx.f = mtrx.f | 0;
            // ctx.setTransform(mtrx);
            if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
                renderer.drawImage(this.surface, this.texture.frame.x, this.texture.frame.y, this.texture.frame.width, this.texture.frame.height, 0, 0);
            }
        }
        return true;
    };
    Sprite.prototype._speedUpCustomBlendModes = function (_renderer) {
        // var picture = renderer.plugins.picture;
        // var blend = this.blendMode;
        // if (renderer.renderingToScreen && renderer._activeRenderTarget.root) {
        // 	if (picture.drawModes[blend]) {
        // 		var stage = renderer._lastObjectRendered;
        // 		var f = stage._filters;
        // 		if (!f || !f[0]) {
        // 			setTimeout(function () {
        // 				var f = stage._filters;
        // 				if (!f || !f[0]) {
        // 					stage.filters = [Sprite.voidFilter];
        // 					stage.filterArea = new PIXI.Rectangle(0, 0, Graphics.width, Graphics.height);
        // 				}
        // 			}, 0);
        // 		}
        // 	}
        // }
    };
    Sprite._counter = 0;
    return Sprite;
}(PIXI.Container));
exports.Sprite = Sprite;

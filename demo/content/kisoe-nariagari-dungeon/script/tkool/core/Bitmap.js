"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bitmap = exports.MAX_PAINT_OPACITY = void 0;
var Graphics_1 = require("./Graphics");
var Utils_1 = require("./Utils");
var fontMap = [];
function registerFont(fontSize, fontColor) {
    if (fontColor === void 0) { fontColor = "#ffffff"; }
    var font = new g.DynamicFont({
        game: g.game,
        fontFamily: "sans-serif",
        size: fontSize,
        fontColor: fontColor,
        strokeWidth: 4,
        strokeColor: "rgba(0, 0, 0, 0.5)"
    });
    fontMap.push(font);
    return font;
}
// NOTE: フォントサイズが指定値以上、かつ最も小さい Font を返します。
function getFont(fontSize, fontColor) {
    if (fontColor === void 0) { fontColor = "#ffffff"; }
    var font = fontMap.find(function (e) { return e.size >= fontSize && e.fontColor === fontColor; });
    return font !== null && font !== void 0 ? font : registerFont(fontSize, fontColor);
}
registerFont(24);
registerFont(32);
registerFont(72);
// let sharedFont: g.Font;
exports.MAX_PAINT_OPACITY = 255;
var Bitmap = /** @class */ (function () {
    function Bitmap(widthOrUrl, height) {
        if (typeof widthOrUrl === "number") {
            this.initialize(widthOrUrl, height);
        }
        else {
            this._defer = true;
            this.initialize();
            // 一旦メモ
            this._url = widthOrUrl;
        }
    }
    /**
     * Loads a image file and returns a new bitmap object.
     *
     * @static
     * @method load
     * @param {String} url The image url of the texture
     * @return Bitmap
     */
    Bitmap.load = function (url) {
        var bitmap = new Bitmap(url);
        bitmap._defer = true;
        bitmap.initialize();
        bitmap._decodeAfterRequest = true;
        bitmap._requestImage(url);
        return bitmap;
    };
    /**
     * Takes a snapshot of the game screen and returns a new bitmap object.
     *
     * @static
     * @method snap
     * @param {Stage} stage The stage object
     * @return Bitmap
     */
    Bitmap.snap = function (stage) {
        // var width = Graphics.width;
        // var height = Graphics.height;
        // var bitmap = new Bitmap(width, height);
        // var context = bitmap._context;
        // var renderTexture = PIXI.RenderTexture.create(width, height);
        // if (stage) {
        // 	Graphics._renderer.render(stage, renderTexture);
        // 	stage.worldTransform.identity();
        // 	var canvas = null;
        // 	if (Graphics.isWebGL()) {
        // 		canvas = Graphics._renderer.extract.canvas(renderTexture);
        // 	} else {
        // 		canvas = renderTexture.baseTexture._canvasRenderTarget.canvas;
        // 	}
        // 	context.drawImage(canvas, 0, 0);
        // } else {
        // 	//
        // }
        // renderTexture.destroy({ destroyBase: true });
        // bitmap._setDirty();
        // return bitmap;
        var width = Graphics_1.Graphics.width;
        var height = Graphics_1.Graphics.height;
        var bitmap = new Bitmap(width, height);
        var surface = bitmap._surface;
        if (stage) {
            var renderer = surface.renderer();
            renderer.begin();
            renderer.save();
            var children = stage.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                child.render(renderer);
            }
            renderer.restore();
            renderer.end();
        }
        return bitmap;
    };
    Bitmap.request = function (url) {
        var bitmap = new Bitmap(url);
        bitmap._defer = true;
        bitmap.initialize();
        bitmap._url = url;
        bitmap._loadingState = "pending";
        return bitmap;
    };
    Bitmap.prototype.initialize = function (width, height) {
        if (!this._defer) {
            this._createCanvas(width, height);
        }
        this._image = null;
        this._url = "";
        this._paintOpacity = exports.MAX_PAINT_OPACITY;
        this._smooth = false;
        this._loadListeners = [];
        this._loadingState = "none";
        this._decodeAfterRequest = false;
        this._textAlign = null;
        /**
         * Cache entry, for images. In all cases _url is the same as cacheEntry.key
         * @type CacheEntry
         */
        this.cacheEntry = null;
        /**
         * The face name of the font.
         *
         * @property fontFace
         * @type String
         */
        this.fontFace = "GameFont";
        /**
         * The size of the font in pixels.
         *
         * @property fontSize
         * @type Number
         */
        this.fontSize = 28;
        /**
         * Whether the font is italic.
         *
         * @property fontItalic
         * @type Boolean
         */
        this.fontItalic = false;
        /**
         * The color of the text in CSS format.
         *
         * @property textColor
         * @type String
         */
        this.textColor = "#ffffff";
        /**
         * The color of the outline of the text in CSS format.
         *
         * @property outlineColor
         * @type String
         */
        this.outlineColor = "rgba(0, 0, 0, 0.5)";
        /**
         * The width of the outline of the text.
         *
         * @property outlineWidth
         * @type Number
         */
        this.outlineWidth = 4;
    };
    /**
     * Checks whether the bitmap is ready to render.
     *
     * @method isReady
     * @return {Boolean} True if the bitmap is ready to render
     */
    Bitmap.prototype.isReady = function () {
        return this._loadingState === "loaded" || this._loadingState === "none";
    };
    /**
     * Checks whether a loading error has occurred.
     *
     * @method isError
     * @return {Boolean} True if a loading error has occurred
     */
    Bitmap.prototype.isError = function () {
        return this._loadingState === "error";
    };
    /**
     * touch the resource
     * @method touch
     */
    Bitmap.prototype.touch = function () {
        // if (this.cacheEntry) {
        // 	this.cacheEntry.touch();
        // }
    };
    Object.defineProperty(Bitmap.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "baseTexture", {
        get: function () {
            if (!this._baseTexture) {
                this._createBaseTexture(this._surface);
            }
            return this._baseTexture;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "canvas", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "context", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "width", {
        get: function () {
            if (this.isReady()) {
                return this._image ? this._image.width : this._surface.width;
            }
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "height", {
        get: function () {
            if (this.isReady()) {
                return this._image ? this._image.height : this._surface.height;
            }
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "rect", {
        get: function () {
            return {
                x: 0,
                y: 0,
                width: this.width,
                height: this.height
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "smooth", {
        get: function () {
            return true;
        },
        set: function (value) {
            //
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "paintOpacity", {
        get: function () {
            return this._paintOpacity;
        },
        set: function (value) {
            if (this._paintOpacity !== value) {
                this._paintOpacity = value;
                // this._context.globalAlpha = this._paintOpacity / MAX_PAINT_OPACITY;
                console.log("paintOpacity value " + value + " dropped");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bitmap.prototype, "surface", {
        get: function () {
            return this._surface;
        },
        enumerable: false,
        configurable: true
    });
    Bitmap.prototype.resize = function (width, height) {
        width = Math.max(width || 0, 1);
        height = Math.max(height || 0, 1);
        // this._canvas.width = width;
        // this._canvas.height = height;
        // this._baseTexture.width = width;
        // this._baseTexture.height = height;
        // TODO: 以前の内容をコピーする必要がある？
        this.__surface = g.game.resourceFactory.createSurface(width, height);
    };
    /**
     * Performs a block transfer.
     *
     * @method blt
     * @param {Bitmap} source The bitmap to draw
     * @param {Number} sx The x coordinate in the source
     * @param {Number} sy The y coordinate in the source
     * @param {Number} sw The width of the source image
     * @param {Number} sh The height of the source image
     * @param {Number} dx The x coordinate in the destination
     * @param {Number} dy The y coordinate in the destination
     * @param {Number} [dw=sw] The width to draw the image in the destination
     * @param {Number} [dh=sh] The height to draw the image in the destination
     */
    Bitmap.prototype.blt = function (source, sx, sy, sw, sh, dx, dy, dw, dh) {
        // dw = dw || sw;
        // dh = dh || sh;
        // if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
        // 	sx + sw <= source.width && sy + sh <= source.height) {
        // 	this._context.globalCompositeOperation = "source-over";
        // 	this._context.drawImage(source._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        // 	this._setDirty();
        // }
        dw = dw || sw;
        dh = dh || sh;
        if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 && sx + sw <= source.width && sy + sh <= source.height) {
            var renderer = this._surface.renderer();
            renderer.begin();
            renderer.save();
            renderer.setTransform([dw / sw, 0, 0, dh / sh, dx, dy]);
            renderer.drawImage(source._surface, sx, sy, sw, sh, 0, 0);
            renderer.restore();
            renderer.end();
            this._setDirty();
        }
    };
    /**
     * Performs a block transfer, using assumption that original image was not modified (no hue)
     *
     * @method blt
     * @param {Bitmap} source The bitmap to draw
     * @param {Number} sx The x coordinate in the source
     * @param {Number} sy The y coordinate in the source
     * @param {Number} sw The width of the source image
     * @param {Number} sh The height of the source image
     * @param {Number} dx The x coordinate in the destination
     * @param {Number} dy The y coordinate in the destination
     * @param {Number} [dw=sw] The width to draw the image in the destination
     * @param {Number} [dh=sh] The height to draw the image in the destination
     */
    Bitmap.prototype.bltImage = function (source, sx, sy, sw, sh, dx, dy, dw, dh) {
        // こちらは blt() と比較して source._image を用いているところが異なる
        // たぶん
        // source._image が原画像
        // source.canvas が加工された画像
        // dw = dw || sw;
        // dh = dh || sh;
        // if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
        // 	sx + sw <= source.width && sy + sh <= source.height) {
        // 	this._context.globalCompositeOperation = "source-over";
        // 	this._context.drawImage(source._image, sx, sy, sw, sh, dx, dy, dw, dh);
        // 	this._setDirty();
        // }
        dw = dw || sw;
        dh = dh || sh;
        if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 && sx + sw <= source.width && sy + sh <= source.height) {
            var renderer = this._surface.renderer();
            renderer.begin();
            renderer.save();
            renderer.setTransform([dw / sw, 0, 0, dh / sh, dx, dy]);
            renderer.drawImage(source._image.asSurface(), sx, sy, sw, sh, 0, 0);
            renderer.restore();
            renderer.end();
            this._setDirty();
        }
    };
    /**
     * Returns pixel color at the specified point.
     *
     * @method getPixel
     * @param {Number} x The x coordinate of the pixel in the bitmap
     * @param {Number} y The y coordinate of the pixel in the bitmap
     * @return {String} The pixel color (hex format)
     */
    Bitmap.prototype.getPixel = function (x, y) {
        // var data = this._context.getImageData(x, y, 1, 1).data;
        // var result = "#";
        // for (var i = 0; i < 3; i++) {
        // 	result += data[i].toString(16).padZero(2);
        // }
        // return result;
        var _a, _b;
        if (this.__surface === this._image.asSurface()) {
            this._createCanvas();
        }
        var renderer = this._surface.renderer();
        renderer.begin();
        // 色情報が取得できない環境では決め打ちで白のデータを返すように
        var data = (_b = (_a = renderer._getImageData(x, y, 1, 1)) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : [255, 255, 255];
        renderer.end();
        var result = "#";
        for (var i = 0; i < 3; i++) {
            result += Utils_1.Utils.padZero(data[i].toString(16), 2);
        }
        return result;
    };
    /**
     * Returns alpha pixel value at the specified point.
     *
     * @method getAlphaPixel
     * @param {Number} _x The x coordinate of the pixel in the bitmap
     * @param {Number} _y The y coordinate of the pixel in the bitmap
     * @return {String} The alpha value
     */
    Bitmap.prototype.getAlphaPixel = function (_x, _y) {
        // var data = this._context.getImageData(x, y, 1, 1).data;
        // return data[3];
        // TODO: 必要そうならちゃんと
        return 128;
    };
    /**
     * Clears the specified rectangle.
     *
     * @method clearRect
     * @param {Number} x The x coordinate for the upper-left corner
     * @param {Number} y The y coordinate for the upper-left corner
     * @param {Number} width The width of the rectangle to clear
     * @param {Number} height The height of the rectangle to clear
     */
    Bitmap.prototype.clearRect = function (x, y, width, height) {
        // this._context.clearRect(x, y, width, height);
        // this._setDirty();
        var renderer = this._surface.renderer();
        renderer.begin();
        renderer.save();
        // clearRect を正しく実装しないと、バトル中のステータスウィンドウの文字が
        // 徐々に濃くなる。これは、文字を重ね書きしているため。
        // clear できれば解消できる。
        // これで CanvasRenderingContext2D.clearRect() 相当のつもり
        // ! なぜかフィールドが白くなる
        // renderer.setOpacity(1.0);
        // renderer.setCompositeOperation(g.CompositeOperation.Copy);
        // renderer.fillRect(x, y, width, height, Utils.rgbaToCssColor(0, 0, 0, 0));
        // ↑これがよくわからないので分解したもの。
        // が、わかったことは　fillRectを呼び出すとフィールドが白くなることだけ
        // renderer.setOpacity(1.0);
        // renderer.setCompositeOperation(g.CompositeOperation.Copy);
        // const fillStyle = Utils.rgbaToCssColor(0, 0, 0, 0);
        // const that = renderer as any;
        // const _fillStyle = that.context.fillStyle;
        // that.context.fillStyle = fillStyle;
        // that.context.fillRect(x, y, width, height);
        // that.context.fillStyle = _fillStyle;
        // 仕方がないので CanvasRenderingContext2D を直接操作する
        // 解決した。
        // TODO: akashic で clearRect を公開してもらう
        var that = renderer;
        if (that.context) {
            that.context.clearRect(x, y, width, height);
        }
        // debug: 色を付けてみる
        // renderer.setOpacity(1.0);
        // renderer.setCompositeOperation(g.CompositeOperation.SourceOver);
        // renderer.fillRect(x, y, width, height, Utils.rgbaToCssColor(255, 128, 0, 192));
        renderer.restore();
        renderer.end();
    };
    /**
     * Clears the entire bitmap.
     *
     * @method clear
     */
    Bitmap.prototype.clear = function () {
        this.clearRect(0, 0, this.width, this.height);
    };
    /**
     * Fills the specified rectangle.
     *
     * @method fillRect
     * @param {Number} x The x coordinate for the upper-left corner
     * @param {Number} y The y coordinate for the upper-left corner
     * @param {Number} width The width of the rectangle to fill
     * @param {Number} height The height of the rectangle to fill
     * @param {String} color The color of the rectangle in CSS format
     */
    Bitmap.prototype.fillRect = function (x, y, width, height, color) {
        // var context = this._context;
        // context.save();
        // context.fillStyle = color;
        // context.fillRect(x, y, width, height);
        // context.restore();
        // this._setDirty();
        var renderer = this._surface.renderer();
        renderer.begin();
        renderer.save();
        renderer.opacity(this.paintOpacity / exports.MAX_PAINT_OPACITY);
        renderer.fillRect(x, y, width, height, color);
        renderer.restore();
        renderer.end();
    };
    /**
     * Fills the entire bitmap.
     *
     * @method fillAll
     * @param {String} color The color of the rectangle in CSS format
     */
    Bitmap.prototype.fillAll = function (color) {
        this.fillRect(0, 0, this.width, this.height, color);
    };
    /**
     * Draws the rectangle with a gradation.
     *
     * @method gradientFillRect
     * @param {Number} x The x coordinate for the upper-left corner
     * @param {Number} y The y coordinate for the upper-left corner
     * @param {Number} width The width of the rectangle to fill
     * @param {Number} height The height of the rectangle to fill
     * @param {String} color1 The gradient starting color
     * @param {String} color2 The gradient ending color
     * @param {Boolean} vertical Wether the gradient should be draw as vertical or not
     */
    Bitmap.prototype.gradientFillRect = function (x, y, width, height, color1, color2, vertical) {
        // var context = this._context;
        // var grad;
        // if (vertical) {
        // 	grad = context.createLinearGradient(x, y, x, y + height);
        // } else {
        // 	grad = context.createLinearGradient(x, y, x + width, y);
        // }
        // grad.addColorStop(0, color1);
        // grad.addColorStop(1, color2);
        // context.save();
        // context.fillStyle = grad;
        // context.fillRect(x, y, width, height);
        // context.restore();
        // this._setDirty();
        var renderer = this._surface.renderer();
        renderer.begin();
        renderer.save();
        // おかしなデータが来ない前提
        var rgba1 = Utils_1.Utils.cssToRGBColor(color1);
        var rgba2 = Utils_1.Utils.cssToRGBColor(color2);
        if (vertical) {
            for (var i = 0; i < height; i++) {
                var t = i / (height - 1);
                var r = rgba1[0] * (1 - t) + rgba2[0] * t;
                var g_1 = rgba1[1] * (1 - t) + rgba2[1] * t;
                var b = rgba1[2] * (1 - t) + rgba2[2] * t;
                var a = rgba1[3] * (1 - t) + rgba2[3] * t;
                renderer.fillRect(x, y + i, width, 1, Utils_1.Utils.rgbaToCssColor(r, g_1, b, a));
            }
        }
        else {
            for (var i = 0; i < width; i++) {
                var t = i / (width - 1);
                var r = rgba1[0] * (1 - t) + rgba2[0] * t;
                var g_2 = rgba1[1] * (1 - t) + rgba2[1] * t;
                var b = rgba1[2] * (1 - t) + rgba2[2] * t;
                var a = rgba1[3] * (1 - t) + rgba2[3] * t;
                renderer.fillRect(x + i, y, 1, height, Utils_1.Utils.rgbaToCssColor(r, g_2, b, a));
            }
        }
        renderer.restore();
        renderer.end();
    };
    /**
     * Draw a bitmap in the shape of a circle
     *
     * @method drawCircle
     * @param {Number} x The x coordinate based on the circle center
     * @param {Number} y The y coordinate based on the circle center
     * @param {Number} radius The radius of the circle
     * @param {String} color The color of the circle in CSS format
     */
    Bitmap.prototype.drawCircle = function (x, y, radius, color) {
        // var context = this._context;
        // context.save();
        // context.fillStyle = color;
        // context.beginPath();
        // context.arc(x, y, radius, 0, Math.PI * 2, false);
        // context.fill();
        // context.restore();
        // this._setDirty();
        // NOTE: circleを描く手段がないので代替する
        this.fillRect(x, y, radius, radius, color);
    };
    /**
     * Draws the outline text to the bitmap.
     *
     * @method drawText
     * @param {String} text The text that will be drawn
     * @param {Number} x The x coordinate for the left of the text
     * @param {Number} y The y coordinate for the top of the text
     * @param {Number} maxWidth The maximum allowed width of the text
     * @param {Number} lineHeight The height of the text line
     * @param {String} align The alignment of the text
     */
    Bitmap.prototype.drawText = function (_text, x, y, maxWidth, lineHeight, align) {
        // Note: Firefox has a bug with textBaseline: Bug 737852
        //       So we use "alphabetic" here.
        // if (text !== undefined) {
        // 	var tx = x;
        // 	var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
        // 	var context = this._context;
        // 	var alpha = context.globalAlpha;
        // 	maxWidth = maxWidth || 0xffffffff;
        // 	if (align === "center") {
        // 		tx += maxWidth / 2;
        // 	}
        // 	if (align === "right") {
        // 		tx += maxWidth;
        // 	}
        // 	context.save();
        // 	context.font = this._makeFontNameText();
        // 	context.textAlign = align;
        // 	context.textBaseline = "alphabetic";
        // 	context.globalAlpha = 1;
        // 	this._drawTextOutline(text, tx, ty, maxWidth);
        // 	context.globalAlpha = alpha;
        // 	this._drawTextBody(text, tx, ty, maxWidth);
        // 	context.restore();
        // 	this._setDirty();
        // }
        if (_text !== undefined) {
            var text = _text + "";
            var tx = x;
            var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
            maxWidth = maxWidth || 0xffffffff;
            if (align === "center") {
                tx += maxWidth / 2;
            }
            if (align === "right") {
                tx += maxWidth;
            }
            var renderer = this._surface.renderer();
            renderer.begin();
            renderer.save();
            // context.textAlign = align
            this._textAlign = align !== null && align !== void 0 ? align : null;
            this._drawTextBody(text, tx, ty, maxWidth);
            this._textAlign = null; // _textAlignはテキスト描画時にしか利用しないので、テキスト描画終了時に初期値に戻しておく
            renderer.restore();
            renderer.end();
            this._setDirty();
        }
    };
    /**
     * Returns the width of the specified text.
     *
     * @method measureTextWidth
     * @param {String} text The text to be measured
     * @return {Number} The width of the text in pixels
     */
    Bitmap.prototype.measureTextWidth = function (text) {
        // var context = this._context;
        // context.save();
        // context.font = this._makeFontNameText();
        // var width = context.measureText(text).width;
        // context.restore();
        // return width;
        var font = getFont(this.fontSize);
        var width = 0;
        var glyphScale = this.fontSize / font.size;
        for (var i = 0; i < text.length; i++) {
            var code = g.Util.charCodeAt(text, i);
            var glyph = font.glyphForCharacter(code);
            var glyphWidth = glyph.advanceWidth * glyphScale;
            if (!glyph.isSurfaceValid) {
                continue;
            }
            width += glyphWidth;
        }
        return width;
    };
    /**
     * Changes the color tone of the entire bitmap.
     *
     * @method adjustTone
     * @param {Number} r The red strength in the range (-255, 255)
     * @param {Number} g The green strength in the range (-255, 255)
     * @param {Number} b The blue strength in the range (-255, 255)
     */
    Bitmap.prototype.adjustTone = function (r, g, b) {
        var _a;
        if ((r || g || b) && this.width > 0 && this.height > 0) {
            if (this.__surface === ((_a = this._image) === null || _a === void 0 ? void 0 : _a.asSurface()))
                this._createCanvas();
            var renderer = this._surface.renderer();
            var imageData = renderer._getImageData(0, 0, this.width, this.height);
            var pixels = imageData.data;
            for (var i = 0; i < pixels.length; i += 4) {
                pixels[i + 0] += r;
                pixels[i + 1] += g;
                pixels[i + 2] += b;
            }
            renderer._putImageData(imageData, 0, 0);
            this._setDirty();
        }
    };
    /**
     * Rotates the hue of the entire bitmap.
     *
     * @method rotateHue
     * @param {Number} offset The hue offset in 360 degrees
     */
    Bitmap.prototype.rotateHue = function (offset) {
        var _a;
        function rgbToHsl(r, g, b) {
            var cmin = Math.min(r, g, b);
            var cmax = Math.max(r, g, b);
            var h = 0;
            var s = 0;
            var l = (cmin + cmax) / 2;
            var delta = cmax - cmin;
            if (delta > 0) {
                if (r === cmax) {
                    h = 60 * (((g - b) / delta + 6) % 6);
                }
                else if (g === cmax) {
                    h = 60 * ((b - r) / delta + 2);
                }
                else {
                    h = 60 * ((r - g) / delta + 4);
                }
                s = delta / (255 - Math.abs(2 * l - 255));
            }
            return [h, s, l];
        }
        function hslToRgb(h, s, l) {
            var c = (255 - Math.abs(2 * l - 255)) * s;
            var x = c * (1 - Math.abs(((h / 60) % 2) - 1));
            var m = l - c / 2;
            var cm = c + m;
            var xm = x + m;
            if (h < 60) {
                return [cm, xm, m];
            }
            else if (h < 120) {
                return [xm, cm, m];
            }
            else if (h < 180) {
                return [m, cm, xm];
            }
            else if (h < 240) {
                return [m, xm, cm];
            }
            else if (h < 300) {
                return [xm, m, cm];
            }
            else {
                return [cm, m, xm];
            }
        }
        if (offset && this.width > 0 && this.height > 0) {
            offset = ((offset % 360) + 360) % 360;
            if (this.__surface === ((_a = this._image) === null || _a === void 0 ? void 0 : _a.asSurface()))
                this._createCanvas();
            var surface = this._surface;
            var renderer = surface.renderer();
            var imageData = renderer._getImageData(0, 0, this.width, this.height);
            var pixels = imageData.data;
            for (var i = 0; i < pixels.length; i += 4) {
                var hsl = rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);
                var h = (hsl[0] + offset) % 360;
                var s = hsl[1];
                var l = hsl[2];
                var rgb = hslToRgb(h, s, l);
                pixels[i + 0] = rgb[0];
                pixels[i + 1] = rgb[1];
                pixels[i + 2] = rgb[2];
            }
            renderer._putImageData(imageData, 0, 0);
            this._setDirty();
        }
    };
    /**
     * Applies a blur effect to the bitmap.
     *
     * @method blur
     */
    Bitmap.prototype.blur = function () {
        // for (var i = 0; i < 2; i++) {
        // 	var w = this.width;
        // 	var h = this.height;
        // 	var canvas = this._canvas;
        // 	var context = this._context;
        // 	var tempCanvas = document.createElement("canvas");
        // 	var tempContext = tempCanvas.getContext("2d");
        // 	tempCanvas.width = w + 2;
        // 	tempCanvas.height = h + 2;
        // 	tempContext.drawImage(canvas, 0, 0, w, h, 1, 1, w, h);
        // 	tempContext.drawImage(canvas, 0, 0, w, 1, 1, 0, w, 1);
        // 	tempContext.drawImage(canvas, 0, 0, 1, h, 0, 1, 1, h);
        // 	tempContext.drawImage(canvas, 0, h - 1, w, 1, 1, h + 1, w, 1);
        // 	tempContext.drawImage(canvas, w - 1, 0, 1, h, w + 1, 1, 1, h);
        // 	context.save();
        // 	context.fillStyle = "black";
        // 	context.fillRect(0, 0, w, h);
        // 	context.globalCompositeOperation = "lighter";
        // 	context.globalAlpha = 1 / 9;
        // 	for (var y = 0; y < 3; y++) {
        // 		for (var x = 0; x < 3; x++) {
        // 			context.drawImage(tempCanvas, x, y, w, h, 0, 0, w, h);
        // 		}
        // 	}
        // 	context.restore();
        // }
        // this._setDirty();
        var _a;
        var w = this.width;
        var h = this.height;
        var tempSurface = g.game.resourceFactory.createSurface(w, h);
        var tempRenderer = tempSurface.renderer();
        // 元コードと異なり上下左右 1px ずつ拡張していない。
        // 四辺 1px の明るさが 2/3 になっているが、体感目につかないので無視している。
        tempRenderer.begin();
        tempRenderer.drawImage(this._surface, 0, 0, w, h, 0, 0);
        tempRenderer.end();
        if (this.__surface === ((_a = this._image) === null || _a === void 0 ? void 0 : _a.asSurface()))
            this._createCanvas();
        var renderer = this._surface.renderer();
        renderer.save();
        renderer.fillRect(0, 0, w, h, "black");
        renderer.setCompositeOperation("lighter");
        renderer.setOpacity(1 / 9);
        for (var y = -1; y < 2; y++) {
            for (var x = -1; x < 2; x++) {
                renderer.drawImage(tempSurface, 0, 0, w, h, x, y);
            }
        }
        renderer.restore();
        this._setDirty();
    };
    /**
     * Add a callback function that will be called when the bitmap is loaded.
     *
     * @method addLoadListener
     * @param {Function} listner The callback function
     */
    Bitmap.prototype.addLoadListener = function (listner) {
        if (!this.isReady()) {
            this._loadListeners.push(listner);
        }
        else {
            listner(this);
        }
    };
    Bitmap.prototype.decode = function () {
        switch (this._loadingState) {
            case "requestCompleted":
            case "decryptCompleted":
                this._loadingState = "loaded";
                if (!this._surface)
                    this._createBaseTexture(this._image);
                this._setDirty();
                this._callLoadListeners();
                break;
            case "requesting":
            case "decrypting":
                this._decodeAfterRequest = true;
                // if (!this._loader) {
                // 	this._loader = ResourceHandler.createLoader(this._url, this._requestImage.bind(this, this._url), this._onError.bind(this));
                // 	this._image.removeEventListener("error", this._errorListener);
                // 	this._image.addEventListener("error", this._errorListener = this._loader);
                // }
                break;
            case "pending":
            case "purged":
            case "error":
                this._decodeAfterRequest = true;
                this._requestImage(this._url);
                break;
        }
    };
    Bitmap.prototype.checkDirty = function () {
        // if (this._dirty) {
        // 	this._baseTexture.update();
        // 	this._dirty = false;
        // }
    };
    Bitmap.prototype.isRequestReady = function () {
        return this._loadingState !== "pending" && this._loadingState !== "requesting" && this._loadingState !== "decrypting";
    };
    Bitmap.prototype.startRequest = function () {
        if (this._loadingState === "pending") {
            this._decodeAfterRequest = false;
            this._requestImage(this._url);
        }
    };
    Bitmap.prototype.isRequestOnly = function () {
        return !(this._decodeAfterRequest || this.isReady());
    };
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Bitmap.prototype._akashic_destroy = function () {
        var _a;
        (_a = this.__surface) === null || _a === void 0 ? void 0 : _a.destroy();
        this.__surface = null;
        // NOTE 解放できない。Bitmap のライフタイムは ImageCache と ImageCache#_mustBeHeld() が握っているが、
        // これによる破棄は単に参照をクリアするだけで、解放は GC 任せになっている。(このメソッドが独自拡張であることからも読み取れるとおり)
        // 逆に言えば他の箇所から参照されていても問題ない。他方 Akashic Engine のアセットは明示的に解放するので、
        // 他の箇所からの参照が残っているとクラッシュする。FinalizationRegistry が (互換性の問題なく) 利用可能になるか、
        // 自力で全部の参照を数えない限り ImageAsset は解放できない。
        //
        // if (this._image) {
        // 	g.game._assetManager.unrefAsset(this._image);
        // 	this._image = null;
        // }
    };
    Bitmap.prototype._makeFontNameText = function () {
        return (this.fontItalic ? "Italic " : "") + this.fontSize + "px " + this.fontFace;
    };
    Bitmap.prototype._drawTextOutline = function (_text, _tx, _ty, _maxWidth) {
        // var context = this._context;
        // context.strokeStyle = this.outlineColor;
        // context.lineWidth = this.outlineWidth;
        // context.lineJoin = "round";
        // context.strokeText(text, tx, ty, maxWidth);
    };
    Bitmap.prototype._drawTextBody = function (text, tx, ty, maxWidth) {
        // var context = this._context;
        // context.fillStyle = this.textColor;
        // context.fillText(text, tx, ty, maxWidth);
        var width = this.measureTextWidth(text);
        var fontWidth = this.fontSize;
        // 文字が画面からはみ出している場合は文字とフォントの幅調整
        if (width > maxWidth) {
            fontWidth *= maxWidth / width;
            width = maxWidth;
        }
        var offset = this._textAlign === "right" ? -width : this._textAlign === "center" ? -width / 2 : 0;
        var textX = tx + offset;
        var font = getFont(this.fontSize, this.textColor);
        var renderer = this._surface.renderer();
        var glyphScaleX = fontWidth / font.size;
        var glyphScaleY = this.fontSize / font.size;
        for (var i = 0; i < text.length; i++) {
            var code = g.Util.charCodeAt(text, i);
            var glyph = font.glyphForCharacter(code);
            var glyphWidth = glyph.advanceWidth * glyphScaleX;
            if (!glyph.isSurfaceValid) {
                continue;
            }
            if (glyph.surface) {
                // 非空白文字
                renderer.save();
                renderer.opacity(this.paintOpacity / exports.MAX_PAINT_OPACITY);
                renderer.transform([
                    glyphScaleX,
                    0,
                    0,
                    glyphScaleY,
                    textX,
                    ty - this.fontSize // tyがベースライン基準なのでここで位置合わせ
                ]);
                renderer.drawImage(glyph.surface, glyph.x, glyph.y, glyph.width, glyph.height, glyph.offsetX, glyph.offsetY);
                renderer.restore();
            }
            renderer.translate(glyphWidth, 0);
        }
    };
    Bitmap.prototype._onLoad = function () {
        // this._image.removeEventListener("load", this._loadListener);
        // this._image.removeEventListener("error", this._errorListener);
        this._renewCanvas();
        switch (this._loadingState) {
            case "requesting":
                this._loadingState = "requestCompleted";
                if (this._decodeAfterRequest) {
                    this.decode();
                }
                else {
                    this._loadingState = "purged";
                    this._clearImgInstance();
                }
                break;
            case "decrypting": // 現時点で非サポート。ここにくるパスを想定しない。
                // window.URL.revokeObjectURL(this._image.src);
                this._loadingState = "decryptCompleted";
                if (this._decodeAfterRequest) {
                    this.decode();
                }
                else {
                    this._loadingState = "purged";
                    this._clearImgInstance();
                }
                break;
        }
    };
    Bitmap.prototype._requestImage = function (url) {
        // if (Bitmap._reuseImages.length !== 0) {
        // 	this._image = Bitmap._reuseImages.pop();
        // } else {
        // 	this._image = new Image();
        // }
        var _this = this;
        // if (this._decodeAfterRequest && !this._loader) {
        // 	this._loader = ResourceHandler.createLoader(url, this._requestImage.bind(this, url), this._onError.bind(this));
        // }
        // this._image = new Image();
        // this._url = url;
        // this._loadingState = "requesting";
        // if (!Decrypter.checkImgIgnore(url) && Decrypter.hasEncryptedImages) {
        // 	this._loadingState = "decrypting";
        // 	Decrypter.decryptImg(url, this);
        // } else {
        // 	this._image.src = url;
        // 	this._image.addEventListener("load", this._loadListener = Bitmap.prototype._onLoad.bind(this));
        // 	this._image.addEventListener("error", this._errorListener = this._loader || Bitmap.prototype._onError.bind(this));
        // }
        this._url = url;
        this._loadingState = "requesting";
        var aid = g.game._assetManager.resolvePatternsToAssetIds(["/assets/".concat(url)])[0];
        g.game._assetManager.requestAssets([aid], {
            _onAssetError: function (asset, error, retryCallback) {
                if (error.retriable) {
                    retryCallback(asset);
                    return;
                }
                _this._onError();
            },
            _onAssetLoad: function (asset) {
                _this._image = asset;
                _this.__surface = _this._image.asSurface();
                _this._onLoad();
            }
        });
    };
    Bitmap.prototype._createCanvas = function (width, height) {
        // this.__canvas = this.__canvas || document.createElement('canvas');
        // this.__context = this.__canvas.getContext('2d');
        var _a;
        // this.__canvas.width = Math.max(width || 0, 1);
        // this.__canvas.height = Math.max(height || 0, 1);
        // if (this._image) {
        // 	var w = Math.max(this._image.width || 0, 1);
        // 	var h = Math.max(this._image.height || 0, 1);
        // 	this.__canvas.width = w;
        // 	this.__canvas.height = h;
        // 	this._createBaseTexture(this._canvas);
        // 	this.__context.drawImage(this._image, 0, 0);
        // }
        // this._setDirty();
        (_a = this.__surface) === null || _a === void 0 ? void 0 : _a.destroy();
        if (this._image) {
            var w = Math.max(this._image.width || 0, 1);
            var h = Math.max(this._image.height || 0, 1);
            this.__surface = g.game.resourceFactory.createSurface(w, h);
            var r = this._surface.renderer();
            r.begin();
            r.drawImage(this._image.asSurface(), 0, 0, this._image.width, this._image.height, 0, 0);
            r.end();
            this._createBaseTexture(this._surface);
        }
        else {
            // NOTE canvas と異なり g.Surface はリサイズできない。すなわち元コードのように
            // g.Surface 先に生成して後から width/height を弄るわけにいかない。
            // ここでは if/else の両側で、サイズが確定してから createSurface() する。
            var w = Math.max(width || 0, 1);
            var h = Math.max(height || 0, 1);
            this.__surface = g.game.resourceFactory.createSurface(w, h);
        }
    };
    Bitmap.prototype._createBaseTexture = function (source) {
        // this.__baseTexture = new PIXI.BaseTexture(source);
        // this.__baseTexture.mipmap = false;
        // this.__baseTexture.width = source.width;
        // this.__baseTexture.height = source.height;
        // if (this._smooth) {
        // 	this._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        // } else {
        // 	this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        // }
        this._baseTexture = { width: source.width, height: source.height };
    };
    Bitmap.prototype._clearImgInstance = function () {
        // this._image.src = "";
        // this._image.onload = null;
        // this._image.onerror = null;
        // this._errorListener = null;
        // this._loadListener = null;
        // Bitmap._reuseImages.push(this._image);
        // this._image = null;
    };
    Object.defineProperty(Bitmap.prototype, "_surface", {
        //
        // We don't want to waste memory, so creating canvas is deferred.
        //
        // Object.defineProperties(Bitmap.prototype, {
        // 	_canvas: {
        // 		get: function(){
        // 			if (!this.__canvas) this._createCanvas();
        // 			return this.__canvas;
        // 		}
        // 	},
        // 	_context: {
        // 		get: function() {
        // 			if (!this.__context) this._createCanvas();
        // 			return this.__context;
        // 		}
        // 	},
        get: function () {
            if (!this.__surface)
                this._createCanvas();
            return this.__surface;
        },
        enumerable: false,
        configurable: true
    });
    // 	_baseTexture: {
    // 		get: function() {
    // 			if (!this.__baseTexture) this._createBaseTexture(this._image || this.__canvas);
    // 			return this.__baseTexture;
    // 		}
    // 	}
    // });
    Bitmap.prototype._renewCanvas = function () {
        var newImage = this._image;
        // if (newImage && this.__canvas && (this.__canvas.width < newImage.width || this.__canvas.height < newImage.height)) {
        // 	this._createCanvas();
        // }
        if (newImage && this.__surface && (this.__surface.width < this._image.width || this.__surface.height < this._image.height)) {
            this._createCanvas();
        }
    };
    Bitmap.prototype._callLoadListeners = function () {
        while (this._loadListeners.length > 0) {
            var listener = this._loadListeners.shift();
            listener(this);
        }
    };
    Bitmap.prototype._onError = function () {
        // this._image.removeEventListener("load", this._loadListener);
        // this._image.removeEventListener("error", this._errorListener);
        this._loadingState = "error";
        console.log("Bitmap#_onError()");
    };
    Bitmap.prototype._setDirty = function () {
        // this._dirty = true;
    };
    return Bitmap;
}());
exports.Bitmap = Bitmap;

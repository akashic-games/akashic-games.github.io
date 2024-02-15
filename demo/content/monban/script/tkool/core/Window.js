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
exports.Window = void 0;
var PIXI = require("../PIXI");
var Bitmap_1 = require("./Bitmap");
var Rectangle_1 = require("./Rectangle");
var Sprite_1 = require("./Sprite");
var Utils_1 = require("./Utils");
var Window = /** @class */ (function (_super) {
    __extends(Window, _super);
    function Window() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
        // if (Object.getPrototypeOf(this) === Window.prototype) {
        // 	this.initialize();
        // }
    }
    Window.prototype.initialize = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        this._isWindow = true;
        this._windowskin = null;
        this._width = 0;
        this._height = 0;
        this._cursorRect = new Rectangle_1.Rectangle();
        this._openness = 255;
        this._animationCount = 0;
        this._padding = 18;
        this._margin = 4;
        this._colorTone = [0, 0, 0];
        this._windowSpriteContainer = null;
        this._windowBackSprite = null;
        this._windowCursorSprite = null;
        this._windowFrameSprite = null;
        this._windowContentsSprite = null;
        this._windowArrowSprites = [];
        this._windowPauseSignSprite = null;
        this._createAllParts();
        this.origin = { x: 0, y: 0 };
        this.active = true;
        this.downArrowVisible = false;
        this.upArrowVisible = false;
        this.pause = false;
        this._inited = true;
    };
    Object.defineProperty(Window.prototype, "windowskin", {
        get: function () {
            return this._windowskin;
        },
        set: function (value) {
            if (this._windowskin !== value) {
                this._windowskin = value;
                this._windowskin.addLoadListener(this._onWindowskinLoad.bind(this));
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "contents", {
        get: function () {
            return this._windowContentsSprite.bitmap;
        },
        set: function (value) {
            this._windowContentsSprite.bitmap = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
            this._refreshAllParts();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
            this._refreshAllParts();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "padding", {
        get: function () {
            return this._padding;
        },
        set: function (value) {
            this._padding = value;
            this._refreshAllParts();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "margin", {
        get: function () {
            return this._margin;
        },
        set: function (value) {
            this._margin = value;
            this._refreshAllParts();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "opacity", {
        get: function () {
            return this._windowSpriteContainer.alpha * 255;
        },
        set: function (value) {
            this._windowSpriteContainer.alpha = Utils_1.Utils.clamp(value, 0, 255) / 255;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "backOpacity", {
        get: function () {
            return this._windowBackSprite.alpha * 255;
        },
        set: function (value) {
            this._windowBackSprite.alpha = Utils_1.Utils.clamp(value, 0, 255) / 255;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "contentsOpacity", {
        get: function () {
            return this._windowContentsSprite.alpha * 255;
        },
        set: function (value) {
            this._windowContentsSprite.alpha = Utils_1.Utils.clamp(value, 0, 255) / 255;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "openness", {
        get: function () {
            return this._openness;
        },
        set: function (value) {
            if (this._openness !== value) {
                this._openness = Utils_1.Utils.clamp(value, 0, 255);
                this._windowSpriteContainer.scale.y = this._openness / 255;
                this._windowSpriteContainer.y = (this.height / 2) * (1 - this._openness / 255);
                this._windowSpriteContainer.modified();
            }
        },
        enumerable: false,
        configurable: true
    });
    Window.prototype.update = function () {
        if (this.active) {
            this._animationCount++;
        }
        this.children.forEach(function (child) {
            if (child.update) {
                child.update();
            }
        });
        // 手抜き
        this.modified();
    };
    Window.prototype.move = function (x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        if (this._width !== width || this._height !== height) {
            this._width = width || 0;
            this._height = height || 0;
            this._refreshAllParts();
        }
    };
    Window.prototype.isOpen = function () {
        return this._openness >= 255;
    };
    Window.prototype.isClosed = function () {
        return this._openness <= 0;
    };
    Window.prototype.setCursorRect = function (x, y, width, height) {
        var cx = Math.floor(x || 0);
        var cy = Math.floor(y || 0);
        var cw = Math.floor(width || 0);
        var ch = Math.floor(height || 0);
        var rect = this._cursorRect;
        if (rect.x !== cx || rect.y !== cy || rect.width !== cw || rect.height !== ch) {
            this._cursorRect.x = cx;
            this._cursorRect.y = cy;
            this._cursorRect.width = cw;
            this._cursorRect.height = ch;
            this._refreshCursor();
        }
    };
    Window.prototype.setTone = function (r, g, b) {
        var tone = this._colorTone;
        if (r !== tone[0] || g !== tone[1] || b !== tone[2]) {
            this._colorTone = [r, g, b];
            this._refreshBack();
        }
    };
    Window.prototype.addChildToBack = function (child) {
        var containerIndex = this.children.indexOf(this._windowSpriteContainer);
        return this.addChildAt(child, containerIndex + 1);
    };
    Window.prototype.updateTransform = function () {
        this._updateCursor();
        this._updateArrows();
        this._updatePauseSign();
        this._updateContents();
        _super.prototype.updateTransform.call(this);
    };
    /**
     * @method _createAllParts
     * @private
     */
    Window.prototype._createAllParts = function () {
        this._windowSpriteContainer = new PIXI.Container();
        this._windowBackSprite = new Sprite_1.Sprite();
        this._windowCursorSprite = new Sprite_1.Sprite();
        this._windowFrameSprite = new Sprite_1.Sprite();
        this._windowContentsSprite = new Sprite_1.Sprite();
        this._downArrowSprite = new Sprite_1.Sprite();
        this._upArrowSprite = new Sprite_1.Sprite();
        this._windowPauseSignSprite = new Sprite_1.Sprite();
        this._windowBackSprite.bitmap = new Bitmap_1.Bitmap(1, 1);
        this._windowBackSprite.alpha = 192 / 255;
        this.addChild(this._windowSpriteContainer);
        this._windowSpriteContainer.addChild(this._windowBackSprite);
        this._windowSpriteContainer.addChild(this._windowFrameSprite);
        this.addChild(this._windowCursorSprite);
        this.addChild(this._windowContentsSprite);
        this.addChild(this._downArrowSprite);
        this.addChild(this._upArrowSprite);
        this.addChild(this._windowPauseSignSprite);
    };
    /**
     * @method _onWindowskinLoad
     * @private
     */
    Window.prototype._onWindowskinLoad = function () {
        this._refreshAllParts();
    };
    /**
     * @method _refreshAllParts
     * @private
     */
    Window.prototype._refreshAllParts = function () {
        if (!this._inited) {
            return;
        }
        this._refreshBack();
        this._refreshFrame();
        this._refreshCursor();
        this._refreshContents();
        this._refreshArrows();
        this._refreshPauseSign();
    };
    /**
     * @method _refreshBack
     * @private
     */
    Window.prototype._refreshBack = function () {
        var m = this._margin;
        var w = this._width - m * 2;
        var h = this._height - m * 2;
        var bitmap = new Bitmap_1.Bitmap(w, h);
        this._windowBackSprite.bitmap = bitmap;
        this._windowBackSprite.setFrame(0, 0, w, h);
        this._windowBackSprite.move(m, m);
        if (w > 0 && h > 0 && this._windowskin) {
            var p = 96;
            bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
            for (var y = 0; y < h; y += p) {
                for (var x = 0; x < w; x += p) {
                    bitmap.blt(this._windowskin, 0, p, p, p, x, y, p, p);
                }
            }
            var tone = this._colorTone;
            bitmap.adjustTone(tone[0], tone[1], tone[2]);
        }
    };
    /**
     * @method _refreshFrame
     * @private
     */
    Window.prototype._refreshFrame = function () {
        var w = this._width;
        var h = this._height;
        var m = 24;
        var bitmap = new Bitmap_1.Bitmap(w, h);
        this._windowFrameSprite.bitmap = bitmap;
        this._windowFrameSprite.setFrame(0, 0, w, h);
        if (w > 0 && h > 0 && this._windowskin) {
            var skin = this._windowskin;
            var p = 96;
            var q = 96;
            bitmap.blt(skin, p + m, 0 + 0, p - m * 2, m, m, 0, w - m * 2, m);
            bitmap.blt(skin, p + m, 0 + q - m, p - m * 2, m, m, h - m, w - m * 2, m);
            bitmap.blt(skin, p + 0, 0 + m, m, p - m * 2, 0, m, m, h - m * 2);
            bitmap.blt(skin, p + q - m, 0 + m, m, p - m * 2, w - m, m, m, h - m * 2);
            bitmap.blt(skin, p + 0, 0 + 0, m, m, 0, 0, m, m);
            bitmap.blt(skin, p + q - m, 0 + 0, m, m, w - m, 0, m, m);
            bitmap.blt(skin, p + 0, 0 + q - m, m, m, 0, h - m, m, m);
            bitmap.blt(skin, p + q - m, 0 + q - m, m, m, w - m, h - m, m, m);
        }
    };
    /**
     * @method _refreshCursor
     * @private
     */
    Window.prototype._refreshCursor = function () {
        var pad = this._padding;
        var x = this._cursorRect.x + pad - this.origin.x;
        var y = this._cursorRect.y + pad - this.origin.y;
        var w = this._cursorRect.width;
        var h = this._cursorRect.height;
        var m = 4;
        var x2 = Math.max(x, pad);
        var y2 = Math.max(y, pad);
        var ox = x - x2;
        var oy = y - y2;
        var w2 = Math.min(w, this._width - pad - x2);
        var h2 = Math.min(h, this._height - pad - y2);
        var bitmap = new Bitmap_1.Bitmap(w2, h2);
        this._windowCursorSprite.bitmap = bitmap;
        this._windowCursorSprite.setFrame(0, 0, w2, h2);
        this._windowCursorSprite.move(x2, y2);
        if (w > 0 && h > 0 && this._windowskin) {
            var skin = this._windowskin;
            var p = 96;
            var q = 48;
            bitmap.blt(skin, p + m, p + m, q - m * 2, q - m * 2, ox + m, oy + m, w - m * 2, h - m * 2);
            bitmap.blt(skin, p + m, p + 0, q - m * 2, m, ox + m, oy + 0, w - m * 2, m);
            bitmap.blt(skin, p + m, p + q - m, q - m * 2, m, ox + m, oy + h - m, w - m * 2, m);
            bitmap.blt(skin, p + 0, p + m, m, q - m * 2, ox + 0, oy + m, m, h - m * 2);
            bitmap.blt(skin, p + q - m, p + m, m, q - m * 2, ox + w - m, oy + m, m, h - m * 2);
            bitmap.blt(skin, p + 0, p + 0, m, m, ox + 0, oy + 0, m, m);
            bitmap.blt(skin, p + q - m, p + 0, m, m, ox + w - m, oy + 0, m, m);
            bitmap.blt(skin, p + 0, p + q - m, m, m, ox + 0, oy + h - m, m, m);
            bitmap.blt(skin, p + q - m, p + q - m, m, m, ox + w - m, oy + h - m, m, m);
        }
    };
    /**
     * @method _refreshContents
     * @private
     */
    Window.prototype._refreshContents = function () {
        this._windowContentsSprite.move(this.padding, this.padding);
    };
    /**
     * @method _refreshArrows
     * @private
     */
    Window.prototype._refreshArrows = function () {
        var w = this._width;
        var h = this._height;
        var p = 24;
        var q = p / 2;
        var sx = 96 + p;
        var sy = 0 + p;
        this._downArrowSprite.bitmap = this._windowskin;
        this._downArrowSprite.anchor.x = 0.5;
        this._downArrowSprite.anchor.y = 0.5;
        this._downArrowSprite.setFrame(sx + q, sy + q + p, p, q);
        this._downArrowSprite.move(w / 2, h - q);
        this._upArrowSprite.bitmap = this._windowskin;
        this._upArrowSprite.anchor.x = 0.5;
        this._upArrowSprite.anchor.y = 0.5;
        this._upArrowSprite.setFrame(sx + q, sy, p, q);
        this._upArrowSprite.move(w / 2, q);
        this._updateArrows(); // TODO: 本来ここで_updateArrows()を呼ぶのは妥当ではないと思われるが、不要な矢印の表示を防ぐため暫定対応としてこの処理を行う
    };
    /**
     * @method _refreshPauseSign
     * @private
     */
    Window.prototype._refreshPauseSign = function () {
        var sx = 144;
        var sy = 96;
        var p = 24;
        this._windowPauseSignSprite.bitmap = this._windowskin;
        this._windowPauseSignSprite.anchor.x = 0.5;
        this._windowPauseSignSprite.anchor.y = 1;
        this._windowPauseSignSprite.move(this._width / 2, this._height);
        this._windowPauseSignSprite.setFrame(sx, sy, p, p);
        this._windowPauseSignSprite.alpha = 0;
    };
    /**
     * @method _updateCursor
     * @private
     */
    Window.prototype._updateCursor = function () {
        var blinkCount = this._animationCount % 40;
        var cursorOpacity = this.contentsOpacity;
        if (this.active) {
            if (blinkCount < 20) {
                cursorOpacity -= blinkCount * 8;
            }
            else {
                cursorOpacity -= (40 - blinkCount) * 8;
            }
        }
        this._windowCursorSprite.alpha = cursorOpacity / 255;
        this._windowCursorSprite.visible = this.isOpen();
    };
    /**
     * @method _updateContents
     * @private
     */
    Window.prototype._updateContents = function () {
        var w = this._width - this._padding * 2;
        var h = this._height - this._padding * 2;
        if (w > 0 && h > 0) {
            this._windowContentsSprite.setFrame(this.origin.x, this.origin.y, w, h);
            this._windowContentsSprite.visible = this.isOpen();
        }
        else {
            this._windowContentsSprite.visible = false;
        }
    };
    /**
     * @method _updateArrows
     * @private
     */
    Window.prototype._updateArrows = function () {
        this._downArrowSprite.visible = this.isOpen() && this.downArrowVisible;
        this._upArrowSprite.visible = this.isOpen() && this.upArrowVisible;
    };
    /**
     * @method _updatePauseSign
     * @private
     */
    Window.prototype._updatePauseSign = function () {
        var sprite = this._windowPauseSignSprite;
        var x = Math.floor(this._animationCount / 16) % 2;
        var y = Math.floor(this._animationCount / 16 / 2) % 2;
        var sx = 144;
        var sy = 96;
        var p = 24;
        if (!this.pause) {
            sprite.alpha = 0;
        }
        else if (sprite.alpha < 1) {
            sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
        }
        sprite.setFrame(sx + x * p, sy + y * p, p, p);
        sprite.visible = this.isOpen();
    };
    return Window;
}(PIXI.Container));
exports.Window = Window;

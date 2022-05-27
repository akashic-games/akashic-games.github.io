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
exports.MultiKeyboard = void 0;
var Keyboard_1 = require("./Keyboard");
var def = require("./define");
var SpriteReader_1 = require("./SpriteReader");
/**
 * ひらがな、英数字、記号対応キーボード。
 * ひらがなだけ扱いたい場合は `Keyboard` クラスを利用する。
 * 本クラスの利用にはアセットID, g.Fontが必要となる。
 */
var MultiKeyboard = /** @class */ (function (_super) {
    __extends(MultiKeyboard, _super);
    /**
     * 各種パラメータを指定して `MultiKeyboard` のインスタンスを生成する。
     * @param param このエンティティに対するパラメータ
     */
    function MultiKeyboard(param) {
        var _this = _super.call(this, param) || this;
        var alphaReader = new SpriteReader_1.SpriteReader(param.scene, "hint_key_alpha", "img_key_alpha");
        var symReader = new SpriteReader_1.SpriteReader(param.scene, "hint_key_sym", "img_key_sym");
        _this.alphaKey = new g.E({
            scene: _this.scene,
            width: g.game.width,
            height: g.game.height,
            hidden: true
        });
        _this.append(_this.alphaKey);
        _this.symKey = new g.E({
            scene: _this.scene,
            width: g.game.width,
            height: g.game.height,
            hidden: true
        });
        _this.append(_this.symKey);
        var _loop_1 = function (i) {
            var char = def.alpha[i];
            var key = alphaReader.createSprite("a_" + char, {
                x: def.alphaX[i],
                y: def.alphaY[i],
                touchable: true
            });
            key.onPointDown.add(function () {
                if (_this.inputtingLabel.text.length < _this.maxLength) {
                    _this.inputtingLabel.text += def.alpha[i];
                    _this.inputtingLabel.invalidate();
                }
            });
            this_1.alphaKey.append(key);
        };
        var this_1 = this;
        for (var i = 0; i < def.alpha.length; i++) {
            _loop_1(i);
        }
        var _loop_2 = function (i) {
            var char = def.digit[i];
            var key = symReader.createSprite("d_" + ((i + 1) % 10), {
                x: def.symX[i],
                y: def.symY[0],
                touchable: true
            });
            key.onPointDown.add(function () {
                if (_this.inputtingLabel.text.length < _this.maxLength) {
                    _this.inputtingLabel.text += char;
                    _this.inputtingLabel.invalidate();
                }
            });
            this_2.symKey.append(key);
        };
        var this_2 = this;
        for (var i = 0; i < def.digit.length; i++) {
            _loop_2(i);
        }
        var _loop_3 = function (i) {
            var char = def.symbol[i];
            var key = symReader.createSprite("sym_" + i, {
                x: def.symX[i],
                y: def.symY[Math.floor(i / 10) + 1],
                touchable: true
            });
            key.onPointDown.add(function () {
                if (_this.inputtingLabel.text.length < _this.maxLength) {
                    _this.inputtingLabel.text += char;
                    _this.inputtingLabel.invalidate();
                }
            });
            this_3.symKey.append(key);
        };
        var this_3 = this;
        for (var i = 0; i < def.symbol.length; i++) {
            _loop_3(i);
        }
        var convKanaAsset = _this.scene.asset.getImageById("toKanaLetters");
        _this.convKana = new g.Pane({
            scene: _this.scene,
            width: convKanaAsset.width,
            height: convKanaAsset.height,
            x: def.convX[0],
            y: def.convY,
            backgroundImage: convKanaAsset,
            touchable: true,
            hidden: true
        });
        _this.convKana.onPointDown.add(function () {
            _this.alphaKey.hide();
            _this.symKey.hide();
            _this.kanaKey.show();
            _this.convAlpha.x = def.convX[0];
            _this.convAlpha.modified();
            _this.convKana.hide();
            _this.convAlpha.show();
            _this.convSym.show();
        });
        _this.common.append(_this.convKana);
        var convAlphaAsset = _this.scene.asset.getImageById("toAlphaLetters");
        _this.convAlpha = new g.Pane({
            scene: _this.scene,
            width: convAlphaAsset.width,
            height: convAlphaAsset.height,
            x: def.convX[0],
            y: def.convY,
            backgroundImage: convAlphaAsset,
            touchable: true
        });
        _this.convAlpha.onPointDown.add(function () {
            _this.kanaKey.hide();
            _this.symKey.hide();
            _this.alphaKey.show();
            _this.convAlpha.hide();
            _this.convKana.show();
            _this.convSym.show();
        });
        _this.common.append(_this.convAlpha);
        var convSymAsset = _this.scene.asset.getImageById("toSymLetters");
        _this.convSym = new g.Pane({
            scene: _this.scene,
            width: convSymAsset.width,
            height: convSymAsset.height,
            x: def.convX[1],
            y: def.convY,
            backgroundImage: convSymAsset,
            touchable: true
        });
        _this.convSym.onPointDown.add(function () {
            _this.kanaKey.hide();
            _this.alphaKey.hide();
            _this.symKey.show();
            _this.convAlpha.x = def.convX[1];
            _this.convAlpha.modified();
            _this.convSym.hide();
            _this.convKana.show();
            _this.convAlpha.show();
        });
        _this.common.append(_this.convSym);
        return _this;
    }
    MultiKeyboard.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.alphaKey.destroy();
        this.alphaKey = null;
        this.symKey.destroy();
        this.symKey = null;
        this.convKana.destroy();
        this.convKana = null;
        this.convAlpha.destroy();
        this.convAlpha = null;
        this.convSym.destroy();
        this.convSym = null;
    };
    return MultiKeyboard;
}(Keyboard_1.Keyboard));
exports.MultiKeyboard = MultiKeyboard;

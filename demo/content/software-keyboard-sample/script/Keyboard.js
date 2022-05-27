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
exports.Keyboard = void 0;
var akashic_label_1 = require("@akashic-extension/akashic-label");
var def = require("./define");
var SpriteReader_1 = require("./SpriteReader");
/**
 * ひらがな限定キーボード。
 * 英数字、記号も扱いたい場合は `MultiKeyboard` クラスを利用する。
 * 本クラスの利用にはアセットID, g.Fontが必要となる。
 */
var Keyboard = /** @class */ (function (_super) {
    __extends(Keyboard, _super);
    /**
     * 各種パラメータを指定して `Keyboard` のインスタンスを生成する。
     * @param param このエンティティに対するパラメータ
     */
    function Keyboard(param) {
        var _this = _super.call(this, param) || this;
        var kanaReader = new SpriteReader_1.SpriteReader(param.scene, "hint_key_kana", "img_key_kana");
        _this.font = param.font;
        _this.fontSize = "fontSize" in param ? param.fontSize : 72;
        _this.textColor = "textColor" in param ? param.textColor : "#575757";
        _this.backgroundColor = "backgroundColor" in param ? param.backgroundColor : "#252525";
        _this.maxLength = "maxLength" in param ? param.maxLength : 15;
        _this.sceneAssets = param.sceneAssets;
        _this.common = new g.E({
            scene: _this.scene,
            width: g.game.width,
            height: g.game.height
        });
        _this.append(_this.common);
        _this.kanaKey = new g.E({
            scene: _this.scene,
            width: g.game.width,
            height: g.game.height
        });
        _this.append(_this.kanaKey);
        _this.keyboardBack = new g.FilledRect({
            scene: _this.scene,
            cssColor: _this.backgroundColor,
            width: g.game.width,
            height: g.game.height,
            opacity: 0.8
        });
        _this.common.append(_this.keyboardBack);
        var inputtingLabelBackAsset = _this.sceneAssets.getImageById("inputtingLabelBack");
        _this.inputtingLabelBack = new g.Pane({
            scene: _this.scene,
            width: inputtingLabelBackAsset.width,
            height: inputtingLabelBackAsset.height,
            x: 8,
            y: 80,
            backgroundImage: inputtingLabelBackAsset
        });
        _this.inputtingLabel = new akashic_label_1.Label({
            scene: _this.scene,
            font: _this.font,
            fontSize: _this.fontSize,
            text: "",
            textColor: _this.textColor,
            width: _this.inputtingLabelBack.width - 20 * 2,
            height: _this.fontSize,
            x: 20,
            y: _this.inputtingLabelBack.height / 2,
            anchorX: 0.0,
            anchorY: 0.5
        });
        _this.inputtingLabelBack.append(_this.inputtingLabel);
        _this.common.append(_this.inputtingLabelBack);
        var _loop_1 = function (i) {
            var char = def.hiragana[i];
            var key = kanaReader.createSprite(def.toRoman[char], {
                x: def.kanaX[i],
                y: def.kanaY[i],
                touchable: true
            });
            key.onPointDown.add(function () {
                if (_this.inputtingLabel.text.length < _this.maxLength) {
                    _this.inputtingLabel.text += char;
                    _this.inputtingLabel.invalidate();
                }
            });
            this_1.kanaKey.append(key);
        };
        var this_1 = this;
        for (var i = 0; i < def.hiragana.length; i++) {
            _loop_1(i);
        }
        var smallKey = kanaReader.createSprite("small", {
            x: def.smallX,
            y: def.smallY,
            touchable: true
        });
        smallKey.onPointDown.add(function () {
            /**
             * 入力文字列語尾が小文字にすることが可能であれば小文字へ変換する。
             * 入力文字列語尾が小文字であればもとの文字へ変換する。
             */
            if (_this.inputtingLabel.text.length <= 0)
                return;
            var moji = _this.inputtingLabel.text.slice(-1);
            var idx = def.canSmall.indexOf(moji);
            var ridx = def.smallChar.indexOf(moji);
            if (idx !== -1 || ridx !== -1) {
                _this.inputtingLabel.text = _this.inputtingLabel.text.slice(0, -1);
                _this.inputtingLabel.text += (idx !== -1) ? def.smallChar[idx] : def.canSmall[ridx];
                _this.inputtingLabel.invalidate();
            }
        });
        _this.kanaKey.append(smallKey);
        var voicedKey = kanaReader.createSprite("voiced", {
            x: def.voicedX,
            y: def.voicedY,
            touchable: true
        });
        voicedKey.onPointDown.add(function () {
            /**
             * 入力文字列語尾に濁点を付けることが可能であれば濁点を付ける。
             * 入力文字列語尾が濁点付きであればもとの文字へ変換する。
             */
            if (_this.inputtingLabel.text.length <= 0)
                return;
            var moji = _this.inputtingLabel.text.slice(-1);
            var idx = def.canVoiced.indexOf(moji);
            var ridx = def.voicedChar.indexOf(moji);
            var cidx = def.semiVoicedChar.indexOf(moji);
            if (idx !== -1 || ridx !== -1 || cidx !== -1) {
                _this.inputtingLabel.text = _this.inputtingLabel.text.slice(0, -1);
                _this.inputtingLabel.text += (idx !== -1) ? def.voicedChar[idx]
                    : (ridx !== -1) ? def.canVoiced[ridx] : def.bChar[cidx];
                _this.inputtingLabel.invalidate();
            }
        });
        _this.kanaKey.append(voicedKey);
        var semiVoicedKey = kanaReader.createSprite("semiVoiced", {
            x: def.semiVoicedX,
            y: def.semiVoicedY,
            touchable: true
        });
        semiVoicedKey.onPointDown.add(function () {
            /**
             * 入力文字列語尾に半濁点を付けることが可能であれば半濁点を付ける。
             * 入力文字列語尾が半濁点付きであればもとの文字へ変換する。
             */
            if (_this.inputtingLabel.text.length <= 0)
                return;
            var moji = _this.inputtingLabel.text.slice(-1);
            var idx = def.canSemiVoiced.indexOf(moji);
            var ridx = def.semiVoicedChar.indexOf(moji);
            var pidx = def.bChar.indexOf(moji);
            if (idx !== -1 || ridx !== -1 || pidx !== -1) {
                _this.inputtingLabel.text = _this.inputtingLabel.text.slice(0, -1);
                _this.inputtingLabel.text += (idx !== -1) ? def.semiVoicedChar[idx]
                    : (ridx !== -1) ? def.canSemiVoiced[ridx] : def.semiVoicedChar[pidx];
                _this.inputtingLabel.invalidate();
            }
        });
        _this.kanaKey.append(semiVoicedKey);
        var backSpaceKeyAsset = _this.sceneAssets.getImageById("backSpaceKey");
        _this.backSpaceKey = new g.Pane({
            scene: _this.scene,
            width: backSpaceKeyAsset.width,
            height: backSpaceKeyAsset.height,
            x: g.game.width - 28 - backSpaceKeyAsset.width,
            y: _this.inputtingLabelBack.y + (_this.inputtingLabelBack.height - backSpaceKeyAsset.height) / 2,
            backgroundImage: backSpaceKeyAsset,
            touchable: true
        });
        _this.backSpaceKey.onPointDown.add(function () {
            if (_this.inputtingLabel.text.length > 0) {
                _this.inputtingLabel.text = _this.inputtingLabel.text.slice(0, -1);
                _this.inputtingLabel.invalidate();
            }
        });
        _this.common.append(_this.backSpaceKey);
        return _this;
    }
    Keyboard.prototype.invalidate = function () {
        _super.prototype.modified.call(this);
        this.inputtingLabel.font = this.font;
        this.inputtingLabel.fontSize = this.fontSize;
        this.inputtingLabel.height = this.fontSize;
        this.inputtingLabel.textColor = this.textColor;
        this.inputtingLabel.text = this.inputtingLabel.text.slice(0, this.maxLength);
        this.inputtingLabel.invalidate();
        this.keyboardBack.cssColor = this.backgroundColor;
        this.keyboardBack.modified();
    };
    Keyboard.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.common.destroy();
        this.common = null;
        this.kanaKey.destroy();
        this.kanaKey = null;
        this.keyboardBack.destroy();
        this.keyboardBack = null;
        this.inputtingLabelBack.destroy();
        this.inputtingLabelBack = null;
        this.inputtingLabel.destroy();
        this.inputtingLabel = null;
        this.backSpaceKey.destroy();
        this.backSpaceKey = null;
    };
    Object.defineProperty(Keyboard.prototype, "text", {
        get: function () {
            return this.inputtingLabel.text;
        },
        set: function (text) {
            this.inputtingLabel.text = text.slice(0, Math.min(this.maxLength, text.length));
            this.inputtingLabel.invalidate();
        },
        enumerable: false,
        configurable: true
    });
    return Keyboard;
}(g.E));
exports.Keyboard = Keyboard;

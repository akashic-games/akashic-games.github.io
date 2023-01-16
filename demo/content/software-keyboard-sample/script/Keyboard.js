"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = void 0;
const akashic_label_1 = require("@akashic-extension/akashic-label");
const def = require("./define");
const SpriteReader_1 = require("./SpriteReader");
/**
 * ひらがな限定キーボード。
 * 英数字、記号も扱いたい場合は `MultiKeyboard` クラスを利用する。
 * 本クラスの利用にはアセットID, g.Fontが必要となる。
 */
class Keyboard extends g.E {
    /**
     * 各種パラメータを指定して `Keyboard` のインスタンスを生成する。
     * @param param このエンティティに対するパラメータ
     */
    constructor(param) {
        super(param);
        const kanaReader = new SpriteReader_1.SpriteReader(param.scene, "hint_key_kana", "img_key_kana");
        this.font = param.font;
        this.fontSize = "fontSize" in param ? param.fontSize : 72;
        this.textColor = "textColor" in param ? param.textColor : "#575757";
        this.backgroundColor = "backgroundColor" in param ? param.backgroundColor : "#252525";
        this.maxLength = "maxLength" in param ? param.maxLength : 15;
        this.sceneAssets = param.sceneAssets;
        this.common = new g.E({
            scene: this.scene,
            width: g.game.width,
            height: g.game.height
        });
        this.append(this.common);
        this.kanaKey = new g.E({
            scene: this.scene,
            width: g.game.width,
            height: g.game.height
        });
        this.append(this.kanaKey);
        this.keyboardBack = new g.FilledRect({
            scene: this.scene,
            cssColor: this.backgroundColor,
            width: g.game.width,
            height: g.game.height,
            opacity: 0.8
        });
        this.common.append(this.keyboardBack);
        const inputtingLabelBackAsset = this.sceneAssets.getImageById("inputtingLabelBack");
        this.inputtingLabelBack = new g.Pane({
            scene: this.scene,
            width: inputtingLabelBackAsset.width,
            height: inputtingLabelBackAsset.height,
            x: 8,
            y: 80,
            backgroundImage: inputtingLabelBackAsset
        });
        this.inputtingLabel = new akashic_label_1.Label({
            scene: this.scene,
            font: this.font,
            fontSize: this.fontSize,
            text: "",
            textColor: this.textColor,
            width: this.inputtingLabelBack.width - 20 * 2,
            height: this.fontSize,
            x: 20,
            y: this.inputtingLabelBack.height / 2,
            anchorX: 0.0,
            anchorY: 0.5
        });
        this.inputtingLabelBack.append(this.inputtingLabel);
        this.common.append(this.inputtingLabelBack);
        for (let i = 0; i < def.hiragana.length; i++) {
            const char = def.hiragana[i];
            const key = kanaReader.createSprite(def.toRoman[char], {
                x: def.kanaX[i],
                y: def.kanaY[i],
                touchable: true
            });
            key.onPointDown.add(() => {
                if (this.inputtingLabel.text.length < this.maxLength) {
                    this.inputtingLabel.text += char;
                    this.inputtingLabel.invalidate();
                }
            });
            this.kanaKey.append(key);
        }
        const smallKey = kanaReader.createSprite("small", {
            x: def.smallX,
            y: def.smallY,
            touchable: true
        });
        smallKey.onPointDown.add(() => {
            /**
             * 入力文字列語尾が小文字にすることが可能であれば小文字へ変換する。
             * 入力文字列語尾が小文字であればもとの文字へ変換する。
             */
            if (this.inputtingLabel.text.length <= 0)
                return;
            const moji = this.inputtingLabel.text.slice(-1);
            const idx = def.canSmall.indexOf(moji);
            const ridx = def.smallChar.indexOf(moji);
            if (idx !== -1 || ridx !== -1) {
                this.inputtingLabel.text = this.inputtingLabel.text.slice(0, -1);
                this.inputtingLabel.text += (idx !== -1) ? def.smallChar[idx] : def.canSmall[ridx];
                this.inputtingLabel.invalidate();
            }
        });
        this.kanaKey.append(smallKey);
        const voicedKey = kanaReader.createSprite("voiced", {
            x: def.voicedX,
            y: def.voicedY,
            touchable: true
        });
        voicedKey.onPointDown.add(() => {
            /**
             * 入力文字列語尾に濁点を付けることが可能であれば濁点を付ける。
             * 入力文字列語尾が濁点付きであればもとの文字へ変換する。
             */
            if (this.inputtingLabel.text.length <= 0)
                return;
            const moji = this.inputtingLabel.text.slice(-1);
            const idx = def.canVoiced.indexOf(moji);
            const ridx = def.voicedChar.indexOf(moji);
            const cidx = def.semiVoicedChar.indexOf(moji);
            if (idx !== -1 || ridx !== -1 || cidx !== -1) {
                this.inputtingLabel.text = this.inputtingLabel.text.slice(0, -1);
                this.inputtingLabel.text += (idx !== -1) ? def.voicedChar[idx]
                    : (ridx !== -1) ? def.canVoiced[ridx] : def.bChar[cidx];
                this.inputtingLabel.invalidate();
            }
        });
        this.kanaKey.append(voicedKey);
        const semiVoicedKey = kanaReader.createSprite("semiVoiced", {
            x: def.semiVoicedX,
            y: def.semiVoicedY,
            touchable: true
        });
        semiVoicedKey.onPointDown.add(() => {
            /**
             * 入力文字列語尾に半濁点を付けることが可能であれば半濁点を付ける。
             * 入力文字列語尾が半濁点付きであればもとの文字へ変換する。
             */
            if (this.inputtingLabel.text.length <= 0)
                return;
            const moji = this.inputtingLabel.text.slice(-1);
            const idx = def.canSemiVoiced.indexOf(moji);
            const ridx = def.semiVoicedChar.indexOf(moji);
            const pidx = def.bChar.indexOf(moji);
            if (idx !== -1 || ridx !== -1 || pidx !== -1) {
                this.inputtingLabel.text = this.inputtingLabel.text.slice(0, -1);
                this.inputtingLabel.text += (idx !== -1) ? def.semiVoicedChar[idx]
                    : (ridx !== -1) ? def.canSemiVoiced[ridx] : def.semiVoicedChar[pidx];
                this.inputtingLabel.invalidate();
            }
        });
        this.kanaKey.append(semiVoicedKey);
        const backSpaceKeyAsset = this.sceneAssets.getImageById("backSpaceKey");
        this.backSpaceKey = new g.Pane({
            scene: this.scene,
            width: backSpaceKeyAsset.width,
            height: backSpaceKeyAsset.height,
            x: g.game.width - 28 - backSpaceKeyAsset.width,
            y: this.inputtingLabelBack.y + (this.inputtingLabelBack.height - backSpaceKeyAsset.height) / 2,
            backgroundImage: backSpaceKeyAsset,
            touchable: true
        });
        this.backSpaceKey.onPointDown.add(() => {
            if (this.inputtingLabel.text.length > 0) {
                this.inputtingLabel.text = this.inputtingLabel.text.slice(0, -1);
                this.inputtingLabel.invalidate();
            }
        });
        this.common.append(this.backSpaceKey);
    }
    invalidate() {
        super.modified();
        this.inputtingLabel.font = this.font;
        this.inputtingLabel.fontSize = this.fontSize;
        this.inputtingLabel.height = this.fontSize;
        this.inputtingLabel.textColor = this.textColor;
        this.inputtingLabel.text = this.inputtingLabel.text.slice(0, this.maxLength);
        this.inputtingLabel.invalidate();
        this.keyboardBack.cssColor = this.backgroundColor;
        this.keyboardBack.modified();
    }
    destroy() {
        super.destroy();
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
    }
    get text() {
        return this.inputtingLabel.text;
    }
    set text(text) {
        this.inputtingLabel.text = text.slice(0, Math.min(this.maxLength, text.length));
        this.inputtingLabel.invalidate();
    }
}
exports.Keyboard = Keyboard;

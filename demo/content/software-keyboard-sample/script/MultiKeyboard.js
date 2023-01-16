"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiKeyboard = void 0;
const Keyboard_1 = require("./Keyboard");
const def = require("./define");
const SpriteReader_1 = require("./SpriteReader");
/**
 * ひらがな、英数字、記号対応キーボード。
 * ひらがなだけ扱いたい場合は `Keyboard` クラスを利用する。
 * 本クラスの利用にはアセットID, g.Fontが必要となる。
 */
class MultiKeyboard extends Keyboard_1.Keyboard {
    /**
     * 各種パラメータを指定して `MultiKeyboard` のインスタンスを生成する。
     * @param param このエンティティに対するパラメータ
     */
    constructor(param) {
        super(param);
        const alphaReader = new SpriteReader_1.SpriteReader(param.scene, "hint_key_alpha", "img_key_alpha");
        const symReader = new SpriteReader_1.SpriteReader(param.scene, "hint_key_sym", "img_key_sym");
        this.alphaKey = new g.E({
            scene: this.scene,
            width: g.game.width,
            height: g.game.height,
            hidden: true
        });
        this.append(this.alphaKey);
        this.symKey = new g.E({
            scene: this.scene,
            width: g.game.width,
            height: g.game.height,
            hidden: true
        });
        this.append(this.symKey);
        for (let i = 0; i < def.alpha.length; i++) {
            const char = def.alpha[i];
            const key = alphaReader.createSprite("a_" + char, {
                x: def.alphaX[i],
                y: def.alphaY[i],
                touchable: true
            });
            key.onPointDown.add(() => {
                if (this.inputtingLabel.text.length < this.maxLength) {
                    this.inputtingLabel.text += def.alpha[i];
                    this.inputtingLabel.invalidate();
                }
            });
            this.alphaKey.append(key);
        }
        for (let i = 0; i < def.digit.length; i++) {
            const char = def.digit[i];
            const key = symReader.createSprite("d_" + ((i + 1) % 10), {
                x: def.symX[i],
                y: def.symY[0],
                touchable: true
            });
            key.onPointDown.add(() => {
                if (this.inputtingLabel.text.length < this.maxLength) {
                    this.inputtingLabel.text += char;
                    this.inputtingLabel.invalidate();
                }
            });
            this.symKey.append(key);
        }
        for (let i = 0; i < def.symbol.length; i++) {
            const char = def.symbol[i];
            const key = symReader.createSprite("sym_" + i, {
                x: def.symX[i],
                y: def.symY[Math.floor(i / 10) + 1],
                touchable: true
            });
            key.onPointDown.add(() => {
                if (this.inputtingLabel.text.length < this.maxLength) {
                    this.inputtingLabel.text += char;
                    this.inputtingLabel.invalidate();
                }
            });
            this.symKey.append(key);
        }
        const convKanaAsset = this.scene.asset.getImageById("toKanaLetters");
        this.convKana = new g.Pane({
            scene: this.scene,
            width: convKanaAsset.width,
            height: convKanaAsset.height,
            x: def.convX[0],
            y: def.convY,
            backgroundImage: convKanaAsset,
            touchable: true,
            hidden: true
        });
        this.convKana.onPointDown.add(() => {
            this.alphaKey.hide();
            this.symKey.hide();
            this.kanaKey.show();
            this.convAlpha.x = def.convX[0];
            this.convAlpha.modified();
            this.convKana.hide();
            this.convAlpha.show();
            this.convSym.show();
        });
        this.common.append(this.convKana);
        const convAlphaAsset = this.scene.asset.getImageById("toAlphaLetters");
        this.convAlpha = new g.Pane({
            scene: this.scene,
            width: convAlphaAsset.width,
            height: convAlphaAsset.height,
            x: def.convX[0],
            y: def.convY,
            backgroundImage: convAlphaAsset,
            touchable: true
        });
        this.convAlpha.onPointDown.add(() => {
            this.kanaKey.hide();
            this.symKey.hide();
            this.alphaKey.show();
            this.convAlpha.hide();
            this.convKana.show();
            this.convSym.show();
        });
        this.common.append(this.convAlpha);
        const convSymAsset = this.scene.asset.getImageById("toSymLetters");
        this.convSym = new g.Pane({
            scene: this.scene,
            width: convSymAsset.width,
            height: convSymAsset.height,
            x: def.convX[1],
            y: def.convY,
            backgroundImage: convSymAsset,
            touchable: true
        });
        this.convSym.onPointDown.add(() => {
            this.kanaKey.hide();
            this.alphaKey.hide();
            this.symKey.show();
            this.convAlpha.x = def.convX[1];
            this.convAlpha.modified();
            this.convSym.hide();
            this.convKana.show();
            this.convAlpha.show();
        });
        this.common.append(this.convSym);
    }
    destroy() {
        super.destroy();
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
    }
}
exports.MultiKeyboard = MultiKeyboard;

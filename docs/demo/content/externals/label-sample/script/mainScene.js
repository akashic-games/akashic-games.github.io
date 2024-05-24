"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainScene = void 0;
const akashic_label_1 = require("@akashic-extension/akashic-label");
const mainScene2_1 = require("./mainScene2");
function mainScene() {
    const game = g.game;
    const scene = new g.Scene({
        game: game,
        assetIds: ["bmpfont", "bmpfont-glyph", "mplus", "mplus-glyph"]
    });
    const rate = game.fps / 3;
    scene.onLoad.add(() => {
        // グリフデータの生成
        const mPlusGlyphInfo = JSON.parse(scene.asset.getTextById("mplus-glyph").data);
        // ビットマップフォント画像とグリフ情報からBitmapFontのインスタンスを生成
        const mplusfont = new g.BitmapFont({
            src: scene.asset.getImageById("mplus"),
            glyphInfo: mPlusGlyphInfo
        });
        const dhint = {
            initialAtlasWidth: 256,
            initialAtlasHeight: 256,
            maxAtlasWidth: 256,
            maxAtlasHeight: 256,
            maxAtlasNum: 8
        };
        const dfont = new g.DynamicFont({
            game: scene.game,
            fontFamily: "monospace",
            size: 40,
            hint: dhint
        });
        // ラベル基本機能
        const tlabel0 = new akashic_label_1.Label({
            scene: scene,
            text: "ラベル基本機能",
            font: mplusfont,
            fontSize: 30,
            width: game.width,
            textAlign: "center"
        });
        tlabel0.x = 0;
        scene.append(tlabel0);
        const y0 = 40;
        // ラベルの最小機能の利用
        const label01 = new akashic_label_1.Label({
            scene: scene,
            text: "最小構成",
            font: mplusfont,
            fontSize: 20,
            width: 100
        });
        label01.y = y0;
        scene.append(label01);
        // 色つきラベル
        let counter02 = 0;
        const colors = ["red", "black", "green", "blue"];
        const label02 = new akashic_label_1.Label({
            scene: scene,
            text: "ラベル色",
            font: mplusfont,
            fontSize: 20,
            width: 100,
            textColor: "red"
        });
        label02.x = game.width / 4;
        label02.y = y0;
        label02.touchable = true;
        label02.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label02.textColor = colors[counter02 % colors.length];
                counter02++;
                label02.invalidate();
            }
        }, label02);
        scene.append(label02);
        // フォントサイズの変更
        let counter03 = 2;
        const label03 = new akashic_label_1.Label({
            scene: scene,
            text: "フォントサイズ",
            font: mplusfont,
            fontSize: 30,
            width: 200
        });
        label03.x = game.width / 4 * 2;
        label03.y = y0;
        label03.touchable = true;
        label03.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label03.fontSize = (counter03 % 6) * 3 + 5;
                counter03++;
                label03.invalidate();
            }
        }, label03);
        scene.append(label03);
        // テキスト位置の調整
        const y1 = 90;
        // 左揃え
        const label11 = new akashic_label_1.Label({
            scene: scene,
            text: "左寄せ",
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            textAlign: "left"
        });
        label11.y = y1;
        scene.append(label11);
        // 中央揃え
        const label12 = new akashic_label_1.Label({
            scene: scene,
            text: "中央寄せ",
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            textAlign: "center"
        });
        label12.y = y1;
        scene.append(label12);
        // 右揃え
        const label13 = new akashic_label_1.Label({
            scene: scene,
            text: "右寄せ",
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            textAlign: "right"
        });
        label13.y = y1;
        scene.append(label13);
        // 改行
        const y2 = 130;
        // 複数行のラベル
        let counter21 = 0;
        const aligns21 = ["left", "center", "right"];
        const label21 = new akashic_label_1.Label({
            scene: scene,
            text: "改行記号（￥ｒ・￥ｎ・￥ｒ￥ｎ）\rで改行できます",
            font: mplusfont,
            fontSize: 20,
            width: game.width
        });
        label21.y = y2;
        scene.append(label21);
        label21.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label21.textAlign = aligns21[counter21 % 3];
                counter21++;
                label21.invalidate();
            }
        }, label21);
        // lineGapを使った行間調整
        let counter22 = 0;
        const label22 = new akashic_label_1.Label({
            scene: scene,
            text: "行間幅は\r指定\rできます",
            font: mplusfont,
            fontSize: 20,
            width: 100,
            lineGap: -8
        });
        label22.y = y2 + 50;
        label22.touchable = true;
        label22.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label22.lineGap = Math.round(counter22 % 10) - 5;
                counter22++;
                label22.invalidate();
            }
        }, label22);
        scene.append(label22);
        // width基準による自動改行
        let counter23 = 0;
        const label23 = new akashic_label_1.Label({
            scene: scene,
            text: "改行記号を使わなくてもｗｉｄｔｈを超えると自動で折り返します",
            font: mplusfont,
            fontSize: 20,
            width: 100
        });
        label23.x = 150;
        label23.y = y2 + 50;
        scene.append(label23);
        label23.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label23.width = counter23 % 10 * 10 + 100;
                counter23++;
                label23.invalidate();
            }
        }, label23);
        // 自動改行オフ
        const label24 = new akashic_label_1.Label({
            scene: scene,
            text: "自動折り返し機能は有効・無効を切り替えることができます",
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            lineBreak: false
        });
        label24.y = y2 + 150;
        label24.touchable = true;
        label24.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label24.lineBreak = !label24.lineBreak;
                label24.invalidate();
            }
        }, label24);
        scene.append(label24);
        const nlabel = new akashic_label_1.Label({
            scene: scene,
            text: "［次＞＞］",
            font: mplusfont,
            fontSize: 20,
            width: game.width
        });
        nlabel.x = 230;
        nlabel.y = game.height - 20;
        nlabel.touchable = true;
        nlabel.onPointDown.add(() => {
            const scene2 = mainScene2_1.mainScene2();
            game.replaceScene(scene2);
        }, nlabel);
        scene.append(nlabel);
        const dlabel = new akashic_label_1.Label({
            scene: scene,
            text: "［フォント切替］",
            font: mplusfont,
            fontSize: 20,
            textAlign: "right",
            width: 130
        });
        dlabel.x = 100;
        dlabel.y = game.height - 20;
        dlabel.touchable = true;
        dlabel.onPointDown.add(() => {
            scene.children.forEach((label) => {
                if (label instanceof akashic_label_1.Label) {
                    label.font = dfont;
                    label.rubyOptions.rubyFont = new g.DynamicFont({
                        game: scene.game,
                        fontFamily: "monospace",
                        size: 40
                    });
                    label.invalidate();
                }
            });
        }, dlabel);
        scene.append(dlabel);
    });
    return scene;
}
exports.mainScene = mainScene;

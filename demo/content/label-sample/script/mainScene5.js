"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainScene5 = void 0;
const akashic_label_1 = require("@akashic-extension/akashic-label");
const mainScene6_1 = require("./mainScene6");
function mainScene5() {
    const game = g.game;
    const scene = new g.Scene({
        game: game,
        assetIds: ["bmpfont", "bmpfont-glyph", "mplus", "mplus-glyph"]
    });
    const rate = game.fps / 2;
    scene.onLoad.add(() => {
        // グリフデータの生成
        const mPlusGlyphInfo = JSON.parse(scene.asset.getTextById("mplus-glyph").data);
        // ビットマップフォント画像とグリフ情報からBitmapFontのインスタンスを生成
        const mplusfont = new g.BitmapFont({
            src: scene.asset.getImageById("mplus"),
            glyphInfo: mPlusGlyphInfo
        });
        const bmpGlyphInfo = JSON.parse(scene.asset.getTextById("bmpfont-glyph").data);
        const bmpfont = new g.BitmapFont({
            src: scene.asset.getImageById("bmpfont"),
            glyphInfo: bmpGlyphInfo
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
        // 複数行のルビ機能
        const tlabel0 = new akashic_label_1.Label({
            scene: scene,
            text: "複数行のルビ機能",
            font: mplusfont,
            fontSize: 30,
            width: game.width,
            textAlign: "center"
        });
        tlabel0.x = 0;
        scene.append(tlabel0);
        // ルビと改行
        const y0 = 40;
        // ルビの行幅切替
        const label01 = new akashic_label_1.Label({
            scene: scene,
            text: `ルビのある行と無い行で\rルビによる{"rb": "行間幅設定", "rt": "fixLineGap"}を\r切り替えることができます`,
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            fixLineGap: false,
            rubyOptions: { rubyFont: bmpfont }
        });
        label01.y = y0;
        label01.touchable = true;
        label01.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label01.fixLineGap = !label01.fixLineGap;
                label01.invalidate();
            }
        }, label01);
        scene.append(label01);
        // ルビ応用
        const textArray = [].concat(`「よろしゅうございます。`.split(/.*?/), `{"rb": "南　　", "rt": "　　　　　　　"}`, 30, `{"rb": "南十　", "rt": "　　　　　　　"}`, 30, `{"rb": "南十字", "rt": "　　　　　　　"}`, 30, `{"rb": "南十字", "rt": "サ　　　　　　"}`, 30, `{"rb": "南十字", "rt": "サウ　　　　　"}`, 30, `{"rb": "南十字", "rt": "サウザ　　　　"}`, 30, `{"rb": "南十字", "rt": "サウザン　　　"}`, 30, `{"rb": "南十字", "rt": "サウザンク　　"}`, 30, `{"rb": "南十字", "rt": "サウザンクロ　"}`, 30, `{"rb": "南十字", "rt": "サウザンクロス"}`, `へ着きますのは、次の第三時ころになります。」\r`.split(/.*?/), `{"rb": "車", "rt": "　"}`, 22, `{"rb": "車", "rt": "し"}`, 22, `{"rb": "車", "rt": "しゃ"}`, `{"rb": "掌", "rt": "　　　"}`, 24, `{"rb": "掌", "rt": "し　　"}`, 24, `{"rb": "掌", "rt": "しょ　"}`, 24, `{"rb": "掌", "rt": "しょう"}`, `は紙をジョバンニに渡して向うへ行きました。`.split(/.*?/));
        let counter = 0;
        const mlabel = new akashic_label_1.Label({
            scene: scene,
            text: "",
            font: mplusfont,
            fontSize: 20,
            lineGap: 0,
            width: 240,
            fixLineGap: true,
            rubyOptions: { rubyGap: 0 }
        });
        mlabel.y = 130;
        counter = 0;
        mlabel.textAlign = "left";
        scene.append(mlabel);
        mlabel.onUpdate.add(() => {
            // 初期化と待機
            if (counter === textArray.length) {
                mlabel.text = "";
                counter = -10;
                return;
            }
            if (counter < textArray.length && game.age % 2 === 0) {
                if (counter >= 0) {
                    if (typeof textArray[counter] === "number") {
                        const n = textArray[counter];
                        mlabel.text = mlabel.text.substring(0, mlabel.text.length - n);
                        counter += 1;
                        mlabel.text += textArray[counter];
                    }
                    else {
                        mlabel.text += textArray[counter];
                    }
                    mlabel.invalidate();
                }
                counter += 1;
            }
        }, mlabel);
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
                    label.rubyOptions.rubyFont = dfont;
                    label.invalidate();
                }
            });
        }, dlabel);
        scene.append(dlabel);
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
            const scene3 = mainScene6_1.mainScene6();
            game.replaceScene(scene3);
        }, nlabel);
        scene.append(nlabel);
    });
    return scene;
}
exports.mainScene5 = mainScene5;

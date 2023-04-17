"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainScene2 = void 0;
const akashic_label_1 = require("@akashic-extension/akashic-label");
const mainScene3_1 = require("./mainScene3");
function mainScene2() {
    const game = g.game;
    const scene = new g.Scene({
        game: game,
        assetIds: ["bmpfont", "bmpfont-glyph", "mplus", "mplus-glyph"]
    });
    const rate = game.fps / 6;
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
        // ラベルのルビ基本機能
        const tlabel0 = new akashic_label_1.Label({
            scene: scene,
            text: "ルビ機能",
            font: mplusfont,
            fontSize: 30,
            width: game.width,
            textAlign: "center"
        });
        tlabel0.x = 0;
        scene.append(tlabel0);
        const y0 = 40;
        // ルビの利用
        const label01 = new akashic_label_1.Label({
            scene: scene,
            text: `use {"rt":"ruby","rb":"ruby"}.`,
            font: bmpfont,
            fontSize: 20,
            width: 180,
            rubyEnabled: true
        });
        label01.y = y0;
        scene.append(label01);
        // ルビを使わない
        const label02 = new akashic_label_1.Label({
            scene: scene,
            text: `unuse {"rt":"ruby","rb":"ruby"}.`,
            font: bmpfont,
            fontSize: 20,
            width: game.width,
            rubyEnabled: false
        });
        label02.y = y0 + 40;
        scene.append(label02);
        // ルビと本文の行間
        let counter03 = 0;
        const label03 = new akashic_label_1.Label({
            scene: scene,
            text: `{"rt":"るび","rb":"ルビ"}の行間`,
            font: mplusfont,
            fontSize: 20,
            width: 100,
            rubyEnabled: true,
            rubyOptions: { rubyGap: -5 },
        });
        label03.x = 0;
        label03.y = y0 + 90;
        label03.touchable = true;
        label03.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label03.rubyOptions.rubyGap = counter03 % 4 - 5;
                counter03++;
                label03.invalidate();
            }
        }, label03);
        scene.append(label03);
        // ルビのフォントサイズ
        let counter04 = 0;
        const label04 = new akashic_label_1.Label({
            scene: scene,
            text: `{"rt":"るび","rb":"ルビ"}サイズ`,
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            rubyEnabled: true,
            rubyOptions: { rubyFontSize: 15, rubyGap: -5 }
        });
        label04.x = 100;
        label04.y = y0 + 90;
        label04.touchable = true;
        scene.append(label04);
        label04.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label04.rubyOptions.rubyFontSize = counter04 % 5 + 15;
                counter04++;
                label04.invalidate();
            }
        }, label04);
        // ルビフォントの指定
        const label05 = new akashic_label_1.Label({
            scene: scene,
            text: `{"rt":"rubyfont","rb":"ルビフォント"}`,
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            rubyEnabled: true,
            rubyOptions: { rubyFont: bmpfont }
        });
        label05.x = 200;
        label05.y = y0 + 90;
        label05.touchable = true;
        scene.append(label05);
        label05.onUpdate.add(() => {
            if (game.age % rate === 0) {
                if (label05.rubyOptions.rubyFont === bmpfont) {
                    label05.rubyOptions.rubyFont = mplusfont;
                }
                else {
                    label05.rubyOptions.rubyFont = bmpfont;
                }
                label05.invalidate();
            }
        }, label05);
        // ルビ位置の調整 SpaceAround
        const y1 = 170;
        const label11 = new akashic_label_1.Label({
            scene: scene,
            text: `{"rt":"ルビアライン","rb":"ＲｕｂｙＡｌｉｇｎ＝ＳｐａｃｅＡｒｏｕｎｄ"}`,
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            rubyEnabled: true
        });
        label11.y = y1;
        scene.append(label11);
        // ルビ位置の調整 Center
        const label12 = new akashic_label_1.Label({
            scene: scene,
            text: `{"rt":"ルビアライン","rb":"ＲｕｂｙＡｌｉｇｎ＝Ｃｅｎｔｅｒ"}`,
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            rubyEnabled: true,
            rubyOptions: { rubyAlign: akashic_label_1.RubyAlign.Center }
        });
        label12.y = y1 + 50;
        scene.append(label12);
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
            const scene3 = mainScene3_1.mainScene3();
            game.replaceScene(scene3);
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
                    label.rubyOptions.rubyFont = dfont;
                    label.invalidate();
                }
            });
        }, dlabel);
        scene.append(dlabel);
    });
    return scene;
}
exports.mainScene2 = mainScene2;

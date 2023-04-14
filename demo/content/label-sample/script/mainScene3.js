"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainScene3 = void 0;
const akashic_label_1 = require("@akashic-extension/akashic-label");
const mainScene4_1 = require("./mainScene4");
function mainScene3() {
    const game = g.game;
    const scene = new g.Scene({
        game: game,
        assetIds: ["bmpfont", "bmpfont-glyph", "mplus", "mplus-glyph"]
    });
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
        // ルビ機能2
        const tlabel0 = new akashic_label_1.Label({
            scene: scene,
            text: "ルビ機能２",
            font: mplusfont,
            fontSize: 31,
            width: game.width,
            textAlign: "center"
        });
        tlabel0.x = 0;
        scene.append(tlabel0);
        // ルビを持つラベルの改行
        const y0 = 40;
        const label01 = new akashic_label_1.Label({
            scene: scene,
            text: `ルビの途中でｗｉｄｔｈを超える場合、{"rb": "ｗｉｄｔｈ", "rt": "横幅"}、ルビ内の手前で改行されます`,
            font: mplusfont,
            fontSize: 20,
            width: game.width
        });
        label01.y = y0;
        scene.append(label01);
        // ルビの幅
        const label02 = new akashic_label_1.Label({
            scene: scene,
            text: `本文より{"rb": "ルビ", "rt": "とてもながいルビ"}の幅が広い場合、ルビの幅に合わせて余白が設けられます`,
            font: mplusfont,
            fontSize: 20,
            width: game.width
        });
        label02.y = y0 + 70;
        scene.append(label02);
        const y1 = 160;
        // ルビ位置の調整とルビ幅の組み合わせ
        const text11 = `{"rb": "Ａｌｉｇｎ．", "rt": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.Center}}` +
            `{"rb": "Ａｌｉｇｎ．", "rt": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.Center}}` +
            `{"rb": "Ａｒｏｕｎｄ．", "rt": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.SpaceAround}}` +
            `{"rb": "Ａｒｏｕｎｄ．", "rt": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.SpaceAround}}`;
        const label11 = new akashic_label_1.Label({ scene: scene, text: text11, font: mplusfont, fontSize: 15, width: game.width, rubyEnabled: true, rubyOptions: { rubyFontSize: 10 } });
        label11.y = y1;
        scene.append(label11);
        const text12 = `{"rt": "Ａｌｉｇｎ．", "rb": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.Center}}` +
            `{"rt": "Ａｌｉｇｎ．", "rb": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.Center}}` +
            `{"rt": "Ａｒｏｕｎｄ．", "rb": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.SpaceAround}}` +
            `{"rt": "Ａｒｏｕｎｄ．", "rb": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.SpaceAround}}`;
        const label12 = new akashic_label_1.Label({ scene: scene, text: text12, font: mplusfont, fontSize: 15, width: game.width, rubyEnabled: true, rubyOptions: { rubyFontSize: 10 } });
        label12.y = y1 + 40;
        scene.append(label12);
        const text13 = `{"rb": "Ａｌｉｇｎ．", "rt": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.Center}}` +
            `{"rb": "Ａｒｏｕｎｄ．", "rt": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.SpaceAround}}` +
            `{"rb": "Ａｌｉｇｎ．", "rt": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.Center}}` +
            `{"rb": "Ａｒｏｕｎｄ．", "rt": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.SpaceAround}}`;
        const label13 = new akashic_label_1.Label({ scene: scene, text: text13, font: mplusfont, fontSize: 15, width: game.width, rubyEnabled: true, rubyOptions: { rubyFontSize: 10 } });
        label13.y = y1 + 70;
        scene.append(label13);
        const text14 = `{"rt": "Ａｌｉｇｎ．", "rb": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.Center}}` +
            `{"rt": "Ａｒｏｕｎｄ．", "rb": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.SpaceAround}}` +
            `{"rt": "Ａｌｉｇｎ．", "rb": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.Center}}` +
            `{"rt": "Ａｒｏｕｎｄ．", "rb": "ルビ", "rubyAlign":${akashic_label_1.RubyAlign.SpaceAround}}`;
        const label14 = new akashic_label_1.Label({ scene: scene, text: text14, font: mplusfont, fontSize: 15, width: game.width, rubyEnabled: true, rubyOptions: { rubyFontSize: 10 } });
        label14.y = y1 + 100;
        scene.append(label14);
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
            const scene3 = mainScene4_1.mainScene4();
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
exports.mainScene3 = mainScene3;

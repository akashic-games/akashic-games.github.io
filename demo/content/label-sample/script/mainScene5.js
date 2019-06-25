"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var akashic_label_1 = require("@akashic-extension/akashic-label");
var game = g.game;
module.exports = function () {
    var scene = new g.Scene({
        game: game,
        assetIds: ["bmpfont", "bmpfont-glyph", "mplus", "mplus-glyph"]
    });
    var rate = game.fps / 2;
    scene.loaded.add(function () {
        // グリフデータの生成
        var mplusGlyph = JSON.parse(scene.assets["mplus-glyph"].data);
        // ビットマップフォント画像とグリフ情報からBitmapFontのインスタンスを生成
        var mplusfont = new g.BitmapFont({
            src: scene.assets["mplus"],
            map: mplusGlyph.map,
            defaultGlyphWidth: mplusGlyph.width,
            defaultGlyphHeight: mplusGlyph.height,
            missingGlyph: mplusGlyph.missingGlyph
        });
        // グリフデータの生成
        var glyph = JSON.parse(scene.assets["bmpfont-glyph"].data);
        // ビットマップフォント画像とグリフ情報からBitmapFontのインスタンスを生成
        var bmpfont = new g.BitmapFont({
            src: scene.assets["bmpfont"],
            map: glyph.map,
            defaultGlyphWidth: glyph.width,
            defaultGlyphHeight: glyph.height,
            missingGlyph: glyph.missingGlyph
        });
        var dhint = {
            initialAtlasWidth: 256,
            initialAtlasHeight: 256,
            maxAtlasWidth: 256,
            maxAtlasHeight: 256,
            maxAtlasNum: 8
        };
        var dfont = new g.DynamicFont({
            game: scene.game,
            fontFamily: g.FontFamily.Monospace,
            size: 40,
            hint: dhint
        });
        // 複数行のルビ機能
        var tlabel0 = new akashic_label_1.Label({
            scene: scene,
            text: "複数行のルビ機能",
            font: mplusfont,
            fontSize: 30,
            width: game.width,
            textAlign: g.TextAlign.Center
        });
        tlabel0.x = 0;
        scene.append(tlabel0);
        // ルビと改行
        var y0 = 40;
        // ルビの行幅切替
        var label01 = new akashic_label_1.Label({
            scene: scene,
            text: 'ルビのある行と無い行で\rルビによる{"rb": "行間幅設定", "rt": "fixLineGap"}を\r切り替えることができます',
            font: mplusfont,
            fontSize: 20,
            width: game.width,
            fixLineGap: false,
            rubyOptions: { rubyFont: bmpfont }
        });
        label01.y = y0;
        label01.touchable = true;
        label01.update.add(function () {
            if (game.age % rate === 0) {
                label01.fixLineGap = !label01.fixLineGap;
                label01.invalidate();
            }
        }, label01);
        scene.append(label01);
        // ルビ応用
        var textArray = [].concat('「よろしゅうございます。'.split(/.*?/), '{"rb": "南　　", "rt": "　　　　　　　"}', 30, '{"rb": "南十　", "rt": "　　　　　　　"}', 30, '{"rb": "南十字", "rt": "　　　　　　　"}', 30, '{"rb": "南十字", "rt": "サ　　　　　　"}', 30, '{"rb": "南十字", "rt": "サウ　　　　　"}', 30, '{"rb": "南十字", "rt": "サウザ　　　　"}', 30, '{"rb": "南十字", "rt": "サウザン　　　"}', 30, '{"rb": "南十字", "rt": "サウザンク　　"}', 30, '{"rb": "南十字", "rt": "サウザンクロ　"}', 30, '{"rb": "南十字", "rt": "サウザンクロス"}', 'へ着きますのは、次の第三時ころになります。」\r'.split(/.*?/), '{"rb": "車", "rt": "　"}', 22, '{"rb": "車", "rt": "し"}', 22, '{"rb": "車", "rt": "しゃ"}', '{"rb": "掌", "rt": "　　　"}', 24, '{"rb": "掌", "rt": "し　　"}', 24, '{"rb": "掌", "rt": "しょ　"}', 24, '{"rb": "掌", "rt": "しょう"}', 'は紙をジョバンニに渡して向うへ行きました。'.split(/.*?/));
        var counter = 0;
        var mlabel = new akashic_label_1.Label({
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
        mlabel.textAlign = g.TextAlign.Left;
        scene.append(mlabel);
        mlabel.update.add(function () {
            // 初期化と待機
            if (counter === textArray.length) {
                this.text = "";
                counter = -10;
                return;
            }
            if (counter < textArray.length && game.age % 2 === 0) {
                if (counter >= 0) {
                    if (typeof textArray[counter] === "number") {
                        var n = textArray[counter];
                        this.text = this.text.substring(0, this.text.length - n);
                        counter += 1;
                        this.text += textArray[counter];
                    }
                    else {
                        this.text += textArray[counter];
                    }
                    this.invalidate();
                }
                counter += 1;
            }
        }, mlabel);
        var dlabel = new akashic_label_1.Label({
            scene: scene,
            text: "［フォント切替］",
            font: mplusfont,
            fontSize: 20,
            textAlign: g.TextAlign.Right,
            width: 130
        });
        dlabel.x = 100;
        dlabel.y = game.height - 20;
        dlabel.touchable = true;
        dlabel.pointDown.add(function () {
            scene.children.forEach(function (label) {
                if (label instanceof akashic_label_1.Label) {
                    label.font = dfont;
                    label.rubyOptions.rubyFont = dfont;
                    label.invalidate();
                }
            });
        }, dlabel);
        scene.append(dlabel);
        var nlabel = new akashic_label_1.Label({
            scene: scene,
            text: "［次＞＞］",
            font: mplusfont,
            fontSize: 20,
            width: game.width
        });
        nlabel.x = 230;
        nlabel.y = game.height - 20;
        nlabel.touchable = true;
        nlabel.pointDown.add(function () {
            var scene3 = require("mainScene6")();
            game.replaceScene(scene3);
        }, nlabel);
        scene.append(nlabel);
        var dlabel = new akashic_label_1.Label({
            scene: scene,
            text: "［フォント切替］",
            font: mplusfont,
            fontSize: 20,
            textAlign: g.TextAlign.Right,
            width: 130
        });
        dlabel.x = 100;
        dlabel.y = game.height - 20;
        dlabel.touchable = true;
        dlabel.pointDown.add(function () {
            scene.children.forEach(function (child) {
                if (child instanceof akashic_label_1.Label) {
                    child.font = dfont;
                    child.rubyOptions.rubyFont = dfont;
                    child.invalidate();
                }
            });
        }, dlabel);
        scene.append(dlabel);
    });
    return scene;
};

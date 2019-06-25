"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var akashic_label_1 = require("@akashic-extension/akashic-label");
var game = g.game;
module.exports = function () {
    var scene = new g.Scene({
        game: game,
        assetIds: ["bmpfont", "bmpfont-glyph", "mplus", "mplus-glyph"]
    });
    var rate = game.fps / 3;
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
        // パーサ切替とエスケープ文字
        var tlabel0 = new akashic_label_1.Label({
            scene: scene,
            text: "既定外のパーサ利用と\rＥＳＣ文字",
            font: mplusfont,
            fontSize: 30,
            width: game.width,
            textAlign: g.TextAlign.Center
        });
        tlabel0.x = 0;
        scene.append(tlabel0);
        var y0 = 60;
        // 異なる記法に対応したパーサ関数の導入
        var parser = function (text) {
            var pattern = /([^(?:<ruby>)]*?)(<ruby>(?:([^(?:<rt>)]*)<rt>(.*?)<\/rt>(?:[^(?:<\\rt>)]*))<\/ruby>)([\s\S]*)/;
            var result = [];
            while (text.length > 0) {
                var parsedText = text.match(pattern);
                if (parsedText !== null) {
                    var headStr = parsedText[1];
                    var rubyStr = parsedText[2];
                    var rubyStrRb = parsedText[3];
                    var rubyStrRt = parsedText[4];
                    text = parsedText[5];
                    if (headStr.length > 0) {
                        result.push(headStr);
                    }
                    if (rubyStrRb !== "" && rubyStrRt !== "") {
                        var rubyObj = {
                            rb: rubyStrRb,
                            rt: rubyStrRt,
                            text: rubyStr
                        };
                        result.push(rubyObj);
                    }
                    else {
                        // none
                    }
                }
                else {
                    result.push(text);
                    break;
                }
            }
            return result;
        };
        var counter00 = 0;
        // HTMLライクなルビの記法
        var text00 = '「よろしゅうございます。<ruby>南十字<rt>サウザンクロス</rt></ruby>へ着きますのは、次の第三時ころになります。」<ruby>車<rt>しゃ</rt></ruby><ruby>掌<rt>しょう</rt></ruby>は紙をジョバンニに渡して向うへ行きました。';
        var label00 = new akashic_label_1.Label({
            scene: scene,
            text: text00,
            font: mplusfont,
            fontSize: 20,
            width: 0,
            rubyParser: parser
        });
        label00.x = 0;
        label00.y = y0;
        scene.append(label00);
        label00.update.add(function () {
            if (game.age % rate === 0) {
                this.width = counter00 % 20 * 10 + 120;
                counter00++;
                this.invalidate();
            }
        }, label00);
        // エスケープ文字の利用方法
        var label01 = new akashic_label_1.Label({
            scene: scene,
            text: '\\{"rb": "base", "rt": "text"\\} \r back slash \\ \r  slash \/',
            font: bmpfont,
            fontSize: 15,
            width: 200
        });
        label01.x = 100;
        label01.y = y0 + 170;
        scene.append(label01);
        // サロゲート文字
        var label01 = new akashic_label_1.Label({
            scene: scene,
            text: 'サロゲート文字\r𩸽{"rb": "𩸽𩸽𩸽", "rt": "𩸽𩸽𩸽"}',
            font: mplusfont,
            fontSize: 15,
            width: 200
        });
        label01.x = 10;
        label01.y = y0 + 210;
        scene.append(label01);
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
            var scene3 = require("mainScene5")();
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
            scene.children.forEach(function (label) {
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
};

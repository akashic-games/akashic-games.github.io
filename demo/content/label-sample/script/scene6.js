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
        var mplusGlyph = JSON.parse(scene.asset.getTextById("mplus-glyph").data);
        // ビットマップフォント画像とグリフ情報からBitmapFontのインスタンスを生成
        var mplusfont = new g.BitmapFont({
            src: scene.asset.getImageById("mplus"),
            map: mplusGlyph.map,
            defaultGlyphWidth: mplusGlyph.width,
            defaultGlyphHeight: mplusGlyph.height,
            missingGlyph: mplusGlyph.missingGlyph
        });
        // グリフデータの生成
        var glyph = JSON.parse(scene.asset.getTextById("bmpfont-glyph").data)
        // ビットマップフォント画像とグリフ情報からBitmapFontのインスタンスを生成
        var bmpfont = new g.BitmapFont({
            src: scene.asset.getImageById("bmpfont"),
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
            fontFamily: "monospace",
            size: 40,
            hint: dhint
        });
        var tlabel0 = new akashic_label_1.Label({
            scene: scene,
            text: "行末の禁則処理",
            font: mplusfont,
            fontSize: 30,
            width: game.width,
            textAlign: "center"
        });
        tlabel0.x = 0;
        scene.append(tlabel0);
        var counter = 0;
        var text = "「これ」と「それ」と「あれ」と「●●」と「これ」と「それ」と「あれ」と「●●」と「これ」と「それ」と「あれ」と「●●」と「これ」と「それ」と「あれ」と「●●」";
        var sampleRule = function (fragments, index) {
            var ignoreHead = ["」", "』", "】"];
            var ignoreTail = ["「", "『", "【"];
            var headChar = fragments[index];
            var isHeadCharIgnore = ignoreHead.indexOf(headChar) !== -1;
            if (typeof headChar !== "string")
                return index;
            if (isHeadCharIgnore) {
                return index + 1;
            }
            else {
                var before = fragments[index - 1];
                var isBeforeIgnore = ignoreHead.indexOf(before) !== -1;
                if (!!before && isBeforeIgnore) {
                    return index;
                }
                else if (!!before && ignoreTail.indexOf(before) !== -1) {
                    return index - 1;
                }
                return index;
            }
        };
        var lblabel = new akashic_label_1.Label({
            scene: scene,
            text: text,
            font: mplusfont,
            fontSize: 15,
            textAlign: "left",
            width: game.width / 4,
            lineBreak: true,
            lineBreakRule: sampleRule
        });
        lblabel.y = 40;
        scene.append(lblabel);
        lblabel.onUpdate.add(function () {
            if (game.age % rate === 0) {
                this.width += 5;
                if (this.width > game.width)
                    this.width = 100;
                this.invalidate();
            }
        }, lblabel);
        var text = '「{"rt":"これ","rb":"これ"}」と「{"rt":"それ","rb":"それ"}」と「{"rt":"あれ","rb":"あれ"}」と「{"rt":"●●","rb":"●●"}」と' +
            '「{"rt":"これ","rb":"これ"}」と「{"rt":"それ","rb":"それ"}」と「{"rt":"あれ","rb":"あれ"}」と「{"rt":"●●","rb":"●●"}」と' +
            '「{"rt":"これ","rb":"これ"}」と「{"rt":"それ","rb":"それ"}」と「{"rt":"あれ","rb":"あれ"}」と「{"rt":"●●","rb":"●●"}」と' +
            '「{"rt":"これ","rb":"これ"}」と「{"rt":"それ","rb":"それ"}」と「{"rt":"あれ","rb":"あれ"}」と「{"rt":"●●","rb":"●●"}」';
        var sampleRule = function (fragments, index) {
            var target = fragments[index];
            if (target === "」") {
                return index + 1;
            }
            else {
                var before = fragments[index - 1];
                if (!!before && before === "」") {
                    return index;
                }
                else if (!!before && before === "「") {
                    return index - 1;
                }
                return index;
            }
        };
        var lblabel2 = new akashic_label_1.Label({
            scene: scene,
            text: text,
            font: mplusfont,
            fontSize: 15,
            textAlign: "left",
            width: game.width / 4,
            lineBreak: true,
            widthAutoAdjust: true,
            lineBreakRule: sampleRule
        });
        lblabel2.y = 190;
        scene.append(lblabel2);
        lblabel2.onUpdate.add(function () {
            if (game.age % rate === 0) {
                this.width = counter % 20 * 5 + 120;
                counter++;
                this.invalidate();
            }
        }, lblabel2);
        var nlabel = new akashic_label_1.Label({
            scene: scene,
            text: "［最初＞＞］",
            font: mplusfont,
            fontSize: 20,
            width: game.width
        });
        nlabel.x = 230;
        nlabel.y = game.height - 20;
        nlabel.touchable = true;
        nlabel.onPointDown.add(function () {
            var scene1 = require("scene1")();
            game.replaceScene(scene1);
        }, nlabel);
        scene.append(nlabel);
        var dlabel = new akashic_label_1.Label({
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
        dlabel.onPointDown.add(function () {
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

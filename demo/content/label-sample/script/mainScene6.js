"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainScene6 = void 0;
const akashic_label_1 = require("@akashic-extension/akashic-label");
const mainScene_1 = require("./mainScene");
const game = g.game;
function mainScene6() {
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
        const tlabel0 = new akashic_label_1.Label({
            scene: scene,
            text: "行末の禁則処理",
            font: mplusfont,
            fontSize: 30,
            width: game.width,
            textAlign: "center"
        });
        tlabel0.x = 0;
        scene.append(tlabel0);
        let counter = 0;
        let text = "「これ」と「それ」と「あれ」と「●●」と「これ」と「それ」と「あれ」と「●●」と「これ」と「それ」と「あれ」と「●●」と「これ」と「それ」と「あれ」と「●●」";
        let sampleRule = (fragments, index) => {
            const ignoreHead = ["」", "』", "】"];
            const ignoreTail = ["「", "『", "【"];
            const headChar = fragments[index];
            const isHeadCharIgnore = ignoreHead.indexOf(headChar) !== -1;
            if (typeof headChar !== "string")
                return index;
            if (isHeadCharIgnore) {
                return index + 1;
            }
            else {
                const before = fragments[index - 1];
                const isBeforeIgnore = ignoreHead.indexOf(before) !== -1;
                if (!!before && isBeforeIgnore) {
                    return index;
                }
                else if (!!before && ignoreTail.indexOf(before) !== -1) {
                    return index - 1;
                }
                return index;
            }
        };
        const lblabel = new akashic_label_1.Label({
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
        lblabel.onUpdate.add(() => {
            if (game.age % rate === 0) {
                lblabel.width += 5;
                if (lblabel.width > game.width)
                    lblabel.width = 100;
                lblabel.invalidate();
            }
        }, lblabel);
        text = `「{"rt":"これ","rb":"これ"}」と「{"rt":"それ","rb":"それ"}」と「{"rt":"あれ","rb":"あれ"}」と「{"rt":"●●","rb":"●●"}」と` +
            `「{"rt":"これ","rb":"これ"}」と「{"rt":"それ","rb":"それ"}」と「{"rt":"あれ","rb":"あれ"}」と「{"rt":"●●","rb":"●●"}」と` +
            `「{"rt":"これ","rb":"これ"}」と「{"rt":"それ","rb":"それ"}」と「{"rt":"あれ","rb":"あれ"}」と「{"rt":"●●","rb":"●●"}」と` +
            `「{"rt":"これ","rb":"これ"}」と「{"rt":"それ","rb":"それ"}」と「{"rt":"あれ","rb":"あれ"}」と「{"rt":"●●","rb":"●●"}」`;
        sampleRule = (fragments, index) => {
            const target = fragments[index];
            if (target === "」") {
                return index + 1;
            }
            else {
                const before = fragments[index - 1];
                if (!!before && before === "」") {
                    return index;
                }
                else if (!!before && before === "「") {
                    return index - 1;
                }
                return index;
            }
        };
        const lblabel2 = new akashic_label_1.Label({
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
        lblabel2.onUpdate.add(() => {
            if (game.age % rate === 0) {
                lblabel2.width = counter % 20 * 5 + 120;
                counter++;
                lblabel2.invalidate();
            }
        }, lblabel2);
        const nlabel = new akashic_label_1.Label({
            scene: scene,
            text: "［最初＞＞］",
            font: mplusfont,
            fontSize: 20,
            width: game.width
        });
        nlabel.x = 230;
        nlabel.y = game.height - 20;
        nlabel.touchable = true;
        nlabel.onPointDown.add(() => {
            const scene3 = mainScene_1.mainScene();
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
exports.mainScene6 = mainScene6;

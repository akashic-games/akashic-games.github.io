"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainScene4 = void 0;
const akashic_label_1 = require("@akashic-extension/akashic-label");
const mainScene5_1 = require("./mainScene5");
function mainScene4() {
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
        // パーサ切替とエスケープ文字
        const tlabel0 = new akashic_label_1.Label({
            scene: scene,
            text: "既定外のパーサ利用と\rＥＳＣ文字",
            font: mplusfont,
            fontSize: 30,
            width: game.width,
            textAlign: "center"
        });
        tlabel0.x = 0;
        scene.append(tlabel0);
        const y0 = 60;
        // 異なる記法に対応したパーサ関数の導入
        const parser = function (text) {
            const pattern = /([^(?:<ruby>)]*?)(<ruby>(?:([^(?:<rt>)]*)<rt>(.*?)<\/rt>(?:[^(?:<\\rt>)]*))<\/ruby>)([\s\S]*)/;
            const result = [];
            while (text.length > 0) {
                const parsedText = text.match(pattern);
                if (parsedText !== null) {
                    const headStr = parsedText[1];
                    const rubyStr = parsedText[2];
                    const rubyStrRb = parsedText[3];
                    const rubyStrRt = parsedText[4];
                    text = parsedText[5];
                    if (headStr.length > 0) {
                        result.push(headStr);
                    }
                    if (rubyStrRb !== "" && rubyStrRt !== "") {
                        const rubyObj = {
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
        let counter00 = 0;
        // HTMLライクなルビの記法
        const text00 = `「よろしゅうございます。<ruby>南十字<rt>サウザンクロス</rt></ruby>へ着きますのは、次の第三時ころになります。」<ruby>車<rt>しゃ</rt></ruby><ruby>掌<rt>しょう</rt></ruby>は紙をジョバンニに渡して向うへ行きました。`;
        const label00 = new akashic_label_1.Label({
            scene: scene,
            text: text00,
            font: mplusfont,
            fontSize: 20,
            width: 0,
            rubyEnabled: true,
            rubyParser: parser
        });
        label00.x = 0;
        label00.y = y0;
        scene.append(label00);
        label00.onUpdate.add(() => {
            if (game.age % rate === 0) {
                label00.width = counter00 % 20 * 10 + 120;
                counter00++;
                label00.invalidate();
            }
        }, label00);
        // エスケープ文字の利用方法
        const label01 = new akashic_label_1.Label({
            scene: scene,
            text: `\\{"rb": "base", "rt": "text"\\} \r back slash \\ \r  slash \/`,
            font: bmpfont,
            fontSize: 15,
            width: 200,
            rubyEnabled: true
        });
        label01.x = 100;
        label01.y = y0 + 170;
        scene.append(label01);
        // サロゲート文字
        const label02 = new akashic_label_1.Label({
            scene: scene,
            text: `サロゲート文字\r𩸽{"rb": "𩸽𩸽𩸽", "rt": "𩸽𩸽𩸽"}`,
            font: mplusfont,
            fontSize: 15,
            width: 200,
            rubyEnabled: true
        });
        label02.x = 10;
        label02.y = y0 + 210;
        scene.append(label02);
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
            const scene3 = mainScene5_1.mainScene5();
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
exports.mainScene4 = mainScene4;

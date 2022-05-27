"use strict";
var akashic_label_1 = require("@akashic-extension/akashic-label");
var akashic_timeline_1 = require("@akashic-extension/akashic-timeline");
var MultiKeyboard_1 = require("./MultiKeyboard");
var game = g.game;
function main() {
    var scene = new g.Scene({
        game: game,
        assetIds: [
            "hint_key_alpha",
            "hint_key_kana",
            "hint_key_sym",
            "img_key_alpha",
            "img_key_kana",
            "img_key_sym",
            "toKanaLetters",
            "toAlphaLetters",
            "toSymLetters",
            "inputtingLabelBack",
            "backSpaceKey",
            "open",
            "close",
            "notosansFont",
            "notosansGlyph"
        ]
    });
    var timeline = new akashic_timeline_1.Timeline(scene);
    scene.onLoad.add(function () {
        var font = new g.DynamicFont({
            game: game,
            fontFamily: "sans-serif",
            size: 50,
            fontWeight: 1
        });
        var glyph = scene.asset.getJSONContentById("notosansGlyph");
        var keyboardFont = new g.BitmapFont({
            src: scene.asset.getImageById("notosansFont"),
            map: glyph,
            defaultGlyphWidth: 72,
            defaultGlyphHeight: 72
        });
        var text = new akashic_label_1.Label({
            scene: scene,
            text: "名前を入力してください:",
            textColor: "black",
            width: g.game.width,
            font: font,
            fontSize: 50,
            y: 100,
            textAlign: "center"
        });
        scene.append(text);
        var name = new akashic_label_1.Label({
            scene: scene,
            text: "",
            textColor: "black",
            width: g.game.width,
            y: g.game.height / 2,
            font: font,
            fontSize: 50,
            textAlign: "center"
        });
        scene.append(name);
        // マルチキーボードインスタンスの生成
        var keyboard = new MultiKeyboard_1.MultiKeyboard({
            scene: scene,
            font: keyboardFont,
            sceneAssets: scene.asset,
            y: g.game.height
        });
        scene.append(keyboard);
        var state = 1 /* OFF */;
        var openAsset = scene.asset.getImageById("open");
        var closeAsset = scene.asset.getImageById("close");
        var keyboardButton = new g.Pane({
            scene: scene,
            width: openAsset.width,
            height: openAsset.height,
            x: g.game.width / 2 - openAsset.width / 2,
            y: 610,
            backgroundImage: openAsset,
            touchable: true
        });
        keyboardButton.onPointDown.add(function () {
            switch (state) {
                case 1 /* OFF */:
                    keyboardButton.backgroundImage = closeAsset;
                    timeline.create(keyboard).moveTo(0, 0, 150);
                    state = 0 /* ON */;
                    break;
                case 0 /* ON */:
                    name.text = keyboard.text;
                    name.invalidate();
                    keyboardButton.backgroundImage = openAsset;
                    timeline.create(keyboard).moveTo(0, g.game.height, 150);
                    state = 1 /* OFF */;
                    break;
            }
            keyboardButton.invalidate();
        });
        scene.append(keyboardButton);
    });
    g.game.pushScene(scene);
}
module.exports = main;

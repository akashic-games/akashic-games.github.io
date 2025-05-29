const Global_1 = require("./Global");
const titleScene_1 = require("./titleScene");
module.exports = function () {
    Global_1.Global.bmpFont = new g.BitmapFont({
        src: g.game.scene().asset.getImage("/image/font16.png"),
        map: g.game.scene().asset.getJSONContent("/text/glyph_area.json"),
        defaultGlyphWidth: 16,
        defaultGlyphHeight: 16
    });
    const scene = (0, titleScene_1.createTitleScene)();
    scene.onMessage.add((e) => {
        if (e.data.type === "start") {
            console.log("param: " + JSON.stringify(e.data.parameters));
            Global_1.Global.params = e.data.parameters; // 起動パラメータ保存
        }
    });
    g.game.vars.gameState = {
        score: 0,
        isFinished: false
    };
    g.game.pushScene(scene);
};

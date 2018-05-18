var Global = require("Global");
var createBootScene = require("bootScene");

//
// エントリーポイント
//
module.exports = function() {
    Global.bmpFont = new g.BitmapFont({
        src: g.game.assets["font16"],
        map: JSON.parse(g.game.assets["glyph_area"].data),
        defaultGlyphWidth: 16,
        defaultGlyphHeight: 16
    });

    return createBootScene();
}

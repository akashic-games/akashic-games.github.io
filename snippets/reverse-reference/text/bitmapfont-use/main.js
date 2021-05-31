function main() {
	var scene = new g.Scene({
		game: g.game,
		assetIds: ["mplus", "mplus-glyph"]
	});

	scene.onLoad.add(function() {
		var mPlusGlyphInfo = JSON.parse(scene.assets["mplus-glyph"].data)
		var mplusfont = new g.BitmapFont({
			src: scene.assets["mplus"],
			glyphInfo: mPlusGlyphInfo
		});

		var label = new g.Label({
			scene: scene,
			font: mplusfont,
			text: "こんにちは",
			fontSize: 26,
			x: 100,
			y: 50
		});
		scene.append(label);
	});

	g.game.pushScene(scene);
}

module.exports = main;

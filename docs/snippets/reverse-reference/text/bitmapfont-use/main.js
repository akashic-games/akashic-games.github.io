function main() {
	var scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/mplus.png", "/text/mplus-glyph.json"]
	});

	scene.onLoad.add(function() {
		var mPlusGlyphInfo = scene.asset.getJSONContent("/text/mplus-glyph.json");
		var mplusfont = new g.BitmapFont({
			src: scene.asset.getImage("/image/mplus.png"),
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

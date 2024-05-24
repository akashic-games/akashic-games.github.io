function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var normalFont = new g.DynamicFont({
			game: g.game,
			fontFamily: "sans-serif",
			size: 30
		});
		var label = new g.Label({
			scene: scene,
			font: normalFont,
			text: "こんにちは",
			fontSize: 30,
			x: 50,
			y: 50
		});
		scene.append(label);

		var boldFont = new g.DynamicFont({
			game: g.game,
			fontFamily: "sans-serif",
			fontWeight: "bold",
			size: 30
		});
		var boldLabel = new g.Label({
			scene: scene,
			font: boldFont,
			text: "こんにちは",
			fontSize: 30,
			x: 50,
			y: 100
		});
		scene.append(boldLabel);
	});
	g.game.pushScene(scene);
}

module.exports = main;

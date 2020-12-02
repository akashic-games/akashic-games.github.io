function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var font = new g.DynamicFont({
			game: g.game,
			fontFamily: "sans-serif",
			size: 15
		});
		var label = new g.Label({
			scene: scene,
			font: font,
			text: "Hello World!",
			fontSize: 15,
			textColor: "blue",
			x: 10,
			y: 20
		});
		scene.append(label);
	});
	g.game.pushScene(scene);
}

module.exports = main;

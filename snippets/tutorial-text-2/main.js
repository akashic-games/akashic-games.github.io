function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var font = new g.DynamicFont({
			fontFamily: "sans-serif",
			size: 15,
			game: g.game
		});
		var count = 0;
		var label = new g.Label({
			scene: scene,
			font: font,
			text: count + "",
			fontSize: 30,
			textColor: "black",
			x: 10,
			y: 10
		});
		scene.append(label);
		scene.setInterval(function () {
			label.text = ++count + "";
			label.invalidate();
		}, 500);
	});
	g.game.pushScene(scene);
}

module.exports = main;

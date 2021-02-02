function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function() {
		var red = createRect(scene, "red", 0, 20 );
		var blue = createRect(scene, "blue", 75, 50);
		var green = createRect(scene, "green", 50, 0);

		red.compositeOperation = "source-atop";
		blue.compositeOperation = "source-atop";

		scene.append(green);
		scene.append(red);
		scene.append(blue);
	});

	g.game.pushScene(scene);
}

function createRect(scene, color, x, y) {
	return new g.FilledRect({
		scene: scene,
		width: 100,
		height: 100,
		x: x,
		y: y,
		cssColor: color
	});
}

module.exports = main;

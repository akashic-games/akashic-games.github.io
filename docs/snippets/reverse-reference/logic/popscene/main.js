function main() {
	var scene = createScene("#000000");
	g.game.pushScene(scene);
}

function createScene(color) {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var rect = createRect(scene, color)
		scene.append(rect);
		rect.onPointUp.add(function () {
			g.game.pushScene(createScene(generateColor()));
		});
		scene.onPointDownCapture.add(function (ev) {
			if (ev.target) return;
			g.game.popScene();
		});
	});
	return scene;
}

function generateColor() {
	var randomColor = "#";
	for (var i = 0; i < 6; i++) randomColor += (16 * g.game.random.generate() | 0).toString(16);
	return randomColor;
}

function createRect(scene, color) {
	return new g.FilledRect({
		scene: scene,
		width: 100,
		height: 100,
		x: 0,
		y: 0,
		cssColor: color,
		touchable: true
	});
}


module.exports = main;

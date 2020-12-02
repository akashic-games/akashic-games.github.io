function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		scene.onPointDownCapture.add(function (ev) {
			var size = 20;
			var rect = new g.FilledRect({
				scene: scene,
				x: ev.point.x - size / 2,
				y: ev.point.y - size / 2,
				width: size,
				height: size,
				cssColor: "blue"
			});
			scene.append(rect);
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

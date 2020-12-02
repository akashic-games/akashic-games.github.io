function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var rect = new g.FilledRect({
			scene: scene,
			cssColor: "#ff0000",
			width: 32,
			height: 32
		});
		scene.append(rect);
	});
	g.game.pushScene(scene);
}

module.exports = main;

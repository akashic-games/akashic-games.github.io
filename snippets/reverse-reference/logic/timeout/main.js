function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var rect = new g.FilledRect({
			scene: scene,
			width: 50,
			height: 50,
			cssColor: "red"
		});
		scene.append(rect);

		scene.setTimeout(function () {
			rect.hide();
		}, 5000);
	});
	g.game.pushScene(scene);
}

module.exports = main;

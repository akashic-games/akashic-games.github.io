function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var pane = new g.Pane({ scene: scene, width: 50, height: 50 });
		var rect = new g.FilledRect({
			scene: scene,
			width: 50,
			height: 50,
			x: 15,
			y: 15,
			angle: 30,
			cssColor: "red"
		});
		pane.append(rect);
		scene.append(pane);
		rect.onUpdate.add(function () {
			++rect.angle;
			rect.modified();
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

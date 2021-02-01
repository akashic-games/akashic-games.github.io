function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function() {
		var size = 50;
		var rect = new g.FilledRect({
			scene: scene,
			cssColor: "red",
			width: size,
			height: size,
			x: g.game.width / 2 - size / 2,
			y: g.game.height / 2 - size / 2,
			touchable: true
		});
		scene.append(rect);

		rect.onPointMove.add(function(ev) {
			rect.x += ev.prevDelta.x;
			rect.y += ev.prevDelta.y;
			rect.modified();
		});
	});

	g.game.pushScene(scene);
}

module.exports = main;

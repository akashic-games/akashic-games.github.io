function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function() {
		var rect = new g.FilledRect({
			scene: scene,
			cssColor: "red",
			width: 100,
			height: 100,
			touchable: true
		});
		scene.append(rect);

		rect.onPointDown.add(function() {
			rect.cssColor = rect.cssColor === "red" ? "blue" : "red";
			rect.modified();
		});
	});
	scene.onPointDownCapture.add((ev) => {
		var size = 20;
		var rect = new g.FilledRect({
			scene: scene,
			x: ev.point.x - size / 2,
			y: ev.point.y - size / 2,
			width: size,
			height: size,
			cssColor: "black"
		});
		scene.append(rect);
	});
	g.game.pushScene(scene);
}

module.exports = main;

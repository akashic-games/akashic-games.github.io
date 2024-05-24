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

		rect.onPointDown.add(function(e) {
			rect.cssColor = rect.cssColor === "red" ? "blue" : "red";
			rect.modified();
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

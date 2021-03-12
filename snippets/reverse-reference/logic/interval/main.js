function main() {
	var scene = new g.Scene({ game: g.game });
	var colors = ["blue", "red", "green", "yellow"];
	scene.onLoad.add(function () {
		var rect = new g.FilledRect({
			scene: scene,
			width: 50,
			height: 50,
			cssColor: "black"
		});
		scene.append(rect);

		scene.setInterval(function () {
			var idx = Math.floor(g.game.random.generate() * colors.length);
			rect.cssColor = colors[idx];
			rect.modified();
		}, 1000);
	});
	g.game.pushScene(scene);
}

module.exports = main;

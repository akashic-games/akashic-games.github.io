function main() {
  var scene = new g.Scene({ game: g.game });
  scene.onLoad.add(function() {
	var rect = new g.FilledRect({
		scene: scene,
		cssColor: "red",
		width: 100,
		height: 100
	});
	scene.append(rect);

	scene.setTimeout(function() {
		scene.remove(rect);
	}, 10000);
  });

  g.game.pushScene(scene);
}

module.exports = main;

function main() {
  var scene = new g.Scene({ game: g.game });
  scene.onLoad.add(function() {
	var rect = new g.FilledRect({
		scene: scene,
		cssColor: "red",
		width: 50,
		height: 50
	});
	scene.append(rect);

	scene.onUpdate.add(function () {
		++rect.x;
		rect.modified();
	});
  });

  g.game.pushScene(scene);
}

module.exports = main;

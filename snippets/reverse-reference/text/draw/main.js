function main() {
  var scene = new g.Scene({ game: g.game });
  scene.onLoad.add(function() {
	var font = new g.DynamicFont({
		game: g.game,
		fontFamily: "sans-serif",
		size: 48
	});
	
	var label = new g.Label({
		scene: scene,
		font: font,
		text: "こんにちは",
		fontSize: 48,
		x: 50,
		y: 50
	});
	scene.append(label);
  });

  g.game.pushScene(scene);
}

module.exports = main;

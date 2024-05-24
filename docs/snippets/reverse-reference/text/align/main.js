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
		textAlign: "center",
		width: g.game.width,
		widthAutoAdjust: false,
		fontSize: 48,
		x: 0,
		y: 0
	});
	scene.append(label);
  });

  g.game.pushScene(scene);
}

module.exports = main;

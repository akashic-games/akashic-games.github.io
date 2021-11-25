function main() {
  var al = require("@akashic-extension/akashic-label");
  var scene = new g.Scene({ game: g.game });
  scene.onLoad.add(function() {
	var font = new g.DynamicFont({
		game: g.game,
		fontFamily: "sans-serif",
		size: 48
	});
	
	var label = new al.Label({
		scene: scene,
		text: '{"rt":"コーヒー","rb":"珈琲"}を飲む。',
		font: font,
		fontSize: 30,
		width: g.game.width
	});
	scene.append(label);
  });

  g.game.pushScene(scene);
}

module.exports = main;

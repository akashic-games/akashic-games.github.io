function main() {
  var scene = new g.Scene({ game: g.game });
  scene.onLoad.add(function() {
	  var green = new g.FilledRect({
		  scene: scene,
		  width: 100,
		  height: 100,
		  cssColor: "green"
	  });
	  scene.append(green);

	  var red = new g.FilledRect({
		  scene: scene,
		  width: 100,
		  height: 100,
		  x: 70,
		  y: 70,
		  cssColor: "red"
	  });
	  scene.append(red);

	  var blue = new g.FilledRect({
		  scene: scene,
		  width: 100,
		  height: 100,
		  x: 30,
		  y: 30,
		  cssColor: "blue"
	  });
	  scene.insertBefore(blue, red);
  });

  g.game.pushScene(scene);
}

module.exports = main;

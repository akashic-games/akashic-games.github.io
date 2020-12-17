function main() {
  var scene = new g.Scene({ game: g.game });
  scene.onLoad.add(function() {
	  var group = new g.E({ scene: scene });
	  var red = new g.FilledRect({
		  scene: scene,
		  width: 100,
		  height: 100,
		  cssColor: "red"
	  });
	  group.append(red); // group の子エンティティに red を追加

	  var green = new g.FilledRect({
		  scene: scene,
		  width: 100,
		  height: 100,
		  x: 100,
		  cssColor: "green"
	  });
	  group.append(green); // group の子エンティティに green を追加
	  scene.append(group);

	  group.opacity = 0.5;
	  group.modified();
  });

  g.game.pushScene(scene);
}

module.exports = main;

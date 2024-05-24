function main() {
	var scene = new g.Scene({
		game: g.game,
		assetIds: ["player"] // シーン内で利用するアセットID
	});

	scene.onLoad.add(function() {
		var sprite = new g.Sprite({
			scene: scene,
			src: scene.assets["player"],
			x: 100,
			y: 50
		});
		scene.append(sprite);
	});
	g.game.pushScene(scene);
}

module.exports = main;

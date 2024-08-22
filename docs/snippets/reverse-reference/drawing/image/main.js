function main() {
	var scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/player.png"] // シーン内で利用するアセットのパス
	});

	scene.onLoad.add(function() {
		var sprite = new g.Sprite({
			scene: scene,
			src: scene.asset.getImage("/image/player.png"),
			x: 100,
			y: 50
		});
		scene.append(sprite);
	});
	g.game.pushScene(scene);
}

module.exports = main;

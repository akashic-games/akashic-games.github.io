function main() {
	var scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/player.png", "/audio/sound1"] // シーン内で利用するアセットのパス
	});

	scene.onLoad.add(function() {
		var playerImageAsset = scene.asset.getImage("/image/player.png");
		var sound1 = scene.asset.getAudio("/audio/sound1");

		var player = new g.Sprite({
			scene: scene,
			src: playerImageAsset,
			width: playerImageAsset.width,
			height: playerImageAsset.height,
			touchable: true
		});
		player.onPointDown.add(function () {
			sound1.play();
		});
		scene.append(player);
	});
	g.game.pushScene(scene);
}

module.exports = main;

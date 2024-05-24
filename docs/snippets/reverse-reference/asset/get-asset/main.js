function main() {
	var scene = new g.Scene({
		game: g.game,
		assetIds: ["player", "sound1"] // シーン内で利用するアセットID
	});

	scene.onLoad.add(function() {
		var playerImageAsset = scene.asset.getImageById("player");
		var sound1 = scene.asset.getAudioById("sound1");

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

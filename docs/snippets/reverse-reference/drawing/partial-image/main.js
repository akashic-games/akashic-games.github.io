function main() {
	var scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/player.png"] // シーン内で利用するアセットのパス
	});

	scene.onLoad.add(function() {
		var playerAsset = scene.asset.getImage("/image/player.png");
		var partialPlayer = new g.Sprite({
			scene: scene,
			width: playerAsset.width / 2,
			height: playerAsset.height / 2,
			src: playerAsset,
			srcWidth: playerAsset.width / 2, // 描画元範囲の幅を画像の半分にします
			srcHeight: playerAsset.height / 2, // 描画元範囲の高さを画像の半分にします
			srcX: 15, // 描画元範囲を左から 15 px の位置にします
			srcY: 10, // 描画元範囲を上から 10 px の位置にします
		});
		scene.append(partialPlayer);

		var originalPlayer = new g.Sprite({
			scene: scene,
			width: playerAsset.width,
			height: playerAsset.height,
			src: playerAsset,
			x: 60
		});
		scene.append(originalPlayer);
	});
	g.game.pushScene(scene);
}

module.exports = main;

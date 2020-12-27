function main() {
	var scene = new g.Scene({
		game: g.game,
		assetIds: ["explosion"]
	});
	scene.onLoad.add(function () {
		var frameSprite = new g.FrameSprite({
			scene: scene,
			src: scene.asset.getImageById("explosion"),
			// エンティティのサイズ
			width: 100,
			height: 100,

			// 元画像のフレーム1つのサイズ
			srcWidth: 100,
			srcHeight: 100,

			// アニメーションに利用するフレームのインデックス配列
			// インデックスは元画像の左上から右にsrcWidthとsrcHeightの矩形を並べて数え上げ、右端に達したら一段下の左端から右下に達するまで繰り返す
			frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

			// アニメーションをループする（省略した場合ループする）
			loop: true
		});
		scene.append(frameSprite);
		frameSprite.start();
	});
	g.game.pushScene(scene);
}

module.exports = main;

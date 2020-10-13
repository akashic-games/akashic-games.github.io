function main(param) {
	// シーンの生成
	var scene = new g.Scene({
		game: g.game,
		assetIds: ["player"] // 利用アセットとして "player" を宣言
	});

	// シーン初期化時の処理
	scene.onLoad.add(function() {
		// 回転するエンティティを生成
		var rotatingEntity = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById("player"),
			x: 20,
			y: 20
		});
		// update トリガーを使い、毎フレーム呼び出される処理を登録
		rotatingEntity.onUpdate.add(function () {
			rotatingEntity.angle++; // 回転角度を変更
			rotatingEntity.modified(); // 変更をエンジンに通知
		});
		scene.append(rotatingEntity); // シーンに追加

		// 拡大縮小するエンティティを生成
		var counterForScale = 0;  // 拡大率を制御する変数
		var scalingEntity = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById("player"),
			x: 120,
			y: 20
		});
		// update トリガーを使い、毎フレーム呼び出される処理を登録
		scalingEntity.onUpdate.add(function () {
			counterForScale += 0.05;
			var scaleFactor = 2 * Math.abs(Math.sin(counterForScale));  // counterForScale の値に応じて 0〜2 の間で変動する値
			scalingEntity.scale(scaleFactor); // 拡大率を変更
			scalingEntity.modified(); // 変更をエンジンに通知
		});
		scene.append(scalingEntity); // シーンに追加

		// 明滅するエンティティを生成
		var counterForOpacity = 0;  // 不透明度を制御する変数
		var blinkingEntity = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById("player"),
			x: 220,
			y: 20
		});
		// update トリガーを使い、毎フレーム呼び出される処理を登録
		blinkingEntity.onUpdate.add(function () {
			counterForOpacity += 0.1;
			var opacity = (Math.sin(counterForOpacity) + 1) / 2;  // counterForOpacity の値に応じて 0〜1 の間で変動する値
			blinkingEntity.opacity = opacity; // 不透明度を変更
			blinkingEntity.modified(); // 変更をエンジンに通知
		});
		scene.append(blinkingEntity); // シーンに追加
	});

	g.game.pushScene(scene);
}

module.exports = main;

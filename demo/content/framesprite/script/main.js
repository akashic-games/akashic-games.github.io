function main(param) {
	const scene = new g.Scene({
		game: g.game,
		assetIds: ["explosion"]
	});
	scene.onLoad.add(() => {
		// 背景を黒で塗りつぶす矩形を生成
		const background = new g.FilledRect({
			scene: scene,

			// 位置 (0, 0) から画面全部を覆うサイズで
			x: 0,
			y: 0,
			width: g.game.width,
			height: g.game.height,

			// 黒の矩形を
			cssColor: "black",

			// scene の子として(＝ 自動で scene.append() する) 生成する
			parent: scene
		});

		// シーン内でポイント押下イベントが生じた時
		scene.onPointDownCapture.add(ev => {
			// 爆発アニメーションのスプライトを生成する
			const sp = new g.FrameSprite({
				scene: scene,
				src: scene.asset.getImageById("explosion"),

				// ポイントされた位置を中心に
				x: ev.point.x - 50,
				y: ev.point.y - 50,

				// サイズ 100 x 100 で
				width: 100,
				height: 100,

				// 画像アセットの 100 x 100 の領域を一つの画像片として、
				srcWidth: 100,
				srcHeight: 100,

				// (1フレームごとに)全画像片を順に表示する
				frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

				// (爆発のアニメーションなので加算合成する)
				compositeOperation: "lighter"
			});

			sp.onUpdate.add(() => {
				// アニメーションが終わった時点で破棄する
				if (sp.frameNumber === sp.frames.length - 1)
					sp.destroy();
			});

			scene.append(sp);
			sp.start();
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

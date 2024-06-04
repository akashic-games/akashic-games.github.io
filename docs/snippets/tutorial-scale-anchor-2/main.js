function main() {
	const scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/player.png"]
	});

	scene.onLoad.add(() => {
		const sprite = new g.Sprite({
			scene: scene,
			src: scene.asset.getImage("/image/player.png"),
			x: 0,
			y: 0,
			scaleX: 2,
			scaleY: 1.5,
			angle: 45
		});
		scene.append(sprite);

		// 縦横ともに等倍にする
		sprite.scaleX = 1;
		sprite.scaleY = 1;

		// 回転角度を 0 度にする
		sprite.angle = 0;
		// 変更を反映
		sprite.modified();
	});
	g.game.pushScene(scene);
}

module.exports = main;

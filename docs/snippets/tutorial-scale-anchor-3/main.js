function main() {
	const scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/player.png"]
	});

	scene.onLoad.add(() => {
		const sprite = new g.Sprite({
			scene: scene,
			src: scene.asset.getImage("/image/player.png"),
			x: g.game.width, // g.game.width と height はゲーム画面の幅と高さです
			y: g.game.height,
			angle: 25,
			scaleX: 2.5,
			scaleY: 2.5,
			anchorX: 1.0, // 1.0 でエンティティの右端
			anchorY: 1.0 // 1.0 でエンティティの下端
		});
		scene.append(sprite);
	});
	g.game.pushScene(scene);
}

module.exports = main;
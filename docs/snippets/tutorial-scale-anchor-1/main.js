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
	});
	g.game.pushScene(scene);
}

module.exports = main;
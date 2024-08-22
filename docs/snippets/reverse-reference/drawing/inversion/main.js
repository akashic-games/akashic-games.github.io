function main() {
	const scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/player.png"]
	});

	scene.onLoad.add(() => {
		const playerAsset = scene.asset.getImage("/image/player.png");
		const sprite1 = new g.Sprite({
			scene: scene,
			src: playerAsset,
			x: playerAsset.width,
			scaleX: -1
		});
		scene.append(sprite1);
		const sprite2 = new g.Sprite({
			scene: scene,
			src: scene.asset.getImage("/image/player.png"),
			x: sprite1.x,
			y: playerAsset.height,
			scaleY: -1
		});
		scene.append(sprite2);
	});
	g.game.pushScene(scene);
}

module.exports = main;

function main() {
	const scene = new g.Scene({
		game: g.game,
		assetIds: ["player"]
	});

	scene.onLoad.add(() => {
		const playerAsset = scene.asset.getImageById("player");
		const sprite1 = new g.Sprite({
			scene: scene,
			src: playerAsset,
			x: playerAsset.width,
			scaleX: -1
		});
		scene.append(sprite1);
		const sprite2 = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById("player"),
			x: sprite1.x,
			y: playerAsset.height,
			scaleY: -1
		});
		scene.append(sprite2);
	});
	g.game.pushScene(scene);
}

module.exports = main;

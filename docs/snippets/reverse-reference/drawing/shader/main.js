function main() {
	const scene = new g.Scene({
		game: g.game,
		assetIds: ["player", "monochrome"] // シーン内で利用するアセットID
	});

	scene.onLoad.add(() => {
		const fragmentShader = scene.asset.getTextById("monochrome").data;
		const shader = new g.ShaderProgram({
			fragmentShader: fragmentShader
		});
		const sprite = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById("player"),
			x: 100,
			y: 100,
			shaderProgram: shader
		});
		scene.append(sprite);
	});
	g.game.pushScene(scene);
}

module.exports = main;

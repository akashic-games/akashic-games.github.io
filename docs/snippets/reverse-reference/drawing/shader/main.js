function main() {
	const scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/player.png", "/text/monochrome.glsl"] // シーン内で利用するアセットのパス
	});

	scene.onLoad.add(() => {
		const fragmentShader = scene.asset.getText("/text/monochrome.glsl").data;
		const shader = new g.ShaderProgram({
			fragmentShader: fragmentShader
		});
		const sprite = new g.Sprite({
			scene: scene,
			src: scene.asset.getImage("/image/player.png"),
			x: 100,
			y: 100,
			shaderProgram: shader
		});
		scene.append(sprite);
	});
	g.game.pushScene(scene);
}

module.exports = main;

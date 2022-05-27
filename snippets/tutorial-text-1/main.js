function main() {
	const scene = new g.Scene({ game: g.game });
	scene.onLoad.add(() => {
		const font = new g.DynamicFont({
			game: g.game,
			fontFamily: "sans-serif",
			size: 15
		});
		const label = new g.Label({
			scene: scene,
			font: font,
			text: "Hello World!",
			fontSize: 15,
			textColor: "blue",
			x: 10,
			y: 20
		});
		scene.append(label);
	});
	g.game.pushScene(scene);
}

module.exports = main;

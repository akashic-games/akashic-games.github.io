function main() {
	const scene = new g.Scene({ game: g.game });
	scene.onLoad.add(() => {
		const pane = new g.Pane({ scene: scene, width: 50, height: 50 });
		const rect = new g.FilledRect({
			scene: scene,
			width: 50,
			height: 50,
			x: 15,
			y: 15,
			angle: 30,
			cssColor: "red"
		});
		pane.append(rect);
		scene.append(pane);
	});
	g.game.pushScene(scene);
}

module.exports = main;

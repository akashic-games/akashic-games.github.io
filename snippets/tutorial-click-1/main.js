function main() {
	const scene = new g.Scene({ game: g.game });
	scene.onLoad.add(() => {
		scene.onPointDownCapture.add(ev => {
			const size = 20;
			const rect = new g.FilledRect({
				scene: scene,
				x: ev.point.x - size / 2,
				y: ev.point.y - size / 2,
				width: size,
				height: size,
				cssColor: "blue"
			});
			scene.append(rect);
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

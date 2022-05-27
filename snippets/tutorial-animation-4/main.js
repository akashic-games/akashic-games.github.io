function main() {
	const scene = new g.Scene({ game: g.game });
	scene.onLoad.add(() => {
		const rect = createRect(scene);
		scene.append(rect);
		const intervalId = scene.setInterval(() => {
			rect.x += 10;
			rect.modified();
		}, 200);
		scene.setTimeout(() => {
			scene.clearInterval(intervalId);
		}, 3000);
	});
	g.game.pushScene(scene);
}

function createRect(scene) {
	return new g.FilledRect({
		scene: scene,
		width: 30,
		height: 30,
		cssColor: "red"
	});
}

module.exports = main;

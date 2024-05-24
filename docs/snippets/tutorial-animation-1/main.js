function main() {
	const scene = new g.Scene({ game: g.game });
	scene.onLoad.add(() => {
		const rect = createRect(scene);
		scene.append(rect);
		// scene の onUpdate を設定し、毎フレーム実行する処理を記述
		scene.onUpdate.add(() => {
			++rect.x;
			rect.modified();
		});
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

function main() {
	// 表示順の制御
	const scene = new g.Scene({ game: g.game });
	scene.onLoad.add(() => {
		const group = new g.E({ scene: scene, x: 50, y: 50, angle: 30 });
		const rect1 = createRect(scene, 0, 0, "darkgreen");
		group.append(rect1);
		const rect2 = createRect(scene, 30, 0, "darkorange");
		group.append(rect2);
		const rect3 = createRect(scene, 60, 0, "darkred");
		group.append(rect3);
		scene.append(group);
	});
	g.game.pushScene(scene);
}

function createRect(scene, x, y, color) {
	return new g.FilledRect({
		scene: scene,
		width: 30,
		height: 30,
		x: x,
		y: y,
		cssColor: color
	});
}

module.exports = main;

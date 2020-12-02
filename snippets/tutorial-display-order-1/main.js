function main() {
	// 表示順の制御
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var group = new g.E({ scene: scene, x: 50, y: 50, angle: 30 });
		var rect1 = createRect(scene, 0, 0, "darkgreen");
		group.append(rect1);
		var rect2 = createRect(scene, 30, 0, "darkorange");
		group.append(rect2);
		var rect3 = createRect(scene, 60, 0, "darkred");
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

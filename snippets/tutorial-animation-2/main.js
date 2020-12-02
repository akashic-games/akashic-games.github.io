function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var rect = createRect(scene);
		scene.append(rect);
		// rect の update を利用
		rect.onUpdate.add(function () {
			moveRect(rect);
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

function moveRect(rect) {
	++rect.x;
	rect.modified();
	if (rect.x > g.game.width / 2) rect.destroy();
}

module.exports = main;

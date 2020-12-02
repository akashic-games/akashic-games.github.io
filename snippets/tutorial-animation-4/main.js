function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var rect = createRect(scene);
		scene.append(rect);
		var intervalId = scene.setInterval(function () {
			rect.x += 10;
			rect.modified();
		}, 200);
		scene.setTimeout(function () {
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

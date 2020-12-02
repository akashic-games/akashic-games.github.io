var size = 25;
var margin = 15;

function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var x, y, rect;
		for (y = 0; y < g.game.height; y += size + margin) {
			for (x = 0; x < g.game.width; x += size + margin) {
				rect = createRect(scene, x, y);
				scene.append(rect);
			}
		}
	});
	g.game.pushScene(scene);
}

function createRect(scene, x, y) {
	var colors = ["blue", "navy", "royalblue", "skyblue"];
	var idx = Math.floor(g.game.random.generate() * colors.length);
	return new g.FilledRect({
		scene: scene,
		x: x,
		y: y,
		width: size,
		height: size,
		cssColor: colors[idx]
	});
}

module.exports = main;

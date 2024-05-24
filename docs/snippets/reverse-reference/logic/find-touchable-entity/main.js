var tl = require("@akashic-extension/akashic-timeline");

var centterX = g.game.width / 2;
var centterY = g.game.height / 2;

function main(param) {
	var scene = new g.Scene({game: g.game});
	scene.onLoad.add(function () {
		var t = new tl.Timeline(scene);

		createCross(scene, centterX, centterY);
		var rectRed = new g.FilledRect({ scene: scene, cssColor: "red", width: 32, height: 32, y: 150, touchable: true });
		scene.append(rectRed);
		t.create(rectRed, { loop: true })
			.to({ angle: 180, x: g.game.width - rectRed.width - 10 }, 800, tl.Easing.linear)
			.to({ angle: 360, x: 10 }, 800, tl.Easing.linear)
			.to({ angle: 0 }, 0);
	});

	scene.onUpdate.add(function () {
		var pointSource = g.game.findPointSource({ x: centterX, y: centterY });
		if (pointSource.target) {
			var color = (g.game.random.generate() * 0xFFFFFF | 0).toString(16);
			pointSource.target.cssColor = "#" + ("000000" + color).slice(-6);;
			pointSource.target.modified();
		}
	});
	g.game.pushScene(scene);
}

function createCross(scene, x, y) {
	var createLineRect = function () {
		return new g.FilledRect({
			scene: scene,
			x: x,
			y: y,
			width: 20,
			height: 1,
			cssColor: "black",
			anchorX: 0.5,
			anchorY: 0.5
		});
	};
	var horizontalRect = createLineRect();
	var verticalRect = createLineRect();
	verticalRect.angle = 90;
	scene.append(horizontalRect);
	scene.append(verticalRect);
}

module.exports = main;

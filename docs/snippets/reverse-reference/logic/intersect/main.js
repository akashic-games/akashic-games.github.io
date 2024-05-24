function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var rect1 = new g.FilledRect({
			scene: scene,
			cssColor: "blue",
			width: 50,
			height: 50,
			x: 0,
			y: 0,
			touchable: true,
			scaleX: 1.2,
			scaleY: 1.2
		});
		var rect2 = new g.FilledRect({
			scene: scene,
			cssColor: "black",
			width: 100,
			height: 100,
			x: 150,
			y: 150,
			angle: 45
		});
		rect1.onPointMove.add(function (ev) {
			rect1.x += ev.prevDelta.x;
			rect1.y += ev.prevDelta.y;
			rect1.modified();
		});
		rect1.onUpdate.add(function () {
			var ret = g.Collision.intersectEntities(rect1, rect2);
			if (ret) {
				rect1.cssColor = "red";
				rect1.modified();
			} else {
				rect1.cssColor = "blue";
				rect1.modified();
			}
		});
		scene.append(rect2);
		scene.append(rect1);
	});
	g.game.pushScene(scene);
}

module.exports = main;

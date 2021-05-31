function main() {
	var scene = new g.Scene({ game: g.game });

	scene.onLoad.add(function() {
		var rect = new g.FilledRect({
			scene: scene,
			cssColor: "red",
			width: 100,
			height: 100,
			x: g.game.width / 2 - 50,
			y: g.game.height / 2 - 50,
			touchable: true
		});
		scene.append(rect);

		var isRightAfterClick = false;
		var doubleClickTimer = null;

		rect.onPointDown.add(function () {
			if (isRightAfterClick) {
				isRightAfterClick = false;
				rect.cssColor = rect.cssColor === "red" ? "blue" : "red";
				rect.modified();
				return;
			}
		});
		rect.onPointUp.add(function () {
			isRightAfterClick = true;
			doubleClickTimer = scene.setTimeout(function () {
				isRightAfterClick = false;
				doubleClickTimer = null;
			}, 300);
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

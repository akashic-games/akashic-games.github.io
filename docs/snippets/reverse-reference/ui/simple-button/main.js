function main() {
	const scene = new g.Scene({ game: g.game });

	const font = new g.DynamicFont({
		game: g.game,
		fontFamily: "sans-serif",
		size: 48
	});

	scene.onLoad.add(function () {
		const rectButton = new g.FilledRect({
			scene: scene,
			cssColor: "#000000",
			y: 10,
			width: 150,
			height: 65,
			touchable: true
		});
		rectButton.onPointDown.add((ev) => {
			rectButton.opacity = 0.5;
			rectButton.modified();
		});
		rectButton.onPointUp.add(ev => {
			rectButton.opacity = 1;
			rectButton.modified();
		});

		const label = new g.Label({
			scene: scene,
			text: "start",
			textColor: "white",
			font:font,
			x: 15
		});
		rectButton.append(label);
		scene.append(rectButton);
	});
	g.game.pushScene(scene);
}

module.exports = main;

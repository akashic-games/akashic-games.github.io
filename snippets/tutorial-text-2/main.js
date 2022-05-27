function main() {
	const scene = new g.Scene({ game: g.game });
	scene.onLoad.add(() => {
		const font = new g.DynamicFont({
			fontFamily: "sans-serif",
			size: 15,
			game: g.game
		});
		let count = 0;
		const label = new g.Label({
			scene: scene,
			font: font,
			text: count + "",
			fontSize: 30,
			textColor: "black",
			x: 10,
			y: 10
		});
		scene.append(label);
		scene.setInterval(() => {
			label.text = ++count + "";
			label.invalidate();
		}, 500);
	});
	g.game.pushScene(scene);
}

module.exports = main;

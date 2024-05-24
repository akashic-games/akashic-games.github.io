function main() {
	// 通常のシーン
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.addOnce(function() {
		var rect = new g.FilledRect({
			scene: scene,
			cssColor: "red",
			width: 32,
			height: 32
		});
		rect.onUpdate.add(function() {
			rect.x += 2;
			if (g.game.width < rect.x) {
				rect.x = 0;
			}
			rect.modified();
		});
		scene.append(rect);
	});
	g.game.pushScene(scene);

	// スキッピングシーンの代入
	g.game.skippingScene = createSkippingScene();
}

function createSkippingScene() {
	var scene = new g.Scene({
		game: g.game,
		local: "full-local",
		name: "skipping"
	});

	scene.onLoad.addOnce(function() {
		var font = new g.DynamicFont({
			game: g.game,
			fontFamily: "sans-serif",
			fontColor: "white",
			strokeColor: "black",
			strokeWidth: 4,
			size: 25
		});
		var label = new g.Label({
			scene: scene,
			font: font,
			fontSize: 25,
			text: "読み込み中...",
			anchorX: 0.5,
			anchorY: 0.5,
			x: g.game.width / 2,
			y: g.game.height / 2
		});
		scene.append(label);
	});

	return scene;
}

module.exports = main;

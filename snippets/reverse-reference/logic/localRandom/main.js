function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function () {
		var localRect = new g.FilledRect({
			scene: scene,
			width: 50,
			height: 50,
			x: 0,
			y: 0,
			cssColor: "red",
			touchable: true,
			local: true
		});
		scene.append(localRect);

		localRect.onPointDown.add(function () {
			var random = g.game.localRandom.generate(); // 0 以上 1 未満の整数を取得。この値は各プレイヤーで異なる
			localRect.width = 30 + random * 100;
			localRect.height = 30 + random * 100;
			localRect.modified();
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

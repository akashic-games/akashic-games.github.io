function main() {
	var scene = new g.Scene({ game: g.game });
	scene.onLoad.add(function() {
		var rect = new g.FilledRect({
			scene: scene,
			cssColor: "gray",
			width: 50,
			height: 50,
			x: g.game.width / 2,
			y: g.game.height / 2,
			anchorX: 0.5,
			anchorY: 0.5,
			touchable: true
		});
		scene.append(rect);

		scene.onPointDownCapture.add(function (e) {
			if (e.button === 0) { // 左ボタンまたはタッチ
				rect.cssColor = "blue";
			} else if (e.button === 2) { // 右ボタン
				rect.cssColor = "red";
			}
			
			// わかりやすさのため押下中は 5% 縮小
			rect.scale(0.95, 0.95);
			rect.modified();
		});
		
		scene.onPointUpCapture.add(function (e) {
			// 縮小を戻す
			rect.scale(1, 1);
			rect.modified();
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

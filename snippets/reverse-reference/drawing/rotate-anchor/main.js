function main() {
	var scene = new g.Scene({
		game: g.game,
		assetIds: ["player"]
	});

	scene.onLoad.add(function () {
		var sprite = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById("player"),
			x: g.game.width, // g.game.width と height はゲーム画面の幅と高さです
			y: g.game.height,
			angle: 25,
			anchorX: 1.0, // 1.0 でエンティティの右端
			anchorY: 1.0 // 1.0 でエンティティの下端
		});
		scene.append(sprite);
	});
	g.game.pushScene(scene);
}

module.exports = main;

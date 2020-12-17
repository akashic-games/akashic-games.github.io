function main() {
	var scene = new g.Scene({
		game: g.game,
		assetIds: ["player"]
	});

	scene.onLoad.add(function () {
		var sprite = new g.Sprite({
			scene: scene,
			src: scene.asset.getImageById("player"),
			hidden: true
		});
		scene.append(sprite);

		scene.onPointDownCapture.add(function(){
			if (!sprite.visible()) {
				sprite.show();
			} else {
				sprite.hide();
			}
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

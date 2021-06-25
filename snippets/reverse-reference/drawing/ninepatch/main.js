function main() {
	var scene = new g.Scene({
		game: g.game,
		assetIds: ["frame"] // シーン内で利用するアセットID
	});

	scene.onLoad.add(function () {
		var frameImageAsset = scene.asset.getImageById("frame");

		var img = new g.Sprite({
			scene: scene,
			src: frameImageAsset
		});
		scene.append(img);

		var destSurface = scene.game.resourceFactory.createSurface(220, 70);
		var srcSurface = g.SurfaceUtil.asSurface(frameImageAsset);
		var borderWidth = { top: 5, bottom: 15, left: 5, right: 15 };
		g.SurfaceUtil.drawNinePatch(destSurface, srcSurface, borderWidth);

		var ninePacthImg = new g.Sprite({
			scene: scene,
			src: destSurface,
			y: 70
		});
		scene.append(ninePacthImg);
	});
	g.game.pushScene(scene);
}

module.exports = main;

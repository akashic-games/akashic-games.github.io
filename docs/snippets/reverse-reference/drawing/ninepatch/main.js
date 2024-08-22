function main() {
	var scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/frame.png"] // シーン内で利用するアセットのパス
	});

	scene.onLoad.add(function () {
		var frameImageAsset = scene.asset.getImage("/image/frame.png");

		var img = new g.Sprite({
			scene: scene,
			src: frameImageAsset
		});
		scene.append(img);

		var destSurface = scene.game.resourceFactory.createSurface(220, 70);
		var srcSurface = g.SurfaceUtil.asSurface(frameImageAsset);
		var borderWidth = { top: 5, bottom: 25, left: 5, right: 25 };
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

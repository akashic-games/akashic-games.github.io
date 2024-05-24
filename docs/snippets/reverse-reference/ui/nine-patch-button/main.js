function main() {
	const scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/**/*"]
	});

	scene.onLoad.add(function () {
		// 元の画像
		const sprite = new g.Sprite({
			scene:scene,
			src: scene.asset.getImage("/image/button-frame.png"),
			touchable: true
		});
		sprite.onPointDown.add((ev) => { 
			sprite.x += 3;
			sprite.y += 3;
			sprite.modified();
		});
		sprite.onPointUp.add((ev) => { 
			sprite.x -= 3;
			sprite.y -= 3;
			sprite.modified();
		});
		scene.append(sprite);
		
		// ナインパッチ化した画像
		const borderWidth = { top: 5, bottom: 5, left: 5, right: 5 };
		const ninePacthSureface = createNinePatchSurface(scene, "/image/button-frame.png", 200, 90, borderWidth);
		const ninePacthButton = new g.Sprite({
			scene: scene,
			src: ninePacthSureface,
			touchable: true,
			y: 50
		});
		ninePacthButton.onPointDown.add((ev) => { 
			ninePacthButton.x += 3;
			ninePacthButton.y += 3;
			ninePacthButton.modified();
		});
		ninePacthButton.onPointUp.add((ev) => { 
			ninePacthButton.x -= 3;
			ninePacthButton.y -= 3;
			ninePacthButton.modified();
		});

		const font = new g.DynamicFont({
			game: g.game,
			fontFamily: "sans-serif",
			fontWeight: "bold",
			size: 42
		});
		const label = new g.Label({
			scene: scene,
			font: font,
			text: "START",
			fontSize: 42,
			textColor: "white",
			x: 20,
			y: 20
		});
		ninePacthButton.append(label);
		scene.append(ninePacthButton);
	});
	g.game.pushScene(scene);
}

// ナインパッチ化した Surface を返す
function createNinePatchSurface(scene, assetPath, width, height, borderWidth) {
	const buttonImageAsset = scene.asset.getImage(assetPath);
	const srcSurface = g.SurfaceUtil.asSurface(buttonImageAsset);
	const destSurface = scene.game.resourceFactory.createSurface(width, height);
	g.SurfaceUtil.drawNinePatch(destSurface, srcSurface, borderWidth);
	return destSurface;
}

module.exports = main;

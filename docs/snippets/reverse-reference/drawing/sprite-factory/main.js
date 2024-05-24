function main() {
	const scene = new g.Scene({ game: g.game });

	scene.onLoad.add(function () {
		const rect = new g.FilledRect({
			scene: scene,
			cssColor: "blue",
			width: 50,
			height: 50
		});
		rect.onUpdate.add(function() { 
			rect.x += 1;
			if (rect.x > g.game.width ) rect.x = 0;
			rect.modified();
		});
		scene.append(rect);

		let sceneSprite;
		let bg;
		scene.onPointDownCapture.add(function () {
			if (sceneSprite) scene.remove(sceneSprite);
			// シーンを画像化し、縮小して画面右下に表示
			sceneSprite = g.SpriteFactory.createSpriteFromScene(scene, scene);
			sceneSprite.scale(0.5);
			sceneSprite.x = g.game.width - (sceneSprite.width * 0.5);
			sceneSprite.y = g.game.height - (sceneSprite.height * 0.5);
			
			if (!bg) { 
				// 縮小したシーン画像の背景色
				bg = new g.FilledRect({
					scene: scene,
					cssColor: "#ffffffb3",
					width: sceneSprite.width,
					height: sceneSprite.height,
					x: sceneSprite.x,
					y: sceneSprite.y
				});
				scene.append(bg);
			}
			scene.append(sceneSprite);
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

function main() {
	const scene = new g.Scene({
		game: g.game,
		assetPaths: ["/image/**/*"]
	});

	scene.onLoad.add(function () {
		const spriteButton = new g.Sprite({
			scene:scene,
			src: scene.asset.getImage("/image/button_start.png"),
			touchable:true
		});
		spriteButton.onPointDown.add((ev)=> {
			spriteButton.scaleX = 1.2;
			spriteButton.scaleY = 1.2;
			spriteButton.modified();
		});
		spriteButton.onPointUp.add((ev)=> {
			spriteButton.scaleX = 1;
			spriteButton.scaleY = 1;
			spriteButton.modified();
		});
  		scene.append(spriteButton);

	});
	g.game.pushScene(scene);
}

module.exports = main;

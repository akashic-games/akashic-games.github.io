var font = new g.DynamicFont({
	game: g.game,
	fontFamily: "sans-serif",
	size: 48
});

function main() {
	var scene = new g.Scene({ game: g.game, assetPaths: ["/audio/sound1", "/audio/bgm1"] });
	scene.onLoad.add(function() {
		var isPlayingBgm = false;
		var soundRect = createButtonRect(scene, 40, 110, "green", "SE", () => {
			scene.asset.getAudio("/audio/sound1").play();
		});
		scene.append(soundRect);
		var bgmRect = createButtonRect(scene, 180, 110, "blue", "BGM", () => {
			isPlayingBgm = !isPlayingBgm;
			if (isPlayingBgm) {
				scene.asset.getAudio("/audio/bgm1").play();
			} else {
				scene.asset.getAudio("/audio/bgm1").stop();
			}
		});
		scene.append(bgmRect);
	});
	g.game.pushScene(scene);
}
  
function createButtonRect(scene, x, y, color, text, clickHandler) {
	var rect = new g.FilledRect({
		scene: scene,
		x: x,
		y: y,
		width: 100,
		height: 100,
		cssColor: color,
		touchable: true
	});
	var label = new g.Label({
		scene: scene,
		text: text,
		font: font,
		fontSize: 0.75 * font.size,
		y: 25,
		textColor: "black"
	});
	rect.append(label);
	rect.onPointDown.add(() => {
		rect.opacity = 0.5;
		rect.modified();
	});
	rect.onPointUp.add(() => {
		rect.opacity = 1;
		rect.modified();
	});
	if (clickHandler) {
		rect.onPointUp.add(clickHandler);
	}
	return rect;
}
  
module.exports = main;

const font = new g.DynamicFont({
	game: g.game,
	fontFamily: "sans-serif",
	size: 48
});

function main() {
	const scene = new g.Scene({ game: g.game, assetPaths: ["/audio/sound1", "/audio/bgm1"] });
	scene.onLoad.add(function() {
		let isPlayingBgm = false;
		const sound1Asset = scene.asset.getAudio("/audio/sound1");
		const soundRect = createButtonRect(scene, 40, 110, "green", "SE", () => {
			g.game.audio.play(sound1Asset);
		});
		scene.append(soundRect);

		const bgm1Asset = scene.asset.getAudio("/audio/bgm1");
		const bgm = g.game.audio.create(bgm1Asset);
		const bgmRect = createButtonRect(scene, 180, 110, "blue", "BGM", () => {
			isPlayingBgm = !isPlayingBgm;
			if (isPlayingBgm) {
				bgm.play();
			} else {
				bgm.stop();
			}
		});
		scene.append(bgmRect);
	});
	g.game.pushScene(scene);
}
  
function createButtonRect(scene, x, y, color, text, clickHandler) {
	const rect = new g.FilledRect({
		scene: scene,
		x: x,
		y: y,
		width: 100,
		height: 100,
		cssColor: color,
		touchable: true
	});
	const label = new g.Label({
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

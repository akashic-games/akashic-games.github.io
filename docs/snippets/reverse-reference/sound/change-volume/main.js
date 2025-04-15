const font = new g.DynamicFont({
	game: g.game,
	fontFamily: "sans-serif",
	size: 48
});

function main() {
	var scene = new g.Scene({ game: g.game, assetPaths: ["/audio/sound1", "/audio/bgm1"] });
	scene.onLoad.add(function() {
		let currentVolume = 1;
		const sound1Asset = scene.asset.getAudio("/audio/sound1");
		const soundRect = createButtonRect(scene, 30, 130, "green", "SE", () => {
			g.game.audio.play(sound1Asset);
		});
		scene.append(soundRect);
		let bgm;
		const bgm1Asset = scene.asset.getAudio("/audio/bgm1");
		const bgmRect = createButtonRect(scene, 120, 130, "blue", "BGM", () => {
			if (!bgm) {
				bgm = g.game.audio.create(bgm1Asset);
				bgm.play();
				bgm.changeVolume(currentVolume);
			} else {
				bgm.stop();
				bgm = null;
			}
		});
		scene.append(bgmRect);
		const VolumeBarEntity = createVolumeBarEntity(scene, 240, 60, currentVolume, (volume) => {
			currentVolume = volume;
			if (bgm) {
				bgm.changeVolume(currentVolume);
			}
		});
		scene.append(VolumeBarEntity);
	});
	g.game.pushScene(scene);
}
  
function createButtonRect(scene, x, y, color, text, clickHandler) {
	const rect = new g.FilledRect({
		scene: scene,
		x: x,
		y: y,
		width: 60,
		height: 60,
		cssColor: color,
		touchable: true
	});
	const label = new g.Label({
		scene: scene,
		text: text,
		font: font,
		fontSize: 0.5 * font.size,
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

function createVolumeBarEntity(scene, x, y, volume, chageVolumeFunc) {
	const entity = new g.E({
		scene: scene,
		width: 50,
		height: 200,
		x: x,
		y: y
	});
	const bar = new g.FilledRect({
		scene: scene,
		width: 30,
		height: 160,
		x: 10,
		y: 20,
		cssColor: "black",
		touchable: true
	});
	entity.append(bar);
	const cursor = new g.FilledRect({
		scene: scene,
		width: 50,
		height: 20,
		x: 0,
		y: 160 * (1 - volume) + 10,
		cssColor: "black",
		touchable: true
	});
	entity.append(cursor);
	bar.onPointUp.add((e) => {
		cursor.y = bar.y + e.point.y;
		moveCursor(cursor, chageVolumeFunc);
	});
	cursor.onPointMove.add((e) => {
		cursor.y += e.prevDelta.y;
		moveCursor(cursor, chageVolumeFunc);
	});
	return entity;
}

function moveCursor(cursor, chageVolumeFunc) {
	if (cursor.y < 10) {
		cursor.y = 10;
	} else if (cursor.y > 170) {
		cursor.y = 170;
	}
	cursor.modified();
	if (chageVolumeFunc) {
		chageVolumeFunc(1 - (cursor.y - 10) / 160);
	}
}
  
module.exports = main;

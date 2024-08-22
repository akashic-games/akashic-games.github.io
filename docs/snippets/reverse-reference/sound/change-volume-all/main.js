var font = new g.DynamicFont({
	game: g.game,
	fontFamily: "sans-serif",
	size: 48
});

function main() {
	var scene = new g.Scene({ game: g.game, assetPaths: ["/audio/sound1", "/audio/bgm1"] });
	scene.onLoad.add(function() {
		var isPlayingBgm = false;
		var soundRect = createButtonRect(scene, 30, 130, "green", "SE", () => {
			scene.asset.getAudio("/audio/sound1").play();
		});
		scene.append(soundRect);
		var bgmRect = createButtonRect(scene, 120, 130, "blue", "BGM", () => {
			isPlayingBgm = !isPlayingBgm;
			if (isPlayingBgm) {
				scene.asset.getAudio("/audio/bgm1").play();
			} else {
				scene.asset.getAudio("/audio/bgm1").stop();
			}
		});
		scene.append(bgmRect);
		var VolumeBarEntity = createVolumeBarEntity(scene, 240, 60, 1, (volume) => {
			g.game.audio.music.volume = volume;
			g.game.audio.sound.volume = volume;
		});
		scene.append(VolumeBarEntity);
	});
	g.game.pushScene(scene);
}
  
function createButtonRect(scene, x, y, color, text, clickHandler) {
	var rect = new g.FilledRect({
		scene: scene,
		x: x,
		y: y,
		width: 60,
		height: 60,
		cssColor: color,
		touchable: true
	});
	var label = new g.Label({
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
	var entity = new g.E({
		scene: scene,
		width: 50,
		height: 200,
		x: x,
		y: y
	});
	var bar = new g.FilledRect({
		scene: scene,
		width: 30,
		height: 160,
		x: 10,
		y: 20,
		cssColor: "black",
		touchable: true
	});
	entity.append(bar);
	var cursor = new g.FilledRect({
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

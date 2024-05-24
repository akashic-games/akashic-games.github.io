var font = new g.DynamicFont({
	game: g.game,
	fontFamily: "sans-serif",
	size: 48
});

function main() {
	var scene = new g.Scene({ game: g.game, assetIds: ["sound1", "bgm1"] });
	scene.onLoad.add(function() {
		var bgmPlayer = null;
		var currentVolume = 1;
		var soundRect = createButtonRect(scene, 30, 130, "green", "SE", () => {
			scene.asset.getAudioById("sound1").play();
		});
		scene.append(soundRect);
		var bgmRect = createButtonRect(scene, 120, 130, "blue", "BGM", () => {
			if (!bgmPlayer) {
				bgmPlayer = scene.asset.getAudioById("bgm1").play();
				bgmPlayer.changeVolume(currentVolume);
			} else {
				bgmPlayer.stop();
				bgmPlayer = null;
			}
		});
		scene.append(bgmRect);
		var VolumeBarEntity = createVolumeBarEntity(scene, 240, 60, currentVolume, (volume) => {
			currentVolume = volume;
			if (bgmPlayer) {
				bgmPlayer.changeVolume(currentVolume);
			}
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

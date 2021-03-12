function main() {
	var scene = new g.Scene({game: g.game});

	scene.onLoad.add(function () {

		scene.onPointDownCapture.addOnce(function(ev) {
			scene.requestAssets([{
				id: "requestImage",
				uri: "./image/player.png",
				type: "image",
				width: 63,
				height: 53
			}], () => {
				scene.onAssetLoadFailure.addOnce(function(errInfo) {
					console.log(errInfo);
				});

				if (scene.assets.requestImage != null) {
					const imageAsset = scene.asset.getImageById("requestImage");
					scene.append(createSprite(scene, imageAsset, ev.point.x, ev.point.y));
				}
			});
		});
	});
	g.game.pushScene(scene);
}

function createSprite(scene, asset, x, y) {
	return new g.Sprite({
		scene: scene,
		src: asset,
		width: asset.width,
		height: asset.height,
		x: x,
		y: y
	});
}

module.exports = main;

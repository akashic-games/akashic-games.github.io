function main() {
	var scene = new g.Scene({game: g.game});
	scene.onLoad.add(function () {
		scene.onPointDownCapture.addOnce(function(ev) {
			scene.requestAssets({
				assetIds: [{
					id: "requestImage",
					uri: "./image/player.png",
					type: "image",
					width: 63,
					height: 53
				}],
				notifyErrorOnCallback: true,
			}, (err) => {
				if (err) {
					// 読み込み失敗時はコンソールに表示して何もしない
					console.error(err);
					return;
				}

				// 読み込みできていればシーンのアセットとしてアクセス可能
				const imageAsset = scene.asset.getImageById("requestImage");
				scene.append(createSprite(scene, imageAsset, ev.point.x, ev.point.y));
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

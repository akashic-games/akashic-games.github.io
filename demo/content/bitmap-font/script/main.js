function main(param) {
	const scene = new g.Scene({
		game: g.game,
		assetIds: [
			"mplus1c_regular_jis1",
			"mplus1c_regular_jis1_glyph"
		]
	});
	scene.loaded.add(function() {
		// 背景の黒
		var bg = new g.FilledRect({
			scene: scene,
			cssColor: "black",
			x: 0,
			y: 0,
			width: g.game.width,
			height: g.game.height
		});
		scene.append(bg);

		// BitmapFont を生成
		var glyph = JSON.parse(scene.assets["mplus1c_regular_jis1_glyph"].data);
		var font = new g.BitmapFont({
			src: scene.assets["mplus1c_regular_jis1"],
			map: glyph.map,
			defaultGlyphWidth: glyph.width,
			defaultGlyphHeight: glyph.height,
			missingGlyph: glyph.missingGlyph
		});

		// 左アラインのラベル
		var label1 = new g.Label({
			scene: scene,
			font: font,
			fontSize: 20,
			x: 0,
			y: 100,
			text: "吾輩は猫である。"
		});
		scene.append(label1);

		// 中央アラインのラベル
		var label2 = new g.Label({
			scene: scene,
			font: font,
			fontSize: 20,
			x: 0,
			y: 130,
			width: g.game.width,
			textAlign: g.TextAlign.Center,
			widthAutoAdjust: false, // Centerなのでwidthを自動調整させない
			text: "名前はまだ無い。"
		});
		scene.append(label2);

		// 右アラインのラベル
		var label3 = new g.Label({
			scene: scene,
			font: font,
			fontSize: 20,
			x: 0,
			y: 160,
			width: g.game.width,
			textAlign: g.TextAlign.Right,
			widthAutoAdjust: false, // Rightなのでwidthを自動調整させない
			text: "どこで生れたかとんと見当がつかぬ。"
		});
		scene.append(label3);

		// 各ラベルをクリックすると色とサイズが変わるように設定
		[label1, label2, label3].forEach(function (l) {
			var flag = false;
			l.touchable = true; // ポイントイベントを受け取るよう指定
			l.pointUp.add(function () {
				flag = !flag;
				if (flag) {
					l.fontSize = 25;
					l.textColor = "red";  // フォント画像に赤で着色する
				} else {
					l.fontSize = 20;
					l.textColor = undefined; // 画像本来の色を使う
				}
				l.invalidate(); // ラベルの色やサイズ変更はmodified()ではなくinvalidate()が必要
			});
		});
	});
	g.game.pushScene(scene);
}

module.exports = main;

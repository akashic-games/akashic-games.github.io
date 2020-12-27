function main(param) {
	var scene = new g.Scene({
		game: g.game,
		assetIds: ["font", "font_glyphs"]
	});
	scene.onLoad.add(function () {
		// font.png と font_glyphs.json に対応するアセットを取得
		var fontAsset = g.game.scene().asset.getImageById("font");
		var fontGlyphAsset = g.game.scene().asset.getTextById("font_glyphs");

		// テキストアセット (JSON) の内容をオブジェクトに変換
		var glyphInfo = JSON.parse(fontGlyphAsset.data);

		// ビットマップフォントを生成
		var font = new g.BitmapFont({
			src: fontAsset,
			glyphInfo: glyphInfo
		});
		var label = new g.Label({
			scene: g.game.scene(),
			text: "「こんにちは、アカシックエンジンです」",
			fontSize: 20,
			font: font
		});

		// 画面中央に配置
		label.x = (g.game.width - label.width) / 2;
		label.y = (g.game.height - label.height) / 2;
		label.modified();

		scene.append(label);
	});
	g.game.pushScene(scene);
}
module.exports = main;

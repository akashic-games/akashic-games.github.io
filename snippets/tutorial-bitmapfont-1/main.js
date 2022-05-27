function main(param) {
	const scene = new g.Scene({
		game: g.game,
		assetIds: ["font", "font_glyphs"]
	});
	scene.onLoad.add(() => {
		// font.png と font_glyphs.json に対応するアセットを取得
		const fontAsset = g.game.scene().asset.getImageById("font");
		const fontGlyphAsset = g.game.scene().asset.getTextById("font_glyphs");

		// テキストアセット (JSON) の内容をオブジェクトに変換
		const glyphInfo = JSON.parse(fontGlyphAsset.data);

		// ビットマップフォントを生成
		const font = new g.BitmapFont({
			src: fontAsset,
			glyphInfo: glyphInfo
		});
		const label = new g.Label({
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

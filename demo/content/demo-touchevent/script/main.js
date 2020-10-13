var game = g.game;
module.exports = function () {
    var scene = new g.Scene({
        game: game,
        assetIds: ["switch"]
    });

    scene.onLoad.add(function() {
        var back = new g.FilledRect({
            scene: scene,
            cssColor: "#282840",
            opacity: 0.5,
            width: game.width,
            height: game.height
        });

        // スイッチのフレームスプライトを生成
        var sw = new g.FrameSprite({
            scene: scene,

            // オンとオフの画像(それぞれ縦横48ピクセル)が２つ並んだ画像を使用
            src: scene.asset.getImageById("switch"),

            // 画面の中央に配置
            x: (game.width - 48) / 2,
            y: (game.height - 48) / 2,

            // 表示サイズ
            width: 48,
            height: 48,

            // 画像片サイズ
            srcWidth: 48,
            srcHeight: 48,

            // 画像片の表示順
            frames: [1, 0],

            // タッチイベントを検出できるように設定
            touchable: true
        });

        // スイッチがタッチされた時の処理を登録
        sw.onPointDown.add(function() {
            // フレーム番号を 0, 1 で切り替え
            sw.frameNumber++;
            sw.frameNumber %= 2;
            sw.modified();

            if (back.visible()) {
                back.hide();
            } else {
                back.show();
            }
        });

        scene.append(sw);

        // backはswの前面に配置されますが、touchable=trueとしてないので、ポイントイベント
        // の判定対象となりません。そのため、swは背面にあってもポイントイベントを
        // 検出することが出来ます。
        scene.append(back);
    });

    g.game.pushScene(scene);
}

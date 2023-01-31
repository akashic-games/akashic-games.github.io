function main(param) {
    const scene = new g.Scene({game: g.game, assetIds: []});

    scene.onLoad.add(() => {
        let pointCount = 0;
        const size = 20;
        // タッチされた位置に短形を追加します。
        // 同時にタッチされた場合、2 つ目のタッチイベントでは赤色の短形を追加します。
        scene.onPointDownCapture.add((ev) => {
            pointCount++;
            const color = pointCount === 2 ? "red" : "black";
            const rect = new g.FilledRect({
                scene: scene,
                x: ev.point.x - size / 2,
                y: ev.point.y - size / 2,
                width: size,
                height: size,
                cssColor: color
            });
            scene.append(rect);
        });
        
        scene.onPointUpCapture.add((ev) => {
            pointCount--;
        });
    });
    g.game.pushScene(scene);
}
module.exports = main;

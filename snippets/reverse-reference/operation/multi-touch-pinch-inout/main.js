function main(param) {
    const scene = new g.Scene({ game: g.game, assetIds: [] });
    scene.onLoad.add(() => {
        const rect = new g.FilledRect({
            scene: scene,
            width: 50,
            height: 50,
            anchorX: 0.5,
            anchorY: 0.5,
            cssColor: "red"
        });
        // 短形の座標を画面の中心に設定します
        rect.x = g.game.width / 2;
        rect.y = g.game.height / 2;
        scene.append(rect);
        
        const pointCache = {};
        let baseDistance = 0;
        scene.onPointDownCapture.add((ev) => {
            if (!pointCache[ev.pointerId])
                pointCache[ev.pointerId] = ev.point;
            const keys = Object.keys(pointCache);
            if (keys.length === 2) {
                const point1 = pointCache[keys[0]];
                const point2 = pointCache[keys[1]];
                // pointDown 時の 2点の距離を保持
                baseDistance = calcDistance(point1, point2);
            }
        });
        scene.onPointMoveCapture.add((ev) => {
            const keys = Object.keys(pointCache);
            const index = keys.findIndex((key) => key === ev.pointerId.toString());
            if (pointCache[keys[index]])
                pointCache[keys[index]] = ev.startDelta; // startDelta は PointDownEvent 時からの移動量
            if (keys.length === 2) {
                const point1 = pointCache[keys[0]];
                const point2 = pointCache[keys[1]];
                // 2点間の距離
                const moveDistance = calcDistance(point1, point2);
                const distance = baseDistance + moveDistance;
                // rect の scale を算出
                const scale = Math.floor((distance / baseDistance) * 10) / 10;
                rect.scale(scale);
                rect.modified();
            }
        });
        scene.onPointUpCapture.add((ev) => {
            // ev.pointerId に紐付く情報を削除
            if (pointCache[ev.pointerId])
                delete pointCache[ev.pointerId];
        });
    });
    g.game.pushScene(scene);
}
// ２点の距離を小数点第1位で切り捨て算出
function calcDistance(point1, point2) {
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return Math.floor(distance * 10) / 10;
}
module.exports = main;

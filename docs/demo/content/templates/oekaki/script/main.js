"use strict";
/**
 * ペンの太さ
 */
const LINE_WIDTH = 3;
/**
 * ペンの色
 */
const LINE_COLOR = "black";
function main() {
    const scene = new g.Scene({ game: g.game });
    scene.onLoad.add(() => {
        const pointers = {};
        scene.onPointDownCapture.add(ev => {
            const buffer = new g.E({ scene, x: ev.point.x, y: ev.point.y });
            pointers[ev.pointerId] = buffer;
            scene.append(buffer);
            const dot = createDot({ x: 0, y: 0 });
            buffer.append(dot);
        });
        scene.onPointMoveCapture.add(ev => draw(ev));
        scene.onPointUpCapture.add(ev => {
            draw(ev);
            scene.append(convertToSprite(pointers[ev.pointerId]));
            pointers[ev.pointerId].remove();
            pointers[ev.pointerId].destroy();
            delete pointers[ev.pointerId];
        });
        /**
         * ドットを生成
         */
        function createDot(p) {
            return new g.FilledRect({
                scene: scene,
                cssColor: LINE_COLOR,
                width: LINE_WIDTH,
                height: LINE_WIDTH,
                x: p.x,
                y: p.y,
                anchorX: 0.5,
                anchorY: 0.5
            });
        }
        /**
         * ドットで構成された線を描く
         */
        function draw(ev) {
            const rad = Math.atan2(ev.prevDelta.y, ev.prevDelta.x);
            const step = { x: Math.cos(rad), y: Math.sin(rad) };
            const p = {
                x: ev.startDelta.x - ev.prevDelta.x,
                y: ev.startDelta.y - ev.prevDelta.y
            };
            const isFinish = () => step.x * (p.x - ev.startDelta.x) >= 0 && step.y * (p.y - ev.startDelta.y) >= 0;
            while (!isFinish()) {
                // 最後にpointDownが発生した座標とpointMoveが発生した座標の差分を単位ベクトル step 分ずらした dot で埋めていく
                p.x += step.x;
                p.y += step.y;
                const dot = createDot({ x: p.x, y: p.y });
                pointers[ev.pointerId].append(dot);
            }
        }
        /**
         * 線を g.Sprite に変換
         */
        const convertToSprite = (target) => {
            const min = { x: 0, y: 0 };
            const max = { x: 0, y: 0 };
            target.children.forEach(c => {
                min.x = Math.min(min.x, c.x);
                min.y = Math.min(min.y, c.y);
                max.x = Math.max(max.x, c.x);
                max.y = Math.max(max.y, c.y);
            });
            // g.FillRectのアンチエイリアスがかかることを考慮し、マージンを設ける
            const margin = LINE_WIDTH;
            max.x += margin * 2;
            max.y += margin * 2;
            target.children.forEach(c => {
                c.moveBy(-min.x + margin, -min.y + margin);
                c.modified();
            });
            target.width = Math.ceil(max.x - min.x);
            target.height = Math.ceil(max.y - min.y);
            target.modified();
            const sprite = g.SpriteFactory.createSpriteFromE(scene, target);
            // 変換後のspriteのアンカーポイントは中心ではない
            sprite.moveTo(target.x + min.x - margin, target.y + min.y - margin);
            sprite.modified();
            return sprite;
        };
    });
    g.game.pushScene(scene);
}
module.exports = main;

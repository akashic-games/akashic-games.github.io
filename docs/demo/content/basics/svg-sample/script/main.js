"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const akashic_box2d_1 = require("@akashic-extension/akashic-box2d");
module.exports = function () {
    const scene = new g.Scene({
        game: g.game,
        assetIds: ["circle"]
    });
    scene.onLoad.add(() => {
        const circle = scene.asset.getVectorImageById("circle");
        const placeholderSurface = circle.createSurface(100, 100);
        if (!placeholderSurface) {
            console.log("not supported");
            return;
        }
        const box2d = new akashic_box2d_1.Box2D({
            gravity: [0, 9.8],
            scale: 100,
            sleep: true
        });
        scene.onUpdate.add(() => {
            box2d.step(1 / g.game.fps);
        });
        const floor = new g.FilledRect({
            scene: scene,
            cssColor: "darkgray",
            x: 0,
            y: g.game.height,
            width: g.game.width,
            height: 50,
            anchorX: 0,
            anchorY: 1
        });
        scene.append(floor);
        box2d.createBody(floor, box2d.createBodyDef({
            type: akashic_box2d_1.BodyType.Static
        }), box2d.createFixtureDef({
            friction: 0.1,
            restitution: 0.5,
            shape: box2d.createRectShape(floor.width, floor.height)
        }));
        const placeholder = new g.Sprite({
            scene: scene,
            src: placeholderSurface,
            opacity: 0.5,
            hidden: true,
            anchorX: 0.5,
            anchorY: 0.5
        });
        scene.append(placeholder);
        scene.onPointDownCapture.add(e => {
            if (e.target != null) {
                return;
            }
            placeholder.show();
            placeholder.scale(0);
            placeholder.x = e.point.x;
            placeholder.y = e.point.y;
            placeholder.modified();
        });
        scene.onPointMoveCapture.add(e => {
            placeholder.x = e.point.x + e.startDelta.x / 2;
            placeholder.y = e.point.y + e.startDelta.y / 2;
            placeholder.scale(Math.sqrt(e.startDelta.x * e.startDelta.x + e.startDelta.y * e.startDelta.y) / 100);
            placeholder.modified();
        });
        scene.onPointUpCapture.add(() => {
            if (!placeholder.visible()) {
                return;
            }
            placeholder.hide();
            const length = 100 * placeholder.scaleX;
            const circleSurface = circle.createSurface(Math.floor(length), Math.floor(length));
            if (length < 10) {
                return;
            }
            const circleSprite = new g.Sprite({
                scene: scene,
                src: circleSurface,
                x: placeholder.x,
                y: placeholder.y,
                anchorX: 0.5,
                anchorY: 0.5,
                touchable: true
            });
            const removeCircleSprite = () => {
                scene.setTimeout(() => {
                    if (circleSprite.destroyed())
                        return;
                    circleSprite.destroy(true);
                    box2d.removeBody(circleBody);
                }, 0);
            };
            circleSprite.onUpdate.add(() => {
                if (circleSprite.y < 0) {
                    removeCircleSprite();
                }
            });
            const circleBody = box2d.createBody(circleSprite, box2d.createBodyDef({
                type: akashic_box2d_1.BodyType.Dynamic
            }), box2d.createFixtureDef({
                friction: 0.2,
                restitution: 0.5,
                density: 10,
                shape: box2d.createCircleShape(circleSprite.width)
            }));
            circleSprite.onPointDown.addOnce(() => {
                removeCircleSprite();
            });
            scene.append(circleSprite);
        });
    });
    g.game.pushScene(scene);
};

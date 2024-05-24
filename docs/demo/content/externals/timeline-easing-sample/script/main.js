const aimgui = require("@akashic-extension/aimgui");
const tl = require("@akashic-extension/akashic-timeline");
const EasingGraphE_1 = require("./EasingGraphE");
const PlotE_1 = require("./PlotE");
const highlightColor = "#00BFFF";
function main(param) {
    const scene = new g.Scene({
        game: g.game,
    });
    const easingFunctions = {
        linear: tl.Easing.linear,
        easeInQuad: tl.Easing.easeInQuad,
        easeOutQuad: tl.Easing.easeOutQuad,
        easeInOutQuad: tl.Easing.easeInOutQuad,
        easeInCubic: tl.Easing.easeInCubic,
        easeOutCubic: tl.Easing.easeOutCubic,
        easeInOutCubic: tl.Easing.easeInOutCubic,
        easeInQuart: tl.Easing.easeInQuart,
        easeOutQuart: tl.Easing.easeOutQuart,
        easeInQuint: tl.Easing.easeInQuint,
        easeOutQuint: tl.Easing.easeOutQuint,
        easeInOutQuint: tl.Easing.easeInOutQuint,
        easeInSine: tl.Easing.easeInSine,
        easeOutSine: tl.Easing.easeOutSine,
        easeInOutSine: tl.Easing.easeInOutSine,
        easeInExpo: tl.Easing.easeInExpo,
        easeInOutExpo: tl.Easing.easeInOutExpo,
        easeInCirc: tl.Easing.easeInCirc,
        easeOutCirc: tl.Easing.easeOutCirc,
        easeInOutCirc: tl.Easing.easeInOutCirc,
        easeInOutBack: tl.Easing.easeInOutBack,
        easeOutBounce: tl.Easing.easeOutBounce
    };
    const playState = {
        easingName: "linear",
        t: 0,
        att: 0.5,
        numOfFlash: 4,
        state: "playing",
        loop: true
    };
    scene.onLoad.add(() => {
        const bg = new g.FilledRect({
            scene: scene,
            width: g.game.width,
            height: g.game.height,
            cssColor: "white"
        });
        const uiFont = new g.DynamicFont({
            game: g.game,
            fontFamily: "monospace",
            size: 13,
            fontColor: "white"
        });
        const guiE = new aimgui.GuiE({
            scene: scene,
            width: g.game.width,
            height: g.game.height,
            font: uiFont
        });
        const graphFont = new g.DynamicFont({
            game: g.game,
            fontFamily: "monospace",
            size: 16,
            fontWeight: "bold",
            fontColor: "black"
        });
        const easingGraphE = new EasingGraphE_1.EasingGraphE({
            scene: scene,
            x: 48,
            y: 96,
            width: 320,
            height: 240,
            font: graphFont,
            title: playState.easingName,
            easingFn: easingFunctions[playState.easingName]
        });
        const easingPointE = new g.FilledRect({
            scene: scene,
            width: 16,
            height: 16,
            cssColor: highlightColor,
            anchorX: 0.5,
            anchorY: 0.5
        });
        const plotE = new PlotE_1.PlotE({
            scene: scene,
            x: easingGraphE.width + 16,
            width: 32,
            height: easingGraphE.height,
        });
        const easingESize = 48;
        const sizeEasingBaseE = new g.FilledRect({
            scene: scene,
            x: plotE.width + 32 + 16,
            y: plotE.height / 6,
            width: easingESize,
            height: easingESize,
            cssColor: "silver",
            anchorX: 0.5,
            anchorY: 0.5,
        });
        const sizeEasingE = new g.FilledRect({
            scene: scene,
            x: easingESize / 2,
            y: easingESize / 2,
            width: easingESize,
            height: easingESize,
            cssColor: highlightColor,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        const opacityEasingE = new g.FilledRect({
            scene: scene,
            x: plotE.width + 32 + 16,
            y: plotE.height / 6 * 3,
            width: easingESize,
            height: easingESize,
            cssColor: highlightColor,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        const rotationEasingE = new g.FilledRect({
            scene: scene,
            x: plotE.width + 32 + 16,
            y: plotE.height / 6 * 5,
            width: easingESize,
            height: easingESize,
            cssColor: highlightColor,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        const windowWidth = Math.round(g.game.width / 4);
        guiE.run = (ui) => {
            ui.window("Easing")
                .size(windowWidth, g.game.height - 16)
                .position(g.game.width - windowWidth - 8, 8)
                .resizable(false)
                .titleBar(false)
                .show((ui) => {
                ui.slider("Time", playState, "t", 0, 1);
                ui.horizontal("play controller", (ui) => {
                    if (playState.state === "playing") {
                        if (ui.button("Stop")) {
                            playState.state = "stop";
                        }
                    }
                    else {
                        if (ui.button("Play")) {
                            if (playState.t >= 1) {
                                playState.t = 0;
                            }
                            playState.state = "playing";
                        }
                    }
                    ui.checkbox("ループ", playState, "loop");
                });
                let easingFunctionChanged = false;
                ui.collapsing("イージング関数", (ui) => {
                    for (let key in easingFunctions) {
                        if (Object.prototype.hasOwnProperty.call(easingFunctions, key)) {
                            const clicked = ui.radioButton(key, playState, "easingName", key);
                            easingFunctionChanged = easingFunctionChanged || clicked;
                        }
                    }
                });
                if (easingFunctionChanged) {
                    easingGraphE.title = playState.easingName;
                    easingGraphE.easingFn = easingFunctions[playState.easingName];
                    easingGraphE.updateEasingGraph();
                }
                if (playState.state === "playing") {
                    playState.t += 1 / g.game.fps;
                    if (playState.loop) {
                        if (playState.t > 1) {
                            playState.t = 0;
                        }
                    }
                    else {
                        if (playState.t > 1) {
                            playState.t = 1;
                            playState.state = "stop";
                        }
                    }
                }
                const easingValue = easingGraphE.easing(playState.t);
                const pos = easingGraphE.easingPosition(playState.t);
                easingPointE.x = pos.x;
                easingPointE.y = pos.y;
                easingPointE.modified();
                sizeEasingE.scale(easingValue);
                sizeEasingE.modified();
                opacityEasingE.opacity = easingValue;
                opacityEasingE.modified();
                rotationEasingE.angle = easingValue * 360;
                rotationEasingE.modified();
                plotE.value = easingGraphE.easing(playState.t);
                plotE.modified();
            });
        };
        scene.append(bg);
        scene.append(easingGraphE);
        easingGraphE.append(plotE);
        plotE.append(sizeEasingBaseE);
        sizeEasingBaseE.append(sizeEasingE);
        plotE.append(opacityEasingE);
        plotE.append(rotationEasingE);
        easingGraphE.append(easingPointE);
        scene.append(guiE);
    });
    g.game.pushScene(scene);
}
module.exports = main;

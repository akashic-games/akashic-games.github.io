const aimgui = require("@akashic-extension/aimgui");
function main(_param) {
    const scene = new g.Scene({ game: g.game, assetIds: ["se"] });
    scene.onLoad.add(() => {
        const background = new g.FilledRect({
            scene: scene,
            cssColor: "#2C7CFF",
            width: g.game.width,
            height: g.game.height
        });
        scene.append(background);
        const font = new g.DynamicFont({
            game: g.game,
            size: 13,
            fontFamily: "monospace",
            fontColor: "white"
        });
        const guiE = new aimgui.GuiE({
            scene,
            width: g.game.width,
            height: g.game.height,
            font,
            local: true
        });
        const valueObject = {
            sliderValue: 0.5,
            checkBoxBoolean: false,
            radioButtonValue: "rb1",
            scrollToBottom: false
        };
        let text = "";
        let showModalWindow = true;
        guiE.run = gui => {
            if (showModalWindow) {
                gui.modalWindow("Let's Try AimGui !")
                    .size(256, 46)
                    .show(gui => {
                    gui.horizontal("horizon", gui => {
                        if (gui.button("START")) {
                            showModalWindow = false;
                        }
                    });
                });
            }
            else {
                gui.window("Debug Tool")
                    .position(16, 16)
                    .size(240, 240)
                    .show(gui => {
                    gui.label("Super Cool Game v0.1.0");
                    gui.margin("margin 1");
                    if (gui.button("Back to Title")) {
                        showModalWindow = true;
                        console.log("back-to-title Button clicked!");
                    }
                    if (gui.checkbox("Weapon Setting", valueObject, "checkBoxBoolean")) {
                        console.log(`Show-RadioButton checkbox value ${valueObject.checkBoxBoolean}`);
                    }
                    if (valueObject.checkBoxBoolean) {
                        gui.horizontal("checkboxes", _ui => {
                            if (gui.radioButton("Sword⚔️", valueObject, "radioButtonValue", "rb1")) {
                                console.log(`checkbox value ${valueObject.radioButtonValue}`);
                            }
                            if (gui.radioButton("Axe🪓", valueObject, "radioButtonValue", "rb2")) {
                                console.log(`checkbox value ${valueObject.radioButtonValue}`);
                            }
                            if (gui.radioButton("Wand🪄", valueObject, "radioButtonValue", "rb3")) {
                                console.log(`checkbox value ${valueObject.radioButtonValue}`);
                            }
                        });
                    }
                    gui.collapsing("System", gui => {
                        gui.horizontal("system buttons", gui => {
                            if (gui.button("Save")) {
                                console.log("Save button clicked");
                            }
                            if (gui.button("Load")) {
                                console.log("Load button clicked");
                            }
                        });
                        gui.collapsing("Difficulty Level", gui => {
                            if (gui.button("Easy")) {
                                console.log("Button Easy clicked");
                            }
                            if (gui.button("Normal")) {
                                console.log("Button Normal clicked");
                            }
                            if (gui.button("Hard")) {
                                console.log("Button Hard clicked");
                            }
                        });
                    });
                    if (gui.slider("Volume", valueObject, "sliderValue", 0, 1)) {
                        console.log(`Volume slider value ${valueObject.sliderValue}`);
                    }
                    if (gui.button("Sound Test")) {
                        scene.asset.getAudio("/audio/se").play().changeVolume(valueObject.sliderValue);
                        console.log("sound-test Button clicked");
                    }
                });
                gui.window("Battle Test")
                    .position(320, 96)
                    .size(320, 240)
                    .show(gui => {
                    let newLine = null;
                    gui.horizontal("horizon", gui => {
                        gui.label("Command:");
                        if (gui.button("Attack")) {
                            const monsterName = g.game.random.generate() < 0.5 ? "slime" : "giant";
                            newLine = `The ${monsterName} is defeated!`;
                        }
                        if (gui.button("Spell")) {
                            const monsterName = g.game.random.generate() < 0.5 ? "wolf" : "sorcerer";
                            newLine = `You chanted the spell of Sleep and the ${monsterName} is asleep.`;
                        }
                        if (gui.button("Defend")) {
                            newLine = `Your HP decreased by ${Math.round(g.game.random.generate() * 50)}.`;
                        }
                        if (newLine) {
                            text += text === "" ? newLine : `\n${newLine}`;
                        }
                    });
                    gui.collapsing("Log", gui => {
                        let clicked = false;
                        gui.horizontal("Log UI", gui => {
                            clicked = gui.checkbox("Scroll To Bottom", valueObject, "scrollToBottom");
                            if (gui.button("Clear Log")) {
                                text = "";
                            }
                        });
                        gui.textBox("text box", 128, text);
                        if (valueObject.scrollToBottom && (newLine || clicked)) {
                            const textBoxE = gui.getWidget("text box");
                            if (textBoxE instanceof aimgui.TextBoxE) {
                                textBoxE.scrollToBottom();
                            }
                        }
                    });
                });
            }
        };
        scene.append(guiE);
    });
    g.game.pushScene(scene);
}

module.exports = main;
var aimgui = require("@akashic-extension/aimgui");

function main(_param) {
  var scene = new g.Scene({
    game: g.game,
    assetIds: ["se"]
  });
  scene.onLoad.add(function () {
    var background = new g.FilledRect({
      scene: scene,
      cssColor: "#2C7CFF",
      width: g.game.width,
      height: g.game.height
    });
    scene.append(background);
    var font = new g.DynamicFont({
      game: g.game,
      size: 13,
      fontFamily: "monospace",
      fontColor: "white"
    });
    var guiE = new aimgui.GuiE({
      scene: scene,
      width: g.game.width,
      height: g.game.height,
      font: font
    });
    var valueObject = {
      sliderValue: 0.5,
      checkBoxBoolean: false,
      radioButtonValue: "rb1",
      scrollToBottom: false
    };
    var text = "";
    var showModalWindow = true;

    guiE.run = function (gui) {
      if (showModalWindow) {
        gui.modalWindow("Let's Try AimGui !").size(256, 46).show(function (gui) {
          gui.horizontal("horizon", function (gui) {
            if (gui.button("START")) {
              showModalWindow = false;
            }
          });
        });
      } else {
        gui.window("Debug Tool").position(16, 16).size(240, 240).show(function (gui) {
          gui.label("Super Cool Game v0.1.0");
          gui.margin("margin 1");

          if (gui.button("Back to Title")) {
            showModalWindow = true;
            console.log("back-to-title Button clicked!");
          }

          if (gui.checkbox("Weapon Setting", valueObject, "checkBoxBoolean")) {
            console.log("Show-RadioButton checkbox value " + valueObject.checkBoxBoolean);
          }

          if (valueObject.checkBoxBoolean) {
            gui.horizontal("checkboxes", function (_ui) {
              if (gui.radioButton("Sword⚔️", valueObject, "radioButtonValue", "rb1")) {
                console.log("checkbox value " + valueObject.radioButtonValue);
              }

              if (gui.radioButton("Axe🪓", valueObject, "radioButtonValue", "rb2")) {
                console.log("checkbox value " + valueObject.radioButtonValue);
              }

              if (gui.radioButton("Wand🪄", valueObject, "radioButtonValue", "rb3")) {
                console.log("checkbox value " + valueObject.radioButtonValue);
              }
            });
          }

          gui.collapsing("System", function (gui) {
            gui.horizontal("system buttons", function (gui) {
              if (gui.button("Save")) {
                console.log("Save button clicked");
              }

              if (gui.button("Load")) {
                console.log("Load button clicked");
              }
            });
            gui.collapsing("Difficulty Level", function (gui) {
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
            console.log("Volume slider value " + valueObject.sliderValue);
          }

          if (gui.button("Sound Test")) {
            scene.asset.getAudio("/audio/se").play().changeVolume(valueObject.sliderValue);
            console.log("sound-test Button clicked");
          }
        });
        gui.window("Battle Test").position(320, 96).size(320, 240).show(function (gui) {
          var newLine = null;
          gui.horizontal("horizon", function (gui) {
            gui.label("Command:");

            if (gui.button("Attack")) {
              var monsterName = g.game.random.generate() < 0.5 ? "slime" : "giant";
              newLine = "The " + monsterName + " is defeated!";
            }

            if (gui.button("Spell")) {
              var monsterName = g.game.random.generate() < 0.5 ? "wolf" : "sorcerer";
              newLine = "You chanted the spell of Sleep and the " + monsterName + " is asleep.";
            }

            if (gui.button("Defend")) {
              newLine = "Your HP decreased by " + Math.round(g.game.random.generate() * 50) + ".";
            }

            if (newLine) {
              text += text === "" ? newLine : "\n" + newLine;
            }
          });
          gui.collapsing("Log", function (gui) {
            var clicked = false;
            gui.horizontal("Log UI", function (gui) {
              clicked = gui.checkbox("Scroll To Bottom", valueObject, "scrollToBottom");

              if (gui.button("Clear Log")) {
                text = "";
              }
            });
            gui.textBox("text box", 128, text);

            if (valueObject.scrollToBottom && (newLine || clicked)) {
              var textBoxE = gui.getWidget("text box");

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
"use strict";

var mainSceneController_1 = require("./common/mainSceneController");
module.exports = function () {
  g.game.pushScene(mainSceneController_1.MainSceneController.createMainScene(g.game));
};
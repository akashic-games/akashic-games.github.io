"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var mv = require("./tkool");
function main(param) {
    var _a;
    if (param.sessionParameter.totalTimeLimit) {
        g.game.vars.totalTimeLimit = param.sessionParameter.totalTimeLimit;
    }
    g.game.vars.random = (_a = param.random) !== null && _a !== void 0 ? _a : g.game.random;
    var plugins = g.game.assets.Plugins || undefined;
    if (plugins) {
        mv.PluginManager.setup(JSON.parse(plugins.data));
    }
    mv.SceneManager.run(mv.Scene_Boot);
    mv.SceneManager.update();
}
exports.main = main;

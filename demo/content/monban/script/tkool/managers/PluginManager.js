"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
var PluginManager = /** @class */ (function () {
    function PluginManager() {
    }
    PluginManager.setup = function (plugins) {
        var _this = this;
        plugins.forEach(function (plugin) {
            if (!plugin.status || _this._scripts.indexOf(plugin.name) !== -1) {
                return;
            }
            _this.setParameters(plugin.name, plugin.parameters);
            _this.loadScript(plugin.name);
            _this._scripts.push(plugin.name);
        });
    };
    PluginManager.checkErrors = function () {
        var url = this._errorUrls.shift();
        if (url) {
            throw new Error("Failed to load: ".concat(url));
        }
    };
    PluginManager.parameters = function (name) {
        return this._parameters[name.toLowerCase()] || {};
    };
    PluginManager.setParameters = function (name, parameters) {
        this._parameters[name.toLowerCase()] = parameters;
    };
    PluginManager.loadScript = function (name) {
        if (!g.game.assets[name]) {
            throw new Error("not found asset:");
        }
        g.game._moduleManager._require("".concat(name));
    };
    PluginManager.onError = function (e) {
        this._errorUrls.push(e.target._url);
    };
    PluginManager._scripts = [];
    PluginManager._errorUrls = [];
    PluginManager._parameters = {};
    return PluginManager;
}());
exports.PluginManager = PluginManager;

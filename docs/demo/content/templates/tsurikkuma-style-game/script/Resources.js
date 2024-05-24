"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResources = exports.getResources = void 0;
function getResources() {
    return g.game.vars.resouces;
}
exports.getResources = getResources;
function setResources(resouces) {
    g.game.vars.resouces = resouces;
}
exports.setResources = setResources;

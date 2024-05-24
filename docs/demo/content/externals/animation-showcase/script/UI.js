"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Indicator = exports.ToggleButton = void 0;
/*
 * トグルボタン
 */
class ToggleButton extends g.Sprite {
    constructor(param) {
        super(param);
        this.onoff = param.onoff;
        this.highlight = new g.FilledRect({ scene: param.scene, cssColor: "#208020", width: this.width, height: 2 });
        this.highlight.y = this.height;
        this.append(this.highlight);
        this.toggled = new g.Trigger();
        this.onPointDown.add(this.handlePointDown, this);
        if (param.onoff) {
            this.highlight.show();
        }
        else {
            this.highlight.hide();
        }
    }
    handlePointDown(e) {
        this.toggle();
        this.toggled.fire(this.onoff);
    }
    setState(onoff) {
        if (this.onoff !== onoff) {
            this.toggle();
            this.toggled.fire(this.onoff);
        }
    }
    toggle() {
        this.onoff = !this.onoff;
        if (this.onoff) {
            this.highlight.show();
        }
        else {
            this.highlight.hide();
        }
        this.highlight.modified();
    }
}
exports.ToggleButton = ToggleButton;
/*
 * インジケータ
 */
class Indicator extends g.FilledRect {
    constructor(scene) {
        super({ scene: scene, x: 0, y: scene.game.height - 2, cssColor: "#A0A0A0", width: scene.game.width, height: 2 });
        this.progress = new g.FilledRect({ scene: scene, x: 0, y: 0, cssColor: "#FF6060", width: 0, height: 2 });
        this.append(this.progress);
    }
    set position(p) {
        this.progress.width = this.scene.game.width * p;
    }
}
exports.Indicator = Indicator;

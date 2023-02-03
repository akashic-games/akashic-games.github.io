"use strict";
class Particle {
    constructor(scene) {
        this.scene = scene;
        this.e = new g.FilledRect({ scene: scene, cssColor: "#FF0000", width: 8, height: 8 });
        this.scene.append(this.e);
        this.reset();
    }
    reset() {
        this.x = this.scene.game.width * g.game.random.generate();
        this.y = -8;
        this.vx = ((g.game.random.generate() - 0.5) * 2) * 5;
        this.vy = 0;
        this.avz = 0;
        this.collidable = true;
        this.e.x = this.x;
        this.e.y = this.y;
        this.e.cssColor = "#FF0000";
        this.e.angle = 0;
    }
    collide() {
        this.vy *= -0.75;
        this.avz = (g.game.random.generate() * 2 - 1) * 20;
        this.collidable = false;
        this.e.cssColor = "#7C5684";
    }
    update() {
        if (!Particle.running && this.y === -8) {
            return;
        }
        const acc = 0.4;
        this.vy += acc;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > this.scene.game.width || this.y > this.scene.game.height) {
            this.reset();
        }
        else {
            this.e.x = this.x;
            this.e.y = this.y;
            this.e.angle += this.avz;
            this.e.modified();
        }
    }
}
Particle.running = false;
module.exports = Particle;

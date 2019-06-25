"use strict";
var Particle = /** @class */ (function () {
    function Particle(scene) {
        this.scene = scene;
        this.e = new g.FilledRect({ scene: scene, cssColor: "#FF0000", width: 8, height: 8 });
        this.scene.append(this.e);
        this.reset();
    }
    Particle.prototype.reset = function () {
        this.x = this.scene.game.width * Math.random();
        this.y = -8;
        this.vx = ((Math.random() - 0.5) * 2) * 5;
        this.vy = 0;
        this.avz = 0;
        this.collidable = true;
        this.e.x = this.x;
        this.e.y = this.y;
        this.e.cssColor = "#FF0000";
        this.e.angle = 0;
    };
    Particle.prototype.collide = function () {
        this.vy *= -0.75;
        this.avz = (Math.random() * 2 - 1) * 20;
        this.collidable = false;
        this.e.cssColor = "#7C5684";
    };
    Particle.prototype.update = function () {
        if (!Particle.running && this.y === -8) {
            return;
        }
        var acc = 0.4;
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
    };
    Particle.running = false;
    return Particle;
}());
module.exports = Particle;

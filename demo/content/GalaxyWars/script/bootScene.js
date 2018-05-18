var createTitleScene = require("titleScene");

var game = g.game;

//
// 揺らめくロゴコンストラクタ
//
function Logo(params) {
    g.E.prototype.constructor.call(this, params);
    this.surface = g.Util.asSurface(params.src);

    this.backSurface = game.resourceFactory.createSurface(game.width, game.height);

    this.cntr = 0;
    this.seg = 0;
    this.maxLineScale = 8;
    this.lineScale = this.maxLineScale;
    this.opacity = 0;
}

Logo.prototype = Object.create(g.E.prototype);

Logo.prototype.__update = function() {
    var vScale = this.maxLineScale / (game.fps * 2);

    if (this.seg === 0) {
        this.lineScale -= vScale;
        if (this.lineScale < -3) {
            this.seg++;
        }
    } else if (this.seg === 1) {
        this.lineScale += vScale / 2;
        if (this.lineScale > 0) {
            this.lineScale = 0;
            this.seg++;
        }
    } else if (this.seg === 2) {
        this.scene.setTimeout(2000, function() {
            game.replaceScene(createTitleScene());
        });
        this.seg++;
    }

    this.opacity = Math.min(1, this.opacity + 1 / (game.fps * 3));

    this.cntr++;
}

Logo.prototype.lineLoop = function(callback) {
    var dth = Math.PI * 1 / this.height;
    var oth = Math.PI / game.fps * this.cntr;
    var height = 0;
    for (var i = 0; i < this.height; i++) {
        var th = dth * i + oth;
        var sy = 1 + ((Math.cos(th) + 1) / 2) *  this.lineScale;
        if (callback) {
            callback(sy, height, i);
        }
        height += sy;
    }
    return height;
}

Logo.prototype.renderSelf = function(renderer, camera) {
    // draw on backsurface
    var backRenderer = this.backSurface.renderer();
    backRenderer.begin();
    backRenderer.fillRect(0, 0, this.backSurface.width, this.backSurface.height, "White");
    backRenderer.save();

    var height = this.lineLoop();
    var dx = (game.width - this.width) / 2;
    var dy = (game.height - height) / 2;
    this.lineLoop(function(sy, y, idx) {
        backRenderer.save();
        backRenderer.transform([1, 0, 0, sy * 2, dx, y + dy]);
        backRenderer.drawImage(this.surface, 0, idx, this.width, 1, 0, 0);
        backRenderer.restore();
    }.bind(this));

    backRenderer.restore();
    backRenderer.end();

    // flip
    renderer.save();
    renderer.drawImage(this.backSurface, 0, 0, this.backSurface.width, this.backSurface.height, 0, 0);
    renderer.restore();

    this.__update();

    return true;
}

Logo.prototype.destroy = function() {
    this.backSurface.destroy();
    g.E.prototype.destroy.call(this);
}

//
// ブートシーン生成
//
function createBootScene() {
    var scene = new g.Scene({ game: game });

    scene.loaded.handle(function() {
        var asset = game.assets["akashic"]
        var logo = new Logo({
            scene: scene,
            src: asset,
            width: asset.width,
            height: asset.height
        });
        logo.update.handle(function() {
            logo.modified();
        });
        scene.append(logo);
    });

    return scene;
}

module.exports = createBootScene;

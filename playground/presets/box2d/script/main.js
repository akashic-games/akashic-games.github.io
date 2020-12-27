function main() {
  var b2 = require("@akashic-extension/akashic-box2d");
  var game = g.game;
  var scene = new g.Scene({
    game: game,
    assetIds: ["pink_ball", "arrow_right"]
  });

  scene.onLoad.add(function () {
    // 物理エンジン世界の生成
    var worldOption = {
      gravity: [0, 9.8],
      scale: 50,
      sleep: true
    };
    var box2d = new b2.Box2D(worldOption);

    // 地面の作成
    var floor = new g.FilledRect({
      scene: scene,
      cssColor: "black",
      x: 0,
      y: game.height - 50,
      width: game.width,
      height: 50
    });
    scene.append(floor);

    // Box2Dに地面を追加
    box2d.createBody(
      floor,
      box2d.createBodyDef({
        type: b2.BodyType.Static // 地面を静的物体化
      }),
      box2d.createFixtureDef({
        density: 1.0, // 密度
        friction: 0.5, // 摩擦係数
        restitution: 0.3, // 反発係数
        shape: box2d.createRectShape(floor.width, floor.height) // 四角に設定
      })
    );

    // ドラッグ時の矢印の作成
    var arrow = new g.Sprite({
      scene: scene,
      src: scene.asset.getImageById("arrow_right"),
      anchorX: 0.5,
      anchorY: 0.5,
      hidden: true
    });
    scene.append(arrow);

    // ボールの生成
    var ball = new g.Sprite({
      scene: scene,
      src: scene.asset.getImageById("pink_ball"),
      x: 100,
      y: game.height - 100,
      width: 50,
      height: 50,
      touchable: true
    });
    scene.append(ball);

    // Box2Dにボールを追加
    var ballBody = box2d.createBody(
      ball,
      box2d.createBodyDef({
        type: b2.BodyType.Dynamic // ボールを動的物体化
      }),
      box2d.createFixtureDef({
        density: 1.0, // 密度
        friction: 0.5, // 摩擦係数
        restitution: 0.3, // 反発係数
        shape: box2d.createCircleShape(ball.width) // 円状に設定
      })
    );

    // drag me のラベルの作成
    var dragMe = new g.Label({
      scene: scene,
      font: new g.DynamicFont({
        game: game,
        fontFamily: [
          "Segoe UI", "SegoeUI", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"
        ],
        size: 40
      }),
      anchorX: 0,
      anchorY: 1,
      text: "↓ Drag me!",
      fontSize: 20,
      x: ball.x,
      y: ball.y - 30
    });
    dragMe.onUpdate.add(function () {
      dragMe.opacity = 0.8 + Math.sin(g.game.age % (g.game.fps * 10) / 4) * 0.2;
      dragMe.modified();
    });
    scene.append(dragMe);

    // ドラッグでボールを飛ばす
    ball.onPointUp.addOnce(function (ev) {
      // ドラッグの方向に力積を加える
      ballBody.b2Body.ApplyImpulse(
        box2d.vec2(ev.startDelta.x * 3, ev.startDelta.y * 3),
        ballBody.b2Body.GetPosition()
      );
      dragMe.destroy();
      arrow.destroy();
    });

    // ドラッグ中に矢印の方向を変更
    ball.onPointMove.add(function (ev) {
      var angle = Math.atan2(ev.startDelta.y, ev.startDelta.x) * 180 / Math.PI;
      arrow.angle = angle;
      arrow.x = ball.x + ev.startDelta.x / 2;
      arrow.y = ball.y + ev.startDelta.y / 2;
      arrow.scaleX = Math.sqrt(Math.pow(ev.startDelta.x, 2) + Math.pow(ev.startDelta.y, 2)) / arrow.width;
      arrow.modified();
      arrow.show();
    });

    // ピラミッドの作成
    (function () {
      var floors = 9; // ピラミッドの高さ
      var baseX = game.width - 150; // ピラミッドの最下部の中心のx座標
      var baseY = game.height - 50; // ピラミッドの最下部の中心のy座標
      var blockW = 25; // ブロックの横幅
      var blockH = 35; // ブロックの縦幅
      for (var i = 0; i < floors; i++) {
        for (var j = floors; i < j; j--) {
          var rect = new g.FilledRect({
            scene: scene,
            cssColor: "gray",
            width: blockW,
            height: blockH,
            anchorX: 0.5,
            anchorY: 1,
            x: baseX - (j - floors / 2) * blockW + ((i + 1) / 2) * blockW,
            y: baseY - (i * blockH)
          });
          scene.append(rect);
          box2d.createBody(
            rect,
            box2d.createBodyDef({
              type: b2.BodyType.Dynamic
            }),
            box2d.createFixtureDef({
              density: 0.2,
              friction: 0.3,
              restitution: 0.2,
              shape: box2d.createRectShape(rect.width, rect.height)
            })
          );
        }
      }
    })();

    scene.onUpdate.add(function () {
      // 物理エンジンの世界をすすめる
      box2d.step(1 / game.fps);
    });
  });
  game.pushScene(scene);
}
module.exports = main;

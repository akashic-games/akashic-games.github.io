const tl = require("@akashic-extension/akashic-timeline");

exports.main = (param) => {
    const game = g.game; // よくアクセスするため変数に保持しておく

    // オープニング用シーンの作成
    const openingScene = new g.Scene({
        game,
        assetPaths: [
            "/assets/opening/*"
        ],
    });
    openingScene.onLoad.addOnce(() => {
        const titleLogo = new g.Sprite({
            scene: openingScene,
            src: openingScene.asset.getImage("/assets/opening/breakout_title.png"),
            x: game.width / 2,
            y: game.height / 2,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        openingScene.append(titleLogo);

        const descriptionLogo = new g.Sprite({
            scene: openingScene,
            src: openingScene.asset.getImage("/assets/opening/breakout_description.png"),
            x: game.width / 2,
            y: game.height / 2,
            anchorX: 0.5,
            anchorY: 0.5,
        });

        openingScene.setTimeout(() => {
            titleLogo.destroy();
            openingScene.append(descriptionLogo);
        }, 2000);

        openingScene.setTimeout(() => {
            game.replaceScene(scene);
        }, 6000);
    });
    game.pushScene(openingScene);

    const scene = new g.Scene({
        game,
        assetPaths: [
            "/assets/images/*",
            "/assets/se/*",
            "/assets/fonts/*",
        ],
    });
    const timeline = new tl.Timeline(scene);
    let time = 60; // 制限時間
    if (param.sessionParameter.totalTimeLimit) {
        time = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用
    }
    // ニコ生ゲームのランキングモードでは g.game.vars.gameState.score の値がスコアとして扱われる
    game.vars.gameState = { score: 0 };
    scene.onLoad.add(() => {
        const sePaddleAsset = scene.asset.getAudio("/assets/se/se_paddle");
        const sePaddle = game.audio.create(sePaddleAsset); // se_paddle のオーディオ再生コンテキストを生成
        const seBlockAsset = scene.asset.getAudio("/assets/se/se_block");
        const seBlock = game.audio.create(seBlockAsset); // se_block のオーディオ再生コンテキストを生成
        const seMissAsset = scene.asset.getAudio("/assets/se/se_miss");
        const seMiss = game.audio.create(seMissAsset); // se_miss のオーディオ再生コンテキストを生成
        const seFinishAsset = scene.asset.getAudio("/assets/se/se_finish");
        const seFinish = game.audio.create(seFinishAsset);

        // 背景を作成
        const background = new g.FilledRect({
            scene,
            cssColor: "#fff",
            x: 0,
            y: 0,
            width: game.width,
            height: game.height,
            opacity: 0.5, // 透過度 50% で表示
        });
        scene.append(background); // 背景をシーンに追加

        // ブロックのコンテナを作成
        const blockContainer = new g.E({
            scene,
        });
        scene.append(blockContainer);

        // 残り時間が少ないときの警告表示
        const warning = new g.FilledRect({
            scene,
            cssColor: "#f00",
            x: 0,
            y: 0,
            width: game.width,
            height: game.height,
            opacity: 0, // 初期状態は透過
        });
        scene.append(warning);

        // スコア用のビットマップフォントの作成
        const font = new g.BitmapFont({
            scene,
            src: scene.asset.getImage("/assets/fonts/font-number.png"),
            glyphInfo: scene.asset.getJSONContent("/assets/fonts/font-number_glyphs.json"),
        });

        // スコア表示エンティティの作成
        const scoreLabel = new g.Label({
            scene,
            font,
            fontSize: font.size,
            text: `${game.vars.gameState.score}`,
            x: game.width - 10,
            y: 10,
            anchorX: 1.0,
            anchorY: 0,
        });
        scene.append(scoreLabel);

        // 残り時間 (合計時間から15秒の猶予を持たせる)
        let remainingTime = time - 15;

        // タイマー表示エンティティの作成
        const timerLabel = new g.Label({
            scene,
            font,
            fontSize: font.size,
            text: `${remainingTime}`,
            x: 70,
            y: 10,
            width: 70,
            anchorX: 1.0,
            anchorY: 0,
        });
        scene.append(timerLabel);

        // スコア表示を更新する
        function updateScoreLabel() {
            scoreLabel.text = `${game.vars.gameState.score}`;
            scoreLabel.invalidate();
        }

        // タイマー表示を更新する
        function updateTimer() {
            timerLabel.text = `${remainingTime}`;
            timerLabel.invalidate();
        }

        // paddle を作成
        const paddle = new g.Sprite({
            scene,
            src: scene.asset.getImage("/assets/images/breakout_paddle.png"),
            x: game.width / 2,
            y: game.height - 20,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        scene.append(paddle); // paddle をシーンに追加

        // ball を作成
        const ball = new g.Sprite({
            scene,
            src: scene.asset.getImage("/assets/images/breakout_ball.png"),
            x: paddle.x,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        ball.y = paddle.y - paddle.height / 2 - ball.height / 2 - 5;
        scene.append(ball); // ball をシーンに追加

        // スワイプでパドルが左右に動くようにする
        const paddleMargin = 128 + paddle.width / 2; // ブロックの横幅＋パドルの中心から端までの距離
        scene.onPointMoveCapture.add((event) => {
            if (remainingTime === 0) return true; // 終了後は動かさない

            paddle.x += event.prevDelta.x;

            // パドルの移動範囲を制限
            if (paddle.x <= paddleMargin) {
                paddle.x = paddleMargin;
            } else if (paddle.x >= game.width - paddleMargin) {
                paddle.x = game.width - paddleMargin;
            }

            paddle.modified();
        });

        let direction = normalize([1, 2]);
        let speed = 12;
        let vx = speed * direction[0];
        let vy = speed * direction[1];
        let bonusCount = 0;

        // 残り時間の更新
        const timer = scene.setInterval(() => {
            remainingTime--;
            if (remainingTime === 0) {
                scene.clearInterval(timer); // タイマーの停止
                vx = 0; // ボールの停止
                vy = 0; // ボールの停止
                // 終了ロゴを表示
                const finishLogo = new g.Sprite({
                    scene,
                    src: scene.asset.getImage("/assets/images/breakout_finish.png"),
                    x: game.width / 2,
                    y: game.height / 2,
                    anchorX: 0.5,
                    anchorY: 0.5,
                });
                scene.append(finishLogo);
                seFinish.play();

                // エンディングシーンへと遷移
                scene.setTimeout(() => {
                    game.replaceScene(endingScene);
                }, 3000);
            } else if (remainingTime === 10) {
                const tween = timeline.create(warning, {
                    loop: true, // ループを有効にする
                });
                // 警告用の明滅トゥイーンの作成
                tween
                    .to({ opacity: 0.2 }, 300) // 300 ミリ秒で透過度 20%
                    .to({ opacity: 0 }, 300) // 300 ミリ秒で透過度を 0% に
                    .wait(400)
                    .call(() => {
                        if (remainingTime === 0) tween.cancel(); // 終了したらトゥイーンを終了
                    });
            }
            updateTimer();
        }, 1000);

        let isStarted = false;
        scene.onPointUpCapture.add(() => {
            if (!isStarted) {
                isStarted = true;
            }
        });

        scene.onUpdate.add(() => {
            if (isStarted) {
                ball.x += vx;
                ball.y -= vy;
            } else {
                ball.x = paddle.x;
                ball.y = paddle.y - paddle.height / 2 - ball.height / 2 - 5;
            }

            // ボールが画面の左右に到達したとき
            if ((ball.x > game.width - ball.width / 2) || (ball.x < ball.width / 2)) {
                vx = -vx;
            }
            // ボールが画面の上端に到達したとき
            if (ball.y < ball.height / 2) {
                vy = -vy;
            }
            // ボールが画面の下端に到達したとき
            if (ball.y > game.height + ball.height / 2) {
                isStarted = false;
                vx = speed * direction[0];
                vy = speed * direction[1];
                seMiss.play();
                bonusCount = 0;
            }

            // ボールとパドルが衝突したとき
            if (intersect(ball, paddle)) {
                const h = 30;
                const direction = normalize([ball.x - paddle.x, -(ball.y - (paddle.y + h))]);
                vx = speed * direction[0];
                vy = speed * direction[1];
                sePaddle.play();
                bonusCount = 0;
            }

            for (const block of blockContainer.children) {
                let isCollided = false; // 衝突しているかの情報を保持する変数

                // 上下
                if (
                    pointInRect(ball.x, ball.y - ball.height / 2, block) ||
                    pointInRect(ball.x, ball.y + ball.height / 2, block)
                ) {
                    vy = -vy;
                    isCollided = true;
                }

                // 左右
                else if (
                    pointInRect(ball.x + ball.width / 2, ball.y, block) ||
                    pointInRect(ball.x - ball.width / 2, ball.y, block)
                ) {
                    vx = -vx;
                    isCollided = true;
                }

                if (isCollided) {
                    // 破壊可能のボールと衝突していたら
                    if (block.tag.mapNumber !== 1) {
                        block.destroy(); // ブロックを破壊
                        seBlock.play();
                        const bonusScore = bonusCount * 50; //ボーナスとして加算するスコア
                        game.vars.gameState.score += 100 + bonusScore; // スコアを加算
                        updateScoreLabel(); // スコア表示の更新

                        // ボーナススコアの表示
                        if (bonusCount > 0) {
                            const bonusLabel = new g.Label({
                                scene,
                                font,
                                fontSize: font.size,
                                text: `+${bonusScore}`,
                                x: block.x,
                                y: block.y + block.height / 2 + 10,
                                anchorX: 0.5,
                                anchorY: 0.5,
                            });
                            // 500 ミリ秒後に削除
                            scene.setTimeout(() => {
                                bonusLabel.destroy();
                            }, 500);
                            scene.append(bonusLabel);
                        }

                        bonusCount++;
                        break; // 一度のフレームで一つのブロックのみを削除
                    }
                }
            }

            ball.modified();
        });

        // ブロックのマップデータ
        const blocksMap = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
            [1, 0, 2, 2, 2, 2, 2, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        ];

        // ブロックの作成
        for (let col = 0; col < blocksMap.length; col++) {
            for (let row = 0; row < blocksMap[col].length; row++) {
                const mapNumber = blocksMap[col][row];

                if (mapNumber === 0) continue; // 0 は空白として扱う

                let blockAsset;
                if (mapNumber === 1) {
                    blockAsset = scene.asset.getImage("/assets/images/breakout_block_a.png");
                } else if (mapNumber === 2) {
                    blockAsset = scene.asset.getImage("/assets/images/breakout_block_b.png");
                } else {
                    throw new Error("対象の mapNumber は定義されていません");
                }

                const block = new g.Sprite({
                    scene,
                    x: row * blockAsset.width + blockAsset.width / 2,
                    y: col * blockAsset.height + blockAsset.height / 2,
                    src: blockAsset,
                    width: blockAsset.width,
                    height: blockAsset.height,
                    anchorX: 0.5,
                    anchorY: 0.5,
                    tag: {
                        mapNumber,
                    },
                });

                // ブロックを blockContainer の子として追加
                blockContainer.append(block);
            }
        }

        function normalize(vec) {
            const magnitude = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
            if (magnitude === 0) return vec; // 大きさが 0 の場合は正規化不可のため元のベクトルを返す
            return [vec[0] / magnitude, vec[1] / magnitude];
        }

        // 任意のエンティティの衝突を判定する関数
        function intersect(e1, e2) {
            return g.Collision.intersect(
                e1.x - e1.width / 2,
                e1.y - e1.height / 2,
                e1.width,
                e1.height,
                e2.x - e2.width / 2,
                e2.y - e2.height / 2,
                e2.width,
                e2.height
            );
        }

        // ある座標が矩形と衝突しているかを判定する関数
        function pointInRect(x, y, e) {
            return (
                x >= e.x - e.width / 2 &&
                x <= e.x + e.width / 2 &&
                y >= e.y - e.height / 2 &&
                y <= e.y + e.height / 2
            );
        }
    });

    const endingScene = new g.Scene({
        game,
        assetPaths: [
            "/assets/fonts/*",
            "/assets/ending/*",
        ],
    });
    endingScene.onLoad.addOnce(() => {
        // スコア用フォントの作成
        const font = new g.BitmapFont({
            scene: endingScene,
            src: endingScene.asset.getImage("/assets/fonts/font-number-large.png"),
            glyphInfo: endingScene.asset.getJSONContent("/assets/fonts/font-number-large_glyphs.json"),
        });

        // スコア表示用のパネル表示
        const resultPanel = new g.Sprite({
            scene: endingScene,
            src: endingScene.asset.getImage("/assets/ending/breakout_result.png"),
            x: game.width / 2,
            y: game.height / 2,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        endingScene.append(resultPanel);

        // スコア結果表示エンティティの作成
        const resultScoreLabel = new g.Label({
            scene: endingScene,
            font,
            fontSize: font.size,
            text: `${game.vars.gameState.score}`,
            x: resultPanel.x,
            y: resultPanel.y + 60,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        endingScene.append(resultScoreLabel);
    });
};

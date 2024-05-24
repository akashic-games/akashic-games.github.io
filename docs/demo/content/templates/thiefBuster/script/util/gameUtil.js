"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameUtil = exports.CHAR_CODE_10 = exports.CHAR_CODE_0 = void 0;
/** 0のキャラクターコード */
exports.CHAR_CODE_0 = 48;
/** 9のキャラクターコード+1 */
exports.CHAR_CODE_10 = 58;
/**
 * ゲームから利用するユーティリティ関数群
 */
var gameUtil;
(function (gameUtil) {
    /**
     * MiscAssetInfoTypeのマップからアセット名を配列に追加する
     * @param _map      MiscAssetInfoTypeのマップ
     * @param _assetIds アセット名配列
     */
    function addAssetIdsFromMiscAssetInfoMap(_map, _assetIds) {
        var checkServer = g.game.vars.hasOwnProperty("isServer");
        var isServer = checkServer ? g.game.vars.isServer : false;
        Object.keys(_map).forEach(function (i) {
            var info = _map[i];
            if (checkServer
                && info.hasOwnProperty("isServer")
                && (isServer !== info.isServer)) {
                return;
            }
            _assetIds[_assetIds.length] = info.name;
        });
    }
    gameUtil.addAssetIdsFromMiscAssetInfoMap = addAssetIdsFromMiscAssetInfoMap;
    /**
     * マップオブジェクトの要素の配列を生成する
     * @param _map マップオブジェクト
     * @return     要素の配列
     */
    function getArrayFromMap(_map) {
        var array = [];
        Object.keys(_map).forEach(function (i) {
            array[array.length] = _map[i];
        });
        return array;
    }
    gameUtil.getArrayFromMap = getArrayFromMap;
    /**
     * 与えられたパラメータでBitmapFont生成用のGlyphAreaのマップを生成する
     * @param _charWidth     文字の幅
     * @param _charHeight    文字の高さ
     * @param _charsInRow    1行の文字数
     * @param _charCodeStart 文字コードの開始値
     * @param _charCodeEnd   文字コードの終了値+1
     * @return               GlyphAreaのマップ
     */
    function makeGlyphMap(_charWidth, _charHeight, _charsInRow, _charCodeStart, charCodeEnd) {
        var map = {};
        for (var i = 0; i < (charCodeEnd - _charCodeStart); ++i)
            map[i + _charCodeStart] = {
                x: (i % _charsInRow) * _charWidth,
                y: Math.floor(i / _charsInRow) * _charHeight
            };
        return map;
    }
    gameUtil.makeGlyphMap = makeGlyphMap;
    /**
     * スプライトシートのjsonとフレーム名配列からBitmapFont生成用の
     * GlyphAreaのマップを生成する
     * @param _charCodeStart 文字コードの開始値
     * @param _charCodeEnd   文字コードの終了値+1
     * @param _json          スプライトシートのjson
     * @param _frames        フレーム名配列
     * @return               GlyphAreaのマップ
     */
    function makeGlyphMapFromFrames(_charCodeStart, _charCodeEnd, _json, _frames) {
        var map = {};
        for (var i = 0; i < (_charCodeEnd - _charCodeStart); ++i) {
            var frame = _json.frames[_frames[i]].frame;
            map[i + _charCodeStart] = {
                x: frame.x,
                y: frame.y,
                width: frame.w,
                height: frame.h
            };
        }
        return map;
    }
    gameUtil.makeGlyphMapFromFrames = makeGlyphMapFromFrames;
    /**
     * GlyphAreaのマップに1文字分の情報を追加する
     * @param _oneChar   追加する文字
     * @param _json      スプライトシートのjson
     * @param _frameName フレーム名
     * @param _map       GlyphAreaのマップ
     */
    function addOneGlyphMapFromFrame(_oneChar, _json, _frameName, _map) {
        var frame = _json.frames[_frameName].frame;
        _map[_oneChar.charCodeAt(0)] = {
            x: frame.x,
            y: frame.y,
            width: frame.w,
            height: frame.h
        };
    }
    gameUtil.addOneGlyphMapFromFrame = addOneGlyphMapFromFrame;
    /**
     * AssetInfoの情報からBitmapFontを生成する
     * @param _info   アセット情報
     * @return         生成したBitmapFont
     */
    function createNumFontWithAssetInfo(_info) {
        var frameMap = g.game.scene().asset.getJSONContentById(_info.json);
        var glyphMap = gameUtil.makeGlyphMapFromFrames(exports.CHAR_CODE_0, exports.CHAR_CODE_10, frameMap, _info.numFrames);
        if (_info.nonnumFrames) {
            var iEnd = _info.nonnumFrames.length;
            for (var i = 0; i < iEnd; ++i) {
                var oneChar = _info.nonnumFrames[i];
                addOneGlyphMapFromFrame(oneChar.char, frameMap, oneChar.frame, glyphMap);
            }
        }
        var missingGlyph;
        if (_info.missing) {
            var frame = frameMap.frames[_info.missing].frame;
            missingGlyph = {
                x: frame.x,
                y: frame.y,
                width: frame.w,
                height: frame.h
            };
        }
        var font = new g.BitmapFont({
            src: g.game.scene().asset.getImageById(_info.img),
            map: glyphMap,
            defaultGlyphWidth: _info.fontWidth,
            defaultGlyphHeight: _info.fontHeight,
            missingGlyph: missingGlyph
        });
        return font;
    }
    gameUtil.createNumFontWithAssetInfo = createNumFontWithAssetInfo;
    /**
     * tl.Timeline#createのショートハンド
     * @param  _timeline Timelineインスタンス
     * @param  _entity   Tweenの生成用エンティティ
     * @return           生成されたTween
     */
    function createTween(_timeline, _entity) {
        return _timeline.create(_entity, { modified: _entity.modified, destroyed: _entity.destroyed });
    }
    gameUtil.createTween = createTween;
    /**
     * Matrixのdx項を返すメソッド
     * @param  _matrix Matrixインスタンス
     * @return         dxの値
     */
    function getMatrixDx(_matrix) {
        return _matrix._matrix[4];
    }
    gameUtil.getMatrixDx = getMatrixDx;
    /**
     * Matrixのdy項を返すメソッド
     * @param  _matrix Matrixインスタンス
     * @return         dyの値
     */
    function getMatrixDy(_matrix) {
        return _matrix._matrix[5];
    }
    gameUtil.getMatrixDy = getMatrixDy;
    /**
     * Matrixのdx項を設定するメソッド
     * @param   _matrix Matrixインスタンス
     * @return          設定するdxの値
     */
    function setMatrixDx(_matrix, _dx) {
        _matrix._matrix[4] = _dx;
    }
    gameUtil.setMatrixDx = setMatrixDx;
    /**
     * Matrixのdy項を設定するメソッド
     * @param _matrix Matrixインスタンス
     * @param _dy     設定するdyの値
     */
    function setMatrixDy(_matrix, _dy) {
        _matrix._matrix[5] = _dy;
    }
    gameUtil.setMatrixDy = setMatrixDy;
    /**
     * g.game.vars.gameStateを初期化するメソッド
     */
    function initGameState() {
        var gameState = {
            score: 0,
            isFinished: false
        };
        g.game.vars.gameState = gameState;
        // console.log("initGameState: gameState.score:" + g.game.vars.gameState.score + ".");
    }
    gameUtil.initGameState = initGameState;
    /**
     * g.game.vars.gameStateのスコアを更新するメソッド
     * @param _score スコア値
     */
    function updateGameStateScore(_score) {
        var gameState = g.game.vars.gameState;
        if (gameState && (!gameState.isFinished)) {
            gameState.score = _score;
        }
        // console.log("updateGameStateScore: gameState.score:" + g.game.vars.gameState.score + ".");
    }
    gameUtil.updateGameStateScore = updateGameStateScore;
    /**
     * g.game.vars.scenedataにスコアを保存する
     * @param _score 保存する値
     */
    function setGameScore(_score) {
        g.game.vars.scenedata.gameScore = _score;
        // console.log("setGameScore: gameScore:" + g.game.vars.scenedata.gameScore + ".");
        g.game.vars.gameState.isFinished = true;
    }
    gameUtil.setGameScore = setGameScore;
    /**
     * g.game.vars.scenedataからスコアを取得する
     * @return 取得した値（setGameScoreされていない場合は0）
     */
    function getGameScore() {
        // console.log("getGameScore: gameScore:"+g.game.vars.scenedata.gameScore+".");
        var score = g.game.vars.scenedata.gameScore;
        if (!score) {
            score = 0;
        }
        return score;
    }
    gameUtil.getGameScore = getGameScore;
    /**
     * フレームから秒へ換算する（小数部あり）
     * @param _frame フレーム数
     * @return 秒数
     */
    function frame2Sec(_frame) {
        return (_frame / g.game.fps);
    }
    gameUtil.frame2Sec = frame2Sec;
    /**
     * 秒からフレームへ換算する（小数部あり）
     * @param _seconds 秒数
     * @return フレーム数
     */
    function sec2Frame(_seconds) {
        return (_seconds * g.game.fps);
    }
    gameUtil.sec2Frame = sec2Frame;
    /**
     * フレームからミリ秒へ換算する（小数部あり）
     * @param _frame フレーム数
     * @return ミリ秒数
     */
    function frame2MSec(_frame) {
        return (_frame * 1000 / g.game.fps);
    }
    gameUtil.frame2MSec = frame2MSec;
    /**
     * ミリ秒からフレームへ換算する（小数部あり）
     * @param _milliseconds ミリ秒数
     * @return フレーム数
     */
    function mSec2Frame(_milliseconds) {
        return (_milliseconds / 1000 * g.game.fps);
    }
    gameUtil.mSec2Frame = mSec2Frame;
    /**
     * ゼロ以上で指定した最大値未満のランダムな整数を返す
     * @param _max       最大値
     * @param opt_random (optional)RandomGeneratorインスタンス
     * （省略時はg.game.random[0]を使用する）
     * @return           ランダムな整数
     */
    function getRandomLessThanMax(_max, opt_random) {
        if (!opt_random) {
            opt_random = g.game.random;
        }
        return Math.floor(opt_random.generate() * _max);
    }
    gameUtil.getRandomLessThanMax = getRandomLessThanMax;
    /**
     * 2つの値と比率から中間値を計算する
     * @param  _min 値1
     * @param  _max 値2
     * @param  _rate 比率
     * @return       比率による中間値
     */
    function blendValue(_min, _max, _rate) {
        return (_min + ((_max - _min) * _rate));
    }
    gameUtil.blendValue = blendValue;
    /**
     * bからaに向かう2次元ベクトルを求める
     * @param  _a 2次元ベクトル
     * @param  _b 2次元ベクトル
     * @return    bからaへのベクトル
     */
    function vec2Sub(_a, _b) {
        return { x: (_a.x - _b.x), y: (_a.y - _b.y) };
    }
    gameUtil.vec2Sub = vec2Sub;
    /**
     * スカラー倍した2次元ベクトルを求める
     * @param  _a     2次元ベクトル
     * @param  _scale 倍率
     * @return        scale倍した2次元ベクトル
     */
    function vec2Scale(_a, _scale) {
        return { x: (_a.x * _scale), y: (_a.y * _scale) };
    }
    gameUtil.vec2Scale = vec2Scale;
    /**
     * bからaに向かう2次元ベクトルの長さの2乗を求める
     * @param _a 2次元ベクトル
     * @param _b 2次元ベクトル
     * @return   bからaへのベクトルの長さの2乗
     */
    function vec2SubLengthSq(_a, _b) {
        var dx = _a.x - _b.x;
        var dy = _a.y - _b.y;
        return (dx * dx) + (dy * dy);
    }
    gameUtil.vec2SubLengthSq = vec2SubLengthSq;
    /**
     * 2次元ベクトルの長さを求める
     * @param  _a 2次元ベクトル
     * @return    ベクトルの長さ
     */
    function vec2Length(_a) {
        return Math.sqrt((_a.x * _a.x) + (_a.y * _a.y));
    }
    gameUtil.vec2Length = vec2Length;
    /**
     * 配列をシャッフルして新しい配列を返す
     * @param _array     シャッフルする配列
     * @param opt_random (optional)RandomGeneratorインスタンス
     * （省略時はg.game.random[0]を使用する）
     * @return           シャッフルされた配列
     */
    function shuffle(_array, opt_random) {
        if (!opt_random) {
            opt_random = g.game.random;
        }
        var copyArray = _array.slice();
        var m = copyArray.length;
        var t;
        var i;
        while (m) {
            i = getRandomLessThanMax(--m, opt_random);
            t = copyArray[m];
            copyArray[m] = copyArray[i];
            copyArray[i] = t;
        }
        return copyArray;
    }
    gameUtil.shuffle = shuffle;
})(gameUtil = exports.gameUtil || (exports.gameUtil = {}));

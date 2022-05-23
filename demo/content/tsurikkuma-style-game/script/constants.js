"use strict";
/**
 * ゲーム定数
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.STUCK_DURATION = exports.FISHING_WAIT_DURATION = exports.FISHING_DURATION = exports.TIME_LABEL_FORMAT = exports.SCORE_LABEL_FORMAT = exports.HOOK_POS_WHEN_UP = exports.HOOK_POS = exports.HOOK_SIZE = exports.HOOK_COLOR = exports.ROD_STRING_HEIGHT_WHEN_UP = exports.ROD_STRING_POS = exports.ROD_STRING_SIZE = exports.ROD_STRING_COLOR = exports.ROD_ANGLE = exports.ROD_POS = exports.ROD_SIZE = exports.ROD_COLOR = exports.SWIMMING_TIME_RANGE = exports.FISH_INTERVAL = exports.FISH_FONT_SIZE = exports.BEAR_POS = exports.BEAR_SIZE = exports.BEAR_COLOR = exports.WATERSURFACE_COLOR = exports.WATERSURFACE_POS = exports.GRASS_POS = exports.GRASS_SIZE = exports.GRASS_COLOR = exports.ISLAND_POS = exports.ISLAND_SIZE = exports.ISLAND_COLOR = exports.BACKGROUND_ALPHA = exports.BACKGROUND_COLOR = exports.FONT_FAMILY = exports.FONT_SIZE = exports.TIMELIMIT = void 0;
/**
 * 制限時間(セッションパラメータで制限時間が指定されたらその値を使用します)
 */
exports.TIMELIMIT = 30;
/**
 * フォントサイズ
 */
exports.FONT_SIZE = 36;
/**
 * フォントファミリー
 */
exports.FONT_FAMILY = g.FontFamily.SansSerif;
/**
 * 背景の色
 */
exports.BACKGROUND_COLOR = "#3fa7ff";
/**
 * 背景の透過度
 */
exports.BACKGROUND_ALPHA = 0.8;
/**
 * 島の色
 */
exports.ISLAND_COLOR = "#ffeca8";
/**
 * 島の大きさ
 */
exports.ISLAND_SIZE = { width: 200, height: 80 };
/**
 * 島の座標
 */
exports.ISLAND_POS = { x: 0, y: g.game.height * 0.5 - exports.ISLAND_SIZE.height };
/**
 * 草の色
 */
exports.GRASS_COLOR = "#549637";
/**
 * 草の大きさ
 */
exports.GRASS_SIZE = { width: exports.ISLAND_SIZE.width - 40, height: exports.ISLAND_SIZE.height / 2 };
/**
 * 草の座標
 */
exports.GRASS_POS = { x: 0, y: exports.ISLAND_POS.y - 20 };
/**
 * 水面の高さ
 */
exports.WATERSURFACE_POS = { x: 0, y: g.game.height * 0.4 };
/**
 * 水面の色
 */
exports.WATERSURFACE_COLOR = "#252525";
/**
 * くまの色
 */
exports.BEAR_COLOR = "white";
/**
 * くまの大きさ
 */
exports.BEAR_SIZE = { width: 50, height: 65 };
/**
 * くまの座標
 */
exports.BEAR_POS = { x: 100, y: exports.GRASS_POS.y - exports.BEAR_SIZE.height / 2 };
/**
 * 魚のサイズ（横幅は魚の名前の長さに依存
 */
exports.FISH_FONT_SIZE = 36;
/**
 * 魚の生成間隔[ミリ秒]
 */
exports.FISH_INTERVAL = 2000;
/**
 * 魚が泳ぐ時間範囲[ミリ秒]
 */
exports.SWIMMING_TIME_RANGE = { min: 5000, max: 10000 };
/**
 * 釣り竿の色
 */
exports.ROD_COLOR = "#835031";
/**
 * 釣り竿の大きさ
 */
exports.ROD_SIZE = { width: 3, height: 100 };
/**
 * 釣り竿の座標
 */
exports.ROD_POS = { x: 155, y: 50 };
/**
 * 釣り竿の角度
 */
exports.ROD_ANGLE = 30;
/**
 * 釣り糸の色
 */
exports.ROD_STRING_COLOR = "#252525";
/**
 * 釣り糸の大きさ
 */
exports.ROD_STRING_SIZE = { width: 3, height: 280 };
/**
 * 釣り糸の座標
 */
exports.ROD_STRING_POS = { x: 180, y: exports.ROD_POS.y + 8 };
/**
 * 釣り上げ時の釣り糸の長さ
 */
exports.ROD_STRING_HEIGHT_WHEN_UP = exports.ROD_STRING_SIZE.height / 5;
/**
 * 釣り針の色
 */
exports.HOOK_COLOR = "#525252";
/**
 * 釣り針の大きさ
 */
exports.HOOK_SIZE = { width: exports.FISH_FONT_SIZE, height: exports.FISH_FONT_SIZE };
/**
 * 釣り針の座標
 */
exports.HOOK_POS = { x: exports.ROD_STRING_POS.x - 30, y: exports.ROD_POS.y + exports.ROD_STRING_SIZE.height };
/**
 * 釣り上げ時の釣り針の高さ
 */
exports.HOOK_POS_WHEN_UP = { x: exports.HOOK_POS.x, y: exports.HOOK_POS.y / 4 };
/**
 * スコアラベルフォーマット
 */
exports.SCORE_LABEL_FORMAT = "SCORE:";
/**
 * 制限時間ラベルのフォーマット
 */
exports.TIME_LABEL_FORMAT = "TIME:";
/**
 * 釣りに要する時間[ミリ秒]
 */
exports.FISHING_DURATION = 1000;
/**
 * 釣り待機時間[ミリ秒]
 */
exports.FISHING_WAIT_DURATION = 300;
/**
 * スタック時間[ミリ秒]
 */
exports.STUCK_DURATION = 2000;

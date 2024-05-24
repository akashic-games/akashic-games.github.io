"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convY = exports.convX = exports.symY = exports.symX = exports.alphaY = exports.alphaX = exports.semiVoicedY = exports.semiVoicedX = exports.voicedY = exports.voicedX = exports.smallY = exports.smallX = exports.kanaY = exports.kanaX = exports.toRoman = exports.bChar = exports.smallChar = exports.semiVoicedChar = exports.voicedChar = exports.canSmall = exports.canSemiVoiced = exports.canVoiced = exports.symbol = exports.alpha = exports.digit = exports.hiragana = void 0;
/**
 * 利用するひらがな
 */
exports.hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
/**
 * 利用する数字
 */
exports.digit = "1234567890";
/**
 * 利用するアルファベット
 */
exports.alpha = "abcdefghijklmnopqrstuvwxyz";
/**
 * 利用する記号
 */
exports.symbol = "'，．・？！＝～ー（）「」＜＞＆＃＄％★";
/**
 * 濁点を付けることが可能なひらがな
 */
exports.canVoiced = "かきくけこさしすせそたちつてとはひふへほ";
/**
 * 半濁点を付けることが可能なひらがな
 */
exports.canSemiVoiced = "はひふへほ";
/**
 * 小文字にすることが可能なひらがな
 */
exports.canSmall = "あいうえおつやゆよわ";
/**
 * 濁点付きひらがな
 */
exports.voicedChar = "がぎぐげござじずぜぞだぢづでどばびぶべぼ";
/**
 * 半濁点付きひらがな
 */
exports.semiVoicedChar = "ぱぴぷぺぽ";
/**
 * 小文字ひらがな
 */
exports.smallChar = "ぁぃぅぇぉっゃゅょゎ";
/**
 * ばびぶべぼ
 */
exports.bChar = "ばびぶべぼ";
/**
 * ひらがなローマ字変換
 */
exports.toRoman = {
    あ: "a",
    い: "i",
    う: "u",
    え: "e",
    お: "o",
    か: "ka",
    き: "ki",
    く: "ku",
    け: "ke",
    こ: "ko",
    さ: "sa",
    し: "si",
    す: "su",
    せ: "se",
    そ: "so",
    た: "ta",
    ち: "ti",
    つ: "tu",
    て: "te",
    と: "to",
    な: "na",
    に: "ni",
    ぬ: "nu",
    ね: "ne",
    の: "no",
    は: "ha",
    ひ: "hi",
    ふ: "hu",
    へ: "he",
    ほ: "ho",
    ま: "ma",
    み: "mi",
    む: "mu",
    め: "me",
    も: "mo",
    や: "ya",
    ゆ: "yu",
    よ: "yo",
    ら: "ra",
    り: "ri",
    る: "ru",
    れ: "re",
    ろ: "ro",
    わ: "wa",
    を: "wo",
    ん: "nn"
};
/**
 * ひらがなキー座標
 */
exports.kanaX = [
    8, 88, 168, 248, 328, 444, 524, 604, 684, 764, 880, 960, 1040, 1120, 1200,
    8, 88, 168, 248, 328, 444, 524, 604, 684, 764, 880, 960, 1040, 1120, 1200,
    8, 88, 168, 248, 328, 444, 580, 716, 880, 960, 1040, 1120, 1200,
    8, 144, 280
];
exports.kanaY = [
    216, 216, 216, 216, 216, 216, 216, 216, 216, 216, 216, 216, 216, 216, 216,
    312, 312, 312, 312, 312, 312, 312, 312, 312, 312, 312, 312, 312, 312, 312,
    408, 408, 408, 408, 408, 408, 408, 408, 408, 408, 408, 408, 408,
    504, 504, 504
];
/**
 * 「小」「゛」「゜」キー座標
 */
exports.smallX = 444;
exports.smallY = 504;
exports.voicedX = 580;
exports.voicedY = 504;
exports.semiVoicedX = 716;
exports.semiVoicedY = 504;
/**
 * アルファベットキー座標
 */
exports.alphaX = [
    8, 167, 326, 485, 645, 804, 963, 1122,
    8, 167, 326, 485, 645, 804, 963, 1122,
    8, 167, 326, 485, 645, 804, 963, 1122,
    8, 167
];
exports.alphaY = [
    216, 216, 216, 216, 216, 216, 216, 216,
    312, 312, 312, 312, 312, 312, 312, 312,
    408, 408, 408, 408, 408, 408, 408, 408,
    504, 504
];
/**
 * 記号キー座標
 */
exports.symX = [
    8, 136, 264, 393, 521, 649, 777, 906, 1034, 1162,
    8, 136, 264, 393, 521, 649, 777, 906, 1034, 1162
];
exports.symY = [216, 309, 402];
/**
 * キーボード変更キー座標
 */
exports.convX = [880, 1092];
exports.convY = 504;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 共通演出用画像アセット関連の静的情報
 */
var CommonAssetInfo = /** @class */ (function () {
    function CommonAssetInfo() {
    }
    // tslint:disable-next-line:typedef
    CommonAssetInfo.numResult = {
        img: "img_num_result",
        json: "json_num_result",
        frames: {
            cross: "num_result_0011.png",
            plus: "num_result_0012.png",
            minus: "num_result_0013.png"
        },
        numFrames: [
            "num_result_0001.png",
            "num_result_0002.png",
            "num_result_0003.png",
            "num_result_0004.png",
            "num_result_0005.png",
            "num_result_0006.png",
            "num_result_0007.png",
            "num_result_0008.png",
            "num_result_0009.png",
            "num_result_0010.png"
        ],
        fontWidth: 70,
        fontHeight: 81
    };
    /** リザルトでのtips画像01 */
    CommonAssetInfo.tipsImg01 = { img: "result_chara_img_01" };
    /** リザルトでのtips画像02 */
    CommonAssetInfo.tipsImg02 = { img: "result_chara_img_02" };
    /** リザルトでのtips画像03 */
    CommonAssetInfo.tipsImg03 = { img: "result_chara_img_03" };
    return CommonAssetInfo;
}());
exports.CommonAssetInfo = CommonAssetInfo;

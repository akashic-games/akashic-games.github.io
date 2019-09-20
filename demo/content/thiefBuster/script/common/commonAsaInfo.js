"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 共通演出用画像アセット関連の静的情報
 */
var CommonAsaInfo = /** @class */ (function () {
    function CommonAsaInfo() {
    }
    // tslint:disable-next-line:typedef
    CommonAsaInfo.nwTitle = {
        pj: "pj_nw_title",
        anim: {
            title: "title_title",
            description: "description_description"
        }
    };
    // tslint:disable-next-line:typedef
    CommonAsaInfo.nwCommon = {
        pj: "pj_nw_common",
        anim: {
            fadeRtoL: "fade_RtoL",
            fadeLtoR: "fade_LtoR",
            readyGo: "readygo_readygo",
            gameClear: "gameclear_gameclear",
            timeup: "timeup_timeup",
            result: "result_result",
            timeout: "timeout_timeout",
            gameOver: "gameover_gameover"
        }
    };
    // tslint:disable-next-line:typedef
    CommonAsaInfo.nwInformation = {
        pj: "pj_before_the_start",
        anim: {
            self: "before_the_start_still_1",
            lottery: "before_the_start_still_2",
            ranking: "before_the_start_still_3"
        }
    };
    return CommonAsaInfo;
}());
exports.CommonAsaInfo = CommonAsaInfo;

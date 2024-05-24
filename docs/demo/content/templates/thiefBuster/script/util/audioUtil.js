"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioUtil = void 0;
/**
 * 音声関連のユーティリティ関数群
 */
var audioUtil;
(function (audioUtil) {
    /** 再生中の音声管理情報リスト */
    var playingAudioInfoList = [];
    /** ミュートフラグ */
    var muted = false;
    /**
     * SoundInfoTypeのマップからアセット名を配列に追加する
     * @param _map      SoundInfoTypeのマップ
     * @param _assetIds アセット名配列
     */
    function addAssetIdsFromSoundInfoMap(_map, _assetIds) {
        var checkServer = g.game.vars.hasOwnProperty("isServer");
        var isServer = checkServer ? g.game.vars.isServer : false;
        var isServerStr = isServer ? "true" : "false";
        Object.keys(_map).forEach(function (i) {
            var info = _map[i];
            if (checkServer
                && info.hasOwnProperty("isServer")
                && (isServerStr !== info["isServer"])) {
                return;
            }
            Object.keys(info).forEach(function (j) {
                if (j === "isServer")
                    return;
                var assetId = info[j];
                if (!assetId)
                    return;
                _assetIds[_assetIds.length] = assetId;
            });
        });
    }
    audioUtil.addAssetIdsFromSoundInfoMap = addAssetIdsFromSoundInfoMap;
    /**
     * ミュートフラグを設定するメソッド
     * @param _mute 設定する値
     */
    function setMute(_mute) {
        muted = _mute;
    }
    audioUtil.setMute = setMute;
    /**
     * ミュート状態を取得するメソッド
     * @return ミュート中ならtrue
     */
    function isMuted() {
        return muted;
    }
    audioUtil.isMuted = isMuted;
    /**
     * 指定した音声アセットの g.AudioAsset#inUse を呼ぶ
     * @param _soundId   対象の音声アセット名
     * @return           inUseの戻り値
     */
    function inUse(_soundId) {
        if (!_soundId) {
            return false;
        }
        var asset = g.game.scene().asset.getAudioById(_soundId);
        if (!asset) {
            console.error("AudioUtil.inUse: not found " + _soundId + " in opt_assets.");
            return false;
        }
        return asset.inUse();
    }
    audioUtil.inUse = inUse;
    /**
     * 指定した音声アセットの g.AudioAsset#play を呼ぶ
     * @param _soundId   対象の音声アセット名
     * @return            playの戻り値
     */
    function play(_soundId) {
        if (muted) {
            return null;
        }
        if (!_soundId) {
            return null;
        }
        var asset = g.game.scene().asset.getAudioById(_soundId);
        if (!asset) {
            console.error("AudioUtil.play: not found " + _soundId + " in opt_assets.");
            return null;
        }
        var info = getPlayingAudioInfo(asset);
        if (info === null) {
            playingAudioInfoList.push({ audioAsset: asset, lastPlayStartTime: g.game.getCurrentTime() });
        }
        else {
            info.lastPlayStartTime = g.game.getCurrentTime();
        }
        return asset.play();
    }
    audioUtil.play = play;
    /**
     * 指定した音声アセットの g.AudioAsset#stop を呼ぶ
     * @param _soundId   対象の音声アセット名
     */
    function stop(_soundId) {
        if (!_soundId) {
            return;
        }
        var asset = g.game.scene().asset.getAudioById(_soundId);
        if (!asset) {
            console.error("AudioUtil.stop: not found " + _soundId + " in opt_assets.");
            return;
        }
        var info = getPlayingAudioInfo(asset);
        if (info !== null) {
            info.lastPlayStartTime = g.game.getCurrentTime() - getDuration(_soundId) - 1; // 終了している時間に調整
        }
        asset.stop();
    }
    audioUtil.stop = stop;
    /**
     * 指定した音声アセットの 再生時間を取得するメソッド
     * @param _soundId   対象の音声アセット名
     * @return           再生時間
     */
    function getDuration(_soundId) {
        if (!_soundId) {
            return 0;
        }
        var asset = g.game.scene().asset.getAudioById(_soundId);
        if (!asset) {
            console.error("AudioUtil.getDuration: not found " + _soundId + " in opt_assets.");
            return 0;
        }
        return asset.duration;
    }
    audioUtil.getDuration = getDuration;
    /**
     * 音声アセットが再生中かどうか判定する
     * SEのようなループさせない音声に対しての使用を想定しており、
     * BGMのようなループする音声に対する使用は非推奨
     * @param _soundId   対象の音声アセット名
     * @return           再生中ならtrue
     */
    function isPlaying(_soundId) {
        if (!_soundId) {
            return false;
        }
        var asset = g.game.scene().asset.getAudioById(_soundId);
        if (!asset) {
            console.error("AudioUtil.isPlaying: not found " + _soundId + " in opt_assets.");
            return false;
        }
        var info = getPlayingAudioInfo(asset);
        if (info === null) {
            return false;
        }
        else {
            return (getDuration(_soundId) > (g.game.getCurrentTime() - info.lastPlayStartTime));
        }
    }
    audioUtil.isPlaying = isPlaying;
    /**
     * 再生中の音声管理情報を取得
     * @param  _asset 対象の音声アセット
     * @return        リストにない場合はnullを返す
     */
    function getPlayingAudioInfo(_asset) {
        var list = playingAudioInfoList.filter(function (v) { return v.audioAsset === _asset; });
        if (list.length > 0) {
            return list[0];
        }
        return null;
    }
})(audioUtil = exports.audioUtil || (exports.audioUtil = {}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteReader = void 0;
/** パッキングされた画像からスプライトを生成する */
class SpriteReader {
    /**
     * @param scene 描画対象のシーン
     * @param hintName 座標情報を含んだJSONファイルのテキストアセット名
     * @param imageName 統合された画像のアセット名
     */
    constructor(scene, hintName, imageName) {
        this._scene = scene;
        this._coordinates = scene.asset.getJSONContentById(hintName);
        this._image = scene.asset.getImageById(imageName);
    }
    /**
     * スプライトを生成する
     * @param name 切り抜く画像名
     * @param option オプションのパラメータ
     */
    createSprite(name, option) {
        const coordinate = this._coordinates[name];
        return new g.Sprite({
            scene: this._scene,
            src: this._image,
            width: coordinate.width,
            height: coordinate.height,
            srcWidth: coordinate.width,
            srcHeight: coordinate.height,
            srcX: coordinate.x,
            srcY: coordinate.y,
            x: option.x,
            y: option.y,
            touchable: option.touchable
        });
    }
}
exports.SpriteReader = SpriteReader;

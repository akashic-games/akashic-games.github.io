Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenEffector = void 0;
class ScreenEffector extends g.E {
    constructor(params) {
        super(params);
        this.backSurface = g.game.resourceFactory.createSurface(Math.ceil(this.width), Math.ceil(this.height));
        this.backRenderer = this.backSurface.renderer();
        this.filterSurface = g.game.resourceFactory.createSurface(Math.ceil(this.width), Math.ceil(this.height));
        this.filterRenderer = this.filterSurface.renderer();
        this.mosaicLevel = params.mosaicLevel || 1;
        this.blurEffect = false;
        this.cntr = 0;
    }
    /**
     * モザイクエフェクト開始
     */
    startMosaic(lv) {
        this.cntr = 0;
        this.mosaicLevel = lv;
    }
    /**
     * ブラーエフェクト開始
     */
    startBlur() {
        this.cntr = 0;
        this.blurEffect = true;
    }
    /**
     * 描画
     */
    renderSelf(renderer, camera) {
        const children = this.children;
        if (this.mosaicLevel > 1) {
            // render on backsurface
            this.backRenderer.begin();
            for (let i = 0; i < children.length; ++i) {
                children[i].render(this.backRenderer, camera);
            }
            this.backRenderer.end();
            // filter
            let scale = 1 / this.mosaicLevel;
            this.filterRenderer.begin();
            this.filterRenderer.save();
            this.filterRenderer.fillRect(0, 0, this.width, this.height, "#101080");
            this.filterRenderer.transform([scale, 0, 0, scale, 0, 0]);
            this.filterRenderer.drawImage(this.backSurface, 0, 0, this.width, this.height, 0, 0);
            this.filterRenderer.restore();
            this.filterRenderer.end();
            // flip
            scale = 1 / scale;
            renderer.save();
            renderer.transform([scale, 0, 0, scale, 0, 0]);
            renderer.drawImage(this.filterSurface, 0, 0, this.width, this.height, 0, 0);
            renderer.restore();
        }
        else if (this.blurEffect) {
            // render on backsurface
            this.backRenderer.begin();
            for (let i = 0; i < children.length; ++i) {
                children[i].render(this.backRenderer, camera);
            }
            // apply prev frame
            if (this.cntr > 0) {
                this.backRenderer.save();
                this.backRenderer.opacity(0.8);
                this.backRenderer.setCompositeOperation("lighter");
                const s = 1.075;
                const th = Math.PI * 2 / g.game.fps * this.cntr * 0.01;
                this.backRenderer.transform([1, 0, 0, 1, this.width / 2, this.height / 2]);
                this.backRenderer.transform([s * Math.cos(th), s * -Math.sin(th), s * Math.sin(th), s * Math.cos(th), 0, 0]);
                this.backRenderer.transform([1, 0, 0, 1, -this.width / 2, -this.height / 2]);
                this.backRenderer.drawImage(this.filterSurface, 0, 0, this.width, this.height, 0, 0);
                this.backRenderer.restore();
            }
            this.backRenderer.end();
            // backup current frame
            this.filterRenderer.begin();
            this.filterRenderer.save();
            this.filterRenderer.drawImage(this.backSurface, 0, 0, this.width, this.height, 0, 0);
            this.filterRenderer.restore();
            this.filterRenderer.end();
            // flip
            renderer.save();
            renderer.drawImage(this.backSurface, 0, 0, this.width, this.height, 0, 0);
            renderer.restore();
        }
        else { // pass through
            renderer.begin();
            for (let i = 0; i < children.length; ++i) {
                children[i].render(renderer, camera);
            }
            renderer.end();
        }
        this.cntr++;
        return false; // skip rendering children;
    }
}
exports.ScreenEffector = ScreenEffector;

import { Game } from './game';
import { GameScene } from './game-scene';
import { clamp } from './utils/math';

export class Camera {
    constructor(private readonly _scene: GameScene) {
        if (!this._scene) throw new Error(`You must pass in a valid Scene when you create a Camera.`);
    }

    get scene(): GameScene {
        return this._scene;
    }
    get game() {
        return this.scene.game;
    }

    private _clearColor: string | null = null;
    get clearColor() {
        return this._clearColor;
    }
    set clearColor(val: string | null) {
        this._clearColor = val;
    }
    
    private _center: [number, number] = [0, 0];
    get center(): [number, number] {
        return [this._center[0], this._center[1]];
    }
    set center([x, y]: [number, number]) {
        this._center = [x, y];
    }

    private _zoomScale = 1;
    get zoomScale() {
        return this._zoomScale;
    }
    set zoomScale(val) {
        if (val <= 0) throw new Error(`The zoom scale must be positive`);
        this._zoomScale = clamp(val, this.minZoomScale, this.maxZoomScale);
    }

    private _maxZoomScale = 4;
    get maxZoomScale() {
        return this._maxZoomScale;
    }
    set maxZoomScale(val) {
        if (val <= 0) throw new Error(`The max zoom scale must be positive`);
        if (val < this._minZoomScale) throw new Error(`The min zoom scale is greater than the max zoom scale.`);
        this._maxZoomScale = val;
        this.zoomScale = this.zoomScale;
    }

    private _minZoomScale = .25;
    get minZoomScale() {
        return this._minZoomScale;
    }
    set minZoomScale(val) {
        if (val <= 0) throw new Error(`The min zoom scale must be positive`);
        if (val > this._maxZoomScale) throw new Error(`The max zoom scale is less than the min zoom scale.`);
        this._minZoomScale = val;
        this.zoomScale = this.zoomScale;
    }

    private _smoothing = true;
    get enableSmoothing() {
        return this._smoothing;
    }
    set enableSmoothing(val) {
        this._smoothing = val;
    }

    get bounds() {
        let [cvWidth, cvHeight] = this.game.canvasSize;
        let [hoff, voff] = [(cvWidth / 2) / this._zoomScale, (cvHeight / 2) / this._zoomScale];
        return {
            left: this._center[0] - hoff,
            right: this._center[0] + hoff,
            top: this._center[1] + voff,
            bottom: this._center[1] - voff
        };
    }

    tick(delta: number) {
    }

    push(context: CanvasRenderingContext2D) {
        let [cvWidth, cvHeight] = this.game.canvasSize;
        context.save();

        if (this._clearColor) {
            context.fillStyle = this._clearColor;
            context.fillRect(0, 0, cvWidth, cvHeight);
        }

        context.imageSmoothingEnabled = context.mozImageSmoothingEnabled = context.oImageSmoothingEnabled = context.webkitImageSmoothingEnabled = this._smoothing;

        context.translate(Math.floor(cvWidth / 2), Math.floor(cvHeight / 2));
        context.scale(this._zoomScale, this._zoomScale);
        context.translate(-Math.floor(this._center[0]), -Math.floor(this._center[1]));
    }
    pop(context: CanvasRenderingContext2D) {
        context.restore();
    }
}

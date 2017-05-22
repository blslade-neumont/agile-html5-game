import { Game } from './game';

export class Camera {
    constructor(private readonly _game: Game) {
        if (!this._game) throw new Error(`You must pass in a valid Game when you create a Camera.`);
    }

    get game() {
        return this._game;
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
        this._zoomScale = val;
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
        let [hoff, voff] = [(cvWidth / 2) * this._zoomScale, (cvHeight / 2) * this._zoomScale];
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

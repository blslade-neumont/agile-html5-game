import { Game } from './game';

export class Camera {
    constructor(private readonly _game: Game) {
        if (!this._game) throw new Error(`You must pass in a valid Game when you create a Camera.`);
    }

    get game() {
        return this._game;
    }
    
    protected _center = [0, 0];
    protected _zoomScale = 1;

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
        context.translate(-this._center[0], -this._center[1]);
        context.scale(this._zoomScale, this._zoomScale);
        context.translate(cvWidth / 2, cvHeight / 2);
    }
    pop(context: CanvasRenderingContext2D) {
        context.restore();
    }
}

import { GameObject } from './game-object';
import { TestObject } from './test-object';

export class Game {
    constructor(private framesPerSecond = 30) { }

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private previousTick: Date = null;

    start() {
        this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 640;
        this.canvas.height = 480;
        setInterval(() => this.onTick(), 1000 / this.framesPerSecond);

        this.addObject(new TestObject());
    }

    private _objects: GameObject[] = [];
    addObject(obj: GameObject) {
        this._objects.push(obj);
    }
    
    private onTick() {
        let currentTime = new Date();
        let delta = (this.previousTick == null) ? 0 : (currentTime.valueOf() - this.previousTick.valueOf()) / 1000;
        this.previousTick = currentTime;
        this.tick(delta);
        this.render(this.context);
    }
    private tick(delta: number) {
        for (let obj of this._objects) {
            obj.tick(delta);
        }
    }
    private render(context: CanvasRenderingContext2D) {
        context.fillStyle = 'pink';
        context.fillRect(0, 0, 100, 100);
        for (let obj of this._objects) {
            if (obj.shouldRender) obj.render(context);
        }
    }
}

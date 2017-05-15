import { GameObject } from './game-object';
import { TestObject } from './test-object';
import { ResourceLoader } from './resource-loader';

export class Game {
    constructor(private framesPerSecond = 30) {
    }

    private canvas: HTMLCanvasElement = null;
    private context: CanvasRenderingContext2D = null;
    private previousTick: Date = null;

    private _resourceLoader: ResourceLoader = null;
    get resourceLoader() {
        return this._resourceLoader;
    }

    start() {
        this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 640;
        this.canvas.height = 480;
        setInterval(() => this.onTick(), 1000 / this.framesPerSecond);

        this._resourceLoader = new ResourceLoader();

        this.addObject(new TestObject());
    }

    private _objects: GameObject[] = [];
    addObject(obj: GameObject) {
        obj.addToGame(this);
        this._objects.push(obj);
    }
    
    private onTick() {
        let currentTime = new Date();
        let delta = (this.previousTick == null) ? 0 : (currentTime.valueOf() - this.previousTick.valueOf()) / 1000;
        this.previousTick = currentTime;

        if (this.resourceLoader.isDone) {
            this.tick(delta);
            this.render(this.context);
        }
        else {
            this.resourceLoader.render(this.context);
        }
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

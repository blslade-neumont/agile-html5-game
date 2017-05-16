import { GameObject } from './game-object';
import { TestObject } from './test-object';
import { ResourceLoader } from './resource-loader';
import { EventQueue } from './event-queue';

export class Game {
    constructor(private framesPerSecond = 30, private canvas: HTMLCanvasElement = null) {
    }
    
    private context: CanvasRenderingContext2D = null;
    private previousTick: Date = null;

    private _resourceLoader: ResourceLoader = null;
    get resourceLoader() {
        return this._resourceLoader;
    }

    private _eventQueue: EventQueue = null;
    get eventQueue() {
        return this._eventQueue;
    }

    private _intervalHandle: number;
    private _isRunning = false;
    get isRunning() {
        return this._isRunning;
    }

    start() {
        if (this.isRunning) throw new Error(`This game is already running. You can't run it again.`);
        this._isRunning = true;

        if (!this.canvas) this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 640;
        this.canvas.height = 480;
        this._intervalHandle = setInterval(() => this.onTick(), 1000 / this.framesPerSecond);

        if (!this._resourceLoader) this._resourceLoader = new ResourceLoader();
        if (!this._eventQueue) this._eventQueue = new EventQueue();

        this.addObject(new TestObject());
    }
    stop() {
        if (!this.isRunning) return;
        this._isRunning = false;
        clearInterval(this._intervalHandle);
    }

    private _objects: GameObject[] = [];
    addObject(obj: GameObject) {
        this._objects.push(obj);
        obj.addToGame(this);
    }
    removeObject(obj: GameObject) {
        let idx = this._objects.indexOf(obj);
        if (idx == -1) throw new Error(`Cannot remove game object '${obj.name}': it has not been added.`);
        this._objects.splice(idx, 1);
        obj.removeFromGame();
    }
    
    private onTick() {
        if (!this.isRunning) throw new Error(`An error occurred. Game.onTick was invoked although the game is not running.`);

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
        let events = this._eventQueue.clearQueue();
        for (let evt of events) {
            for (let obj of this._objects) {
                if (obj.handleEvent(evt)) break;
            }
        }
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

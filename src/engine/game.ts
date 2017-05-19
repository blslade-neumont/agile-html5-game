import { GameObject } from './game-object';
import { ResourceLoader } from './resource-loader';
import { EventQueue } from './event-queue';

const LOGIC_TICKS_PER_RENDER_TICK = 3;

export class Game {
    constructor(protected readonly framesPerSecond = 30, protected canvas: HTMLCanvasElement = null) {
        this.init();
    }
    private init() {
        this._resourceLoader = new ResourceLoader();
        this._eventQueue = new EventQueue();
        let body = document.getElementsByTagName('body')[0];
        this.initResize(body);
    }
    private initResize(body: HTMLBodyElement) {
        body.onresize = e => this.refreshCanvasSize();
    }
    private refreshCanvasSize() {
        if (this.canvas) {
            [this.canvas.width, this.canvas.height] = this.canvasSize = [this.canvas.scrollWidth, this.canvas.scrollHeight];
        }
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
        this.refreshCanvasSize();

        this.context = this.canvas.getContext("2d");

        this._intervalHandle = setInterval(() => this.onTick(), 1000 / this.framesPerSecond);
    }
    stop() {
        if (!this.isRunning) return;
        this._isRunning = false;
        clearInterval(this._intervalHandle);
    }

    private _size: [number, number] = [640, 480];
    get canvasSize(): [number, number] {
        return [this._size[0], this._size[1]];
    }
    set canvasSize([newWidth, newHeight]: [number, number]) {
        if (newWidth == this._size[0] && newHeight == this._size[1]) return;
        let prevSize = this._size;
        this._size = [newWidth, newHeight];
        this.eventQueue.enqueue({
            type: 'canvasResize',
            previousSize: prevSize,
            size: [newWidth, newHeight]
        });
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
            this.sendEvents();
            for (let q = 0; q < LOGIC_TICKS_PER_RENDER_TICK; q++) {
                this.tick(delta / LOGIC_TICKS_PER_RENDER_TICK);
            }
            this.render(this.context);
        }
        else {
            this.resourceLoader.render(this.context);
        }
    }
    protected sendEvents() {
        let events = this._eventQueue.clearQueue();
        for (let evt of events) {
            for (let obj of this._objects) {
                if (obj.handleEvent(evt)) break;
            }
        }
    }
    protected tick(delta: number) {
        for (let obj of this._objects) {
            obj.tick(delta);
        }
    }
    protected render(context: CanvasRenderingContext2D) {
        for (let obj of this._objects) {
            if (obj.shouldRender) obj.render(context);
        }
    }
}

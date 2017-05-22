import { GameObject } from './game-object';
import { ResourceLoader } from './resource-loader';
import { EventQueue } from './event-queue';
import { Camera } from './camera';

export class Game {
    constructor(protected readonly framesPerSecond = 30) {
        this.init();
    }

    private LOGIC_TICKS_PER_RENDER_TICK = 3;

    private init() {
        this._resourceLoader = new ResourceLoader();
        this._eventQueue = new EventQueue();
        let body = document.getElementsByTagName('body')[0];
        this.initResize(body);
        this.initCamera();
    }
    private initResize(body: HTMLBodyElement) {
        body.onresize = e => this.refreshCanvasSize();
    }
    private refreshCanvasSize() {
        if (this.canvas) {
            [this.canvas.width, this.canvas.height] = this.canvasSize = [this.canvas.scrollWidth, this.canvas.scrollHeight];
        }
    }
    private initCamera() {
        this.camera = new Camera(this);
    }

    protected canvas: HTMLCanvasElement = null;
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
        if (this.isRunning) clearInterval(this._intervalHandle);
        this._isRunning = false;
    }

    private _camera: Camera | null = null;
    get camera(): Camera | null {
        return this._camera;
    }
    set camera(val: Camera | null) {
        this._camera = val;
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
    findObject(predicate: (obj: GameObject) => boolean): GameObject | null;
    findObject<T extends GameObject>(predicate: (obj: GameObject) => obj is T): T | null;
    findObject(name: string): GameObject | null;
    findObject(predicate: string | ((obj: GameObject) => boolean)) {
        if (typeof predicate == 'string') {
            let name = predicate;
            predicate = obj => obj.name == name;
        }
        else if (!predicate) throw new Error(`Invalid predicate: ${predicate}`);
        for (let obj of this._objects) {
            if (predicate(obj)) return obj;
        }
        return null;
    }
    findObjects(predicate: (obj: GameObject) => boolean): GameObject[];
    findObjects<T extends GameObject>(predicate: (obj: GameObject) => obj is T): T[];
    findObjects(predicate: (obj: GameObject) => boolean) {
        if (typeof predicate !== 'function') throw new Error(`Invalid predicate: ${predicate}`);
        return this._objects.filter(predicate);
    }

    private onTick() {
        if (!this.isRunning) throw new Error(`An error occurred. Game.onTick was invoked although the game is not running.`);

        if (this.resourceLoader.isDone) {
            let currentTime = new Date();
            let delta = (this.previousTick == null) ? 0 : (currentTime.valueOf() - this.previousTick.valueOf()) / 1000;
            this.previousTick = currentTime;

            this.sendEvents();
            for (let q = 0; q < this.LOGIC_TICKS_PER_RENDER_TICK; q++) {
                this.tick(delta / this.LOGIC_TICKS_PER_RENDER_TICK);
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
        if (this.camera) this.camera.tick(delta);
    }
    protected render(context: CanvasRenderingContext2D) {
        if (!context) throw new Error(`What the heck just happened? There is no rendering context!`);
        let camera = this.camera;
        if (camera) camera.push(context);
        for (let obj of this._objects) {
            if (obj.shouldRender) obj.render(context);
        }
        if (camera) camera.pop(context);
    }
}

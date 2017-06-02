import { ResourceLoader } from './resource-loader';
import { EventQueue } from './event-queue';
import { GameScene } from './game-scene';

export class Game {
    constructor(protected readonly framesPerSecond = 30) {
        this.init();
    }

    private _scene: GameScene = null;
    private _nextScene: GameScene = null;

    get scene() {
        return this._scene;
    }

    public changeScene(newScene: GameScene) {
        if (!newScene) { throw new Error("Tried to changeScene to a bad scene!"); }
        if (this._nextScene) { throw new Error("Scene cannot be set more than once per tick!"); }

        this._nextScene = newScene;
        if (!this._scene) { this.handleSceneChange(); }
    }

    private handleSceneChange() {
        if (this._nextScene) {
            if (this._scene) this._scene.onExit();
            this._scene = this._nextScene;
            this._scene.game = this;
            this._scene.onEnter();
            this._nextScene = null;
        }
    }

    private LOGIC_TICKS_PER_RENDER_TICK = 3;

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
            if (this._scene) { this._scene.handleEvent(evt); }
        }
    }
    protected tick(delta: number) {
        if (this._scene) {
            this._scene.tick(delta);
            this.handleSceneChange();
        }
    }
    protected render(context: CanvasRenderingContext2D) {
        if (!context) throw new Error(`What the heck just happened? There is no rendering context!`);
        if (this._scene) { this._scene.render(context); }
    }
}

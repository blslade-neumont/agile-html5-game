import { Game } from './game';
import { World } from './world';
import { GridRenderer } from './grid-renderer';
import { TestObject } from './test-object';

export class AgileGame extends Game {
    constructor(framesPerSecond = 30, canvas: HTMLCanvasElement = null) {
        super(framesPerSecond, canvas);
    }

    private _world: World = null;
    get world() {
        return this._world;
    }

    private _gridRenderer: GridRenderer = null;
    get gridRenderer() {
        return this._gridRenderer;
    }

    start() {
        super.start();

        if (!this._world) this._world = new World();
        if (!this._gridRenderer) this._gridRenderer = new GridRenderer();

        this._world.start(this.canvas.width, this.canvas.height);
        this._gridRenderer.setGame(this);

        this.addObject(new TestObject());
    }

    protected tick(delta: number) {
        this._world.tick(delta);
        super.tick(delta);
    }
    protected render(context: CanvasRenderingContext2D) {
        this._gridRenderer.render(context);
        super.render(context);
    }
}

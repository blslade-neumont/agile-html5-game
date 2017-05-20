import { Game } from './engine';
import { World } from './world';
import { GridRenderer } from './grid-renderer';
import { Player } from './player';
import { GuiObject } from './gui-object';
import { TilePreloadStrategy } from './tile-preload-strategy';
import { ItemPreloadStrategy } from './item-preload-strategy';
import { AlivePreloadStrategy } from './alive-preload-strategy';

export class AgileGame extends Game {
    constructor(framesPerSecond = 30) {
        super(framesPerSecond);
        this.resourceLoader.addPreloadStrategy(new TilePreloadStrategy());
        this.resourceLoader.addPreloadStrategy(new ItemPreloadStrategy());
        this.resourceLoader.addPreloadStrategy(new AlivePreloadStrategy());
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
        
        this.addObject(new Player({x:48, y:48}));
        this.addObject(new GuiObject());
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

import { Game, FollowCamera } from './engine';
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
    
    start() {
        super.start();

        if (!this._world) this._world = new World();
        this._world.start(this.canvas.width, this.canvas.height);

        this.addObject(new GridRenderer());
        let player = new Player({ x: 48, y: 48 });
        this.addObject(player);
        this.addObject(new GuiObject());

        let camera = this.camera = new FollowCamera(this);
        camera.clearColor = 'black';
        camera.follow = player;
        camera.enableSmoothing = false;
    }

    protected tick(delta: number) {
        this._world.tick(delta);
        super.tick(delta);
    }
}

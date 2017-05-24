import { Game, FollowCamera } from './engine';
import { World } from './world';
import { GridRenderer } from './grid-renderer';
import { Player } from './player';
import { GuiObject } from './gui-object';
import { TilePreloadStrategy } from './preload-strategies/tile-preload-strategy';
import { ItemPreloadStrategy } from './preload-strategies/item-preload-strategy';
import { AlivePreloadStrategy } from './preload-strategies/alive-preload-strategy';
import { GuiPreloadStrategy } from './preload-strategies/gui-preload-strategy';

export class AgileGame extends Game {
    constructor(framesPerSecond = 30) {
        super(framesPerSecond);
        this.resourceLoader.addPreloadStrategy(new TilePreloadStrategy());
        this.resourceLoader.addPreloadStrategy(new ItemPreloadStrategy());
        this.resourceLoader.addPreloadStrategy(new AlivePreloadStrategy());
        this.resourceLoader.addPreloadStrategy(new GuiPreloadStrategy());
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
        let player = new Player({ x: 64, y: 96 });
        this.addObject(player);
        this.addObject(new GuiObject());

        let camera = this.camera = new FollowCamera(this);
        camera.follow = player;
        camera.enableSmoothing = false;
        camera.followOffset = [16, 16];
    }

    protected tick(delta: number) {
        this._world.tick(delta);
        super.tick(delta);
    }
}

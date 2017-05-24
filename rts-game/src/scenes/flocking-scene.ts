import { GameScene, GameEvent, FollowCamera } from '../engine';
import { World } from '../world';
import { GridRenderer } from '../grid-renderer';
import { Player } from '../player';

export class FlockingScene extends GameScene {
    constructor() {
        super();
    }

    private _world: World = null;
    get world() {
        return this._world;
    }

    private _initialized = false;

    start() {
        super.start();

        if (this._initialized) return;
        this._initialized = true;

        this._world = new World();
        this.addObject(this.world);
        this.addObject(new GridRenderer(this.world));

        let player = new Player();
        this.addObject(player);
        
        let camera = this.camera = new FollowCamera(this);
        camera.follow = player;
        camera.enableSmoothing = false;
        camera.followOffset = [16, 16];
    }
}

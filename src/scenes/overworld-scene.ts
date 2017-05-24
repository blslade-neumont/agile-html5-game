import { GameScene, FollowCamera } from '../engine';
import { World } from '../world';
import { GridRenderer } from '../grid-renderer';
import { Player } from '../player';
import { GuiObject } from '../gui-object';

export class OverworldScene extends GameScene {
    constructor() {
        super();
    }

    private _world: World = null;
    get world() {
        return this._world;
    }

    start() {
        super.start();

        let [canvasWidth, canvasHeight] = this.game.canvasSize;

        if (!this._world) this._world = new World();
        this._world.start(canvasWidth, canvasHeight);
        this.addObject(this.world);
        this.addObject(new GridRenderer());

        let player = new Player({ maxHealth: 10, x: 64, y: 96 });
        this.addObject(player);

        this.addObject(new GuiObject());

        let camera = this.camera = new FollowCamera(this);
        camera.follow = player;
        camera.enableSmoothing = false;
        camera.followOffset = [16, 16];
    }
}

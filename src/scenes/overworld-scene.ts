import { GameScene, FollowCamera } from '../engine';
import { World } from '../world';
import { GridRenderer } from '../grid-renderer';
import { Player } from '../player';
import { InGameGuiObject } from '../in-game-gui-object';

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

        this._world = new World();
        this.addObject(this.world);
        this.addObject(new GridRenderer());

        let player = new Player({ maxHealth: 10, x: 64, y: 96 });
        this.addObject(player);

        this.addObject(new InGameGuiObject());

        let camera = this.camera = new FollowCamera(this);
        camera.follow = player;
        camera.enableSmoothing = false;
        camera.followOffset = [16, 16];
    }
}

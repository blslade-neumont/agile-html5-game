import { Game, FollowCamera, EventEmitter } from './engine';
import { World } from './world';
import { GridRenderer } from './grid-renderer';
import { Player } from './player';
import { GuiObject } from './gui-object';
import { TilePreloadStrategy } from './preload-strategies/tile-preload-strategy';
import { ItemPreloadStrategy } from './preload-strategies/item-preload-strategy';
import { AlivePreloadStrategy } from './preload-strategies/alive-preload-strategy';
import { GuiPreloadStrategy } from './preload-strategies/gui-preload-strategy';
import { GameScene } from './engine/game-scene';

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

    private _pause = new EventEmitter<void>();
    get onPause() {
        return this._pause;
    }
    private _play = new EventEmitter<void>();
    get onPlay() {
        return this._play;
    }
    
    start() {
        super.start();

        if (!this._world) this._world = new World();
        this._world.start(this.canvas.width, this.canvas.height);

        let scene: GameScene = new GameScene();
        this.changeScene(scene);

        scene.addObject(new GridRenderer());
        let player = new Player({ x: 64, y: 96 });
        scene.addObject(player);
        scene.addObject(new GuiObject());
        scene.addObject(this.world);

        let camera = scene.camera = new FollowCamera(this);
        camera.follow = player;
        camera.enableSmoothing = false;
        camera.followOffset = [16, 16];
    }
}

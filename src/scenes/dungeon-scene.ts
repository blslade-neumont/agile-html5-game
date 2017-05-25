import { GameScene, GameEvent, FollowCamera } from '../engine';
import { World } from '../world';
import { GridRenderer } from '../grid-renderer';
import { Player } from '../player';
import { InGameGuiObject } from '../in-game-gui-object';

export class DungeonScene extends GameScene {
    constructor() {
        super();
    }

    private _world: World = null;
    get world() {
        return this._world;
    }

    enter(fromScene: GameScene, portalx: number, portaly: number) {
        this._returnScene = fromScene;
        this._returnX = portalx;
        this._returnY = portaly + 33;
        fromScene.game.changeScene(this);

        let otherPlayer = <Player>fromScene.findObject('Player');
        if (!otherPlayer) throw new Error(`Could not find player object in previous scene while entering dungeon.`);
        this.player.x = 0;
        this.player.y = 0;
        this.player.hspeed = 0;
        this.player.vspeed = 0;
        this.player.currentHealth = otherPlayer.currentHealth;
    }
    exit() {
        this.game.changeScene(this._returnScene);

        let otherPlayer = <Player>this._returnScene.findObject('Player');
        if (!otherPlayer) throw new Error(`Could not find player object in previous scene to return to it.`);
        otherPlayer.x = this._returnX;
        otherPlayer.y = this._returnY;
        otherPlayer.hspeed = 0;
        otherPlayer.vspeed = 0;
        otherPlayer.currentHealth = this.player.currentHealth;
    }
    private _returnScene: GameScene;
    private _returnX: number;
    private _returnY: number;

    private player: Player = new Player({ maxHealth: 10 });

    public handleEvent(evt: GameEvent) {
        if (super.handleEvent(evt)) return true;
        if (evt.type == 'keyPressed' && evt.code == 'KeyI') {
            this.exit();
        }
    }

    private _initialized = false;

    // scene enter
    start() {
        super.start();

        if (this._initialized) return;
        this._initialized = true;

        this._world = new World(Math.random(), {
            grass: 'dungeonGrass',
            sand: 'dungeonSand',
            teleporter: 'dungeonTeleporter'
        });
        this.addObject(this.world);
        this.addObject(new GridRenderer());

        this.addObject(this.player);

        this.addObject(new InGameGuiObject());

        let camera = this.camera = new FollowCamera(this);
        camera.follow = this.player;
        camera.enableSmoothing = false;
        camera.followOffset = [16, 16];
    }
}

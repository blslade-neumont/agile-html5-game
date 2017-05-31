import { GameScene, GameEvent, FollowCamera, AudioSourceObject } from '../engine';
import { World } from '../world';
import { GridRenderer } from '../grid-renderer';
import { Player } from '../player';
import { InGameGuiObject } from '../in-game-gui-object';
import { LightingObject } from '../lighting-object';
import { sfx } from '../dbs/sfx-db';

export class DungeonScene extends GameScene {
    constructor() {
        super();
    }

    private _world: World = new World(Math.random(), {
        grass: 'dungeonGrass',
        sand: 'dungeonSand',
        teleporter: 'dungeonTeleporter',
        water: 'lava'
    });
    get world() {
        return this._world;
    }

    enter(fromScene: GameScene, portalx: number, portaly: number) {
        this._returnScene = fromScene;
        this._returnX = portalx;
        this._returnY = portaly + 33;
        fromScene.game.changeScene(this);
        this.game = fromScene.game;

        let otherPlayer = <Player>fromScene.findObject('Player');
        if (!otherPlayer) throw new Error(`Could not find player object in previous scene while entering dungeon.`);
        this.player.x = 0;
        this.player.y = 0;
        this.player.hspeed = 0;
        this.player.vspeed = 0;
        this.player.currentHealth = otherPlayer.currentHealth;

        let otherWorld = <World>(fromScene.findObject('World') || (<any>fromScene).world);
        if (otherWorld) this.world.gameTime = otherWorld.gameTime;
        this.addObject(new AudioSourceObject('EnterDungeonSound', sfx['teleport'], { x: this.player.x, y: this.player.y }));
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

        let otherWorld = <World>(this._returnScene.findObject('World') || (<any>this._returnScene).world);
        if (otherWorld) otherWorld.gameTime = this.world.gameTime;

        this._returnScene.addObject(new AudioSourceObject('ExitDungeonSound', sfx['teleport'], { x: this.player.x, y: this.player.y }));
    }
    private _returnScene: GameScene;
    private _returnX: number;
    private _returnY: number;

    private player: Player = new Player({ maxHealth: 10 });

    private _initialized = false;

    // scene enter
    start() {
        super.start();

        if (this._initialized) return;
        this._initialized = true;
        
        this.addObject(this.world);
        this.addObject(new GridRenderer());

        this.addObject(this.player);

        this.addObject(new LightingObject(.4, false));

        this.addObject(new InGameGuiObject());

        this.addObject(new AudioSourceObject('Music', sfx['dungeonMusic'], { shouldLoop: true }));

        let camera = this.camera = new FollowCamera(this);
        camera.follow = this.player;
        camera.enableSmoothing = false;
        camera.followOffset = [16, 16];
    }
}

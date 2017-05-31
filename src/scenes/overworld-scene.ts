import { GameScene, GameEvent, FollowCamera, AudioSourceObject } from '../engine';
import { World } from '../world';
import { GridRenderer } from '../grid-renderer';
import { Player } from '../player';
import { InGameGuiObject } from '../in-game-gui-object';
import { DungeonScene } from './dungeon-scene';
import { LightingObject } from '../lighting-object';
import { sfx } from '../dbs/sfx-db';
import { SimpleEnemy } from '../simple-enemy';

export class OverworldScene extends GameScene {
    constructor() {
        super();
    }

    private _world: World = null;
    get world() {
        return this._world;
    }

    private _dungeon = new DungeonScene();
    get dungeon() {
        return this._dungeon;
    }

    public handleEvent(evt: GameEvent) {
        if (super.handleEvent(evt)) return true;
        if (evt.type == 'keyPressed' && evt.code == 'KeyI') {
            this._dungeon.enter(this, 64, 64);
        }
    }

    private _initialized = false;

    start() {
        super.start();

        if (this._initialized) return;
        this._initialized = true;
        
        this._world = new World();
        this.addObject(this.world);
        this.addObject(new GridRenderer());

        let player = new Player({ maxHealth: 10 });
        this.addObject(player);

        this.addObject(new LightingObject(1, true));

        this.addObject(new InGameGuiObject());

        for (let i: number = 0; i < 100; ++i) {
            this.addObject(new SimpleEnemy({ maxHealth: 5, x: Math.random() * 1000, y: Math.random() * 1000 }));
        }

        this.addObject(new AudioSourceObject('Music', sfx['overworldMusic'], { shouldLoop: true }));

        let camera = this.camera = new FollowCamera(this);
        camera.follow = player;
        camera.enableSmoothing = false;
        camera.followOffset = [16, 16];
    }
}

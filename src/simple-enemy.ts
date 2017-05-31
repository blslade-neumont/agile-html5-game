import { Entity, EntityOptions } from './entity';
import { World } from './world';
import { WorldTile, TILE_SIZE } from './dbs/tile-db';
import { alives } from './dbs/alive-db';
import merge = require('lodash.merge');
import { sfx } from './dbs/sfx-db';
import { ResourceLoader, Game, GameEvent, fmod, GameScene, clamp, Rect, SpriteT, drawSprite } from './engine';
import { pauseWithGame } from './utils/pause-with-game';

const SIZE = 32;
const CLOSE_ENOUGH: number = 3.0;
const MOVE_SPEED = 4 * 30;

export class SimpleEnemy extends Entity {
    constructor(opts: EntityOptions = { maxHealth: 5 }) {
        super("Simple Enemy", merge({
            sprite: alives['bat-south'].sprite,
            collisionBounds: new Rect(0, SIZE, 0, SIZE),
            takeDamageSound: sfx['playerDamage'],
            killSound: sfx['playerDeath'],
            flying: true
        }, opts));
    }

    addToScene(scene: GameScene) {
        super.addToScene(scene);
        pauseWithGame(this);
    }

    handleEvent(evt: GameEvent) {
        super.handleEvent(evt);
    }

    private _moves: number[] = [0, 1, 2];
    // t r d l
    // 0 1 2 3

    private getMove(): number {
        let r = Math.random();
        let i: number = this._moves[Math.floor(fmod(r * 7919, 3.0))];
        this._moves = [0, 1, 2, 3].filter(x => x != ((i + 2) % 4));
        return i;
    }

    tick(delta: number) {
        let h: number = 0.0;
        let v: number = 0.0;

        if (this.speed <= 0.01) {
            let i: number = this.getMove();
            if ((i == 0))      { h = -MOVE_SPEED; }
            else if ((i == 1)) { h = +MOVE_SPEED; }
            else if ((i == 2)) { v = -MOVE_SPEED; }
            else if ((i == 3)) { v = +MOVE_SPEED; }
        }

        this.snapToTile(h, v);

        super.tick(delta);

        this.animationSpeed = this.speed > 0 ? .2 : 0;
        if (this.hspeed > 0) this.sprite = alives['bat-east'].sprite;
        else if (this.hspeed < 0) this.sprite = alives['bat-west'].sprite;
        else if (this.vspeed > 0) this.sprite = alives['bat-south'].sprite;
        else if (this.vspeed < 0) this.sprite = alives['bat-north'].sprite;

    }

    kill() {
        // TODO: WORKING DEATH ANIMATION
        super.kill();
    }
}
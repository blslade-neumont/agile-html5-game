import { World } from './world';
import { WorldTile, TILE_SIZE } from './dbs/tile-db';
import { OverworldScene } from './scenes/overworld-scene';
import { DeadPlayer } from './dead-player';
import { ResourceLoader, Game, GameEvent, fmod, GameScene, clamp, Rect, SpriteT, drawSprite } from './engine';
import { Entity, EntityOptions } from './entity';
import { alives } from './dbs/alive-db';
import { sfx } from './dbs/sfx-db';
import { pauseWithGame } from './utils/pause-with-game';
import merge = require('lodash.merge');
import { Bomb } from './bomb';
import { SimpleEnemy } from './simple-enemy';

const CLOSE_ENOUGH: number = 3.0;
const MOVE_SPEED = 4 * 30;
const SIZE = 32;

export class Player extends Entity {
    constructor(opts: EntityOptions = { maxHealth: 10 }) {
        super("Player", merge({
            sprite: alives['player-south'].sprite,
            collisionBounds: new Rect(0, SIZE, 0, SIZE),
            takeDamageSound: sfx['playerDamage'],
            killSound: sfx['playerDeath']
        }, opts));
        this._lightSourceSprite = alives['dim-light-source'].sprite;
    }

    addToScene(scene: GameScene) {
        super.addToScene(scene);
        pauseWithGame(this);
    }

    handleEvent(evt: GameEvent) {
        if (evt.type == 'mouseWheel') {
            let scale = Math.pow(2, -clamp(evt.delta, -1, 1) / 7);
            this.game.scene.camera.zoomScale *= scale;
        } else if (evt.type == 'keyPressed') {
            if (this.events.isKeyDown('Space') && this.bombPlaceTimer <= 0.0) {
                let offset: number[] = [0, 0];

                if (this.sprite == alives['player-east'].sprite) {
                    offset = [1, 0];
                } else if (this.sprite == alives['player-west'].sprite) {
                    offset = [-1, 0];
                } else if (this.sprite == alives['player-south'].sprite) {
                    offset = [0, 1];
                } else if (this.sprite == alives['player-north'].sprite) {
                    offset = [0, -1];
                }

                this.scene.addObject(new Bomb({
                    x: Math.floor(this.x / TILE_SIZE + offset[0]) * TILE_SIZE,
                    y: Math.floor(this.y / TILE_SIZE + offset[1]) * TILE_SIZE,
                }));

                this.bombPlaceTimer = 1.0;
            }
        }

        super.handleEvent(evt);
    }

    private bombPlaceTimer: number = 0.0;

    tick(delta: number) {
        this.bombPlaceTimer -= delta;

        let h: number = 0.0;
        if ((this.events.isKeyDown('ArrowLeft') || this.events.isKeyDown('KeyA')) && (Math.abs(this.vspeed) < CLOSE_ENOUGH)) { h -= MOVE_SPEED; }
        if ((this.events.isKeyDown('ArrowRight') || this.events.isKeyDown('KeyD')) && (Math.abs(this.vspeed) < CLOSE_ENOUGH)) { h += MOVE_SPEED; }

        let v: number = 0.0;
        if ((this.events.isKeyDown('ArrowUp') || this.events.isKeyDown('KeyW')) && (Math.abs(this.hspeed) < CLOSE_ENOUGH)) { v -= MOVE_SPEED; }
        if ((this.events.isKeyDown('ArrowDown') || this.events.isKeyDown('KeyS')) && (Math.abs(this.hspeed) < CLOSE_ENOUGH)) { v += MOVE_SPEED; }

        this.snapToTile(h, v);
        
        super.tick(delta);

        this.animationSpeed = this.speed > 0 ? .2 : 0;
        if (this.hspeed > 0) this.sprite = alives['player-east'].sprite;
        else if (this.hspeed < 0) this.sprite = alives['player-west'].sprite;
        else if (this.vspeed > 0) this.sprite = alives['player-south'].sprite;
        else if (this.vspeed < 0) this.sprite = alives['player-north'].sprite;

        for (let entity of <Entity[]>this.scene.findObjects((obj) => obj instanceof SimpleEnemy)) {
            let xDiff = entity.x - this.x;
            let yDiff = entity.y - this.y;
            let distSqrd = (xDiff * xDiff) + (yDiff * yDiff);
            if (distSqrd <= 32*32) {
                this.takeDamage(2);
                break;
            }
        }
    }

    private _lightSourceSprite: SpriteT;
    renderLight(context: CanvasRenderingContext2D) {
        drawSprite(context, this.resources, this._lightSourceSprite, this.x + (SIZE / 2), this.y + (SIZE / 2), this.animationAge);
    }

    kill() {
        this.scene.addObject(new DeadPlayer({
            x: this.x,
            y: this.y
        }));
        super.kill();
    }

    private _inventory
    get inventory() {
        return this._inventory;
    }
}

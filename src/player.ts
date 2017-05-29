import { World } from './world';
import { WorldTile, TILE_SIZE } from './dbs/tile-db';
import { OverworldScene } from './scenes/overworld-scene';
import { DeadPlayer } from './dead-player';
import { ResourceLoader, Game, Entity, EntityOptions, GameEvent, fmod, GameScene, clamp, Rect, SpriteT, drawSprite } from './engine';
import { alives } from './dbs/alive-db';
import { pauseWithGame } from './utils/pause-with-game';
import merge = require('lodash.merge');

const MOVE_SPEED = 4 * 30;
const SIZE = 32;
const OFFSET: number = (TILE_SIZE - SIZE) / 2.0;
const CLOSE_ENOUGH: number = 3.0;

export class Player extends Entity {
    constructor(opts: EntityOptions = { maxHealth: 10 }) {
        super("Player", merge({}, opts, {
            sprite: alives['player-south'].sprite,
            collisionBounds: new Rect(0, SIZE, 0, SIZE)
        }));
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
        }
    }

    tick(delta: number) {
        let h: number = 0.0;
        if ((this.events.isKeyDown('ArrowLeft') || this.events.isKeyDown('KeyA')) && (Math.abs(this.vspeed) < CLOSE_ENOUGH)) { h -= MOVE_SPEED; }
        if ((this.events.isKeyDown('ArrowRight') || this.events.isKeyDown('KeyD')) && (Math.abs(this.vspeed) < CLOSE_ENOUGH)) { h += MOVE_SPEED; }

        let v: number = 0.0;
        if ((this.events.isKeyDown('ArrowUp') || this.events.isKeyDown('KeyW')) && (Math.abs(this.hspeed) < CLOSE_ENOUGH)) { v -= MOVE_SPEED; }
        if ((this.events.isKeyDown('ArrowDown') || this.events.isKeyDown('KeyS')) && (Math.abs(this.hspeed) < CLOSE_ENOUGH)) { v += MOVE_SPEED; }

        let thisTileX: number = fmod(this.x, TILE_SIZE);
        let thisTileY: number = fmod(this.y, TILE_SIZE);

        if ((Math.abs(h) < CLOSE_ENOUGH) && (Math.abs(thisTileX - OFFSET) < CLOSE_ENOUGH)) {
            this.x = OFFSET + Math.floor(this.x / TILE_SIZE) * TILE_SIZE;
            this.hspeed = 0.0;
        } else {
            this.hspeed = ((Math.abs(h) < CLOSE_ENOUGH) ? this.hspeed : h);;
        }

        if((Math.abs(v) < CLOSE_ENOUGH) && (Math.abs(thisTileY - OFFSET) < CLOSE_ENOUGH)) {
             this.vspeed = 0.0;
             this.y = OFFSET + Math.floor(this.y / TILE_SIZE) * TILE_SIZE;
        } else {
             this.vspeed = ((Math.abs(v) < CLOSE_ENOUGH) ? this.vspeed : v);
        }

        this.animationSpeed = this.speed > 0 ? .2 : 0;
        if (this.hspeed > 0) this.sprite = alives['player-east'].sprite;
        else if (this.hspeed < 0) this.sprite = alives['player-west'].sprite;
        else if (this.vspeed > 0) this.sprite = alives['player-south'].sprite;
        else if (this.vspeed < 0) this.sprite = alives['player-north'].sprite;

        let nextX: number = this.x + delta * this.hspeed;
        let nextY: number = this.y + delta * this.vspeed;

        let nextMinX: number = nextX;
        let nextMinY: number = nextY;
        let nextMaxX: number = (nextX + SIZE-1);
        let nextMaxY: number = (nextY + SIZE-1);

        let minTX: number = Math.floor(nextMinX / TILE_SIZE) * TILE_SIZE;
        let maxTX: number = Math.floor(nextMaxX / TILE_SIZE) * TILE_SIZE;
        let minTY: number = Math.floor(nextMinY / TILE_SIZE) * TILE_SIZE;
        let maxTY: number = Math.floor(nextMaxY / TILE_SIZE) * TILE_SIZE;

        let scene = <OverworldScene>this.scene;

        // right-left collisions
        if (this.hspeed > 0.0) {
            if ((nextMaxX > maxTX) && (scene.world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || scene.world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.x = OFFSET + minTX;
                this.hspeed = 0.0;
            }
        } else if (this.hspeed < 0.0) {
            if ((nextMinX < maxTX) && (scene.world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || scene.world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.x = OFFSET + maxTX;
                this.hspeed = 0.0;
            }
        }

        // bottom-top collision
        if (this.vspeed > 0.0) {
            if ((nextMaxY > maxTY) && (scene.world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid || scene.world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.y = OFFSET + minTY;
                this.vspeed = 0.0;
            }
        } else if (this.vspeed < 0.0) {
            if ((nextMinY < maxTY) && (scene.world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || scene.world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid)) {
                this.y = OFFSET + maxTY;
                this.vspeed = 0.0;
            }
        }

        super.tick(delta);
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
}

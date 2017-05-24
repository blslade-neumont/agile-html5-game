import { World } from './world';
import { WorldTile, TILE_SIZE } from './dbs/tile-db';
import { AgileGame } from './agile-game';
import { ResourceLoader, GameObject, GameObjectOptions, GameEvent, fmod } from './engine';
import { alives } from './dbs/alive-db';

const MOVE_SPEED = 4 * 30;
const SIZE = 32;
const OFFSET: number = (TILE_SIZE - SIZE) / 2.0;
const CLOSE_ENOUGH: number = 3.0;

export class Player extends GameObject {
    constructor(opts: GameObjectOptions = { }) {
        super("Player", opts);
        if (!this.sprite) this.sprite = alives['katie_south'].sprite;
    }

    tick(delta: number) {
        let h: number = 0.0;
        if (this.events.isKeyDown('ArrowLeft') && (Math.abs(this.vspeed) < CLOSE_ENOUGH)) { h -= MOVE_SPEED; }
        if (this.events.isKeyDown('ArrowRight') && (Math.abs(this.vspeed) < CLOSE_ENOUGH)) { h += MOVE_SPEED; }

        let v: number = 0.0;
        if (this.events.isKeyDown('ArrowUp') && (Math.abs(this.hspeed) < CLOSE_ENOUGH)) { v -= MOVE_SPEED; }
        if (this.events.isKeyDown('ArrowDown') && (Math.abs(this.hspeed) < CLOSE_ENOUGH)) { v += MOVE_SPEED; }

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
        if (this.hspeed > 0) this.sprite = alives['katie_east'].sprite;
        else if (this.hspeed < 0) this.sprite = alives['katie_west'].sprite;
        else if (this.vspeed > 0) this.sprite = alives['katie_south'].sprite;
        else if (this.vspeed < 0) this.sprite = alives['katie_north'].sprite;

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

        let game: AgileGame = <AgileGame>this.game;

        // right-left collisions
        if (this.hspeed > 0.0) {
            if ((nextMaxX > maxTX) && (game.world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || game.world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.x = OFFSET + minTX;
                this.hspeed = 0.0;
            }
        } else if (this.hspeed < 0.0) {
            if ((nextMinX < maxTX) && (game.world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || game.world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.x = OFFSET + maxTX;
                this.hspeed = 0.0;
            }
        }

        // bottom-top collision
        if (this.vspeed > 0.0) {
            if ((nextMaxY > maxTY) && (game.world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid || game.world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.y = OFFSET + minTY;
                this.vspeed = 0.0;
            }
        } else if (this.vspeed < 0.0) {
            if ((nextMinY < maxTY) && (game.world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || game.world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid)) {
                this.y = OFFSET + maxTY;
                this.vspeed = 0.0;
            }
        }

        super.tick(delta);
    }

    handleEvent(evt: GameEvent) {
        if (evt.type == 'mouseWheel') {
            let scale = Math.pow(2, -evt.delta / 30);
            this.game.camera.zoomScale *= scale;
        }
    }
}

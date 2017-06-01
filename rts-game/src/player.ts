import { ResourceLoader, GameObject, GameObjectOptions, GameEvent, fmod, clamp } from './engine';
import { World } from './world';
import { WorldTile, TILE_SIZE } from './dbs/tile-db';
import { RtsGame } from './rts-game';
import { alives } from './dbs/alive-db';

const MOVE_SPEED = 4 * 30;
const SIZE = 32;
const OFFSET: number = (TILE_SIZE - SIZE) / 2.0;
const CLOSE_ENOUGH: number = 3.0;

export class Player extends GameObject {
    constructor(opts: GameObjectOptions = {}) {
        super("Player", opts);
        if (!this.sprite) this.sprite = alives['player-south'].sprite;
    }
    
    get debugControls(): any[] {
        return [
            { key: 'WASD', name: 'move' },
            { key: 'Mouse Wheel', name: 'zoom in/out' }
        ];
    }

    handleEvent(evt: GameEvent) {
        if (evt.type == 'mouseWheel') {
            let scale = Math.pow(2, -clamp(evt.delta, -1, 1) / 7);
            this.scene.camera.zoomScale *= scale;
        }
    }

    tick(delta: number) {
        let h: number = 0.0;
        if (this.events.isKeyDown('ArrowLeft') || this.events.isKeyDown('KeyA')) { h -= MOVE_SPEED; }
        if (this.events.isKeyDown('ArrowRight') || this.events.isKeyDown('KeyD')) { h += MOVE_SPEED; }

        let v: number = 0.0;
        if (this.events.isKeyDown('ArrowUp') || this.events.isKeyDown('KeyW')) { v -= MOVE_SPEED; }
        if (this.events.isKeyDown('ArrowDown') || this.events.isKeyDown('KeyS')) { v += MOVE_SPEED; }

        let thisTileX: number = fmod(this.x, TILE_SIZE);
        let thisTileY: number = fmod(this.y, TILE_SIZE);

        if (Math.abs(h) < CLOSE_ENOUGH) {
            this.hspeed = 0.0;
        } else {
            this.hspeed = ((Math.abs(h) < CLOSE_ENOUGH) ? this.hspeed : h);;
        }

        if (Math.abs(v) < CLOSE_ENOUGH) {
            this.vspeed = 0.0;
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
        let nextMaxX: number = (nextX + SIZE - 1);
        let nextMaxY: number = (nextY + SIZE - 1);

        let minTX: number = Math.floor(nextMinX / TILE_SIZE) * TILE_SIZE;
        let maxTX: number = Math.floor(nextMaxX / TILE_SIZE) * TILE_SIZE;
        let minTY: number = Math.floor(nextMinY / TILE_SIZE) * TILE_SIZE;
        let maxTY: number = Math.floor(nextMaxY / TILE_SIZE) * TILE_SIZE;

        let world: World = (<any>this.scene).world;

        // right-left collisions
        if (this.hspeed > 0.0) {
            if ((nextMaxX > maxTX) && (world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.x = OFFSET + minTX;
                this.hspeed = 0.0;
            }
        } else if (this.hspeed < 0.0) {
            if ((nextMinX < maxTX) && (world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.x = OFFSET + maxTX;
                this.hspeed = 0.0;
            }
        }

        // bottom-top collision
        if (this.vspeed > 0.0) {
            if ((nextMaxY > maxTY) && (world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid || world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.y = OFFSET + minTY;
                this.vspeed = 0.0;
            }
        } else if (this.vspeed < 0.0) {
            if ((nextMinY < maxTY) && (world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid)) {
                this.y = OFFSET + maxTY;
                this.vspeed = 0.0;
            }
        }

        super.tick(delta);
    }
}

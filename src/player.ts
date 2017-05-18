import { World } from './world';
import { WorldTile, TILE_SIZE } from './dbs/tile-db';
import { AgileGame } from './agile-game';
import { ResourceLoader, GameObject, GameObjectOptions, GameEvent, fmod } from './engine';

const MOVE_SPEED = 4 * 30;
const SIZE = 16;
const OFFSET: number = (TILE_SIZE - SIZE) / 2.0;
const CLOSE_ENOUGH: number = 3.0;

export class Player extends GameObject {
    constructor(opts: GameObjectOptions = {}) {
        super("Player", opts);
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

        this.hspeed = ((Math.abs(h) < CLOSE_ENOUGH) && (Math.abs(thisTileX - OFFSET) < CLOSE_ENOUGH)) ? (0.0) : ((Math.abs(h) < CLOSE_ENOUGH) ? this.hspeed : h);
        this.vspeed = ((Math.abs(v) < CLOSE_ENOUGH) && (Math.abs(thisTileY - OFFSET) < CLOSE_ENOUGH)) ? (0.0) : ((Math.abs(v) < CLOSE_ENOUGH) ? this.vspeed : v);

        let nextX: number = this.x + delta * this.hspeed;
        let nextY: number = this.y + delta * this.vspeed;

        let nextMinX: number = nextX;
        let nextMinY: number = nextY;
        let nextMaxX: number = (nextX + SIZE);
        let nextMaxY: number = (nextY + SIZE);

        let minTX: number = Math.floor(nextMinX / TILE_SIZE) * TILE_SIZE;
        let maxTX: number = Math.floor(nextMaxX / TILE_SIZE) * TILE_SIZE;
        let minTY: number = Math.floor(nextMinY / TILE_SIZE) * TILE_SIZE;
        let maxTY: number = Math.floor(nextMaxY / TILE_SIZE) * TILE_SIZE;

        let game: AgileGame = <AgileGame>this.game;

        // right-left collisions
        if ((nextMaxX > maxTX) && (game.world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || game.world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
            this.x = OFFSET + minTX;
            this.hspeed = 0.0;
        } else if ((nextMinX < maxTX) && (game.world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || game.world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
            this.x = OFFSET + maxTX;
            this.hspeed = 0.0;
        }

        // bottom-top collision
        if ((nextMaxY > maxTY) && (game.world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid || game.world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
            this.y = OFFSET + minTY;
            this.vspeed = 0.0;
        } else if ((nextMinY < maxTY) && (game.world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || game.world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid)) {
            this.y = OFFSET + maxTY;
            this.vspeed = 0.0;
        }

        super.tick(delta);
    }

    render(context: CanvasRenderingContext2D) {
        if (!this.shouldRender) return;
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, SIZE, SIZE);
    }
}

import { ResourceLoader, GameObject } from './engine';
import { tiles, TILE_SIZE, WorldTile } from './dbs/tile-db';

const TIME_SCALE = 1 / (60 * 5);

export class World extends GameObject {
    constructor() {
        super("World");
    }

    private _gameTime = 8 / 24;
    get gameTime() {
        return this._gameTime;
    }
    set gameTime(val: number) {
        this._gameTime = val;
    }

    tick(delta: number) {
        this._gameTime += delta * TIME_SCALE;
    }

    getTileAt(x: number, y: number): WorldTile {
        return tiles['grass'];
    }
}

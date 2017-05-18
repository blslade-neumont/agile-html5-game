import { ResourceLoader } from './engine';
import { tiles, TILE_SIZE, WorldTile } from './dbs/tile-db';

const TIME_SCALE = 1 / (60 * 5);

export class World {
    private _tilesX: number = 0;
    private _tilesY: number = 0;
    private tileNames: string[] = null;
    private _initialized = false;

    start(canvasWidth: number, canvasHeight: number) {
        if (this._initialized) throw new Error('This World has already been initialized');
        this._initialized = true;

        // TODO: TEMPORARY DEBUG MAP HERE
        this._tilesX = Math.ceil(canvasWidth / TILE_SIZE);
        this._tilesY = Math.ceil(canvasHeight / TILE_SIZE);

        this.tileNames = [];
        for (let x: number = 0; x < this._tilesX; ++x) {
            for (let y: number = 0; y < this._tilesY; ++y) {
                let tileIndex = (y === 0 || y === this._tilesY - 2 || (y < this._tilesY - 1 && (x === 0 || x === this._tilesX - 1))) ? "wallTop" :
                                                                                                 (y === 1 || y === this._tilesY - 1) ? "wallSide" :
                                                                                                                                       "grass";
                this.tileNames.push(tileIndex);
            }
        }
    }

    get tilesX(): number {
        return this._tilesX;
    }

    get tilesY(): number {
        return this._tilesY;
    }

    private _gameTime = 8 / 24;
    get gameTime() {
        return this._gameTime;
    }
    set gameTime(val: number) {
        this._gameTime = val;
    }

    tick(delta: number) {
        if (!this._initialized) throw new Error('This World has not been initialized');
        this._gameTime += delta * TIME_SCALE;
    }

    getTileAt(x: number, y: number): WorldTile {
        if (!this._initialized) throw new Error('This World has not been initialized');
        if (x < 0 || y < 0 || x >= this.tilesX || y >= this.tilesY) throw new Error(`Position ${x}, ${y} is not in world.`);
        return tiles[this.tileNames[x * this.tilesY + y]];
    }
}

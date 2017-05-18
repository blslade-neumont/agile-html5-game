import { ResourceLoader } from './engine';
import { tiles, TILE_SIZE, WorldTile } from './dbs/tile-db';

const TIME_SCALE = 1 / (60 * 5);

export class World {
    private _tilesX: number = 0;
    private _tilesY: number = 0;
    private tileNames: string[] = null;

    start(canvasWidth : number, canvasHeight : number) {
        // TODO: TEMPORARY DEBUG MAP HERE
        this._tilesX = canvasWidth / TILE_SIZE;
        this._tilesY = canvasHeight / TILE_SIZE;

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
        this._gameTime += delta * TIME_SCALE;
    }

    getTileAt(x: number, y: number): WorldTile{
        return tiles[this.tileNames[x * this.tilesY + y]];
    }
}

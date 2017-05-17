import { ResourceLoader } from './resource-loader';
import { tiles } from './dbs/tile-db';
import { TILE_SIZE } from './dbs/tile-db';
import { WorldTile } from './dbs/tile-db';

export class World {
    private _tilesX: number = 0;
    private _tilesY: number = 0;
    private tileIndices : number[] = null;

    start(canvasWidth : number, canvasHeight : number) {
        // TODO: TEMPORARY DEBUG MAP HERE
        this._tilesX = canvasWidth / TILE_SIZE;
        this._tilesY = canvasHeight / TILE_SIZE;

        this.tileIndices = [];
        for (let x: number = 0; x < this._tilesX; ++x) {
            for (let y: number = 0; y < this._tilesY; ++y) {
                let tileIndex : number = (x === 0 || x === this._tilesX - 1) ? 2 : ((y === 0 || y === this._tilesY - 1) ? 1 : 0);
                this.tileIndices.push(tileIndex);
            }
        }

    }

    get tilesX(): number {
        return this._tilesX;
    }

    get tilesY(): number {
        return this._tilesY;
    }

    tick(delta: number) {
        // TODO: UPDATE THE WORLD HERE
    }

    getTileAt(x: number, y: number) : WorldTile{
        return tiles[this.tileIndices[x*this.tilesY + y]];
    }

}
import { ResourceLoader } from './resource-loader';
import { tiles } from './dbs/tile-db';
import { TILE_SIZE } from './dbs/tile-db';
import { WorldTile } from './dbs/tile-db';

export class World {
    private _tilesX: number = 0;
    private _tilesY: number = 0;
    private tileNames : string[] = null;

    start(canvasWidth : number, canvasHeight : number) {
        // TODO: TEMPORARY DEBUG MAP HERE
        this._tilesX = canvasWidth / TILE_SIZE;
        this._tilesY = canvasHeight / TILE_SIZE;

        this.tileNames = [];
        for (let x: number = 0; x < this._tilesX; ++x) {
            for (let y: number = 0; y < this._tilesY; ++y) {
                let tileIndex : string = (x === 0 || x === this._tilesX - 1) ? "wallSide" : ((y === 0 || y === this._tilesY - 1) ? "wallTop" : "grass");
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

    tick(delta: number) {
        // TODO: UPDATE THE WORLD HERE
    }

    getTileAt(x: number, y: number): WorldTile{
        return tiles[this.tileNames[x * this.tilesY + y]];
    }

}
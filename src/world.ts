import { ResourceLoader } from './resource-loader';
import { tiles } from './dbs/tile-db';
import { TILE_SIZE } from './dbs/tile-db';
import { WorldTile } from './dbs/tile-db';

export class World {
    private tilesX: number = 0;
    private tilesY: number = 0;
    private tileIndices : number[] = null;

    start(canvasWidth : number, canvasHeight : number) {
        // TODO: TEMPORARY DEBUG MAP HERE
        this.tilesX = canvasWidth / TILE_SIZE;
        this.tilesY = canvasHeight / TILE_SIZE;

        this.tileIndices = [];
        for (let x: number = 0; x < this.tilesX; ++x) {
            for (let y: number = 0; y < this.tilesY; ++y) {
                let tileIndex : number = (x === 0 || x === this.tilesX - 1) ? 2 : ((y === 0 || y === this.tilesY - 1) ? 1 : 0);
                this.tileIndices.push(tileIndex);
            }
        }

    }

    getTilesX(): number {
        return this.tilesX;
    }

    getTilesY(): number {
        return this.tilesY;
    }

    tick(delta: number) {
        // TODO: UPDATE THE WORLD HERE
    }

    getTileAt(x: number, y: number) : WorldTile{
        return tiles[this.tileIndices[x*this.tilesY + y]];
    }

}
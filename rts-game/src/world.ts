import { ResourceLoader, GameObject, fmod } from './engine';
import { tiles, TILE_SIZE, WorldTile } from './dbs/tile-db';
import { generateNoise } from './utils/noise';

const TIME_SCALE = 1 / (60 * 5);

export class World extends GameObject {
    constructor(private seed = Math.random()) {
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
        let chunk = this.getChunk(Math.floor(x / 64), Math.floor(y / 64));
        let [relativex, relativey] = [fmod(x, 64), fmod(y, 64)];
        return chunk[relativex][relativey];
    }
    setTileAt(x: number, y: number, tile: WorldTile): this {
        let chunk = this.getChunk(Math.floor(x / 64), Math.floor(y / 64));
        let [relativex, relativey] = [fmod(x, 64), fmod(y, 64)];
        chunk[relativex][relativey] = tile;
        return this;
    }
    
    private _chunks = new Map<string, WorldTile[][]>();
    private getChunk(x: number, y: number): WorldTile[][] {
        let key = `${x}, ${y}`;
        !this._chunks.has(key) && this._chunks.set(key, this.generateChunk(x, y));
        return this._chunks.get(key);
    }
    private generateChunk(x: number, y: number): WorldTile[][] {
        let noise = generateNoise(this.seed, x, y);
        let chunk: WorldTile[][] = [];
        for (let q = 0; q < 64; q++) {
            let column: WorldTile[] = [];
            for (let w = 0; w < 64; w++) {
                let num = noise[q][w];
                let name = num < .2 ? `rock${this.decorateNum(q, w, 7)}` :
                                      `water${this.decorateNum(w, q, 4)}`;
                column.push(tiles[name]);
            }
            chunk.push(column);
        }
        return chunk;
    }
    private decorateNum(x: number, y: number, num: number) {
        for (let q = num; q > 1; q--) {
            // let n = fmod(this.seed ^ x * 7 ^ (y + 29587) * 4 ^ q, Math.pow(q, 3));
            let n = Math.random() * Math.pow(q, 6 - (num / 3));
            if (n < 1) return `${q}`;
        }
        return '';
    }
}

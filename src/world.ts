import { ResourceLoader, Game, GameObject, GameScene, fmod } from './engine';
import { tiles, TILE_SIZE, WorldTile } from './dbs/tile-db';
import { pauseWithGame } from './utils/pause-with-game';
import { generateNoise } from './utils/noise';

const TIME_SCALE = 1 / (60 * 5);

type TileDefaultsT = {
    lava_left?: string,
    lava_right?: string,
    grass?: string,
    sand?: string,
    wallSide?: string,
    wallTop?: string
};

export class World extends GameObject {
    constructor(private seed = Math.random(), private tileDefaults: TileDefaultsT = {}) {
        super('World', { shouldRender: false });
    }
    
    private _initialized = false;

    addToScene(scene: GameScene) {
        if (this._initialized) throw new Error('This World has already been initialized');
        this._initialized = true;

        super.addToScene(scene);
        pauseWithGame(this);
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
        let chunk = this.getChunk(Math.floor(x / 64), Math.floor(y / 64));
        let [relativex, relativey] = [fmod(x, 64), fmod(y, 64)];
        return chunk[relativex][relativey];
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
                let lavaTile = fmod((q - 8) / 2, 16) * 2;
                let name =                                                    num < .2 && lavaTile == 0 ? this.tileDefaults.lava_left  || 'lava_left' :
                                                                              num < .2 && lavaTile == 1 ? this.tileDefaults.lava_right || 'lava_right' :
                                                                               num < .2 && lavaTile > 1 ? this.tileDefaults.grass      || 'grass' :
                      num < .5 || w == 63 || (noise[q][w + 1] < .5 && (w == 0 || noise[q][w - 1] < .5)) ? this.tileDefaults.sand       || 'sand' :
                                                                        noise[q][w + 1] < .5 || w == 62 ? this.tileDefaults.wallSide   || 'wallSide' :
                                                                                                          this.tileDefaults.wallTop    || 'wallTop';
                column.push(tiles[name]);
            }
            chunk.push(column);
        }
        return chunk;
    }
}

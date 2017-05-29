import { ResourceLoader, Game, GameObject, GameScene, fmod, Entity } from './engine';
import { tiles, TILE_SIZE, WorldTile } from './dbs/tile-db';
import { pauseWithGame } from './utils/pause-with-game';
import { generateNoise } from './utils/noise';

const TIME_SCALE = 1 / (60 * 5);

type TileDefaultsT = {
    water_left?: string,
    water_right?: string,
    grass?: string,
    sand?: string,
    wallSide?: string,
    wallTop?: string,
    teleporter?: string
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
        this._gameTime += delta * TIME_SCALE;

        for (let entity of <Entity[]>this.scene.findObjects((obj) => obj instanceof Entity)) {
            let bounds = entity.collisionBounds;
            let [fromx, fromy] = [Math.floor((entity.x - bounds.left + 1) / TILE_SIZE), Math.floor((entity.y - bounds.bottom + 1) / TILE_SIZE)];
            let [tox, toy] = [Math.floor((entity.x + bounds.right - 1) / TILE_SIZE), Math.floor((entity.y + bounds.top - 1) / TILE_SIZE)];
            for (let tlx = fromx; tlx <= tox; tlx++) {
                for (let tly = fromy; tly <= toy; tly++) {
                    let tileUnder: WorldTile = this.getTileAt(tlx, tly);
                    if (tileUnder.onTick) {
                        tileUnder.onTick(delta, entity);
                    }
                    if (tileUnder.onLand && Math.abs(entity.hspeed - 0.0005) <= 0.001 && Math.abs(entity.vspeed - 0.0005) <= 0.001) {
                        tileUnder.onLand(entity);
                    }
                }
            }
        }
    }

    getTileAt(x: number, y: number): WorldTile {
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
        let chunkNames: string[][] = [];
        for (let q = 0; q < 64; q++) {
            let names: string[] = [];
            for (let w = 0; w < 64; w++) {
                let num = noise[q][w];
                let waterTile = fmod((q - 8) / 2, 16) * 2;
                let name =                                                   num < .2 && waterTile == 0 ? this.tileDefaults.water_left  || 'water_left' :
                                                                             num < .2 && waterTile == 1 ? this.tileDefaults.water_right || 'water_right' :
                                                                              num < .2 && waterTile > 1 ? this.tileDefaults.grass       || 'grass' :
                      num < .5 || w == 63 || (noise[q][w + 1] < .5 && (w == 0 || noise[q][w - 1] < .5)) ? this.tileDefaults.sand        || 'sand' :
                                                                        noise[q][w + 1] < .5 || w == 62 ? this.tileDefaults.wallSide    || 'wallSide' :
                                                                                                          this.tileDefaults.wallTop     || 'wallTop';

                
                names.push(name);
            }

            chunkNames.push(names);
        }

        for (let q = 0; q < 64; q++) {
            let column: WorldTile[] = [];
            for (let w = 0; w < 64; w++) {
                if (q > 0 && q < 63 && w > 0 && w < 63) {
                // TODO: REFACTOR DON'T NEED ORS
                    if ((chunkNames[q][w] == 'wallSide' || chunkNames[q][w] == this.tileDefaults.wallSide)
                        && (chunkNames[q - 1][w] == 'wallSide' || chunkNames[q + 1][w] == this.tileDefaults.wallSide)
                        && (chunkNames[q + 1][w] == 'wallSide' || chunkNames[q + 1][w] == this.tileDefaults.wallSide)) {
                        chunkNames[q][w] = this.tileDefaults.teleporter || 'teleporter';
                    }
                }

                column.push(tiles[chunkNames[q][w]]);
            }

            chunk.push(column);
        }

        return chunk;
    }
}

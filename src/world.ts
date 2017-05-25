import { ResourceLoader, Game, GameObject, GameScene, fmod } from './engine';
import { tiles, TILE_SIZE, WorldTile } from './dbs/tile-db';
import { pauseWithGame } from './utils/pause-with-game';
import { generateNoise } from './utils/noise';

const TIME_SCALE = 1 / (60 * 5);

export class World extends GameObject {
    constructor(private seed = Math.random()) {
        super('World', { shouldRender: false });
    }

    //private _tilesX: number = 0;
    //private _tilesY: number = 0;
    //private tileNames: string[] = null;
    private _initialized = false;

    addToScene(scene: GameScene) {
        if (this._initialized) throw new Error('This World has already been initialized');
        this._initialized = true;

        super.addToScene(scene);
        pauseWithGame(this);

        let [canvasWidth, canvasHeight] = this.game.canvasSize;

        //// TODO: TEMPORARY DEBUG MAP HERE
        //this._tilesX = Math.ceil(canvasWidth / TILE_SIZE);
        //this._tilesY = Math.ceil(canvasHeight / TILE_SIZE);

        //let isWall = (x, y) => {
        //    if ((x == 0 || x == this._tilesX - 1) && y != this._tilesY - 1) return y < 4 || y > this._tilesY - 6;
        //    if (y == 0 || y == this._tilesY - 2) return x < 4 || x > this._tilesX - 5;
        //    return false;
        //};

        //this.tileNames = [];
        //for (let x: number = 0; x < this._tilesX; ++x) {
        //    for (let y: number = 0; y < this._tilesY; ++y) {
        //        if (isWall(x, y)) this.tileNames.push('wallTop');
        //        else if (isWall(x, y - 1)) this.tileNames.push('wallSide');
        //        else if (x % 3 == 0) this.tileNames.push('lava_left');
        //        else if (x % 3 == 1) this.tileNames.push('lava_right');
        //        else this.tileNames.push('grass');
        //    }
        //}
    }

    //get tilesX(): number {
    //    return this._tilesX;
    //}

    //get tilesY(): number {
    //    return this._tilesY;
    //}

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
                let name =                                                    num < .2 && lavaTile == 0 ? 'lava_left' :
                                                                              num < .2 && lavaTile == 1 ? 'lava_right' :
                                                                               num < .2 && lavaTile > 1 ? 'grass' :
                      num < .5 || w == 63 || (noise[q][w + 1] < .5 && (w == 0 || noise[q][w - 1] < .5)) ? 'sand' :
                                                                        noise[q][w + 1] < .5 || w == 62 ? 'wallSide' :
                                                                                                          'wallTop';
                column.push(tiles[name]);
            }
            chunk.push(column);
        }
        return chunk;
    }
}

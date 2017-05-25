import { ResourceLoader, Game, GameObject, GameScene } from './engine';
import { tiles, TILE_SIZE, WorldTile } from './dbs/tile-db';
import { pauseWithGame } from './utils/pause-with-game';

const TIME_SCALE = 1 / (60 * 5);

export class World extends GameObject {
    constructor() {
        super('World', { shouldRender: false });
    }

    private _tilesX: number = 0;
    private _tilesY: number = 0;
    private tileNames: string[] = null;
    private _initialized = false;

    addToScene(scene: GameScene) {
        if (this._initialized) throw new Error('This World has already been initialized');
        this._initialized = true;

        super.addToScene(scene);
        pauseWithGame(this);

        let [canvasWidth, canvasHeight] = this.game.canvasSize;

        // TODO: TEMPORARY DEBUG MAP HERE
        this._tilesX = Math.ceil(canvasWidth / TILE_SIZE);
        this._tilesY = Math.ceil(canvasHeight / TILE_SIZE);

        let isWall = (x, y) => {
            if ((x == 0 || x == this._tilesX - 1) && y != this._tilesY - 1) return y < 4 || y > this._tilesY - 6;
            if (y == 0 || y == this._tilesY - 2) return x < 4 || x > this._tilesX - 5;
            return false;
        };

        this.tileNames = [];
        for (let x: number = 0; x < this._tilesX; ++x) {
            for (let y: number = 0; y < this._tilesY; ++y) {
                if (isWall(x, y)) this.tileNames.push('wallTop');
                else if (isWall(x, y - 1)) this.tileNames.push('wallSide');
                else if (x % 3 == 0) this.tileNames.push('lava_left');
                else if (x % 3 == 1) this.tileNames.push('lava_right');
                else this.tileNames.push('grass');
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
        if (x < 0 || y < 0 || x >= this.tilesX || y >= this.tilesY) return tiles['grass'];
        return tiles[this.tileNames[x * this.tilesY + y]];
    }
}

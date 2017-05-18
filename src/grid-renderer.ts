import { World } from './world';
import { WorldTile } from './dbs/tile-db';
import { ResourceLoader, SingleTileSpriteT, drawSprite } from './engine';
import { TILE_SIZE } from './dbs/tile-db';
import { AgileGame } from './agile-game';

export class GridRenderer {
    private _game: AgileGame = null;

    get game() {
        return this._game;
    }

    get world() {
        if (this._game) return this._game.world;
        return null;
    }

    get loader() {
        if (this._game) return this._game.resourceLoader;
        return null;
    }

    setGame(game: AgileGame) {
        this._game = game;
    }

    render(context: CanvasRenderingContext2D) {
        if (!this.world) { throw new Error(`World not set! Cannot render grid!`);}
        if (!this.loader) { throw new Error(`Loader not set! Cannot render grid!`); }

        for (let x: number = 0; x < this.world.tilesX; ++x) {
            for (let y: number = 0; y < this.world.tilesY; ++y) {
                let tile : WorldTile = this.world.getTileAt(x, y);
                //context.drawImage(this.loader.loadImage(tile.sprite.src), (<SingleTileSpriteT>tile.sprite).tileset.tilex * TILE_SIZE, (<SingleTileSpriteT>tile.sprite).tileset.tiley * TILE_SIZE, TILE_SIZE, TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                drawSprite(context, this.loader, tile.sprite, x * TILE_SIZE, y * TILE_SIZE);
            }
        }
    }
}

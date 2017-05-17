import { World } from './world';
import { WorldTile } from './dbs/tile-db';
import { ResourceLoader } from './resource-loader';
import { TILE_SIZE } from './dbs/tile-db';
import { SingleTileSpriteT } from './utils/sprite';

export class GridRenderer {
    private _world: World = null;
    private _loader: ResourceLoader = null;

    get world() {
        return this._world;
    }

    get loader() {
        return this._loader;
    }
    
    setWorld(world: World) {
        this._world = world;
    }

    setLoader(loader: ResourceLoader) {
        this._loader = loader;
    }

    render(context: CanvasRenderingContext2D) {
        if (!this.world) { throw new Error(`World not set! Cannot render grid!`);}
        if (!this.loader) { throw new Error(`Loader not set! Cannot render grid!`); }

        for (let x: number = 0; x < this.world.tilesX; ++x) {
            for (let y: number = 0; y < this.world.tilesY; ++y) {
                let tile : WorldTile = this.world.getTileAt(x, y);
                context.drawImage(this.loader.loadImage(tile.sprite.src), (<SingleTileSpriteT>tile.sprite).tileset.tilex * TILE_SIZE, (<SingleTileSpriteT>tile.sprite).tileset.tiley * TILE_SIZE, TILE_SIZE, TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}
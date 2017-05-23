import { ResourceLoader, PreloadStrategy } from '../engine';
import { tiles } from '../dbs/tile-db';

export class TilePreloadStrategy implements PreloadStrategy {
    preload(loader: ResourceLoader) {
        for (let tile in tiles) {
            loader.loadImage(tiles[tile].sprite.src)
        }
    }
}

import { ResourceLoader } from './resource-loader';
import { PreloadStrategy } from './utils/preload-strategy';
import { tiles } from './dbs/tile-db';

export class TilePreloadStrategy implements PreloadStrategy {
    preload(loader: ResourceLoader) {
        for (let tile in tiles) {
            loader.loadImage(tiles[tile].sprite.src)
        }
    }
}

import { ResourceLoader } from './resource-loader';
import { PreloadStrategy } from './utils/preload-strategy';
import { items } from './dbs/item-db';

export class ItemPreloadStrategy implements PreloadStrategy {
    preload(loader: ResourceLoader) {
        for (let item in items) {
            loader.loadImage(items[item].sprite.src)
        }
    }
}

import { ResourceLoader, PreloadStrategy } from './engine';
import { gui } from './dbs/gui-db';

export class GUIPreloadStrategy implements PreloadStrategy {
    preload(loader: ResourceLoader) {
        for (let name in gui) {
            loader.loadImage(gui[name].sprite.src)
        }
    }
}

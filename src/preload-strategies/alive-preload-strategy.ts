import { ResourceLoader, PreloadStrategy } from '../engine';
import { alives } from '../dbs/alive-db';

export class AlivePreloadStrategy implements PreloadStrategy {
    preload(loader: ResourceLoader) {
        for (let alive in alives) {
            loader.loadImage(alives[alive].sprite.src)
        }
    }
}

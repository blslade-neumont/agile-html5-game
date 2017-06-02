import { ResourceLoader, PreloadStrategy } from '../engine';
import { sfx } from '../dbs/sfx-db';

export class SfxPreloadStrategy implements PreloadStrategy {
    preload(loader: ResourceLoader) {
        for (let name in sfx) {
            let sound = sfx[name];
            loader.loadAudio(sound.src);
        }
    }
}

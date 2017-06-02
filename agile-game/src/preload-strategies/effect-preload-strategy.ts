import { ResourceLoader, PreloadStrategy } from '../engine';
import { effects } from '../dbs/effect-db';

export class EffectPreloadStrategy implements PreloadStrategy {
    preload(loader: ResourceLoader) {
        for (let effect in effects) {
            loader.loadImage(effects[effect].sprite.src)
        }
    }
}

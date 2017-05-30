﻿import { ResourceLoader, PreloadStrategy } from '../engine';
import { tiles } from '../dbs/tile-db';

export class TilePreloadStrategy implements PreloadStrategy {
    preload(loader: ResourceLoader) {
        for (let name in tiles) {
            let tile = tiles[name];
            loader.loadImage(tile.sprite.src)
            for (let variant of tile.variants || []) {
                loader.loadImage(variant.src);
            }
            if (tile.light) loader.loadImage(tile.light.src)
            for (let variant of tile.lightVariants || []) {
                if (variant) loader.loadImage(variant.src);
            }
        }
    }
}

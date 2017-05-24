import { SpriteT } from '../engine';

export const TILE_SIZE: number = 48;

export interface WorldTile {
    sprite: SpriteT,
    isSolid: boolean
};

export let tiles: { [name: string]: WorldTile } =
    {
        grass: {
            sprite: {
                src: 'images/tiles.png',
                tileset: { width: 48, height: 48, tilex: 0, tiley: 0 }
            },
            isSolid: false
        }
    };

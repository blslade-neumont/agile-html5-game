import { SpriteT } from '../engine';
import merge = require('lodash.merge');

export const TILE_SIZE: number = 48;

export interface WorldTile {
    sprite: SpriteT,
    isSolid: boolean
};

export let tiles: { [name: string]: WorldTile } = {
    'enemy-base': {
        sprite: {
            src: 'images/enemy-base.png',
            tileset: { width: TILE_SIZE, height: TILE_SIZE, tilex: 0, tiley: 0 }
        },
        isSolid: true
    }
};

function addDecorationTiles(name: string, count: number, def: WorldTile) {
    for (let q = 0; q < count; q++) {
        let indName = `${name}${(q && q + 1) || ''}`;
        tiles[indName] = merge({}, def, {
            sprite: {
                tileset: { tilex: q }
            }
        });
    }
}
addDecorationTiles('rock', 7, {
    sprite: {
        src: 'images/cave_floor.png',
        tileset: { width: TILE_SIZE, height: TILE_SIZE, tilex: 0, tiley: 0 }
    },
    isSolid: false
});
addDecorationTiles('water', 4, {
    sprite: {
        src: 'images/water_tiles.png',
        tileset: { width: TILE_SIZE, height: TILE_SIZE, tilex: 0, tiley: 0 }
    },
    isSolid: true
});

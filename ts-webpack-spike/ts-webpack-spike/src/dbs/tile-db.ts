import { SpriteT } from '../utils/sprite';

export const TILE_SIZE: number = 32;

interface WorldTile {
    name: string,
    sprite: SpriteT,
    isSolid: boolean
};

export let tiles: WorldTile[] = [
    {
        name: 'grass',
        sprite: {
            src: 'images/Outside_Tiles.png',
            tileset: { width: 32, height: 32, tilex: 0, tiley: 2 }
        },
        isSolid: false
    },
    {
        name: 'wallTop',
        sprite: {
            src: 'images/Outside_Tiles.png',
            tileset: { width: 32, height: 32, tilex: 0, tiley: 10 }
        },
        isSolid: true
    },
    {
        name: 'wallSide',
        sprite: {
            src: 'images/Outside_Tiles.png',
            tileset: { width: 32, height: 32, tilex: 0, tiley: 11 }
        },
        isSolid: true
    }
];

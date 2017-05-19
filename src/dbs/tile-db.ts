import { SpriteT } from '../engine';

export const TILE_SIZE: number = 32;

export interface WorldTile {
    sprite: SpriteT,
    isSolid: boolean
};

export let tiles: { [name: string]: WorldTile } =
    {
        grass: {
            sprite: {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 0 }
            },
            isSolid: false
        },
        //wallSide: {
        //    sprite: {
        //        src: 'images/Tiles/Outside_Tiles.png',
        //        tileset: { width: 32, height: 32, tilex: 0, tiley: 3 }
        //    },
        //    isSolid: true
        //},
        wallSide: {
            sprite: {
                src: 'images/Tiles/Outside_Tiles.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 3 },
                    { tilex: 1, tiley: 3 },
                    { tilex: 2, tiley: 3 },
                    { tilex: 3, tiley: 3 },
                    { tilex: 4, tiley: 3 }
                ]
            },
            isSolid: true
        },
        wallTop: {
            sprite: {
                src: 'images/Tiles/Outside_Tiles.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 2 }
            },
            isSolid: true
        },
    };

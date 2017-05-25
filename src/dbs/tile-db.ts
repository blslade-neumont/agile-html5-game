import { SpriteT } from '../engine';
import { GameObject } from '../engine/game-object';

export const TILE_SIZE: number = 32;

export interface WorldTile {
    sprite: SpriteT,
    isSolid: boolean,
    onTick?: () => void,
    onLand?: (gameObject: GameObject) => void,
};

export let tiles: { [name: string]: WorldTile } =
    {
        grass: {
            sprite: {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 0 }
            },
            isSolid: false,
        },
        sand: {
            sprite: {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 3 }
            },
            isSolid: false,
        },
        wallSide: {
            sprite: {
                src: 'images/Tiles/Outside_Tiles.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 3 }
            },
            isSolid: true
        },
        wallTop: {
            sprite: {
                src: 'images/Tiles/Outside_Tiles.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 2 }
            },
            isSolid: true,
        },
        lava_left: {
            sprite: {
                src: 'images/Tiles/Dungeon_A1.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 2 },
                frames: [
                    { tilex: 14, tiley: 0 },
                    { tilex: 14, tiley: 1 },
                    { tilex: 14, tiley: 2 },
                ],
                framesPerSecond: 4,
            },
            isSolid: false,
            //onTick: null,
            //onLand: null,
        },
        lava_right: {
            sprite: {
                src: 'images/Tiles/Dungeon_A1.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 2 },
                frames: [
                    { tilex: 15, tiley: 0 },
                    { tilex: 15, tiley: 1 },
                    { tilex: 15, tiley: 2 },
                ],
                framesPerSecond: 4,
            },
            isSolid: false,
            //onTick: null,
            //onLand: null,
        },

        dungeonGrass: {
            sprite: {
                src: 'images/Tiles/Dungeon_A2.png',
                tileset: { width: 32, height: 32, tilex: 2, tiley: 6 }
            },
            isSolid: false,
        },
        dungeonSand: {
            sprite: {
                src: 'images/Tiles/Dungeon_A2.png',
                tileset: { width: 32, height: 32, tilex: 4, tiley: 6 }
            },
            isSolid: false,
        }
    };

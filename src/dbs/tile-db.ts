import { SpriteT, AudioSourceObject } from '../engine';
import { Entity } from '../entity';

export const TILE_SIZE: number = 32;

export interface WorldTile {
    sprite: SpriteT,
    variants?: SpriteT[],
    isSolid: boolean,
    onTick?: (delta: number, entity: Entity) => void,
    onLand?: (entity: Entity) => void
};

export let tiles: { [name: string]: WorldTile } =
    {
        grass: {
            sprite: {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 0 }
            },
            variants: [{
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 1, tiley: 0 }
            }, {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 1 }
            }, {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 1, tiley: 1 }
            }, {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 2 }
            }, {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 1, tiley: 2 }
            }],
            isSolid: false,
        },
        sand: {
            sprite: {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 3 }
            },
            variants: [{
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 1, tiley: 3 }
            }, {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 4 }
            }, {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 1, tiley: 4 }
            }, {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 5 }
            }, {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 1, tiley: 5 }
            }],
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
        lava: {
            sprite: {
                src: 'images/Tiles/World_A1.png',
                tileset: { width: 32, height: 32, tilex: 14, tiley: 3 }
            },
            variants: [{
                src: 'images/Tiles/World_A1.png',
                tileset: { width: 32, height: 32, tilex: 15, tiley: 3 }
            }, {
                src: 'images/Tiles/World_A1.png',
                tileset: { width: 32, height: 32, tilex: 14, tiley: 4 }
            }, {
                src: 'images/Tiles/World_A1.png',
                tileset: { width: 32, height: 32, tilex: 15, tiley: 4 }
            }, {
                src: 'images/Tiles/World_A1.png',
                tileset: { width: 32, height: 32, tilex: 14, tiley: 5 }
            }, {
                src: 'images/Tiles/World_A1.png',
                tileset: { width: 32, height: 32, tilex: 15, tiley: 5 }
            }],
            isSolid: false,
            onTick: (delta, entity) => {
                entity.takeDamage(3);
            }
        },
        lava_left: {
            sprite: {
                src: 'images/Tiles/Dungeon_A1.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 14, tiley: 0 },
                    { tilex: 14, tiley: 1 },
                    { tilex: 14, tiley: 2 },
                ],
                framesPerSecond: 4,
            },
            isSolid: false,
            onTick: (delta, entity) => {
                entity.takeDamage(3);
            }
        },
        lava_right: {
            sprite: {
                src: 'images/Tiles/Dungeon_A1.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 15, tiley: 0 },
                    { tilex: 15, tiley: 1 },
                    { tilex: 15, tiley: 2 },
                ],
                framesPerSecond: 4,
            },
            isSolid: false,
            onTick: (delta, entity) => {
                entity.takeDamage(3);
            }
        },
        water: {
            sprite: {
                src: 'images/Tiles/World_A1.png',
                tileset: { width: 32, height: 32, tilex: 9, tiley: 0 }
            },
            isSolid: false,
            onTick: (delta, entity) => {
                entity.takeDamage(1);
            }
        },
        water_left: {
            sprite: {
                src: 'images/Tiles/Dungeon_A1.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 14, tiley: 6 },
                    { tilex: 14, tiley: 7 },
                    { tilex: 14, tiley: 8 },
                ],
                framesPerSecond: 4,
            },
            isSolid: false,
            onTick: (delta, entity) => {
                entity.takeDamage(1);
            }
        },
        water_right: {
            sprite: {
                src: 'images/Tiles/Dungeon_A1.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 15, tiley: 6 },
                    { tilex: 15, tiley: 7 },
                    { tilex: 15, tiley: 8 },
                ],
                framesPerSecond: 4,
            },
            isSolid: false,
            onTick: (delta, entity) => {
                entity.takeDamage(1);
            }
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
        },

        teleporter: {
            sprite: {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 10, tiley: 10 }
            },
            isSolid: false,
            onLand: (entity) => {
                if (entity.name == "Player") {
                    let scene = <any>entity.scene;
                    scene.dungeon.enter(scene, entity.x, entity.y);
                }
            }
        },

        dungeonTeleporter: {
            sprite: {
                src: 'images/Tiles/Outside_A2.png',
                tileset: { width: 32, height: 32, tilex: 10, tiley: 10 }
            },
            isSolid: false,
            onLand: (entity) => {
                if (entity.name == "Player") {
                    let scene = <any>entity.scene;
                    scene.exit();
                }
            }
        }
    };

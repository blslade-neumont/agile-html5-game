import { SpriteT } from '../engine';

export interface Alive {
    sprite: SpriteT,
};

export let alives: { [name: string]: Alive } =
    {
        'player-south': {
            sprite: {
                src: 'images/player.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 0 },
                    { tilex: 1, tiley: 0 },
                    { tilex: 2, tiley: 0 },
                    { tilex: 1, tiley: 0 }
                ]
            }
        },
        'player-west': {
            sprite: {
                src: 'images/player.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 1 },
                    { tilex: 1, tiley: 1 },
                    { tilex: 2, tiley: 1 },
                    { tilex: 1, tiley: 1 }
                ]
            }
        },
        'player-east': {
            sprite: {
                src: 'images/player.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 2 },
                    { tilex: 1, tiley: 2 },
                    { tilex: 2, tiley: 2 },
                    { tilex: 1, tiley: 2 }
                ]
            }
        },
        'player-north': {
            sprite: {
                src: 'images/player.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 3 },
                    { tilex: 1, tiley: 3 },
                    { tilex: 2, tiley: 3 },
                    { tilex: 1, tiley: 3 }
                ]
            }
        },
        bat: {
            sprite: {
                src: 'images/bat.png',
                pivot: { x: 5, y: 1.5 },
                tileset: { width: 10, height: 3 },
                frames: [
                    { tilex: 0, tiley: 0 },
                    { tilex: 0, tiley: 1 }
                ],
                framesPerSecond: 4
            }
        },
        enemy: {
            sprite: {
                src: 'images/enemy.png',
                pivot: { x: 12, y: 12 }
            }
        }
    };

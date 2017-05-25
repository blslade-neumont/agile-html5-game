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
        bird: {
            sprite: {
                src: 'images/bird.png',
                pivot: { x: 3, y: 3 }
            }
        }
    };

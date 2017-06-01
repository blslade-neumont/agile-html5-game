import { SpriteT } from '../engine';

export interface Effect {
    sprite: SpriteT,
};

export let effects: { [name: string]: Effect } =
    {
        'explosion': {
            sprite: {
                src: 'images/Effects/Fire2.png',
                tileset: { width: 192, height: 192 },
                frames: [
                    { tilex: 0, tiley: 0 },
                    { tilex: 1, tiley: 0 },
                    { tilex: 2, tiley: 0 },
                    { tilex: 3, tiley: 0 },
                    { tilex: 4, tiley: 0 },
                    { tilex: 0, tiley: 1 },
                    { tilex: 1, tiley: 1 },
                    { tilex: 2, tiley: 1 },
                    { tilex: 3, tiley: 1 },
                    { tilex: 4, tiley: 1 },
                    { tilex: 0, tiley: 2 },
                    { tilex: 1, tiley: 2 },
                    { tilex: 2, tiley: 2 }
                ],
                pivot: { x: 192/2-16, y: 192/2-16 }
            }
        },
    };
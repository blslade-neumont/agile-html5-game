import { SpriteT } from '../engine';

export interface Alive {
    sprite: SpriteT,
};

export let alives: { [name: string]: Alive } =
    {
        'player-south': {
            sprite: {
                src: 'images/Alive/Katie.png',
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
                src: 'images/Alive/Katie.png',
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
                src: 'images/Alive/Katie.png',
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
                src: 'images/Alive/Katie.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 3 },
                    { tilex: 1, tiley: 3 },
                    { tilex: 2, tiley: 3 },
                    { tilex: 1, tiley: 3 }
                ]
            }
        },
        'bat-south': {
            sprite: {
                src: 'images/Alive/Monster3.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 0 },
                    { tilex: 1, tiley: 0 },
                    { tilex: 2, tiley: 0 },
                    { tilex: 1, tiley: 0 }
                ]
            }
        },
        'bat-west': {
            sprite: {
                src: 'images/Alive/Monster3.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 1 },
                    { tilex: 1, tiley: 1 },
                    { tilex: 2, tiley: 1 },
                    { tilex: 1, tiley: 1 }
                ]
            }
        },
        'bat-east': {
            sprite: {
                src: 'images/Alive/Monster3.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 2 },
                    { tilex: 1, tiley: 2 },
                    { tilex: 2, tiley: 2 },
                    { tilex: 1, tiley: 2 }
                ]
            }
        },
        'bat-north': {
            sprite: {
                src: 'images/Alive/Monster3.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 0, tiley: 3 },
                    { tilex: 1, tiley: 3 },
                    { tilex: 2, tiley: 3 },
                    { tilex: 1, tiley: 3 }
                ]
            }
        },
        'dead-player': {
            sprite: {
                src: 'images/Alive/Katie.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 4 }
            }
        },
        'large-dim-light-source': {
            sprite: {
                src: 'images/Alive/large-dim-light-source.png',
                pivot: { x: 150, y: 150 }
            }
        },
        'bomb': {
            sprite: {
                src: 'images/Alive/Other1.png',
                tileset: { width: 32, height: 32 },
                frames: [
                    { tilex: 10, tiley: 0 }
                ]
            }
        }
    };

import { SpriteT } from '../utils/sprite';

interface WorldTile {
    name: string,
    sprite: SpriteT,
    isSolid: boolean
};

export let tiles: WorldTile[] = [
    {
        name: 'grass',
        sprite: {
            src: 'images/tiles.png',
            tileset: { width: 32, height: 32, tilex: 1, tiley: 0 }
        },
        isSolid: false
    },
    {
        name: 'wall',
        sprite: {
            src: 'images/tiles.png',
            tileset: { width: 32, height: 32, tilex: 1, tiley: 3 }
        },
        isSolid: true
    }
];

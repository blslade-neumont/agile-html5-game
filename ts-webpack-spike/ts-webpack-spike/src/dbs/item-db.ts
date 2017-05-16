import { SpriteT } from '../utils/sprite';

export const ITEM_SIZE: number = 24;

interface GameItem {
    name: string,
    sprite: SpriteT
};

export let items: GameItem[] = [
    {
        name: 'Plant_1',
        sprite: {
            src: 'images/IconSet.png',
            tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 8 }
        }
    }
];

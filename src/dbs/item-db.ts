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
        },
    },
    {
        name: 'Plant_2',
        sprite: {
            src: 'images/IconSet.png',
            tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 9 }
        },
    },
    {
        name: 'Plant_3',
        sprite: {
            src: 'images/IconSet.png',
            tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 10 }
        },
    },
    {
        name: 'Plant_4',
        sprite: {
            src: 'images/IconSet.png',
            tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 11 }
        },
    },
    {
        name: 'Plant_5',
        sprite: {
            src: 'images/IconSet.png',
            tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 12 }
        },
    },
    {
        name: 'Plant_6',
        sprite: {
            src: 'images/IconSet.png',
            tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 13 }
        },
    },
    {
        name: 'Plant_7',
        sprite: {
            src: 'images/IconSet.png',
            tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 14 }
        },
    },
    {
        name: 'Plant_8',
        sprite: {
            src: 'images/IconSet.png',
            tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 15 }
        },
    },
    {
        name: 'Carrot',
        sprite: {
            src: 'images/IconSet.png',
            tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 18, tiley: 0 }
        },
    },
];

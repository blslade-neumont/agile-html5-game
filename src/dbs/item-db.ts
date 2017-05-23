import { SpriteT } from '../engine';

export const ITEM_SIZE: number = 24;

export interface GameItem {
    sprite: SpriteT
};

export let items: { [name: string]: GameItem } =
    {
        plant_1:
        {
            sprite: {
                src: 'images/Icons/IconSet.png',
                tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 8 }
            },
        },
        plant_2:
        {
            sprite: {
                src: 'images/Icons/IconSet.png',
                tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 9 }
            },
        },
        plant_3:
        {
            sprite: {
                src: 'images/Icons/IconSet.png',
                tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 10 }
            },
        },
        plant_4:
        {
            sprite: {
                src: 'images/Icons/IconSet.png',
                tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 11 }
            },
        },
        plant_5:
        {
            sprite: {
                src: 'images/Icons/IconSet.png',
                tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 12 }
            },
        },
        plant_6:
        {
            sprite: {
                src: 'images/Icons/IconSet.png',
                tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 13 }
            },
        },
        plant_7:
        {
            sprite: {
                src: 'images/Icons/IconSet.png',
                tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 14 }
            },
        },
        plant_8:
        {
            sprite: {
                src: 'images/Icons/IconSet.png',
                tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 12, tiley: 15 }
            },
        },
        crop_carrot:
        {
            sprite: {
                src: 'images/Icons/IconSet.png',
                tileset: { width: ITEM_SIZE, height: ITEM_SIZE, tilex: 18, tiley: 0 }
            },
        }
    };


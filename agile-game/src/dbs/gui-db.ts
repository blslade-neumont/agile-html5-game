import { SpriteT, GameScene } from '../engine';
import { OverworldScene } from '../scenes/overworld-scene';
import { TitleScene } from '../scenes/title-scene';

export interface ItemSlotSpec {
    x: number,
    y: number,
    allowItem?: (item: any) => boolean,
    upIndex: number,
    downIndex: number,
    leftIndex: number,
    rightIndex: number
}

export interface NavigationSpec {
    (): GameScene
}

export interface GuiSpec {
    sprite: SpriteT,
    itemSlots?: ItemSlotSpec[],
    navigation?: { [keyCode: string]: NavigationSpec }
};

export let gui: { [name: string]: GuiSpec } =
    {
        inventory: {
            sprite: { src: 'images/GUI/inventory.png' },
            itemSlots: [
                { x: 11 + (36 * 0), y: 51 + (36 * 0), upIndex: 18, downIndex: 9, leftIndex: 8, rightIndex: 1},
                { x: 11 + (36 * 1), y: 51 + (36 * 0), upIndex: 19, downIndex: 10, leftIndex: 0, rightIndex: 2 },
                { x: 11 + (36 * 2), y: 51 + (36 * 0), upIndex: 20, downIndex: 11, leftIndex: 1, rightIndex: 3 },
                { x: 11 + (36 * 3), y: 51 + (36 * 0), upIndex: 21, downIndex: 12, leftIndex: 2, rightIndex: 4 },
                { x: 11 + (36 * 4), y: 51 + (36 * 0), upIndex: 22, downIndex: 13, leftIndex: 3, rightIndex: 5 },
                { x: 11 + (36 * 5), y: 51 + (36 * 0), upIndex: 23, downIndex: 14, leftIndex: 4, rightIndex: 6 },
                { x: 11 + (36 * 6), y: 51 + (36 * 0), upIndex: 24, downIndex: 15, leftIndex: 5, rightIndex: 7 },
                { x: 11 + (36 * 7), y: 51 + (36 * 0), upIndex: 25, downIndex: 16, leftIndex: 6, rightIndex: 8 },
                { x: 11 + (36 * 8), y: 51 + (36 * 0), upIndex: 26, downIndex: 17, leftIndex: 7, rightIndex: 0 },

                { x: 11 + (36 * 0), y: 51 + (36 * 1), upIndex: 0, downIndex: 18, leftIndex: 17, rightIndex: 10 },
                { x: 11 + (36 * 1), y: 51 + (36 * 1), upIndex: 1, downIndex: 19, leftIndex: 9, rightIndex: 11 },
                { x: 11 + (36 * 2), y: 51 + (36 * 1), upIndex: 2, downIndex: 20, leftIndex: 10, rightIndex: 12 },
                { x: 11 + (36 * 3), y: 51 + (36 * 1), upIndex: 3, downIndex: 21, leftIndex: 11, rightIndex: 13 },
                { x: 11 + (36 * 4), y: 51 + (36 * 1), upIndex: 4, downIndex: 22, leftIndex: 12, rightIndex: 14 },
                { x: 11 + (36 * 5), y: 51 + (36 * 1), upIndex: 5, downIndex: 23, leftIndex: 13, rightIndex: 15 },
                { x: 11 + (36 * 6), y: 51 + (36 * 1), upIndex: 6, downIndex: 24, leftIndex: 14, rightIndex: 16 },
                { x: 11 + (36 * 7), y: 51 + (36 * 1), upIndex: 7, downIndex: 25, leftIndex: 15, rightIndex: 17 },
                { x: 11 + (36 * 8), y: 51 + (36 * 1), upIndex: 8, downIndex: 26, leftIndex: 16, rightIndex: 9 },

                { x: 11 + (36 * 0), y: 51 + (36 * 2), upIndex: 9, downIndex: 0, leftIndex: 26, rightIndex: 19 },
                { x: 11 + (36 * 1), y: 51 + (36 * 2), upIndex: 10, downIndex: 1, leftIndex: 18, rightIndex: 20 },
                { x: 11 + (36 * 2), y: 51 + (36 * 2), upIndex: 11, downIndex: 2, leftIndex: 19, rightIndex: 21 },
                { x: 11 + (36 * 3), y: 51 + (36 * 2), upIndex: 12, downIndex: 3, leftIndex: 20, rightIndex: 22 },
                { x: 11 + (36 * 4), y: 51 + (36 * 2), upIndex: 13, downIndex: 4, leftIndex: 21, rightIndex: 23 },
                { x: 11 + (36 * 5), y: 51 + (36 * 2), upIndex: 14, downIndex: 5, leftIndex: 22, rightIndex: 24 },
                { x: 11 + (36 * 6), y: 51 + (36 * 2), upIndex: 15, downIndex: 6, leftIndex: 23, rightIndex: 25 },
                { x: 11 + (36 * 7), y: 51 + (36 * 2), upIndex: 16, downIndex: 7, leftIndex: 24, rightIndex: 26 },
                { x: 11 + (36 * 8), y: 51 + (36 * 2), upIndex: 17, downIndex: 8, leftIndex: 25, rightIndex: 18 }
            ]
        },
        title: {
            sprite: { src: 'images/GUI/title.png' },
            navigation: {
                'Enter': () => new OverworldScene()
            }
        },
        'game-over': {
            sprite: { src: 'images/GUI/game-over.png' },
            navigation: {
                'Enter': () => new TitleScene(),
                'Escape': () => new TitleScene()
            }
        },
        'full-health-heart': {
            sprite: {
                src: 'images/GUI/hearts.png',
                pivot: { x: 12, y: 24 },
                tileset: { width: 24, height: 24, tilex: 0, tiley: 0 }
            }
        },
        'empty-health-heart': {
            sprite: {
                src: 'images/GUI/hearts.png',
                pivot: { x: 12, y: 24 },
                tileset: { width: 24, height: 24, tilex: 1, tiley: 0 }
            }
        }
    };

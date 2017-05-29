import { SpriteT, GameScene } from '../engine';
import { OverworldScene } from '../scenes/overworld-scene';
import { TitleScene } from '../scenes/title-scene';

export interface ItemSlotSpec {
    x: number,
    y: number,
    allowItem?: (item: any) => boolean
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
                { x: 11 + (36 * 0), y: 51 + (36 * 0) },
                { x: 11 + (36 * 1), y: 51 + (36 * 0) },
                { x: 11 + (36 * 2), y: 51 + (36 * 0) },
                { x: 11 + (36 * 3), y: 51 + (36 * 0) },
                { x: 11 + (36 * 4), y: 51 + (36 * 0) },
                { x: 11 + (36 * 5), y: 51 + (36 * 0) },
                { x: 11 + (36 * 6), y: 51 + (36 * 0) },
                { x: 11 + (36 * 7), y: 51 + (36 * 0) },
                { x: 11 + (36 * 8), y: 51 + (36 * 0) },

                { x: 11 + (36 * 0), y: 51 + (36 * 1) },
                { x: 11 + (36 * 1), y: 51 + (36 * 1) },
                { x: 11 + (36 * 2), y: 51 + (36 * 1) },
                { x: 11 + (36 * 3), y: 51 + (36 * 1) },
                { x: 11 + (36 * 4), y: 51 + (36 * 1) },
                { x: 11 + (36 * 5), y: 51 + (36 * 1) },
                { x: 11 + (36 * 6), y: 51 + (36 * 1) },
                { x: 11 + (36 * 7), y: 51 + (36 * 1) },
                { x: 11 + (36 * 8), y: 51 + (36 * 1) },

                { x: 11 + (36 * 0), y: 51 + (36 * 2) },
                { x: 11 + (36 * 1), y: 51 + (36 * 2) },
                { x: 11 + (36 * 2), y: 51 + (36 * 2) },
                { x: 11 + (36 * 3), y: 51 + (36 * 2) },
                { x: 11 + (36 * 4), y: 51 + (36 * 2) },
                { x: 11 + (36 * 5), y: 51 + (36 * 2) },
                { x: 11 + (36 * 6), y: 51 + (36 * 2) },
                { x: 11 + (36 * 7), y: 51 + (36 * 2) },
                { x: 11 + (36 * 8), y: 51 + (36 * 2) }
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

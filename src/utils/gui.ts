import { Game, GameEvent, measureSprite, drawSprite } from '../engine';
import { GuiSpec, ItemSlotSpec } from '../dbs/gui-db';
import { GameItem, items } from '../dbs/item-db';
import { Inventory } from '../inventory';

export function handleGUIEvent(evt: GameEvent, game: Game, gui: GuiSpec): boolean {
    if (evt.type == 'keyPressed') {
        if (gui.navigation && gui.navigation[evt.code]) {
            game.changeScene(gui.navigation[evt.code]());
            return true;
        }
    }
    return false;
}

export function tickGUI(delta: number, game: Game, gui: GuiSpec) {

}

export function drawGUI(currentItem: ItemSlotSpec, inventory: Inventory, context: CanvasRenderingContext2D, game: Game, gui: GuiSpec, imageIndex = 0, defaultFps = 30) {
    let [canvasWidth, canvasHeight] = game.canvasSize;
    context.fillStyle = 'rgba(0, 0, 0, .4)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    let resources = game.resourceLoader;
    let imgSize = measureSprite(resources, gui.sprite);
    let offset = imgSize ? {
        x: (canvasWidth / 2) - (imgSize.width / 2),
        y: (canvasHeight / 2) - (imgSize.height / 2)
    } : { x: 0, y: 0 };
    drawSprite(context, resources, gui.sprite, offset.x, offset.y, imageIndex, defaultFps);

    if (currentItem) {
        context.fillStyle = 'rgba(0, 0, 255, .5)';
        context.fillRect(offset.x + currentItem.x, offset.y + currentItem.y, 28, 28);
    }

    for (let i: number = 0; i < inventory.items.length; ++i) {
        let slot = gui.itemSlots[i];
        let item = inventory.items[i];
        drawItemStack(context, game, item, offset.x + slot.x, offset.y + slot.y, 1, imageIndex, defaultFps);
    }
}

export function drawItemStack(context: CanvasRenderingContext2D, game: Game, item: GameItem, x: number, y: number, count = 1, imageIndex = 0, defaultFps = 30) {
    let resources = game.resourceLoader;
    drawSprite(context, resources, item.sprite, x, y, imageIndex, defaultFps);
    if (count != 1) throw new Error(`Not implemented: trying to render an item stack with count ${count}`);
}

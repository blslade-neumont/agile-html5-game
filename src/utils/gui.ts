import { Game, GameEvent, measureSprite, drawSprite } from '../engine';
import { GuiSpec } from '../dbs/gui-db';
import { GameItem, items } from '../dbs/item-db';

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

export function drawGUI(context: CanvasRenderingContext2D, game: Game, gui: GuiSpec, imageIndex = 0, defaultFps = 30) {
    let [canvasWidth, canvasHeight] = game.canvasSize;
    context.fillStyle = 'rgba(0, 0, 0, .4)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    let resources = game.resourceLoader;
    let imgSize = measureSprite(resources, gui.sprite);
    let offset = {
        x: (canvasWidth / 2) - (imgSize.width / 2),
        y: (canvasHeight / 2) - (imgSize.height / 2)
    };
    drawSprite(context, resources, gui.sprite, offset.x, offset.y, imageIndex, defaultFps);

    let itemNames = Object.keys(items);
    if (gui.itemSlots && gui.itemSlots.length) {
        for (let idx = 0; idx < gui.itemSlots.length; idx++) {
            let itemIdx = Math.floor(idx % (itemNames.length * 1.5));
            if (itemIdx >= itemNames.length) continue;

            let slot = gui.itemSlots[idx];
            let item = items[itemNames[itemIdx]];
            drawItemStack(context, game, item, offset.x + slot.x, offset.y + slot.y, 1, imageIndex, defaultFps);
        }
    }
}

export function drawItemStack(context: CanvasRenderingContext2D, game: Game, item: GameItem, x: number, y: number, count = 1, imageIndex = 0, defaultFps = 30) {
    let resources = game.resourceLoader;
    drawSprite(context, resources, item.sprite, x, y, imageIndex, defaultFps);
    if (count != 1) throw new Error(`Not implemented: trying to render an item stack with count ${count}`);
}

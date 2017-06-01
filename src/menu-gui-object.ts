import { GameObject, GameEvent, GameScene } from './engine';
import { OverworldScene } from './scenes/overworld-scene';
import { gui as guiDb, GuiSpec } from './dbs/gui-db';
import { handleGUIEvent, tickGUI, drawGUI } from './utils/gui';
import { Inventory } from './inventory';
import { items } from './dbs/item-db';
import { Player } from './player';

export class MenuGuiObject extends GameObject {
    constructor(guiName: string);
    constructor(gui: GuiSpec);
    constructor(gui: GuiSpec | string) {
        super("MenuGuiObject", { renderCamera: 'none' });
        this.gui = typeof gui === 'string' ? guiDb[gui] : gui;

    }

    addToScene(scene: GameScene) {
        super.addToScene(scene);
        this._playerRef = <Player>this.scene.findObject(x => x.name == "Player");
    }

    private gui: GuiSpec;
    private _playerRef: Player;

    private inventoryPos: number = 0;

    get currentItem() {
        if (!this.gui.itemSlots) { return null; }
        return this.gui.itemSlots[this.inventoryPos];
    }

    get inventory() {
        if (!this._playerRef) {
            return null;
        }

        return this._playerRef.inventory;
    }

    handleEvent(evt: GameEvent) {
        if (super.handleEvent(evt)) return true;
        if (handleGUIEvent(evt, this.game, this.gui)) return true;

        if (evt.type == 'keyTyped' && this.currentItem){
            if (evt.code == 'KeyA' || evt.code == 'ArrowLeft') {
                this.inventoryPos = this.currentItem.leftIndex; return true;
            } else if (evt.code == 'KeyD' || evt.code == 'ArrowRight') {
                this.inventoryPos = this.currentItem.rightIndex; return true;
            } else if (evt.code == 'KeyW' || evt.code == 'ArrowUp') {
                this.inventoryPos = this.currentItem.upIndex; return true;
            } else if (evt.code == 'KeyS' || evt.code == 'ArrowDown') {
                this.inventoryPos = this.currentItem.downIndex; return true;
            } else if (evt.code == 'KeyC') {
                this.inventory.addItem(items['crop_carrot']);
            } else if (evt.code == 'Enter') {
                this.inventory.items[this.inventoryPos].onUse(this._playerRef);
                this.inventory.removeItem(this.inventory.items[this.inventoryPos]);
            }

        }

        return false;
    }

    tick(delta: number) {
        super.tick(delta);
        tickGUI(delta, this.game, this.gui);
    }

    protected renderImpl(context: CanvasRenderingContext2D) {
        drawGUI(this.currentItem, this.inventory, context, this.game, this.gui, this.animationAge);
    }
}

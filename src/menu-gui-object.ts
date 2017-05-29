import { GameObject, GameEvent } from './engine';
import { OverworldScene } from './scenes/overworld-scene';
import { gui as guiDb, GuiSpec } from './dbs/gui-db';
import { handleGUIEvent, tickGUI, drawGUI } from './utils/gui';

export class MenuGuiObject extends GameObject {
    constructor(guiName: string);
    constructor(gui: GuiSpec);
    constructor(gui: GuiSpec | string) {
        super("MenuGuiObject", { renderCamera: 'none' });
        this.gui = typeof gui === 'string' ? guiDb[gui] : gui;
    }

    private gui: GuiSpec;

    handleEvent(evt: GameEvent) {
        if (super.handleEvent(evt)) return true;
        if (handleGUIEvent(evt, this.game, this.gui)) return true;
        return false;
    }

    tick(delta: number) {
        super.tick(delta);
        tickGUI(delta, this.game, this.gui);
    }

    protected renderImpl(context: CanvasRenderingContext2D) {
        drawGUI(context, this.game, this.gui, this.animationAge);
    }
}

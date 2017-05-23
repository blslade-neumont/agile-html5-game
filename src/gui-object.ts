import { GameObject, GameEvent, drawSprite } from './engine';
import { AgileGame } from './agile-game';
import { gui } from './dbs/gui-db';
import { drawGUI } from './utils/render';

export class GuiObject extends GameObject {
    constructor(private inventoryGui = gui['inventory']) {
        super('Gui');
    }

    showInventory = false;

    get gameTimeString() {
        let gameTime = (<AgileGame>this.game).world.gameTime;
        let day = Math.floor(gameTime);
        let hour = Math.floor((gameTime - day) * 24);
        return `Day ${day + 1}, ${(hour + 23) % 12 + 1} ${hour < 12 ? 'AM' : 'PM'}`;
    }

    handleEvent(evt: GameEvent) {
        if (evt.type === 'keyPressed' && evt.code == 'KeyE') {
            this.showInventory = !this.showInventory;
            let game = <AgileGame>this.game;
            if (this.showInventory) game.onPause.emit(void(0));
            else game.onPlay.emit(void(0));
        }
    }

    render(context: CanvasRenderingContext2D) {
        let [canvasWidth, canvasHeight] = this.game.canvasSize;
        let timeText = this.gameTimeString;
        context.font = '24px Verdana';
        let textWidth = context.measureText(timeText).width;
        
        context.fillStyle = 'rgba(0, 0, 0, .5)';
        context.fillRect(canvasWidth - (8 + textWidth), 0, 8 + textWidth, 8 + 24);

        context.fillStyle = 'white';
        context.textAlign = 'right';
        context.textBaseline = 'top';
        context.fillText(timeText, canvasWidth - 4, 4);

        if (this.showInventory) this.renderInventory(context);
    }
    private renderInventory(context: CanvasRenderingContext2D) {
        drawGUI(context, this.game, this.inventoryGui);
    }
}

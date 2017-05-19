import { GameObject } from './engine';
import { AgileGame } from './agile-game';

export class GuiObject extends GameObject {
    constructor() {
        super('Gui');
    }

    get gameTimeString() {
        let gameTime = (<AgileGame>this.game).world.gameTime;
        let day = Math.floor(gameTime);
        let hour = Math.floor((gameTime - day) * 24);
        return `Day ${day + 1}, ${(hour + 23) % 12 + 1} ${hour < 12 ? 'AM' : 'PM'}`;
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
    }
}

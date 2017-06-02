import { GameEvent, drawSprite } from './engine';
import { AgileGame } from './agile-game';
import { OverworldScene } from './scenes/overworld-scene';
import { DungeonScene } from './scenes/dungeon-scene';
import { gui } from './dbs/gui-db';
import { MenuGuiObject } from './menu-gui-object';
import { Entity } from './entity';

export class InGameGuiObject extends MenuGuiObject {
    constructor() {
        super(gui['inventory']);
    }

    showInventory = false;

    get gameTimeString() {
        let gameTime = (<OverworldScene>this.scene).world.gameTime;
        let day = Math.floor(gameTime);
        let hour = Math.floor((gameTime - day) * 24);
        return `Day ${day + 1}, ${(hour + 23) % 12 + 1} ${hour < 12 ? 'AM' : 'PM'}`;
    }

    get score() {
        return `Score: ${(<AgileGame>this.game).score}`;
    }



    handleEvent(evt: GameEvent) {
        if (evt.type === 'keyPressed') {
            if (evt.code == 'KeyE' || (evt.code == 'Escape' && this.showInventory)) {
                this.showInventory = !this.showInventory;
                let game = <AgileGame>this.game;
                if (this.showInventory) {
                    game.onPause.emit(void (0));
                    
                }
                else game.onPlay.emit(void (0));
                return true;
            }
        }
        return this.showInventory && super.handleEvent(evt);
    }

    tick(delta: number) {
        if (this.showInventory) super.tick(delta);
    }

    protected renderImpl(context: CanvasRenderingContext2D) {
        let [canvasWidth, canvasHeight] = this.game.canvasSize;
        let timeText = this.gameTimeString;
        context.font = '24px Verdana';
        let timeTextWidth = context.measureText(timeText).width;
        let scoreText = this.score;
        let scoreTextWidth = context.measureText(scoreText).width;

        let timeyOffset = 0;
        let scoreyOffset = 24;

        context.fillStyle = 'rgba(0, 0, 0, .5)';
        context.fillRect(canvasWidth - (8 + timeTextWidth), timeyOffset, 8 + timeTextWidth, 8 + 24);

        context.fillStyle = 'rgba(0, 0, 0, .5)';
        context.fillRect(canvasWidth - (8 + scoreTextWidth), scoreyOffset + 8, 8 + scoreTextWidth, 8 + 24);

        context.fillStyle = 'white';
        context.textAlign = 'right';
        context.textBaseline = 'top';
        context.fillText(timeText, canvasWidth - 4, timeyOffset + 4);
        context.fillText(scoreText, canvasWidth - 4, scoreyOffset + 10);

        this.renderHealth(context);

        if (this.showInventory) {
            super.renderImpl(context);

        }
    }
    private renderHealth(context: CanvasRenderingContext2D) {
        const HEART_SIZE = 24;
        const OFFSET_FROM_BOTTOM = 8;
        const DEFAULT_MAX_HEARTS = 10;

        let p = <Entity>this.scene.findObject('Player');
        let total = (p && p.maxHealth) || DEFAULT_MAX_HEARTS;
        let hearts = (p && p.currentHealth) || 0;

        let [xx, yy] = this.game.canvasSize;
        xx /= 2;
        xx -= (HEART_SIZE * (total - 1)) / 2;
        yy -= OFFSET_FROM_BOTTOM;

        let fullHeartSprite = gui['full-health-heart'].sprite;
        let emptyHeartSprite = gui['empty-health-heart'].sprite;

        for (let q = 0; q < total; q++) {
            let spr = (q < hearts) ? fullHeartSprite : emptyHeartSprite;
            drawSprite(context, this.resources, spr, xx + (q * HEART_SIZE), yy, this.animationAge);
        }
    }
}

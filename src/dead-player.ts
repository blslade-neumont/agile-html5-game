import { GameObject, GameObjectOptions, SpriteT, drawSprite } from './engine';
import { alives } from './dbs/alive-db';
import { GameOverScene } from './scenes/game-over-scene';

export class DeadPlayer extends GameObject {
    constructor(opts: GameObjectOptions = {}) {
        super('DeadPlayer', opts);
        if (!this.sprite) this.sprite = alives['dead-player'].sprite;
        this._lightSourceSprite = alives['dim-light-source'].sprite;
    }

    private timeUntilGameOver = 2;

    private _lightSourceSprite: SpriteT;
    renderLight(context: CanvasRenderingContext2D) {
        drawSprite(context, this.resources, this._lightSourceSprite, this.x + 16, this.y + 16, this.animationAge);
    }

    tick(delta: number) {
        super.tick(delta);
        this.timeUntilGameOver -= delta;
        if (this.timeUntilGameOver <= 0) this.game.changeScene(new GameOverScene());
    }
}

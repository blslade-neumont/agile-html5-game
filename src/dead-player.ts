import { GameObject, GameObjectOptions } from './engine';
import { alives } from './dbs/alive-db';
import { GameOverScene } from './scenes/game-over-scene';

export class DeadPlayer extends GameObject {
    constructor(opts: GameObjectOptions = {}) {
        super('DeadPlayer', opts);
        if (!this.sprite) this.sprite = alives['dead-player'].sprite;
    }

    private timeUntilGameOver = 2;

    tick(delta: number) {
        super.tick(delta);
        this.timeUntilGameOver -= delta;
        if (this.timeUntilGameOver <= 0) this.game.changeScene(new GameOverScene());
    }
}

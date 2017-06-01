import { GameObject, GameObjectOptions } from './engine';
import { effects } from './dbs/effect-db';

export class Explosion extends GameObject {
    constructor(opts: GameObjectOptions = {}) {
        super('Explosion', opts);
        if (!this.sprite) this.sprite = effects['explosion'].sprite;
        this.animationSpeed = 0.1;
    }

    private effectTime = 1;

    tick(delta: number) {
        super.tick(delta);
        this.effectTime -= delta;

        if (this.effectTime <= 0) {
            this.game.scene.removeObject(this);
        }
    }

}

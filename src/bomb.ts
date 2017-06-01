import { GameObject, GameObjectOptions, AudioSourceObject, AudioT } from './engine';
import { alives } from './dbs/alive-db';
import { sfx } from './dbs/sfx-db';
import { Explosion } from './explosion';

export class Bomb extends GameObject {
    constructor(opts: GameObjectOptions = {}) {
        super('Bomb', opts);
        if (!this.sprite) this.sprite = alives['bomb'].sprite;
    }

    private timeUntilExplode = 3;

    tick(delta: number) {
        super.tick(delta);
        this.timeUntilExplode -= delta;

        if (this.timeUntilExplode <= 0) {
            this.explode();
        }
    }

    // useful for fire to set off bombs later? probably not in this project but hey
    explode() {
        // todo deal damage
        this.scene.addObject(new Explosion({x: this.x, y: this.y}));
        this.scene.addObject(new AudioSourceObject(`${this.name}-KillSound`, sfx['explode'], { x: this.x, y: this.y }));
        this.game.scene.removeObject(this);
    }
}

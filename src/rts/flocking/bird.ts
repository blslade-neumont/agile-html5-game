import { GameObject, GameObjectOptions } from '../../engine';
import { BirdController } from './bird-controller';
import { alives } from '../dbs/alive-db';
import merge = require('lodash.merge');

export class Bird extends GameObject {
    constructor(private controller: BirdController, opts: GameObjectOptions = {}) {
        super("Bird", merge(opts, {
            sprite: alives['bird'].sprite
        }));
    }

    originGravitation = 1 / (1000 + Math.random() * 5000);
    originGravitationDistance = 100 + Math.random() * 500;

    tick(delta: number) {
        super.tick(delta);
        if (this.x > this.originGravitationDistance || this.x < -this.originGravitationDistance) {
            this.hspeed -= this.x * this.originGravitation;
        }
        if (this.y > this.originGravitationDistance || this.y < -this.originGravitationDistance) {
            this.vspeed -= this.y * this.originGravitation;
        }
    }
}

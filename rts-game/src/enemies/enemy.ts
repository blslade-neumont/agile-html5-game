import { GameObject, GameObjectOptions } from '../engine';
import { EnemyController } from './enemy-controller';
import { StateMachine } from './states/state-machine';
import { WanderState } from './states/wander-state';
import { alives } from '../dbs/alive-db';
import merge = require('lodash.merge');

export class Enemy extends GameObject {
    constructor(readonly controller: EnemyController, opts: GameObjectOptions = {}) {
        super('EnemyController', merge({
            sprite: alives['enemy'].sprite,
            direction: Math.random() * 360
        }, opts));
        this._states = new StateMachine(new WanderState(this));
    }

    renderDebugInfo = false;

    private _states: StateMachine;

    tick(delta: number) {
        this._states.tick(delta);
        super.tick(delta);
        this.imageAngle = this.direction;
    }
    render(context: CanvasRenderingContext2D) {
        this._states.render(context);
        super.render(context);
    }
}

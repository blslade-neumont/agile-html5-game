import { GameObject, GameObjectOptions } from '../engine';
import { EnemyController } from './enemy-controller';
import { StateMachine } from './state-machine';
import { State } from './state';
import { alives } from '../dbs/alive-db';
import merge = require('lodash.merge');

export class Enemy extends GameObject {
    constructor(private controller: EnemyController, opts: GameObjectOptions = {}) {
        super('EnemyController', merge({
            sprite: alives['enemy'].sprite,
            direction: Math.random() * 360
        }, opts));
        this._states = new StateMachine(new WanderState(this));
    }

    private _states: StateMachine;

    tick(delta: number) {
        this._states.tick(delta);
        this.imageAngle = this.direction;
    }
}

export class WanderState extends State {
    constructor(private self: Enemy) {
        super();
    }

    tick(machine: StateMachine, delta: number) {

    }
}

import { GameObject, GameObjectOptions } from '../engine';
import { EnemyController } from './enemy-controller';
import { StateMachine } from './states/state-machine';
import { ExploreState } from './states/explore-state';
import { alives } from '../dbs/alive-db';
import { TILE_SIZE } from '../dbs/tile-db';
import merge = require('lodash.merge');

const FOW_CLEAR_RESET_TIME = .5;

export class Enemy extends GameObject {
    constructor(readonly controller: EnemyController, opts: GameObjectOptions = {}) {
        super('EnemyController', merge({
            sprite: alives['enemy'].sprite,
            direction: Math.random() * 360
        }, opts));
        this._states = new StateMachine(new ExploreState(this));
    }

    renderDebugInfo = false;

    private _states: StateMachine;

    private _fowClearTime = Math.random() * FOW_CLEAR_RESET_TIME;
    fowClearDistance = 4;

    tick(delta: number) {
        this._fowClearTime -= delta;
        if (this._fowClearTime <= 0) {
            this.controller.clearFOW(Math.floor(this.x / TILE_SIZE), Math.floor(this.y / TILE_SIZE), this.fowClearDistance);
            this._fowClearTime += FOW_CLEAR_RESET_TIME;
        }
        this._states.tick(delta);
        super.tick(delta);
        this.imageAngle = this.direction;
    }
    render(context: CanvasRenderingContext2D) {
        this._states.render(context);
        super.render(context);
    }
}

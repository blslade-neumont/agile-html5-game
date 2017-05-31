import { GameObject, GameObjectOptions } from '../engine';
import { EnemyController } from './enemy-controller';
import { StateMachine } from './state-machine';
import { State } from './state';
import { alives } from '../dbs/alive-db';
import { Path } from './path';
import { Node } from './node';
import { TILE_SIZE } from '../dbs/tile-db';
import merge = require('lodash.merge');

export class Enemy extends GameObject {
    constructor(readonly controller: EnemyController, opts: GameObjectOptions = {}) {
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
    render(context: CanvasRenderingContext2D) {
        this._states.render(context);
        super.render(context);
    }
}

export class WanderState extends State {
    constructor(private self: Enemy) {
        super();
    }

    private path: Path;

    tick(machine: StateMachine, delta: number) {
        if (!this.path) {
            let targetx = Math.floor((this.self.x + (Math.random() * 3000) - 1500) / TILE_SIZE);
            let targety = Math.floor((this.self.y + (Math.random() * 3000) - 1500) / TILE_SIZE);
            this.path = this.self.controller.getPath(Math.floor(this.self.x / TILE_SIZE), Math.floor(this.self.y / TILE_SIZE), targetx, targety);
            if (!this.path) console.log('path: null');
            else console.log('path: ' + this.path.nodes.map(node => `(${node.x}, ${node.y})`).join(', '));
        }
        if (!this.path) return;
    }

    render(machine: StateMachine, context: CanvasRenderingContext2D) {
        super.render(machine, context);
        if (this.path) {
            context.strokeStyle = 'red';
            context.beginPath();
            let nodes = this.path.nodes;
            context.moveTo((nodes[0].x + .5) * TILE_SIZE, (nodes[0].y + .5) * TILE_SIZE);
            for (let q = 1; q < nodes.length; q++) {
                context.lineTo((nodes[q].x + .5) * TILE_SIZE, (nodes[q].y + .5) * TILE_SIZE);
            }
            context.stroke();
        }
    }
}

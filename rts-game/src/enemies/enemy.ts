import { GameObject, GameObjectOptions, pointDirection } from '../engine';
import { EnemyController } from './enemy-controller';
import { StateMachine } from './state-machine';
import { State } from './state';
import { alives } from '../dbs/alive-db';
import { Path } from './path';
import { Node } from './node';
import { TILE_SIZE } from '../dbs/tile-db';
import { pointDistance2 } from '../utils/math';
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

export class WanderState extends State {
    constructor(private self: Enemy) {
        super();
    }

    private path: Path;
    private currentIdx = 0;
    turnRadius = 24;
    directionChangeSpeed = 180;
    private get turnRadius2() {
        return this.turnRadius * this.turnRadius;
    }

    onEnter(machine: StateMachine, prevState: State | null) {
        super.onEnter(machine, prevState);
        this.self.speed = 30 * (2 + Math.random() * 1);
    }

    tick(machine: StateMachine, delta: number) {
        if (this.path && this.currentIdx >= this.path.nodes.length) this.path = null;
        if (!this.path) {
            let targetx = Math.floor((this.self.x + (Math.random() * 3000) - 1500) / TILE_SIZE);
            let targety = Math.floor((this.self.y + (Math.random() * 3000) - 1500) / TILE_SIZE);
            this.path = this.self.controller.getPath(Math.floor(this.self.x / TILE_SIZE), Math.floor(this.self.y / TILE_SIZE), targetx, targety);
            this.currentIdx = 0;
        }
        if (!this.path) return;

        let nodes = this.path.nodes;
        let targeting: Node | null = null;
        while (true) {
            if (this.currentIdx >= nodes.length) return;
            targeting = nodes[this.currentIdx];
            let dist2 = pointDistance2(this.self.x, this.self.y, (targeting.x + .5) * TILE_SIZE, (targeting.y + .5) * TILE_SIZE);
            if (dist2 > this.turnRadius2) break;
            this.currentIdx++;
        }

        let dir = pointDirection(this.self.x, this.self.y, (targeting.x + .5) * TILE_SIZE, (targeting.y + .5) * TILE_SIZE);
        if (dir > this.self.direction + 180) dir -= 180;
        else if (dir < this.self.direction - 180) dir += 180;
        let dirChange = 0;
        if (dir > this.self.direction) {
            dirChange = Math.min(dir - this.self.direction, this.directionChangeSpeed * delta);
        }
        else if (dir < this.self.direction) {
            dirChange = Math.max(dir - this.self.direction, -this.directionChangeSpeed * delta);
        }
        console.log(this.self.direction - dir);
        this.self.direction += dirChange;
    }

    render(machine: StateMachine, context: CanvasRenderingContext2D) {
        super.render(machine, context);
        if (this.path && this.self.renderDebugInfo) {
            context.strokeStyle = 'red';
            context.beginPath();
            let nodes = this.path.nodes;
            context.moveTo((nodes[0].x + .5) * TILE_SIZE, (nodes[0].y + .5) * TILE_SIZE);
            for (let q = 1; q < nodes.length; q++) {
                context.lineTo((nodes[q].x + .5) * TILE_SIZE, (nodes[q].y + .5) * TILE_SIZE);
            }
            context.stroke();
            
            for (let q = 0; q < nodes.length; q++) {
                context.fillStyle = q == this.currentIdx ? 'white' : 'red';
                context.fillRect((nodes[q].x + .5) * TILE_SIZE - 2, (nodes[q].y + .5) * TILE_SIZE - 2, 4, 4);
            }

            context.strokeStyle = 'blue';
            context.beginPath();
            context.ellipse(this.self.x, this.self.y, this.turnRadius, this.turnRadius, 0, 0, 2 * Math.PI);
            context.stroke();
        }
    }
}

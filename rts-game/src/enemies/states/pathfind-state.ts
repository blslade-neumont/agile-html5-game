import { pointDirection } from '../../engine';
import { State } from './state';
import { StateMachine } from './state-machine';
import { Enemy } from '../enemy';
import { Path } from '../path';
import { Node } from '../node';
import { TILE_SIZE } from '../../dbs/tile-db';
import { pointDistance2 } from '../../utils/math';

export abstract class PathfindState extends State {
    constructor(self: Enemy) {
        super(self);
    }

    private _path: Path;
    get path() {
        return this._path;
    }
    set path(val: Path) {
        this._path = val;
        this.currentIdx = 0;
    }

    private currentIdx = 0;
    turnRadius = 24;
    directionChangeSpeed = 180;
    directionTolerance = 15;
    
    tick(machine: StateMachine, delta: number) {
        if (this.path && this.currentIdx >= this.path.nodes.length) this.path = null;
        if (!this.path) return;

        let nodes = this.path.nodes;
        let targeting: Node | null = null;
        while (true) {
            if (this.currentIdx >= nodes.length) return;
            targeting = nodes[this.currentIdx];
            let dist2 = pointDistance2(this.self.x, this.self.y, (targeting.x + .5) * TILE_SIZE, (targeting.y + .5) * TILE_SIZE);
            if (dist2 > this.turnRadius * this.turnRadius) break;
            this.currentIdx++;
        }

        let dir = pointDirection(this.self.x, this.self.y, (targeting.x + .5) * TILE_SIZE, (targeting.y + .5) * TILE_SIZE);
        if (dir > this.self.direction + 180) dir -= 360;
        else if (dir < this.self.direction - 180) dir += 360;
        let dirChange = 0;
        if (dir > this.self.direction + this.directionTolerance) {
            dirChange = Math.min(dir - this.self.direction, this.directionChangeSpeed * delta);
        }
        else if (dir < this.self.direction - this.directionTolerance) {
            dirChange = Math.max(dir - this.self.direction, -this.directionChangeSpeed * delta);
        }
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

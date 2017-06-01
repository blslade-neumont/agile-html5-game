import { State } from './state';
import { PathfindState } from './pathfind-state';
import { StateMachine } from './state-machine';
import { Enemy } from '../enemy';
import { TILE_SIZE } from '../../dbs/tile-db';

export class ExploreState extends PathfindState {
    constructor(self: Enemy) {
        super(self);
    }

    onEnter(machine: StateMachine, prevState: State | null) {
        super.onEnter(machine, prevState);
        this.self.speed = 30 * (2 + Math.random() * 1);
    }

    tick(machine: StateMachine, delta: number) {
        if (!this.path) {
            let targetx = Math.floor((this.self.x + (Math.random() * 3000) - 1500) / TILE_SIZE);
            let targety = Math.floor((this.self.y + (Math.random() * 3000) - 1500) / TILE_SIZE);
            this.path = this.self.controller.getPath(Math.floor(this.self.x / TILE_SIZE), Math.floor(this.self.y / TILE_SIZE), targetx, targety);
        }
        super.tick(machine, delta);
    }
}

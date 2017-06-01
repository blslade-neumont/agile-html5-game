import { StateMachine } from './state-machine';
import { Enemy } from '../enemy';

export type StateStatusT = 'ok' | 'error' | 'alert' | 'confused';

export abstract class State {
    constructor(protected readonly self: Enemy) {
    }

    get renderDebugInfo() {
        return this.self.renderDebugInfo;
    }

    abstract get stateName();
    get stateStatus(): StateStatusT {
        return 'ok';
    }

    onEnter(machine: StateMachine, previousState: State | null) {
    }
    onExit(machine: StateMachine, nextState: State) {
    }

    tick(machine: StateMachine, delta: number) {
    }
    render(machine: StateMachine, context: CanvasRenderingContext2D) {
        if (!this.renderDebugInfo) return;

        context.fillStyle = this.stateStatus == 'ok' ? 'white' :
                         this.stateStatus == 'error' ? 'red' :
                         this.stateStatus == 'alert' ? 'orange' :
                      this.stateStatus == 'confused' ? 'yellow' :
                                                       'purple';
        let text = this.stateStatus == 'ok' ? 'OK' :
                this.stateStatus == 'error' ? 'ERR' :
                this.stateStatus == 'alert' ? '!' :
             this.stateStatus == 'confused' ? '?' :
                                              this.stateStatus;
        context.textAlign = 'right';
        context.textBaseline = 'bottom';
        context.fillText(text, this.self.x - 4, this.self.y - 24);

        context.fillStyle = 'white';
        context.textAlign = 'left';
        context.textBaseline = 'bottom';
        context.fillText('- ' + this.stateName, this.self.x, this.self.y - 24);
    }
}

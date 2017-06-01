import { StateMachine } from './state-machine';

export class State {
    constructor() {
    }

    onEnter(machine: StateMachine, previousState: State | null) {
    }
    onExit(machine: StateMachine, nextState: State) {
    }

    tick(machine: StateMachine, delta: number) {
    }
    render(machine: StateMachine, context: CanvasRenderingContext2D) {
    }
}

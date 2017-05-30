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
}

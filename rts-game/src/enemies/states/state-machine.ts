import { State } from './state';

export class StateMachine {
    constructor(currentState: State) {
        this.currentState = currentState;
    }

    private _currentState: State = null;
    private _changingState = false;
    get currentState() {
        return this._currentState;
    }
    set currentState(val: State) {
        if (val == null) throw new Error(`Cannot set currentState to null`);
        if (val == this._currentState) return;
        if (this._changingState) throw new Error(`Already changing states! Don't change state from within onEnter or onExit lifecycle hooks!`);

        this._changingState = true;
        let prev = this._currentState;
        try {
            if (this._currentState) this._currentState.onExit(this, val);
            this._currentState = val;
            if (this._currentState) this._currentState.onEnter(this, prev);
        }
        finally { this._changingState = false; }
    }

    tick(delta: number) {
        this.currentState.tick(this, delta);
    }
    render(context: CanvasRenderingContext2D) {
        this.currentState.render(this, context);
    }
}

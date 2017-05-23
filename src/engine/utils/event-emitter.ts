

export class EventEmitter<T> {
    constructor() {
    }

    private _listeners: ((val: T) => void)[] = [];

    addListener(listener: (val: T) => void) {
        if (!listener || typeof listener !== 'function') throw new Error(`Listener is not a function: ${listener}`);
        this._listeners.push(listener);
    }

    private _isEmitting = false;
    emit(val: T) {
        if (this._isEmitting) throw new Error(`EventEmitter.emit was recursively invoked. New value: ${val}`);
        this._isEmitting = true;
        for (let listener of this._listeners) {
            listener(val);
        }
        this._isEmitting = false;
    }
}

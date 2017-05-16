import { GameEvent, KeyTypedEvent, KeyPressedEvent, KeyReleasedEvent } from './utils/events';

const DEBUG_KEYS = false;

export class EventQueue {
    constructor() {
        this.init();
    }
    private init() {
        let body = document.getElementsByTagName('body')[0];
        body.onkeydown = e => {
            if (DEBUG_KEYS) console.log(`Pressed: ${e.key}; ${e.code}`);
            if (!this.isKeyDown(e.code)) {
                this.enqueue({
                    type: 'keyPressed',
                    code: e.code,
                    altPressed: !!e.altKey,
                    ctrlPressed: !!e.ctrlKey,
                    shiftPressed: !!e.shiftKey
                });
                this._keys.set(e.code, true);
            }
            this.enqueue({
                type: 'keyTyped',
                key: e.key,
                code: e.code,
                altPressed: !!e.altKey,
                ctrlPressed: !!e.ctrlKey,
                shiftPressed: !!e.shiftKey
            });
        };
        body.onkeyup = e => {
            if (DEBUG_KEYS) console.log(`Released: ${e.key}; ${e.code}`);
            if (this.isKeyDown(e.code)) {
                this.enqueue({
                    type: 'keyReleased',
                    code: e.code,
                    altPressed: !!e.altKey,
                    ctrlPressed: !!e.ctrlKey,
                    shiftPressed: !!e.shiftKey
                });
                this._keys.set(e.code, false);
            }
        };
    }

    private _events: GameEvent[] = [];
    private _keys = new Map<string, boolean>();

    isKeyDown(code: string) {
        if (!this._keys.has(code)) return false;
        return this._keys.get(code);
    }

    enqueue(e: GameEvent) {
        this._events.push(e);
    }
    clearQueue() {
        return this._events.splice(0);
    }
}

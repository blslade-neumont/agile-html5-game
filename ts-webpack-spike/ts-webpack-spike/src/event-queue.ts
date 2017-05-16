import { GameEvent, MouseButton } from './utils/events';

const DEBUG_KEYS = false;
const DEBUG_MOUSE = true;

export class EventQueue {
    constructor() {
        this.init();
    }
    private init() {
        let body = document.getElementsByTagName('body')[0];
        this.initKeyboard(body);
        this.initMouse(body);
    }
    private initKeyboard(body: HTMLBodyElement) {
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
    private initMouse(body: HTMLBodyElement) {
        body.onmousemove = e => {
            if (DEBUG_MOUSE) console.log(`Mouse moved. Movement: ${e.movementX}, ${e.movementY}; Position: ${e.pageX}, ${e.pageY}`);
            this.enqueue({
                type: 'mouseMoved',
                movementX: e.movementX,
                movementY: e.movementY,
                pageX: this._pageX = (e.pageX || (this._pageX + e.movementX)),
                pageY: this._pageY = (e.pageY || (this._pageY + e.movementY))
            });
        };
        body.onmousedown = e => {
            if (DEBUG_MOUSE) console.log(`Mouse button pressed. Button: ${e.button}; Position: ${e.pageX}, ${e.pageY}`);
            if (!this.isMouseButtonDown(e.button)) {
                this.enqueue({
                    type: 'mouseButtonPressed',
                    button: <MouseButton>e.button,
                    pageX: this._pageX = e.pageX || this._pageX,
                    pageY: this._pageY = e.pageY || this._pageY
                });
                this._mouseButtons.set(e.button, true);
            }
        };
        body.onmouseup = e => {
            if (DEBUG_MOUSE) console.log(`Mouse button released. Button: ${e.button}; Position: ${e.pageX}, ${e.pageY}`);
            if (this.isMouseButtonDown(e.button)) {
                this.enqueue({
                    type: 'mouseButtonReleased',
                    button: <MouseButton>e.button,
                    pageX: this._pageX = e.pageX || this._pageX,
                    pageY: this._pageY = e.pageY || this._pageY
                });
                this._mouseButtons.set(e.button, true);
            }
        };
        body.onmousewheel = e => {
            if (DEBUG_MOUSE) console.log(`Mouse wheel. delta: ${e.wheelDelta}; Position: ${e.pageX}, ${e.pageY}`);
            this.enqueue({
                type: 'mouseWheel',
                delta: e.wheelDelta,
                pageX: this._pageX = e.pageX || this._pageX,
                pageY: this._pageY = e.pageY || this._pageY
            });
        };
    }

    private _events: GameEvent[] = [];
    private _keys = new Map<string, boolean>();
    private _mouseButtons = new Map<MouseButton, boolean>();
    private _pageX: number = 0;
    private _pageY: number = 0;

    isKeyDown(code: string) {
        if (!this._keys.has(code)) return false;
        return this._keys.get(code);
    }
    isMouseButtonDown(button: number) {
        if (!this._mouseButtons.has(button)) return false;
        return this._mouseButtons.get(button);
    }
    get mousePosition() {
        return { x: this._pageX, y: this._pageY };
    }

    enqueue(e: GameEvent) {
        this._events.push(e);
    }
    clearQueue() {
        return this._events.splice(0);
    }
}

import { GameEvent, MouseButton } from './utils/events';

export class EventQueue {
    constructor() {
        this.init();
    }

    private DEBUG_KEYS = false;
    private DEBUG_MOUSE = false;

    private init() {
        let body = document.getElementsByTagName('body')[0];
        this.initKeyboard(body);
        this.initMouse(body);
    }
    private initKeyboard(body: HTMLBodyElement) {
        body.onkeydown = e => {
            if (this.DEBUG_KEYS) console.log(`Key Pressed: ${e.key}; ${e.code}`);
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
            if (this.DEBUG_KEYS) console.log(`Key Released: ${e.key}; ${e.code}`);
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
            if (this.DEBUG_MOUSE) console.log(`Mouse moved. Movement: ${e.movementX}, ${e.movementY}; Position: ${e.pageX}, ${e.pageY}`);
            if (typeof e.pageX !== 'undefined') this._pageX = e.pageX;
            else this._pageX += e.movementX;
            if (typeof e.pageY !== 'undefined') this._pageY = e.pageY;
            else this._pageY += e.movementY;
            this.enqueue({
                type: 'mouseMoved',
                movementX: e.movementX,
                movementY: e.movementY,
                pageX: this._pageX,
                pageY: this._pageY
            });
        };
        body.onmousedown = e => {
            if (this.DEBUG_MOUSE) console.log(`Mouse button pressed. Button: ${e.button}; Position: ${e.pageX}, ${e.pageY}`);
            if (!this.isMouseButtonDown(e.button)) {
                if (typeof e.pageX !== 'undefined') this._pageX = e.pageX;
                if (typeof e.pageY !== 'undefined') this._pageY = e.pageY;
                this.enqueue({
                    type: 'mouseButtonPressed',
                    button: <MouseButton>e.button,
                    pageX: this._pageX,
                    pageY: this._pageY
                });
                this._mouseButtons.set(e.button, true);
            }
        };
        body.onmouseup = e => {
            if (this.DEBUG_MOUSE) console.log(`Mouse button released. Button: ${e.button}; Position: ${e.pageX}, ${e.pageY}`);
            if (this.isMouseButtonDown(e.button)) {
                if (typeof e.pageX !== 'undefined') this._pageX = e.pageX;
                if (typeof e.pageY !== 'undefined') this._pageY = e.pageY;
                this.enqueue({
                    type: 'mouseButtonReleased',
                    button: <MouseButton>e.button,
                    pageX: this._pageX,
                    pageY: this._pageY
                });
                this._mouseButtons.set(e.button, false);
            }
        };
        body.onwheel = e => {
            if (this.DEBUG_MOUSE) console.log(`Mouse wheel. delta: ${e.deltaY}; Position: ${e.pageX}, ${e.pageY}`);
            if (typeof e.pageX !== 'undefined') this._pageX = e.pageX;
            if (typeof e.pageY !== 'undefined') this._pageY = e.pageY;
            this.enqueue({
                type: 'mouseWheel',
                delta: e.deltaY,
                pageX: this._pageX,
                pageY: this._pageY
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
    isMouseButtonDown(button: MouseButton) {
        if (!this._mouseButtons.has(button)) return false;
        return this._mouseButtons.get(button);
    }
    get mousePosition() {
        return { x: this._pageX, y: this._pageY };
    }

    enqueue(e: GameEvent) {
        let lastEvent = this._events[this._events.length - 1];
        if (lastEvent && lastEvent.type == e.type) {
            switch (e.type) {
            case 'mouseMoved':
                (<any>lastEvent).movementX += e.movementX;
                (<any>lastEvent).movementY += e.movementY;
                (<any>lastEvent).pageX = e.pageX;
                (<any>lastEvent).pageY = e.pageY;
                return;
            case 'mouseWheel':
                (<any>lastEvent).delta += e.delta;
                return;
            case 'canvasResize':
                (<any>lastEvent).size = e.size;
                return;
            }
        }
        this._events.push(e);
    }
    clearQueue() {
        return this._events.splice(0);
    }
}

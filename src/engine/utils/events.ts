

export interface KeyTypedEvent {
    type: 'keyTyped',
    key: string
    code: string,
    altPressed: boolean,
    ctrlPressed: boolean,
    shiftPressed: boolean
}

export interface KeyPressedEvent {
    type: 'keyPressed',
    code: string,
    altPressed: boolean,
    ctrlPressed: boolean,
    shiftPressed: boolean
}

export interface KeyReleasedEvent {
    type: 'keyReleased',
    code: string,
    altPressed: boolean,
    ctrlPressed: boolean,
    shiftPressed: boolean
}

export interface MouseMovedEvent {
    type: 'mouseMoved',
    movementX: number,
    movementY: number,
    pageX: number,
    pageY: number
}

export interface MouseButtonPressedEvent {
    type: 'mouseButtonPressed',
    button: MouseButton,
    pageX: number,
    pageY: number
}

export interface MouseButtonReleasedEvent {
    type: 'mouseButtonReleased',
    button: MouseButton,
    pageX: number,
    pageY: number
}

export interface MouseWheelEvent {
    type: 'mouseWheel',
    delta: number,
    pageX: number,
    pageY: number
}

export enum MouseButton {
    Left = 0,
    Middle = 1,
    Right = 2,
    BrowserBack = 3,
    BrowserForward = 5
}

export interface CanvasResizeEvent {
    type: 'canvasResize',
    previousSize: [number, number],
    size: [number, number]
}

export type GameEvent = KeyTypedEvent
                      | KeyPressedEvent
                      | KeyReleasedEvent
                      | MouseMovedEvent
                      | MouseButtonPressedEvent
                      | MouseButtonReleasedEvent
                      | MouseWheelEvent
                      | CanvasResizeEvent;

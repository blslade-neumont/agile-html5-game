

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

export type GameEvent = KeyTypedEvent | KeyPressedEvent | KeyReleasedEvent;

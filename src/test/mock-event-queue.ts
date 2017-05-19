

export class MockEventQueue {
    private _keys: string[] = [];
    constructor(...keys: string[]) { this._keys = keys; }

    isKeyDown(key: string) {
        return this._keys.some((key2) => key == key2);
    }
}

/// <reference types="mocha" />

import { MockElement } from './mock-element';

export class MockContext {
    constructor() { }

    fillRect() { }
    fillText() { }
    measureText() { return { width: 42 } }
    drawImage() { }
}

export class MockCanvas extends MockElement {
    constructor() {
        super();
    }

    getContext(method: '2d') {
        return new MockContext();
    }
}
declare let global: any;

export function stubCanvas() {
    let previousCanvas: any;
    beforeEach(() => {
        previousCanvas = global.HTMLCanvasElement;
        global.HTMLCanvasElement = MockCanvas;
    });
    afterEach(() => {
        delete global.HTMLCanvasElement;
        if (typeof previousCanvas !== 'undefined') global.HTMLCanvasElement = previousCanvas;
    });
}

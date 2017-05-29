/// <reference types="mocha" />

import { MockElement } from './mock-element';

export class MockDocument {
    constructor() { }

    private element = new MockElement();

    createElement() { return this.element; }

    getElementById() { return this.element; }
    getElementsByClassName() { return [this.element]; }
    getElementsByName() { return [this.element]; }
    getElementsByTagName() { return [this.element]; }
    getElementsByTagNameNS() { return [this.element]; }
}
declare let global: any;

export function stubDocument() {
    let previousDocument: any;
    let previousCanvas: any;
    beforeEach(() => {
        previousDocument = global.document;
        global.document = new MockDocument();
        previousCanvas = global.HTMLCanvasElement;
        global.HTMLCanvasElement = MockElement;
    });
    afterEach(() => {
        delete global.document;
        if (typeof previousDocument !== 'undefined') global.document = previousDocument;
        delete global.HTMLCanvasElement;
        if (typeof previousCanvas !== 'undefined') global.HTMLCanvasElement = previousCanvas;
    });
}

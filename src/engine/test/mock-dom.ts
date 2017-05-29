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
export class MockImage {
    constructor(readonly width?: number, readonly height?: number) { }
}

declare let global: any;

export function stubDOM() {
    let previousDocument: any;
    let previousCanvas: any;
    let previousImage: any;
    beforeEach(() => {
        previousDocument = global.document;
        global.document = new MockDocument();
        previousCanvas = global.HTMLCanvasElement;
        global.HTMLCanvasElement = MockElement;
        previousImage = global.Image;
        global.Image = MockImage;
    });
    afterEach(() => {
        delete global.document;
        if (typeof previousDocument !== 'undefined') global.document = previousDocument;
        delete global.HTMLCanvasElement;
        if (typeof previousCanvas !== 'undefined') global.HTMLCanvasElement = previousCanvas;
        delete global.Image;
        if (typeof previousImage !== 'undefined') global.Image = previousImage;
    });
}
stubDOM();

/// <reference types="mocha" />

import { MockElement } from './mock-element';

export class MockDocument {
    constructor() { }

    private element = new MockElement();

    getElementById() { return this.element; }
    getElementsByClassName() { return [this.element]; }
    getElementsByName() { return [this.element]; }
    getElementsByTagName() { return [this.element]; }
    getElementsByTagNameNS() { return [this.element]; }
}
declare let global: any;

export function stubDocument() {
    let previousDocument: any;
    beforeEach(() => {
        previousDocument = global.document;
        global.document = new MockDocument();
    });
    afterEach(() => {
        delete global.document;
        if (typeof previousDocument !== 'undefined') global.document = previousDocument;
    });
}

/// <reference types="mocha" />

export class MockElement {
    get scrollWidth() {
        return 640;
    }
    get scrollHeight() {
        return 480;
    }
}

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

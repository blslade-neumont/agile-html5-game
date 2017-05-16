

export class MockDocument {
    constructor() { }

    getElementById() { return {}; }
    getElementsByClassName() { return [{}]; }
    getElementsByName() { return [{}]; }
    getElementsByTagName() { return [{}]; }
    getElementsByTagNameNS() { return [{}]; }
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

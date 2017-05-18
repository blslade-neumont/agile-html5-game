

export class MockDocument {
    constructor() { }

    private elemeent: any = {};

    getElementById() { return this.elemeent; }
    getElementsByClassName() { return [this.elemeent]; }
    getElementsByName() { return [this.elemeent]; }
    getElementsByTagName() { return [this.elemeent]; }
    getElementsByTagNameNS() { return [this.elemeent]; }
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

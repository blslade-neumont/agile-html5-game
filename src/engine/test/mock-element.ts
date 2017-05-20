


export class MockContext {
    constructor() { }

    fillRect() { }
    fillText() { }
    measureText() { return { width: 42 } }
    drawImage() { }
}

export class MockElement {
    scrollWidth = 640;
    scrollHeight = 480;

    getContext() {
        return new MockContext();
    }
}

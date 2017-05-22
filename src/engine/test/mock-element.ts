


export class MockContext {
    constructor(readonly canvas: MockElement) { }

    save() { }
    restore() { }

    translate() { }
    rotate() { }
    scale() { }

    fillRect() { }
    fillText() { }
    measureText() { return { width: 42 } }
    drawImage() { }
}

export class MockElement {
    width = 925;
    height = 295;
    scrollWidth = 640;
    scrollHeight = 480;

    getContext() {
        return new MockContext(this);
    }
}

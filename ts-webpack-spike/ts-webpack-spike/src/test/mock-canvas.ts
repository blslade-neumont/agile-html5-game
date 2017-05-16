

export class MockContext {
    constructor() { }

    fillRect() { }
    fillText() { }
}

export class MockCanvas {
    constructor() { }

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

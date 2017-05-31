/// <reference types="mocha" />

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

    //canvas
    getContext() {
        return new MockContext(this);
    }
}

export class MockDocument {
    constructor() { }

    private element = new MockElement();

    createElement(type: string) {
        if (type == 'img') return new MockImage();
        else if (type == 'audio') return new MockAudio();
        return this.element;
    }

    getElementById() { return this.element; }
    getElementsByClassName() { return [this.element]; }
    getElementsByName() { return [this.element]; }
    getElementsByTagName() { return [this.element]; }
    getElementsByTagNameNS() { return [this.element]; }
}
export class MockImage extends MockElement {
    constructor(width?: number, height?: number) {
        super();
        this.width = width;
        this.height = height;
    }
}
export class MockAudio extends MockElement {
    constructor() {
        super();
    }

    play() { this.paused = false; }
    pause() { this.paused = true; }
    paused = true;
}
export class MockWindow {
    location = new MockLocation();
}
export class MockLocation {
    origin = 'null/C:/agile-html5-game';
    pathname = '/agile-html5-game/index.html';
}

declare let global: any;

export function stubDOM() {
    let previousDocument: any;
    let previousWindow: any;
    let previousCanvas: any;
    let previousImage: any;
    let previousAudio: any;
    beforeEach(() => {
        previousDocument = global.document;
        global.document = new MockDocument();
        previousWindow = global.window;
        global.window = new MockWindow();
        previousCanvas = global.HTMLCanvasElement;
        global.HTMLCanvasElement = MockElement;
        previousImage = global.HTMLImageElement;
        global.HTMLImageElement = MockImage;
        previousAudio = global.HTMLAudioElement;
        global.HTMLAudioElement = MockAudio;
    });
    afterEach(() => {
        delete global.document;
        if (typeof previousDocument !== 'undefined') global.document = previousDocument;
        delete global.window;
        if (typeof previousWindow !== 'undefined') global.window = previousWindow;
        delete global.HTMLCanvasElement;
        if (typeof previousCanvas !== 'undefined') global.HTMLCanvasElement = previousCanvas;
        delete global.HTMLImageElement;
        if (typeof previousImage !== 'undefined') global.HTMLImageElement = previousImage;
        delete global.HTMLAudioElement;
        if (typeof previousAudio !== 'undefined') global.HTMLAudioElement = previousAudio;
    });
}
stubDOM();

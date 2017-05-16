/// <reference types="mocha" />

export class MockImage {
    constructor(readonly width?: number, readonly height?: number) { }
}
declare let global: any;

export function stubImage() {
    let previousImage: any;
    beforeEach(() => {
        previousImage = global.Image;
        global.Image = MockImage;
    });
    afterEach(() => {
        delete global.Image;
        if (typeof previousImage !== 'undefined') global.Image = previousImage;
    });
}

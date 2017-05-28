

export class Rect {
    constructor(readonly left: number, readonly right: number, readonly bottom: number, readonly top: number) { }

    static readonly zero = new Rect(0, 0, 0, 0);

    get width() {
        return this.right - this.left;
    }
    get height() {
        return this.top - this.bottom;
    }
};

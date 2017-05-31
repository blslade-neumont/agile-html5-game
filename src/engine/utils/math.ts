

export function degToRad(deg: number) {
    return (deg / 180) * Math.PI;
}
export function radToDeg(rad: number) {
    return (rad / Math.PI) * 180;
}

export function clamp(value: number, lowerBound: number, upperBound: number) {
    if (lowerBound > upperBound) {
        throw new Error("Attempting to clamp with a lower bound greater than the upper bound");
    }

    if (value < lowerBound) value = lowerBound;
    else if (value > upperBound) value = upperBound;
    return value;
}

export function fmod(a: number, b: number) {
    //Adapted from https://gist.github.com/wteuber/6241786
    //TODO: this implementation loses precision. Doesn't matter much in games, but still
    //Besides that, it also converts to a string and back. Yikes.
    return +(a - (Math.floor(a / b) * b)).toPrecision(8);
}

export function pointDirection(x1: number, y1: number, x2: number, y2: number) {
    let xdiff = x2 - x1, ydiff = y2 - y1;
    return fmod(radToDeg(Math.atan2(-ydiff, xdiff)), 360);
}

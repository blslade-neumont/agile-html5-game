

export function degToRad(deg: number) {
    return (deg / 180) * Math.PI;
}
export function radToDeg(rad: number) {
    return (rad / Math.PI) * 180;
}

export function fmod(a: number, b: number) {
    //Adapted from https://gist.github.com/wteuber/6241786
    //TODO: this implementation loses precision. Doesn't matter much in games, but still
    //Besides that, it also converts to a string and back. Yikes.
    return +(a - (Math.floor(a / b) * b)).toPrecision(8);
}

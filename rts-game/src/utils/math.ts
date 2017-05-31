import { radToDeg, fmod } from '../engine';

export function pointDistance2(x1: number, y1: number, x2: number, y2: number) {
    return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
}
export function pointDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(pointDistance2(x1, y1, x2, y2));
}

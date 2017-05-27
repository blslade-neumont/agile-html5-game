import nnn = require('noisejs');
let Noise = (<any>nnn).Noise;

let cache = new Map<number, Noise>();

export function generateNoise(seed: number, chunkx: number, chunky: number) {
    !cache.has(seed) && cache.set(seed, new Noise(seed));
    let noise = cache.get(seed);
    let columns = [];
    for (let q = 0; q < 64; q++) {
        let column = [];
        for (let w = 0; w < 64; w++) {
            column.push(noise.perlin2((chunkx * 64 + q) / 12, (chunky * 64 + w) / 12));
        }
        columns.push(column);
    }
    return columns;
}



export type SimpleSpriteT = {
    src: string,
    pivot?: { x: number, y: number }
};

export type SingleTileSpriteT = SimpleSpriteT & {
    tileset: { width: number, height: number, tilex: number, tiley: number }
};

export type AnimationSpriteT = SimpleSpriteT & {
    tileset: {
        width: number,
        height: number
    },
    frames: { tilex: number, tiley: number }[],
    framesPerSecond?: number
};

export type SpriteT = SimpleSpriteT | SingleTileSpriteT | AnimationSpriteT;

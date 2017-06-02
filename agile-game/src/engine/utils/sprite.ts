

export type SimpleSpriteT = {
    src: string,
    pivot?: { x: number, y: number }
};

export type SingleTileSpriteT = {
    src: string,
    pivot?: { x: number, y: number },
    tileset: { width: number, height: number, tilex: number, tiley: number }
};

export type AnimationSpriteT = {
    src: string,
    pivot?: { x: number, y: number },
    tileset: {
        width: number,
        height: number
    },
    frames: { tilex: number, tiley: number }[],
    framesPerSecond?: number
};

export type SpriteT = SimpleSpriteT | SingleTileSpriteT | AnimationSpriteT;

export function isSingleTileSprite(sprite: SpriteT): sprite is SingleTileSpriteT {
    return !!(<any>sprite).tileset && !(<any>sprite).frames;
}
export function isAnimationSprite(sprite: SpriteT): sprite is AnimationSpriteT {
    return !!(<any>sprite).frames;
}

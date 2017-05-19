import { SpriteT, SimpleSpriteT, SingleTileSpriteT, AnimationSpriteT, isSimpleSprite, isSingleTileSprite, isAnimationSprite } from './sprite';
import { ResourceLoader } from '../resource-loader';
import { fmod } from '../utils/math';

const LINE_HEIGHT = 12;

export function fillText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
    let lines = text.split('\n');
    for (let line of lines) {
        context.fillText(line, x, y);
        y += LINE_HEIGHT;
    }
}

export function drawSprite(context: CanvasRenderingContext2D, loader: ResourceLoader, sprite: SpriteT, x = 0, y = 0, imageIndex = 0, defaultFps = 30) {
    let img = loader.loadImage(sprite.src);
    let pivot = sprite.pivot || { x: 0, y: 0 };

    if (isAnimationSprite(sprite)) {
        let tileset = sprite.tileset;
        let frames = sprite.frames;
        let fps = sprite.framesPerSecond;
        if (typeof fps === 'undefined') fps = defaultFps;
        let frameIdx = fmod(Math.floor(imageIndex * fps), frames.length);
        let frame = frames[frameIdx];
        context.drawImage(img, frame.tilex * tileset.width, frame.tiley * tileset.height, tileset.width, tileset.height, x - pivot.x, y - pivot.y, tileset.width, tileset.height);
    }
    else if (isSingleTileSprite(sprite)) {
        let tileset = sprite.tileset;
        context.drawImage(img, tileset.tilex * tileset.width, tileset.tiley * tileset.height, tileset.width, tileset.height, x - pivot.x, y - pivot.y, tileset.width, tileset.height);
    }
    else if (isSimpleSprite(sprite)) {
        context.drawImage(img, x - pivot.x, y - pivot.y);
    }
}

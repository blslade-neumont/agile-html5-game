import { SpriteT, SingleTileSpriteT } from './sprite';
import { ResourceLoader } from '../resource-loader';

const LINE_HEIGHT = 12;

export function fillText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
    let lines = text.split('\n');
    for (let line of lines) {
        context.fillText(line, x, y);
        y += LINE_HEIGHT;
    }
}

export function drawSprite(context: CanvasRenderingContext2D, loader: ResourceLoader, sprite: SpriteT, x: number, y: number, imageIndex = 0) {
    let img = loader.loadImage(sprite.src);
    let tileset = (<SingleTileSpriteT>sprite).tileset;
    context.drawImage(img, tileset.tilex * tileset.width, tileset.tiley * tileset.height, tileset.width, tileset.height, x, y, tileset.width, tileset.height);
}

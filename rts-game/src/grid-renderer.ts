import { Game, GameScene, GameObject, ResourceLoader, SingleTileSpriteT, drawSprite } from './engine';
import { World } from './world';
import { WorldTile, TILE_SIZE } from './dbs/tile-db';
import { RtsGame } from './rts-game';

export class GridRenderer extends GameObject {
    constructor(private readonly world: World) {
        super('GridRenderer');
    }

    render(context: CanvasRenderingContext2D) {
        if (!this.world) { throw new Error(`World not set! Cannot render grid!`); }
        if (!this.resources) { throw new Error(`Loader not set! Cannot render grid!`); }

        if (!this.shouldRender) return;
        
        let bounds = this.scene.camera.bounds;
        let startx = Math.floor(bounds.left / TILE_SIZE);
        let starty = Math.floor(bounds.bottom / TILE_SIZE);
        let endx = Math.floor(bounds.right / TILE_SIZE) + 1;
        let endy = Math.floor(bounds.top / TILE_SIZE) + 1;

        for (let x = startx; x < endx; x++) {
            for (let y = starty; y < endy; y++) {
                let tile: WorldTile = this.world.getTileAt(x, y);
                drawSprite(context, this.resources, tile.sprite, x * TILE_SIZE, y * TILE_SIZE, this.animationSpeed);
            }
        }
    }
}

import { World } from './world';
import { WorldTile } from './dbs/tile-db';
import { Game, GameScene, GameObject, ResourceLoader, SpriteT, SingleTileSpriteT, drawSprite } from './engine';
import { TILE_SIZE } from './dbs/tile-db';
import { AgileGame } from './agile-game';
import { pauseWithGame } from './utils/pause-with-game';
import { OverworldScene } from './scenes/overworld-scene';

export class GridRenderer extends GameObject {
    constructor() {
        super('GridRenderer');
    }

    addToScene(scene: GameScene) {
        if (!scene || !(<any>scene).world) throw new Error(`The GridRenderer can only be added to a scene with a World`);
        super.addToScene(scene);
        pauseWithGame(this);
    }

    get world() {
        if (this.scene) return (<any>this.scene).world;
        return null;
    }

    protected renderImpl(context: CanvasRenderingContext2D) {
        if (!this.world) { throw new Error(`World not set! Cannot render grid!`); }
        if (!this.resources) { throw new Error(`Resource loader not set! Cannot render grid!`); }

        if (!this.shouldRender) return;
        
        let bounds = this.game.scene.camera.bounds;
        let startx = Math.floor(bounds.left / TILE_SIZE);
        let starty = Math.floor(bounds.bottom / TILE_SIZE);
        let endx = Math.floor(bounds.right / TILE_SIZE) + 1;
        let endy = Math.floor(bounds.top / TILE_SIZE) + 1;

        for (let x = startx; x < endx; x++) {
            for (let y = starty; y < endy; y++) {
                let sprite: SpriteT = this.world.getSpriteAt(x, y);
                drawSprite(context, this.resources, sprite, x * TILE_SIZE, y * TILE_SIZE, this.animationAge);
            }
        }
    }
}

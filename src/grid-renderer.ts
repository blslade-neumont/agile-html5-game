import { World } from './world';
import { WorldTile } from './dbs/tile-db';
import { Game, GameScene, GameObject, ResourceLoader, SpriteT, SingleTileSpriteT, drawSprite } from './engine';
import { TILE_SIZE } from './dbs/tile-db';
import { AgileGame } from './agile-game';
import { pauseWithGame } from './utils/pause-with-game';
import { OverworldScene } from './scenes/overworld-scene';

const TIME_BETWEEN_LIGHT_TICKS = .5;

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

    tick(delta: number) {
        super.tick(delta);
        this._timeUntilLightTick -= delta;
    }

    private _timeUntilLightTick = 0;
    private _lightCache: { x: number, y: number, sprite: SpriteT }[] = [];
    renderLight(context: CanvasRenderingContext2D) {
        if (!this.world) { throw new Error(`World not set! Cannot render grid!`); }
        if (!this.resources) { throw new Error(`Resource loader not set! Cannot render grid!`); }

        if (!this.shouldRender) return;

        if (this._timeUntilLightTick <= 0) {
            this._lightCache = [];

            let bounds = this.game.scene.camera.bounds;
            let startx = Math.floor((bounds.left - 120) / TILE_SIZE);
            let starty = Math.floor((bounds.bottom - 120) / TILE_SIZE);
            let endx = Math.floor((bounds.right + 120) / TILE_SIZE) + 1;
            let endy = Math.floor((bounds.top + 120) / TILE_SIZE) + 1;

            for (let x = startx; x < endx; x++) {
                for (let y = starty; y < endy; y++) {
                    let sprite: SpriteT = this.world.getLightSpriteAt(x, y);
                    if (sprite) this._lightCache.push({ x: x * TILE_SIZE, y: y * TILE_SIZE, sprite: sprite });
                }
            }
            this._timeUntilLightTick = TIME_BETWEEN_LIGHT_TICKS;
        }
        for (let source of this._lightCache) {
            drawSprite(context, this.resources, source.sprite, source.x + (TILE_SIZE / 2), source.y + (TILE_SIZE / 2), this.animationAge);
        }
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

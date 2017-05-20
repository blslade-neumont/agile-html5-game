import { World } from './world';
import { WorldTile } from './dbs/tile-db';
import { Game, GameObject, ResourceLoader, SingleTileSpriteT, drawSprite } from './engine';
import { TILE_SIZE } from './dbs/tile-db';
import { AgileGame } from './agile-game';

export class GridRenderer extends GameObject {
    constructor() {
        super('GridRenderer');
    }

    addToGame(game: Game) {
        if (!game || !(game instanceof AgileGame)) throw new Error(`The GridRenderer can only be added to an AgileGame`);
        super.addToGame(game);
    }
    
    get world() {
        if (this.game) return (<any>this.game).world;
        return null;
    }
    
    render(context: CanvasRenderingContext2D) {
        if (!this.world) { throw new Error(`World not set! Cannot render grid!`); }
        if (!this.resources) { throw new Error(`Loader not set! Cannot render grid!`); }

        if (!this.shouldRender) return;

        for (let x: number = 0; x < this.world.tilesX; ++x) {
            for (let y: number = 0; y < this.world.tilesY; ++y) {
                let tile: WorldTile = this.world.getTileAt(x, y);
                drawSprite(context, this.resources, tile.sprite, x * TILE_SIZE, y * TILE_SIZE, this.animationSpeed);
            }
        }
    }
}

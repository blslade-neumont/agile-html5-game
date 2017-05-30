import { GameObject, GameScene } from '../engine';
import { Enemy } from './enemy';
import { World } from '../world';
import { tiles, TILE_SIZE } from '../dbs/tile-db';

export class EnemyController extends GameObject {
    constructor(private world: World) {
        super('EnemyController', { shouldRender: false });
        this.init();
    }
    private init() {
        this.initBase();
    }
    private initBase() {
        while (true) {
            let distance = 5 + Math.random() * 10;
            let angle = 2 * Math.PI * Math.random();
            let xpos = Math.floor(Math.cos(angle) * distance);
            let ypos = Math.floor(Math.sin(angle) * distance);
            if (!this.world.getTileAt(xpos, ypos).isSolid && !this.world.getTileAt(xpos + 1, ypos).isSolid && !this.world.getTileAt(xpos, ypos + 1).isSolid && !this.world.getTileAt(xpos + 1, ypos + 1).isSolid) {
                this._baseCoords = [xpos, ypos];
                this.world.setTileAt(xpos, ypos, tiles['enemy-base']);
                break;
            }
        }
    }

    addToScene(scene: GameScene) {
        super.addToScene(scene);
        this.addEnemies(3);
    }

    private _baseCoords: [number, number] = [0, 0];
    get baseCoords(): [number, number] {
        return [this._baseCoords[0], this._baseCoords[1]];
    }

    private _enemies: Enemy[] = [];
    get enemies() {
        return this._enemies;
    }

    addEnemies(count: number) {
        for (let q = 0; q < count; q++) {
            this.addEnemy();
        }
    }
    private addEnemy() {
        let enemy = new Enemy(this, {
            x: (this._baseCoords[0] + 1) * TILE_SIZE,
            y: (this._baseCoords[1] + 1) * TILE_SIZE
        });
        this.enemies.push(enemy);
        this.scene.addObject(enemy);
        return enemy;
    }
}

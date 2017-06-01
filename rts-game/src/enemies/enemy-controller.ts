import { GameObject, GameScene, GameEvent } from '../engine';
import { Enemy } from './enemy';
import { World } from '../world';
import { tiles, TILE_SIZE } from '../dbs/tile-db';
import { Node, keyFromCoords } from './node';
import { Path } from './path';

type EnemyRenderMode = 'none' | 'single' | 'all';

export class EnemyController extends GameObject {
    constructor(private world: World) {
        super('EnemyController');
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
        this.addEnemies(10);
    }

    get debugControls(): any[] {
        return [
            { key: 'E', name: 'enemy render mode', state: this.renderMode },
            { key: 'G', name: 'fog of war', state: this.renderFogOfWar }
        ];
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
        for (let q = 0; q < count; q++)
            this.addEnemy();
        this.updateRenderDebugInfo();
    }
    private addEnemy() {
        let enemy = new Enemy(this, {
            x: (this._baseCoords[0] + 1.5) * TILE_SIZE,
            y: (this._baseCoords[1] + 1.5) * TILE_SIZE
        });
        this.enemies.push(enemy);
        this.scene.addObject(enemy);
        return enemy;
    }

    renderMode = 'all';
    renderFogOfWar = true;
    handleEvent(evt: GameEvent) {
        if (evt.type == 'keyPressed') {
            if (evt.code == 'KeyE') {
                this.renderMode = (this.renderMode == 'none') ? 'single' :
                                (this.renderMode == 'single') ? 'all' :
                                                                'none';
                this.updateRenderDebugInfo();
            }
            else if (evt.code == 'KeyG') {
                this.renderFogOfWar = !this.renderFogOfWar;
            }
        }
    }
    private updateRenderDebugInfo() {
        for (let enemy of this._enemies) {
            enemy.renderDebugInfo = this.renderMode == 'all';
        }
        if (this.renderMode == 'single' && this._enemies.length) this._enemies[0].renderDebugInfo = true;
    }

    nodeMap = new Map<string, Node | null>();
    getNode(x: number, y: number): Node | null {
        let key = keyFromCoords(x, y);
        if (!this.nodeMap.has(key)) {
            let newNode: Node | null = this.world.getTileAt(x, y).isSolid ? null : new Node(this, x, y);
            this.nodeMap.set(key, newNode);
            return newNode;
        }
        else return this.nodeMap.get(key);
    }
    getPath(xfrom: number, yfrom: number, xto: number, yto: number): Path | null {
        let from = this.getNode(xfrom, yfrom);
        let to = this.getNode(xto, yto);
        if (!from || !to) return null;
        return Path.pathfind(from, to);
    }

    render(context: CanvasRenderingContext2D) {
        if (!this.renderFogOfWar) return;


    }
}

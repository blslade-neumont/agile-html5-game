import { GameObject, GameScene, GameEvent, fmod } from '../engine';
import { Enemy } from './enemy';
import { World } from '../world';
import { tiles, TILE_SIZE } from '../dbs/tile-db';
import { Node, keyFromCoords } from './node';
import { Path } from './path';
import { pointDistance2 } from '../utils/math';

const FOW_BUCKET_SIZE = 8;

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
    
    private _fowBuckets = new Map<string, boolean[][]>();
    isInFOW(x: number, y: number) {
        let [bucketx, buckety] = [Math.floor(x / FOW_BUCKET_SIZE), Math.floor(y / FOW_BUCKET_SIZE)];
        let key = `${bucketx}_${buckety}`;
        if (!this._fowBuckets.has(key)) return true;
        let bucket = this._fowBuckets.get(key);
        let [offsetx, offsety] = [fmod(x, FOW_BUCKET_SIZE), fmod(y, FOW_BUCKET_SIZE)];
        return bucket[offsetx][offsety];
    }
    setFOW(x: number, y: number, val: boolean) {
        let [bucketx, buckety] = [Math.floor(x / FOW_BUCKET_SIZE), Math.floor(y / FOW_BUCKET_SIZE)];
        let key = `${bucketx}_${buckety}`;
        if (!this._fowBuckets.has(key)) {
            if (val) return;
            let row = [];
            for (let q = 0; q < FOW_BUCKET_SIZE; q++)
                row.push(true);
            this._fowBuckets.set(key, row.map(col => [...row]));
        }
        let bucket = this._fowBuckets.get(key);
        let [offsetx, offsety] = [fmod(x, FOW_BUCKET_SIZE), fmod(y, FOW_BUCKET_SIZE)];
        bucket[offsetx][offsety] = val;
    }
    clearFOW(x: number, y: number, radius: number, newVal = false) {
        let dist = Math.ceil(radius);
        let radius2 = radius * radius;
        for (let q = x - dist; q <= x + dist; q++) {
            for (let w = y - dist; w <= y + dist; w++) {
                if (pointDistance2(x, y, q, w) <= radius2) this.setFOW(q, w, newVal);
            }
        }
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

        if (!this.shouldRender) return;

        let bounds = this.scene.camera.bounds;
        let startx = Math.floor(bounds.left / TILE_SIZE / FOW_BUCKET_SIZE);
        let starty = Math.floor(bounds.bottom / TILE_SIZE / FOW_BUCKET_SIZE);
        let endx = Math.floor(bounds.right / TILE_SIZE / FOW_BUCKET_SIZE) + 1;
        let endy = Math.floor(bounds.top / TILE_SIZE / FOW_BUCKET_SIZE) + 1;

        context.fillStyle = 'rgba(0, 0, 0, .8)';
        for (let bucketx = startx; bucketx < endx; bucketx++) {
            for (let buckety = starty; buckety < endy; buckety++) {
                let bucketPx = bucketx * TILE_SIZE * FOW_BUCKET_SIZE;
                let bucketPy = buckety * TILE_SIZE * FOW_BUCKET_SIZE;

                let key = `${bucketx}_${buckety}`;
                if (!this._fowBuckets.has(key)) {
                    context.fillRect(bucketPx, bucketPy, TILE_SIZE * FOW_BUCKET_SIZE, TILE_SIZE * FOW_BUCKET_SIZE);
                    continue;
                }
                let bucket = this._fowBuckets.get(key);

                for (let q = 0; q < FOW_BUCKET_SIZE; q++) {
                    for (let w = 0; w < FOW_BUCKET_SIZE; w++) {
                        if (bucket[q][w]) context.fillRect(bucketPx + q * TILE_SIZE, bucketPy + w * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    }
                }
            }
        }
    }
}

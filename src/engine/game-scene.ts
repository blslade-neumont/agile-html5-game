import { Game } from './game';
import { GameObject } from './game-object';
import { Camera } from './camera';

export class GameScene {
    constructor(private _game: Game = null) {
    }
    
    get game() {
        return this._game;
    }
    set game(val: Game) {
        this._game = val;
    }

    public start() {
        this.initCamera();
    }

    public handleEvent(evt) {
        for (let obj of this._objects) {
            if (obj.shouldTick && obj.handleEvent(evt)) break;
        }
    }

    public tick(delta: number) {
        for (let obj of this._objects) {
            if (obj.shouldTick) obj.tick(delta);
        }
        if (this.camera) this.camera.tick(delta);
    }

    public render(context: CanvasRenderingContext2D) {
        let camera = this.camera;
        if (camera) camera.push(context);
        for (let obj of this._objects) {
            if (obj.shouldRender) obj.render(context);
        }
        if (camera) camera.pop(context);
    }

    private _objects: GameObject[] = [];
    addObject(obj: GameObject) {
        this._objects.push(obj);
        obj.addToScene(this);
    }
    removeObject(obj: GameObject) {
        let idx = this._objects.indexOf(obj);
        if (idx == -1) throw new Error(`Cannot remove game object '${obj.name}': it has not been added.`);
        this._objects.splice(idx, 1);
        obj.removeFromScene();
    }
    findObject(predicate: (obj: GameObject) => boolean): GameObject | null;
    findObject<T extends GameObject>(predicate: (obj: GameObject) => obj is T): T | null;
    findObject(name: string): GameObject | null;
    findObject(predicate: string | ((obj: GameObject) => boolean)) {
        if (typeof predicate == 'string') {
            let name = predicate;
            predicate = obj => obj.name == name;
        }
        else if (!predicate) throw new Error(`Invalid predicate: ${predicate}`);
        for (let obj of this._objects) {
            if (predicate(obj)) return obj;
        }
        return null;
    }
    findObjects(predicate: (obj: GameObject) => boolean): GameObject[];
    findObjects<T extends GameObject>(predicate: (obj: GameObject) => obj is T): T[];
    findObjects(predicate: (obj: GameObject) => boolean) {
        if (typeof predicate !== 'function') throw new Error(`Invalid predicate: ${predicate}`);
        return this._objects.filter(predicate);
    }


    private initCamera() {
        this.camera = new Camera(this);
    }

    private _camera: Camera | null = null;
    get camera(): Camera | null {
        return this._camera;
    }
    set camera(val: Camera | null) {
        this._camera = val;
    }
};

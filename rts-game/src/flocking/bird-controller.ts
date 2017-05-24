import { GameObject, GameObjectOptions, GameEvent } from '../engine';
import { Bird } from './bird';

type FlockingRenderMode = 'none' | 'single' | 'all';

export class BirdController extends GameObject {
    constructor() {
        super("BirdController", { shouldRender: false });
    }

    private _birds: Bird[] = [];
    get birds() {
        return this._birds;
    }

    addBirds(count: number) {
        for (let q = 0; q < count; q++)
            this.addBird();
        this.updateRenderDebugInfo();
    }
    private addBird() {
        let opts: GameObjectOptions = {
            direction: Math.random() * 360,
            speed: (2 + Math.random() * 4) * 30,
            x: (-.5 + Math.random()) * 3000,
            y: (-.5 + Math.random()) * 3000
        };
        let bird = new Bird(this, opts);
        this._birds.push(bird);
        this.game.scene.addObject(bird);
    }

    renderMode: FlockingRenderMode = 'none';

    handleEvent(evt: GameEvent) {
        if (evt.type == 'keyPressed' && evt.code == 'KeyF') {
            this.renderMode = (this.renderMode == 'none') ? 'single' :
                            (this.renderMode == 'single') ? 'all' :
                                                            'none';
            this.updateRenderDebugInfo();
        }
    }
    private updateRenderDebugInfo() {
        for (let bird of this._birds) {
            bird.renderDebugInfo = this.renderMode == 'all';
        }
        if (this.renderMode == 'single' && this._birds.length) this._birds[0].renderDebugInfo = true;
    }
}

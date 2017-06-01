import { GameObject, GameObjectOptions, GameEvent } from '../engine';
import { Bat } from './bat';

type FlockingRenderMode = 'none' | 'single' | 'all';

export class BatController extends GameObject {
    constructor() {
        super("BirdController", { shouldRender: false });
    }
    
    get debugControls(): any[] {
        return [
            { key: 'f', name: 'flocking render mode', state: this.renderMode }
        ];
    }

    private _bats: Bat[] = [];
    get bats() {
        return this._bats;
    }

    addBats(count: number) {
        for (let q = 0; q < count; q++)
            this.addBat();
        this.updateRenderDebugInfo();
    }
    private addBat() {
        let opts: GameObjectOptions = {
            direction: Math.random() * 360,
            speed: (2 + Math.random() * 4) * 30,
            x: (-.5 + Math.random()) * 3000,
            y: (-.5 + Math.random()) * 3000
        };
        let bird = new Bat(this, opts);
        this._bats.push(bird);
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
        for (let bat of this._bats) {
            bat.renderDebugInfo = this.renderMode == 'all';
        }
        if (this.renderMode == 'single' && this._bats.length) this._bats[0].renderDebugInfo = true;
    }
}

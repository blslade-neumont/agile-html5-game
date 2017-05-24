import { GameObject, GameObjectOptions } from '../engine';
import { Bird } from './bird';

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
}

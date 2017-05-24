import { GameObject, GameObjectOptions } from '../../engine';
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
            speed: Math.random() * 4 * 30
        };
        let bird = new Bird(this, opts);
        this._birds.push(bird);
        this.game.scene.addObject(bird);
    }
}

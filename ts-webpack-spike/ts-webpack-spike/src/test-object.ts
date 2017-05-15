import { GameObject, GameObjectOptions } from './game-object';
import { delay } from './utils/delay';

export class TestObject extends GameObject {
    constructor(opts: GameObjectOptions = { x: 50, y: 50 }) {
        super('TestObject', opts);
        this.patrol();
    }

    private async patrol() {
        while (true) {
            this.hspeed = 4;
            await delay(1000);
            this.hspeed = -4;
            await delay(1000);
        }
    }
}

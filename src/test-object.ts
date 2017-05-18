import { GameObject, GameObjectOptions, delay, GameEvent } from './engine';

const MOVE_SPEED = 4 * 30;

export class TestObject extends GameObject {
    constructor(opts: GameObjectOptions = { x: 50, y: 50 }) {
        super('TestObject', opts);
    }

    handleEvent(evt: GameEvent) {
        if (evt.type == 'keyPressed') {
            if (evt.code == 'ArrowLeft') this.hspeed -= MOVE_SPEED;
            else if (evt.code == 'ArrowRight') this.hspeed += MOVE_SPEED;
            else if (evt.code == 'ArrowUp') this.vspeed -= MOVE_SPEED;
            else if (evt.code == 'ArrowDown') this.vspeed += MOVE_SPEED;
        }
        else if (evt.type == 'keyReleased') {
            if (evt.code == 'ArrowLeft') this.hspeed += MOVE_SPEED;
            else if (evt.code == 'ArrowRight') this.hspeed -= MOVE_SPEED;
            else if (evt.code == 'ArrowUp') this.vspeed += MOVE_SPEED;
            else if (evt.code == 'ArrowDown') this.vspeed -= MOVE_SPEED;
        }
    }
}

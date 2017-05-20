import { Camera } from './camera';
import { Game } from './game';
import { GameObject } from './game-object';

export class FollowCamera extends Camera {
    constructor(game: Game) {
        super(game);
    }

    private _follow = null;
    get follow() {
        return this._follow;
    }
    set follow(val: GameObject) {
        this._follow = val;
    }

    private _offset = [0, 0];
    get followOffset() {
        return this._follow;
    }
    set followOffset([offsetx, offsety]: [number, number]) {
        this._offset = [offsetx, offsety];
    }

    tick(delta: number) {
        if (this.follow) {
            let target = [this._follow.x + this._offset[0], this._follow.y + this._offset[1]]
            this._center = target;
        }
        super.tick(delta);
    }
}

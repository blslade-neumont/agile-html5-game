import { degToRad, radToDeg, fmod } from './utils/math';
import { Game } from './game';

export interface GameObjectOptions {
    x?: number,
    y?: number,
    direction?: number,
    speed?: number,
    hspeed?: number,
    vspeed?: number,
    shouldRender?: boolean
};

const DEBUG_MOVEMENT = false;

export class GameObject {
    constructor(name: string, opts: GameObjectOptions = {}) {
        this._name = name;
        if (typeof opts.x != 'undefined') this.x = opts.x;
        if (typeof opts.y != 'undefined') this.y = opts.y;
        if (typeof opts.direction != 'undefined') this.direction = opts.direction;
        if (typeof opts.speed != 'undefined') this.speed = opts.speed;
        if (typeof opts.hspeed != 'undefined') this.hspeed = opts.hspeed;
        if (typeof opts.vspeed != 'undefined') this.vspeed = opts.vspeed;
    }

    private _name;
    get name() {
        return this._name;
    }

    private _x = 0;
    get x() {
        return this._x;
    }
    set x(val) {
        this._x = val;
    }
    private _y = 0;
    get y() {
        return this._y;
    }
    set y(val) {
        this._y = val;
    }

    private _dir = 0;
    private _speed = 0;
    private _hspeed = 0;
    private _vspeed = 0;

    get direction() {
        return this._dir;
    }
    set direction(val) {
        if (DEBUG_MOVEMENT) console.log(`setting direction: ${val}`);
        val = fmod(val, 360);
        if (this._dir == val) return;
        this._dir = val;
        this.updateHVSpeed();
    }
    get speed() {
        return this._speed;
    }
    set speed(val) {
        if (DEBUG_MOVEMENT) console.log(`setting speed: ${val}`);
        if (val < 0) throw new Error(`Invalid speed: ${val}. Must be >= 0`);
        if (this._speed == val) return;
        this._speed = val;
        this.updateHVSpeed();
    }

    get hspeed() {
        return this._hspeed;
    }
    set hspeed(val) {
        if (DEBUG_MOVEMENT) console.log(`setting hspeed: ${val}`);
        if (this._hspeed == val) return;
        this._hspeed = val;
        this.updateDirectionAndSpeed();
    }
    get vspeed() {
        return this._vspeed;
    }
    set vspeed(val) {
        if (DEBUG_MOVEMENT) console.log(`setting vspeed: ${val}`);
        if (this._vspeed == val) return;
        this._vspeed = val;
        this.updateDirectionAndSpeed();
    }

    private updateHVSpeed() {
        let radians = degToRad(this._dir);
        this._vspeed = Math.sin(radians) * this._speed;
        this._hspeed = Math.cos(radians) * this._speed;
        if (DEBUG_MOVEMENT) console.log(`  hspeed: ${this._hspeed}; vspeed: ${this._vspeed}`);
    }
    private updateDirectionAndSpeed() {
        this._speed = Math.sqrt(this._hspeed * this._hspeed + this._vspeed * this._vspeed);
        if (this._speed == 0) return;
        this._dir = radToDeg(Math.atan2(this._vspeed, this._hspeed));
        if (this._dir < 0) this._dir += 360;
        if (DEBUG_MOVEMENT) console.log(`  speed: ${this._speed}; direction: ${this._dir}`);
    }

    private _shouldRender = true;
    get shouldRender() {
        return this._shouldRender;
    }
    set shouldRender(val) {
        this._shouldRender = val;
    }

    private _game: Game;
    get game() {
        return this._game;
    }
    get resources() {
        return this.game.resourceLoader;
    }
    addToGame(game: Game) {
        if (this._game) throw new Error('This game object is already added to a game!');
        this._game = game;
    }

    tick(delta: number) {
        this.x += this.hspeed * delta;
        this.y += this.vspeed * delta;
    }

    render(context: CanvasRenderingContext2D) {
        if (!this.shouldRender) return;
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, 16, 16);
    }
}

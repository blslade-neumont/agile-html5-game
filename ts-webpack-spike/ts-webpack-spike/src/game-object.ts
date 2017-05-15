import { degToRad, radToDeg } from './utils/math';

export interface GameObjectOptions {
    x?: number,
    y?: number,
    direction?: number,
    speed?: number,
    hspeed?: number,
    vspeed?: number,
    shouldRender?: boolean
};

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
        if (this._dir == val) return;
        this._dir = val;
        this.updateHVSpeed();
    }
    get speed() {
        return this._speed;
    }
    set speed(val) {
        if (this._speed == val) return;
        this._speed = val;
        this.updateHVSpeed();
    }

    get hspeed() {
        return this._hspeed;
    }
    set hspeed(val) {
        if (this._hspeed == val) return;
        this._hspeed = val;
        this.updateDirectionAndSpeed();
    }
    get vspeed() {
        return this._vspeed;
    }
    set vspeed(val) {
        if (this._vspeed == val) return;
        this._vspeed = val;
        this.updateDirectionAndSpeed();
    }

    private updateHVSpeed() {
        let radians = degToRad(this._dir);
        this._vspeed = Math.sin(radians);
        this._hspeed = Math.cos(radians);
    }
    private updateDirectionAndSpeed() {
        this._speed = Math.sqrt(this._hspeed * this._hspeed + this._vspeed * this._vspeed);
        if (this._speed == 0) return;
        this._dir = radToDeg(Math.atan2(this._vspeed, this._hspeed));
    }

    private _shouldRender = true;
    get shouldRender() {
        return this._shouldRender;
    }
    set shouldRender(val) {
        this._shouldRender = val;
    }

    tick(delta: number) {
        this.x += this.hspeed;
        this.y += this.vspeed;
    }

    render(context: CanvasRenderingContext2D) {
        if (!this.shouldRender) return;
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, 16, 16);
    }
}

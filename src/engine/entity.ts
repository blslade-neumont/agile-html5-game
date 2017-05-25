import { GameObject, GameObjectOptions } from './game-object';
import { clamp } from './utils/math';

export interface EntityOptions extends GameObjectOptions {
    maxHealth: number,
    currentHealth?: number,
    damageImmunity?: number,
    damageImmunityTimer?: number
}

export class Entity extends GameObject {
    constructor(name: string, opts: EntityOptions) {
        super(name, opts);
        if (typeof opts.maxHealth != 'undefined') this._maxHealth = opts.maxHealth;
        if (typeof opts.damageImmunity != 'undefined') this._damageImmunity = opts.damageImmunity;
        if (typeof opts.damageImmunityTimer != 'undefined') this._damageImmunityTimer = opts.damageImmunityTimer;
        if (typeof opts.currentHealth != 'undefined' && opts.currentHealth > this.maxHealth) throw new Error("Attempting to set current health higher than max health");
        this.currentHealth = (typeof opts.currentHealth != 'undefined') ? opts.currentHealth : this.maxHealth;
    }

    private _maxHealth = 0;
    get maxHealth() {
        return this._maxHealth;
    }

    private _currentHealth = 0;
    get currentHealth() {
        return this._currentHealth;
    }
    set currentHealth(val) {
        this._currentHealth = clamp(val, 0, this._maxHealth);
    }

    private _damageImmunity = 0;
    get damageImmunity() {
        return this._damageImmunity;
    }
    set damageImmunity(val: number) {
        this._damageImmunity = val;
    }

    private _damageImmunityTimer = 1;
    get damageImmunityTimer() {
        return this._damageImmunityTimer;
    }
    set damageImmunityTimer(val: number) {
        this._damageImmunityTimer = val;
    }

    get isImmuneToDamage() {
        return this.damageImmunity > 0;
    }

    private _isAlive = true;
    get isAlive() {
        return this._isAlive;
    }
    get isDead() {
        return !this.isAlive;
    }

    tick(delta: number) {
        super.tick(delta);
        this.damageImmunity -= delta;
    }

    takeDamage(amt: number) {
        if (!this.isAlive) throw new Error('This entity is already dead!');
        if (this.isImmuneToDamage) return false;
        this.currentHealth -= amt;
        if (this.currentHealth == 0) this.kill();
        else this.damageImmunity = this.damageImmunityTimer;
        return true;
    }

    kill() {
        if (!this.isAlive) throw new Error('This entity is already dead!');
        this._isAlive = false;
        this.scene.removeObject(this);
    }

    render(context: CanvasRenderingContext2D) {
        if (this.damageImmunity <= 0 || this.damageImmunity % .2 > .1) super.render(context);
    }
}

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

        if (opts.maxHealth <= 0) throw new Error(`Max health must be positive. The passed-in value: ${opts.maxHealth}`);
        this._maxHealth = opts.maxHealth;

        if (typeof opts.currentHealth !== 'undefined') {
            if (opts.currentHealth <= 0) throw new Error(`Current health must be positive. The passed-in value: ${opts.currentHealth}`);
            if (opts.currentHealth > this.maxHealth) throw new Error("Attempting to set current health higher than max health");
            this.currentHealth = opts.currentHealth;
        }
        else this.currentHealth = this.maxHealth;

        if (typeof opts.damageImmunity != 'undefined') this._damageImmunity = opts.damageImmunity;
        if (typeof opts.damageImmunityTimer != 'undefined') this._damageImmunityTimer = opts.damageImmunityTimer;
    }

    private _maxHealth = 1;
    get maxHealth() {
        return this._maxHealth;
    }

    private _currentHealth = 1;
    get currentHealth() {
        return this._currentHealth;
    }
    set currentHealth(val) {
        if (this.isDead) throw new Error(`This entity is dead! You can't set currentHealth on a dead entity!`);
        val = clamp(val, 0, this._maxHealth);
        if (val == this._currentHealth) return;
        this._currentHealth = val;
        if (val == 0) this.kill();
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
        if (amt < 0) throw new Error(`Cannot take negative damage`);
        if (this.isImmuneToDamage) return false;
        this.currentHealth -= amt;
        this.damageImmunity = this.damageImmunityTimer;
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

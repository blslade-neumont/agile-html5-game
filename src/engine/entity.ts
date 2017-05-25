import { GameObject, GameObjectOptions } from './game-object';
import { clamp } from './utils/math';

export interface EntityOptions extends GameObjectOptions{
    maxHealth: number,
    currentHealth?: number
}

export class Entity extends GameObject {
    constructor(name: string, opts: EntityOptions) {
        super(name, opts);
        if (typeof opts.maxHealth != 'undefined') this._maxHealth = opts.maxHealth;
        if (typeof opts.currentHealth != 'undefined' && opts.currentHealth > opts.maxHealth)
        {
            throw new Error("Attempting to set current health higher than max health");
        }
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
}

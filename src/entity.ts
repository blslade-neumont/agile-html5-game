import { GameObject, GameObjectOptions, clamp, AudioT, AudioSourceObject, fmod } from './engine';
import { World } from './world';
import { WorldTile, TILE_SIZE } from './dbs/tile-db';
import { OverworldScene } from './scenes/overworld-scene';

export interface EntityOptions extends GameObjectOptions {
    maxHealth: number,
    currentHealth?: number,
    damageImmunity?: number,
    damageImmunityTimer?: number,
    flying?: boolean,

    takeDamageSound?: AudioT | null,
    killSound?: AudioT | null
}

const MOVE_SPEED = 4 * 30;
const SIZE = 32;
const OFFSET: number = (TILE_SIZE - SIZE) / 2.0;
const CLOSE_ENOUGH: number = 1.0;

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

        if (typeof opts.damageImmunity !== 'undefined') this._damageImmunity = opts.damageImmunity;
        if (typeof opts.damageImmunityTimer !== 'undefined') this._damageImmunityTimer = opts.damageImmunityTimer;

        if (typeof opts.takeDamageSound !== 'undefined') this.takeDamageSound = opts.takeDamageSound;
        if (typeof opts.killSound !== 'undefined') this.killSound = opts.killSound;
        if (typeof opts.flying !== 'undefined') this._flying = opts.flying;
    }

    private _maxHealth = 1;
    get maxHealth() {
        return this._maxHealth;
    }

    private _flying: boolean = false;
    get flying() {
        return this._flying;
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
    
    private _takeDamageSound: AudioT | null = null;
    get takeDamageSound() {
        return this._takeDamageSound;
    }
    set takeDamageSound(val: AudioT | null) {
        this._takeDamageSound = val;
    }

    private _killSound: AudioT | null = null;
    get killSound() {
        return this._killSound;
    }
    set killSound(val: AudioT | null) {
        this._killSound = val;
    }

    snapToTile(h: number, v: number) {
        let thisTileX: number = fmod(this.x, TILE_SIZE);
        let thisTileY: number = fmod(this.y, TILE_SIZE);

        let stopH: boolean = (Math.abs(h) < CLOSE_ENOUGH);
        if (stopH && (thisTileX <= CLOSE_ENOUGH)) {
            this.x = OFFSET + (Math.floor(this.x / TILE_SIZE)) * TILE_SIZE;
            this.hspeed = 0.0;
        } else if (stopH && ((thisTileX + CLOSE_ENOUGH) >= TILE_SIZE)) {
            this.x = OFFSET + (Math.floor(this.x / TILE_SIZE) + 1) * TILE_SIZE;
            this.hspeed = 0.0;
        } else {
            this.hspeed = (stopH ? this.hspeed : h);
        }

        let stopV: boolean = (Math.abs(v) < CLOSE_ENOUGH);
        if (stopV && (thisTileY <= CLOSE_ENOUGH)) {
            this.y = OFFSET + (Math.floor(this.y / TILE_SIZE)) * TILE_SIZE;
            this.vspeed = 0.0;
        } else if (stopV && ((thisTileY + CLOSE_ENOUGH) >= TILE_SIZE)) {
            this.y = OFFSET + (Math.floor(this.y / TILE_SIZE) + 1) * TILE_SIZE;
            this.vspeed = 0.0;
        } else {
            this.vspeed = (stopV ? this.vspeed : v);
        }
    }

    tick(delta: number) {
        let nextX: number = this.x + delta * this.hspeed;
        let nextY: number = this.y + delta * this.vspeed;

        let nextMinX: number = nextX;
        let nextMinY: number = nextY;
        let nextMaxX: number = (nextX + SIZE - 1);
        let nextMaxY: number = (nextY + SIZE - 1);

        let minTX: number = Math.floor(nextMinX / TILE_SIZE) * TILE_SIZE;
        let maxTX: number = Math.floor(nextMaxX / TILE_SIZE) * TILE_SIZE;
        let minTY: number = Math.floor(nextMinY / TILE_SIZE) * TILE_SIZE;
        let maxTY: number = Math.floor(nextMaxY / TILE_SIZE) * TILE_SIZE;

        let scene = <OverworldScene>this.scene;

        // right-left collisions
        if (this.hspeed > 0.0) {
            if ((nextMaxX > maxTX) && (scene.world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || scene.world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.x = OFFSET + minTX;
                this.hspeed = 0.0;
            }
        } else if (this.hspeed < 0.0) {
            if ((nextMinX < maxTX) && (scene.world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || scene.world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.x = OFFSET + maxTX;
                this.hspeed = 0.0;
            }
        }

        // bottom-top collision
        if (this.vspeed > 0.0) {
            if ((nextMaxY > maxTY) && (scene.world.getTileAt(minTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid || scene.world.getTileAt(maxTX / TILE_SIZE, maxTY / TILE_SIZE).isSolid)) {
                this.y = OFFSET + minTY;
                this.vspeed = 0.0;
            }
        } else if (this.vspeed < 0.0) {
            if ((nextMinY < maxTY) && (scene.world.getTileAt(minTX / TILE_SIZE, minTY / TILE_SIZE).isSolid || scene.world.getTileAt(maxTX / TILE_SIZE, minTY / TILE_SIZE).isSolid)) {
                this.y = OFFSET + maxTY;
                this.vspeed = 0.0;
            }
        }
        this.damageImmunity -= delta;
        super.tick(delta);

    }

    recoverDamage(amt: number) {
        if (!this.isAlive) throw new Error('This entity is already dead!');
        if (amt < 0) throw new Error('Cannot heal a negative amount');
        this.currentHealth += amt;
        return true;
    }

    takeDamage(amt: number) {
        if (!this.isAlive) throw new Error('This entity is already dead!');
        if (amt < 0) throw new Error(`Cannot take negative damage`);
        if (this.isImmuneToDamage) return false;
        this.currentHealth -= amt;
        if (!this.isDead && this.takeDamageSound) this.scene.addObject(new AudioSourceObject(`${this.name}-TakeDamageSound`, this.takeDamageSound, { x: this.x, y: this.y }));
        this.damageImmunity = this.damageImmunityTimer;
        return true;
    }

    kill() {
        if (!this.isAlive) throw new Error('This entity is already dead!');
        this._isAlive = false;
        if (this.killSound) this.scene.addObject(new AudioSourceObject(`${this.name}-KillSound`, this.killSound, { x: this.x, y: this.y }));
        this.scene.removeObject(this);
    }

    protected renderImpl(context: CanvasRenderingContext2D) {
        if (this.damageImmunity <= 0 || this.damageImmunity % .2 > .1) super.renderImpl(context);
    }
}

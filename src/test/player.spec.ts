/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Player } from '../player';
import { stubDocument, stubImage, stubCanvas } from '../engine/test';

class MockWorld {
    private _tiles: string[] = [];
    constructor(...tiles: string[]) { this._tiles = tiles; }

    getTileAt(x: number, y: number) {
        return { sprite: { src: "FAKE_TILE" }, isSolid: (y >= 0 && y < this._tiles.length && x >= 0 && x < this._tiles[y].length) && (this._tiles[y][x] == 'X') }; 
    }
}

class MockEventQueue {
    private _keys: string[] = [];
    constructor(...keys: string[]) { this._keys = keys; }

    isKeyDown(key: string) {
        return this._keys.some((key2) => key == key2);
    }
}

describe('Player', () => {

    let player: Player;
    beforeEach(() => {
        player = new Player();
    });

    it('should be named Player', () => {
        expect(player.name).to.be.eq('Player');
    });

    describe('.tick', () => {

        it('should not allow the player to move into a blocked right tile', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowRight'), world: new MockWorld(' X') })
            let [oldX, oldY] = [player.x = 4, player.y = 4];
            player.tick(.2);
            expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
        });

        it('should allow the player to move into a non-blocked right tile', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowRight'), world: new MockWorld() })
            let [oldX, oldY] = [player.x = 0, player.y = 0];
            player.tick(.02);
            expect(player.x).to.be.greaterThan(oldX);
            expect(player.y).to.be.eq(oldY);
        });

        it('should not allow the player to move into a blocked left tile', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowLeft'), world: new MockWorld('X ') })
            let [oldX, oldY] = [player.x = 36, player.y = 4];
            player.tick(.2);
            expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
        });

        it('should allow the player to move into a non-blocked left tile', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowLeft'), world: new MockWorld() })
            let [oldX, oldY] = [player.x = 0, player.y = 0];
            player.tick(.02);
            expect(player.x).to.be.lessThan(oldX);
            expect(player.y).to.be.eq(oldY);
        });

        it('should not allow the player to move into a blocked top tile', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowUp'), world: new MockWorld('X', ' ') })
            let [oldX, oldY] = [player.x = 4, player.y = 36];
            player.tick(.2);
            expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
        });

        it('should allow the player to move into a non-blocked top tile', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowUp'), world: new MockWorld() })
            let [oldX, oldY] = [player.x = 0, player.y = 0];
            player.tick(.02);
            expect(player.x).to.be.eq(oldX);
            expect(player.y).to.be.lessThan(oldY);
        });

        it('should not allow the player to move into a blocked bottom tile', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowDown'), world: new MockWorld('', 'X') })
            let [oldX, oldY] = [player.x = 4, player.y = 4];
            player.tick(.2);
            expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
        });

        it('should allow the player to move into a non-blocked bottom tile', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowDown'), world: new MockWorld() })
            let [oldX, oldY] = [player.x = 0, player.y = 0];
            player.tick(.02);
            expect(player.x).to.be.eq(oldX);
            expect(player.y).to.be.greaterThan(oldY);
        });

        it('should not move the player horizontally if left and right are pressed', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowLeft', 'ArrowRight'), world: new MockWorld() })
            let [oldX, oldY] = [player.x = 0, player.y = 0];
            player.tick(.02);
            expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
        });

        it('should not move the player vertically if up and down are pressed', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowUp', 'ArrowDown'), world: new MockWorld() })
            let [oldX, oldY] = [player.x = 0, player.y = 0];
            player.tick(.02);
            expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
        });

        it('should not move the player if no movement keys are pressed', () => {
            player.addToGame(<any>{ eventQueue: new MockEventQueue(), world: new MockWorld() })
            let [oldX, oldY] = [player.x = 0, player.y = 0];
            player.tick(.02);
            expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
        });
    });

    describe('.render', () => {
        stubCanvas();

        it('should call fillRect once', () => {
            let context = (new HTMLCanvasElement()).getContext("2d");

            sinon.stub(context, "fillRect");

            player.render(context);
            expect(context.fillRect).to.have.been.calledOnce;
        });
    });
});
/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { World } from '../world';

describe('World', () => {
    let world: World;
    beforeEach(() => {
        world = new World();
    });

    it('should start with the game time at 1 day, 8 hours', () => {
        expect(world.gameTime).to.eq(8/24);
    });
    
    describe('.start', () => {
        it('should set tilesX and tilesY', () => {
            world.start(32 * 5, 32 * 7);
            expect(world.tilesX).to.eq(5);
            expect(world.tilesY).to.eq(7);
        });
        it('should throw an error if you try to call it twice', () => {
            world.start(32, 32);
            expect(() => world.start(32, 32)).to.throw(/already been initialized/i);
        });
        it('should round up if the canvas size does not divide evenly', () => {
            world.start(33, 33);
            expect(world.tilesX).to.eq(2);
            expect(world.tilesY).to.eq(2);
        });
    });

    describe('.tick', () => {
        it('should throw an error if the world has not been initialized', () => {
            expect(() => world.tick(.1)).to.throw(/not been initialized/i);
        });
        it('should update the game time', () => {
            world.start(32, 32);
            expect(world.gameTime).to.change;
            world.tick(.02);
        });
        it('should use the scale 5 minutes = one day when updating the game time', () => {
            world.start(32, 32);
            let origGameTime = world.gameTime;
            world.tick(60 * 5);
            expect(world.gameTime).to.be.closeTo(origGameTime + 1, .0001);
            world.tick(60 * 2.5);
            expect(world.gameTime).to.be.closeTo(origGameTime + 1.5, .0001);
        });
    });

    describe('.getTileAt', () => {
        it('should throw an error if the world has not been initialized', () => {
            expect(() => world.getTileAt(0, 0)).to.throw(/not been initialized/i);
        });
        it('should throw an error if you try to get a tile outside of the world', () => {
            world.start(32, 32);
            expect(() => world.getTileAt(-1, 0)).to.throw(/not in world/i);
            expect(() => world.getTileAt(1, 0)).to.throw(/not in world/i);
            expect(() => world.getTileAt(0, -1)).to.throw(/not in world/i);
            expect(() => world.getTileAt(0, 1)).to.throw(/not in world/i);
        });
        it('should return a valid WorldTile', () => {
            world.start(32, 32);
            expect(world.getTileAt(0, 0)).to.be.ok;
        });
    });
});

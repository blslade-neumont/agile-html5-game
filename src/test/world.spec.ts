/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { World } from '../world';
import { Game, GameScene } from '../engine';
import { MockGame, stubDocument, stubImage } from '../engine/test';

describe('World', () => {
    stubDocument();
    stubImage();

    let game: Game;
    let scene: GameScene;
    let world: World;
    beforeEach(() => {
        game = <any>new MockGame();
        scene = new GameScene(game);
        world = new World();
    });

    it('should start with the game time at 1 day, 8 hours', () => {
        expect(world.gameTime).to.eq(8/24);
    });
    
    describe('.addToScene', () => {
        it('should throw an error if you try to call it twice', () => {
            scene.addObject(world);
            expect(() => scene.addObject(world)).to.throw(/already been initialized/i);
        });
    });

    describe('.tick', () => {
        it('should throw an error if the world has not been initialized', () => {
            expect(() => world.tick(.1)).to.throw(/not been initialized/i);
        });
        it('should update the game time', () => {
            scene.addObject(world);
            let prevGameTime = world.gameTime;
            world.tick(.02);
            expect(world.gameTime).to.be.greaterThan(prevGameTime);
        });
        it('should use the scale 5 minutes = one day when updating the game time', () => {
            scene.addObject(world);
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
        it('should not throw an error if you try to get a tile outside of the world', () => {
            scene.addObject(world);
            expect(() => world.getTileAt(-1, 0)).not.to.throw;
            expect(() => world.getTileAt(1, 0)).not.to.throw;
            expect(() => world.getTileAt(0, -1)).not.to.throw;
            expect(() => world.getTileAt(0, 1)).not.to.throw;
        });
        it('should return a valid WorldTile', () => {
            scene.addObject(world);
            expect(world.getTileAt(0, 0)).to.be.ok;
        });
    });
});

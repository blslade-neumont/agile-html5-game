/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { World } from '../world';
import { Game, GameScene, Entity } from '../engine';
import { MockGame, stubDocument, stubImage } from '../engine/test';
import { tiles } from '../dbs/tile-db';

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
        it('should not throw an error if you try to get a tile', () => {
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

    describe('.getSpriteAt', () => {
        it('should not throw an error if you try to get a sprite', () => {
            scene.addObject(world);
            expect(() => world.getSpriteAt(-1, 0)).not.to.throw;
            expect(() => world.getSpriteAt(1, 0)).not.to.throw;
            expect(() => world.getSpriteAt(0, -1)).not.to.throw;
            expect(() => world.getSpriteAt(0, 1)).not.to.throw;
        });
        it('should return a valid SpriteT', () => {
            scene.addObject(world);
            expect(world.getSpriteAt(0, 0)).to.be.ok;
        });
        it('should return the same sprite for the same coordinates consistently', () => {
            scene.addObject(world);
            for (let q = 0; q < 30; q++) {
                let x = Math.floor(Math.random() * 1000) - 500;
                let y = Math.floor(Math.random() * 1000) - 500;
                let sprite = world.getSpriteAt(x, y);
                expect(world.getSpriteAt(x, y)).to.eq(sprite);
            }
            expect(world.getSpriteAt(0, 0)).to.be.ok;
        });
    });
});

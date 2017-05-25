/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { World } from '../../world';
import { Game, GameScene, Entity } from '../../engine';
import { MockGame, stubDocument, stubImage } from '../../engine/test';
import { tiles } from '../tile-db';

describe('dbs/tiles', () => {
    stubDocument();
    stubImage();

    let game: Game;
    let scene: GameScene;
    let world: World;
    beforeEach(() => {
        game = <any>new MockGame();
        scene = new GameScene(game);
        world = new World();
        scene.addObject(world);
    });

    describe('lava_left', () => {
        it('should invoke Entity.takeDamage when an entity ticks', () => {
            let ent = new Entity('name', { maxHealth: 10, x: 0, y: 0 });
            scene.addObject(ent);
            sinon.spy(ent, 'takeDamage');
            sinon.stub(world, 'getTileAt').withArgs(0, 0).returns(tiles['lava_left']);
            world.tick(.02);
            expect(ent.takeDamage).to.have.been.calledOnce;
        });
    });

    describe('lava_right', () => {
        it('should invoke Entity.takeDamage when an entity ticks', () => {
            let ent = new Entity('name', { maxHealth: 10, x: 0, y: 0 });
            scene.addObject(ent);
            sinon.spy(ent, 'takeDamage');
            sinon.stub(world, 'getTileAt').withArgs(0, 0).returns(tiles['lava_right']);
            world.tick(.02);
            expect(ent.takeDamage).to.have.been.calledOnce;
        });
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { World } from '../../world';
import { Game, GameScene, Entity } from '../../engine';
import { MockGame, stubDocument, stubImage } from '../../engine/test';
import { tiles } from '../tile-db';
import { DungeonScene } from '../../scenes/dungeon-scene';

describe('dbs/tiles', () => {
    stubDocument();
    stubImage();

    let game: Game;
    let scene: GameScene;
    let world: World;
    beforeEach(() => {
        game = <any>new MockGame();
        scene = new GameScene(game);
        game.changeScene(scene);
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

    describe('teleporter', () => {
        it('should navigate to an DungeonScene when a player lands', () => {
            (<any>scene).dungeon = new DungeonScene();
            let ent = new Entity('Player', { maxHealth: 10, x: 0, y: 0 });
            scene.addObject(ent);
            sinon.spy(game, 'changeScene');
            sinon.stub(world, 'getTileAt').withArgs(0, 0).returns(tiles['teleporter']);
            world.tick(.02);
            expect(game.changeScene).to.have.been.calledOnce.calledWith(sinon.match.instanceOf(DungeonScene));
        });
    });

    describe('dungeonTeleporter', () => {
        it('should navigate to the previous scene when a player lands', () => {
            let dungScene = scene = new DungeonScene();
            scene.game = game;
            game.changeScene(scene);
            world = new World();
            scene.addObject(world);

            let returnScene: GameScene = <any>{
                findObject: () => ({}),
                currentHealth: 5,
                game: game
            };
            dungScene.enter(returnScene, 0, 0);

            let ent = new Entity('Player', { maxHealth: 10, x: 0, y: 0 });
            scene.addObject(ent);
            sinon.spy(game, 'changeScene');
            sinon.stub(world, 'getTileAt').withArgs(0, 0).returns(tiles['dungeonTeleporter']);
            world.tick(.02);
            expect(game.changeScene).to.have.been.calledOnce.calledWith(returnScene);
        });
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { World } from '../../world';
import { Game, GameScene, Rect } from '../../engine';
import { MockGame, stubDocument, stubImage } from '../../engine/test';
import { tiles } from '../tile-db';
import { DungeonScene } from '../../scenes/dungeon-scene';
import { Entity } from '../../entity';

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

    let damageTiles: [string, number][] = [
        ['water_left', 1],
        ['water_right', 1],
        ['water', 1],
        ['lava_left', 3],
        ['lava_right', 3],
        ['lava', 3]
    ];
    damageTiles.forEach(([tileType, damageAmount]) => {
        describe(tileType, () => {
            it(`should invoke Entity.takeDamage with ${damageAmount} damage when an entity ticks`, () => {
                let ent = new Entity('name', { maxHealth: 10, x: 0, y: 0, collisionBounds: new Rect(0, 32, 0, 32) });
                scene.addObject(ent);
                sinon.spy(ent, 'takeDamage');
                sinon.stub(world, 'getTileAt').withArgs(0, 0).returns(tiles[tileType]);
                world.tick(.02);
                expect(ent.takeDamage).to.have.been.calledOnce.calledWith(damageAmount);
            });
        });
    });
    
    describe('teleporter', () => {
        it('should not navigate to an DungeonScene when the player collides if they are still moving', () => {
            (<any>scene).dungeon = new DungeonScene();
            let ent = new Entity('Player', { maxHealth: 10, x: 0, y: 0, collisionBounds: new Rect(0, 32, 0, 32), speed: 10 });
            scene.addObject(ent);
            sinon.spy(game, 'changeScene');
            sinon.stub(world, 'getTileAt').withArgs(0, 0).returns(tiles['teleporter']);
            world.tick(.02);
            expect(game.changeScene).not.to.have.been.called;
        });
        it('should navigate to an DungeonScene when the player lands', () => {
            (<any>scene).dungeon = new DungeonScene();
            let ent = new Entity('Player', { maxHealth: 10, x: 0, y: 0, collisionBounds: new Rect(0, 32, 0, 32) });
            scene.addObject(ent);
            sinon.spy(game, 'changeScene');
            sinon.stub(world, 'getTileAt').withArgs(0, 0).returns(tiles['teleporter']);
            world.tick(.02);
            expect(game.changeScene).to.have.been.calledOnce.calledWith(sinon.match.instanceOf(DungeonScene));
        });
        it('should preserve the game time when it navigates to a DungeonScene', () => {
            let dung = (<any>scene).dungeon = new DungeonScene();
            let ent = new Entity('Player', { maxHealth: 10, x: 0, y: 0, collisionBounds: new Rect(0, 32, 0, 32) });
            scene.addObject(ent);
            sinon.spy(game, 'changeScene');
            sinon.stub(world, 'getTileAt').withArgs(0, 0).returns(tiles['teleporter']);
            world.gameTime = 2953;
            world.tick(.02);
            expect(dung.world.gameTime).to.be.closeTo(world.gameTime, .00001);
        });
    });

    describe('dungeonTeleporter', () => {
        let dungScene: DungeonScene;
        let returnScene: GameScene;
        beforeEach(() => {
            dungScene = scene = new DungeonScene();
            game.changeScene(scene);
            scene.start();

            let player: any = {};
            let returnWorld: any = { gameTime: 0 };
            returnScene = <any>{
                findObject: name => (name == 'Player') ? player :
                                     (name == 'World') ? returnWorld :
                                                         {},
                currentHealth: 5,
                game: game,
                world: returnWorld
            };
            dungScene.enter(returnScene, 0, 0);
        });

        it('should not navigate to the previous scene when the player collides if they are still moving', () => {
            let ent = <Entity>dungScene.findObject('Player');
            ent.speed = 10;
            sinon.spy(game, 'changeScene');
            sinon.stub(dungScene.world, 'getTileAt').withArgs(0, 0).returns(tiles['dungeonTeleporter']);
            dungScene.world.tick(.02);
            expect(game.changeScene).not.to.have.been.called;
        });
        it('should navigate to the previous scene when the player lands', () => {
            let ent = <Entity>dungScene.findObject('Player');
            sinon.spy(game, 'changeScene');
            sinon.stub(dungScene.world, 'getTileAt').withArgs(0, 0).returns(tiles['dungeonTeleporter']);
            dungScene.world.tick(.02);
            expect(game.changeScene).to.have.been.calledOnce.calledWith(returnScene);
        });
        it('should preserve the game time when it navigates to the previous scene', () => {
            let ent = <Entity>dungScene.findObject('Player');
            sinon.spy(game, 'changeScene');
            sinon.stub(dungScene.world, 'getTileAt').withArgs(0, 0).returns(tiles['dungeonTeleporter']);
            dungScene.world.gameTime = 28582.5;
            dungScene.world.tick(.02);
            expect((<any>returnScene).world.gameTime).to.be.closeTo(dungScene.world.gameTime, .00001);
        });
    });
});

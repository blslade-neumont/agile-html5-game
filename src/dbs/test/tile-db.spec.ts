/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { World } from '../../world';
import { Game, GameScene, Rect, AudioSourceObject } from '../../engine';
import { MockGame } from '../../engine/test';
import { tiles } from '../tile-db';
import { DungeonScene } from '../../scenes/dungeon-scene';
import { Entity } from '../../entity';

describe('dbs/tiles', () => {
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
        let ent: Entity;
        let dung: DungeonScene;
        beforeEach(() => {
            dung = (<any>scene).dungeon = new DungeonScene();
            ent = new Entity('Player', { maxHealth: 10, x: 0, y: 0, collisionBounds: new Rect(0, 32, 0, 32) });
            scene.addObject(ent);
            sinon.stub(world, 'getTileAt').withArgs(0, 0).returns(tiles['teleporter']);
        });

        it('should not navigate to a DungeonScene when the player collides if they are still moving', () => {
            ent.speed = 10;
            sinon.spy(game, 'changeScene');
            world.tick(.02);
            expect(game.changeScene).not.to.have.been.called;
        });
        it('should play a sound when it navigates to the DungeonScene', () => {
            sinon.spy(dung, 'addObject');
            world.tick(.02);
            expect(dung.addObject).to.have.been.calledOnce.calledWith(sinon.match.instanceOf(AudioSourceObject));
        });
        it('should navigate to an DungeonScene when the player lands', () => {
            sinon.spy(game, 'changeScene');
            world.tick(.02);
            expect(game.changeScene).to.have.been.calledOnce.calledWith(sinon.match.instanceOf(DungeonScene));
        });
        it('should preserve the game time when it navigates to a DungeonScene', () => {
            sinon.spy(game, 'changeScene');
            world.gameTime = 2953;
            world.tick(.02);
            expect(dung.world.gameTime).to.be.closeTo(world.gameTime, .00001);
        });
    });

    describe('dungeonTeleporter', () => {
        let dungScene: DungeonScene;
        let returnScene: GameScene;
        let ent: Entity;
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
                addObject: () => void(0),
                currentHealth: 5,
                game: game,
                world: returnWorld
            };
            dungScene.enter(returnScene, 0, 0);

            ent = <Entity>dungScene.findObject('Player');
            sinon.stub(dungScene.world, 'getTileAt').withArgs(0, 0).returns(tiles['dungeonTeleporter']);
        });

        it('should not navigate to the previous scene when the player collides if they are still moving', () => {
            ent.speed = 10;
            sinon.spy(game, 'changeScene');
            dungScene.world.tick(.02);
            expect(game.changeScene).not.to.have.been.called;
        });
        it('should play a sound when it navigates to the DungeonScene', () => {
            sinon.spy(returnScene, 'addObject');
            dungScene.world.tick(.02);
            expect(returnScene.addObject).to.have.been.calledOnce.calledWith(sinon.match.instanceOf(AudioSourceObject));
        });
        it('should navigate to the previous scene when the player lands', () => {
            sinon.spy(game, 'changeScene');
            dungScene.world.tick(.02);
            expect(game.changeScene).to.have.been.calledOnce.calledWith(returnScene);
        });
        it('should preserve the game time when it navigates to the previous scene', () => {
            dungScene.world.gameTime = 28582.5;
            dungScene.world.tick(.02);
            expect((<any>returnScene).world.gameTime).to.be.closeTo(dungScene.world.gameTime, .00001);
        });
    });
});

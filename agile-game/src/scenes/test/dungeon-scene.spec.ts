/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { DungeonScene } from '../dungeon-scene';
import { Game, AudioSourceObject, GameScene } from '../../engine';
import { MockGame } from '../../engine/test';

describe('DungeonScene', () => {
    let game: Game;
    let scene: DungeonScene;
    beforeEach(() => {
        scene = new DungeonScene();
        game = scene.game = <any>new MockGame(scene);
    });

    describe('.world', () => {
        it('should not be falsey', () => {
            expect(scene.world).to.be.ok;
        });
    });

    describe('.enter', () => {
        //More thorough unit tests testing the tile db
        it('should throw an error if fromScene has no player object', () => {
            let fromScene: GameScene = <any>{
                game: game,
                findObject: () => null,
                addObject: () => void (0),
                removeObject: () => void (0),
                camera: null
            };
            expect(() => scene.enter(fromScene, 0, 0)).to.throw(/could not find player/i);
        });
    });

    describe('.exit', () => {
        //More thorough unit tests testing the tile db
        beforeEach(() => {
            (<any>scene)._returnScene = {
                game: game,
                findObject: () => null,
                addObject: () => void(0),
                removeObject: () => void (0),
                camera: null
            };
        });

        it('should throw an error if returnScene has no player object', () => {
            expect(() => scene.exit()).to.throw(/could not find player/i);
        });
    });

    describe('.start', () => {
        it('should create a new grid renderer', () => {
            scene.start();
            let gridRenderer = scene.findObject('GridRenderer');
            expect(gridRenderer).to.be.ok;
        });
        it('should create an AudioSourceObject for the music', () => {
            sinon.stub(scene, 'addObject');
            scene.start();
            expect(scene.addObject).to.have.been.calledWith(sinon.match(obj => obj instanceof AudioSourceObject && obj.name.match(/music/i)));
        });
    });
});

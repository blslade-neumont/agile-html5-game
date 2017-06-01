/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { OverworldScene } from '../overworld-scene';
import { Game, AudioSourceObject } from '../../engine';
import { MockGame } from '../../engine/test';

describe('OverworldScene', () => {
    let game: Game;
    let scene: OverworldScene;
    beforeEach(() => {
        scene = new OverworldScene();
        game = scene.game = <any>new MockGame(scene);
    });

    describe('.world', () => {
        it('should start as null', () => {
            expect(scene.world).to.be.null;
        });
    });

    describe('.start', () => {
        it('should create a new world', () => {
            scene.start();
            expect(scene.world).to.be.ok;
        });
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

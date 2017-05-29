/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { OverworldScene } from '../overworld-scene';
import { Game } from '../../engine';
import { MockGame } from '../../engine/test';

describe('OverworldScene', () => {
    let game: Game;
    let scene: OverworldScene;
    beforeEach(() => {
        scene = new OverworldScene();
        game = scene.game = <any>new MockGame(scene);
    });

    it('should start with no world', () => {
        expect(scene.world).not.to.be.ok;
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
    });

    describe('.tick', () => {
        it('should invoke world.tick', () => {
            scene.start();
            sinon.stub(scene.world, 'tick');
            (<any>scene).tick(.033);
            expect(scene.world.tick).to.have.been.calledOnce;
        });
    });
});

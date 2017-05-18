/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { AgileGame } from '../agile-game';
import { GameObject } from '../game-object';
import { stubDocument } from './mock-document';
import { stubImage } from './mock-image';
import { stubCanvas } from './mock-canvas';
import { delay } from '../utils/delay';

describe('AgileGame', () => {
    stubDocument();
    stubImage();
    stubCanvas();

    let game: AgileGame;
    beforeEach(() => {
        game = new AgileGame(30, new HTMLCanvasElement());
    });
    afterEach(() => {
        if (game.isRunning) game.stop();
    });

    it('should start with no grid renderer or world', () => {
        expect(game.gridRenderer).not.to.be.ok;
        expect(game.world).not.to.be.ok;
    });

    describe('.constructor', () => {
        it('should preload tile and item assets', () => {
            game.start();
            expect(game.resourceLoader).to.be.ok;
            expect(game.resourceLoader.totalResources).to.be.greaterThan(0);
        });
    });

    describe('.start', () => {
        it('should create a new world', () => {
            game.start();
            expect(game.world).to.be.ok;
        });
        it('should create a new grid renderer', () => {
            game.start();
            expect(game.gridRenderer).to.be.ok;
        });
    });

    describe('.tick', () => {
        it('should invoke world.tick', () => {
            game.start();
            sinon.stub(game.world, 'tick');
            (<any>game).tick(.033);
            expect(game.world.tick).to.have.been.calledOnce;
        });
    });

    describe('.render', () => {
        it('should invoke gridRenderer.render', () => {
            game.start();
            sinon.stub(game.gridRenderer, 'render');
            (<any>game).render((<any>game).context);
            expect(game.gridRenderer.render).to.have.been.calledOnce;
        });
    });
});

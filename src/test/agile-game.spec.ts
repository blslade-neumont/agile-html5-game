/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { AgileGame } from '../agile-game';
import { GameObject, delay } from '../engine';

describe('AgileGame', () => {
    let game: AgileGame;
    beforeEach(() => {
        game = new AgileGame(30);
    });
    afterEach(() => {
        if (game.isRunning) game.stop();
    });

    describe('.constructor', () => {
        it('should preload tile and item assets', () => {
            game.start();
            expect(game.resourceLoader).to.be.ok;
            expect(game.resourceLoader.totalResources).to.be.greaterThan(0);
        });
    });
});

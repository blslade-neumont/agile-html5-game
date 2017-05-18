/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader, PreloadStrategy } from '../engine';
import { alives } from '../dbs/alive-db';
import { AlivePreloadStrategy } from '../alive-preload-strategy';

import { AgileGame } from '../agile-game';
import { GameObject, delay } from '../engine';
import { stubDocument, stubImage, stubCanvas } from '../engine/test';

describe('AlivePreloadStrategy', () => {
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

    it('should call loadImage once per alive in the database', () => {
        let preloadStrategy:AlivePreloadStrategy = new AlivePreloadStrategy();

        sinon.stub(game.resourceLoader, 'loadImage');

        preloadStrategy.preload(game.resourceLoader);
        expect(game.resourceLoader.loadImage).callCount(Object.keys(alives).length);
    });
});
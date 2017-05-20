/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader, PreloadStrategy } from '../engine';
import { tiles } from '../dbs/tile-db';
import { TilePreloadStrategy } from '../tile-preload-strategy';

import { AgileGame } from '../agile-game';
import { GameObject, delay } from '../engine';
import { stubDocument, stubImage } from '../engine/test';

describe('TilePreloadStrategy', () => {
    stubDocument();
    stubImage();

    let game: AgileGame;
    beforeEach(() => {
        game = new AgileGame();
    });
    afterEach(() => {
        if (game.isRunning) game.stop();
    });

    it('should call loadImage once per tile in the database', () => {
        let preloadStrategy: TilePreloadStrategy = new TilePreloadStrategy();

        sinon.stub(game.resourceLoader, 'loadImage');

        preloadStrategy.preload(game.resourceLoader);
        expect(game.resourceLoader.loadImage).callCount(Object.keys(tiles).length);
    });
});
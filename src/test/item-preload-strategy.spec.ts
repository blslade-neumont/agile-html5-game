/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader, PreloadStrategy } from '../engine';
import { items } from '../dbs/item-db';
import { ItemPreloadStrategy } from '../item-preload-strategy';

import { AgileGame } from '../agile-game';
import { GameObject, delay } from '../engine';
import { stubDocument, stubImage, stubCanvas } from '../engine/test';

describe('ItemPreloadStrategy', () => {
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

    it('should call loadImage once per item in the database', () => {
        let preloadStrategy: ItemPreloadStrategy = new ItemPreloadStrategy();

        sinon.stub(game.resourceLoader, 'loadImage');

        preloadStrategy.preload(game.resourceLoader);
        expect(game.resourceLoader.loadImage).callCount(Object.keys(items).length);
    });
});
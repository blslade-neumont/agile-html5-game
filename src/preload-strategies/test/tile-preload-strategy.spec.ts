/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader } from '../../engine';
import { tiles } from '../../dbs/tile-db';
import { TilePreloadStrategy } from '../tile-preload-strategy';

describe('TilePreloadStrategy', () => {
    let resources: ResourceLoader;
    let preloadStrategy: TilePreloadStrategy;
    beforeEach(() => {
        resources = new ResourceLoader();
        preloadStrategy = new TilePreloadStrategy();
    });

    it('should call loadImage once per tile in the database', () => {
        sinon.stub(resources, 'loadImage');
        preloadStrategy.preload(resources);
        expect(resources.loadImage).callCount(Object.keys(tiles).length);
    });
});

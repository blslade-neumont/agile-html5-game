/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader } from '../../engine';
import { alives } from '../../dbs/alive-db';
import { AlivePreloadStrategy } from '../alive-preload-strategy';

describe('AlivePreloadStrategy', () => {
    let resources: ResourceLoader;
    let preloadStrategy: AlivePreloadStrategy;
    beforeEach(() => {
        resources = new ResourceLoader();
        preloadStrategy = new AlivePreloadStrategy();
    });

    it('should call loadImage once per alive in the database', () => {
        sinon.stub(resources, 'loadImage');
        preloadStrategy.preload(resources);
        expect(resources.loadImage).callCount(Object.keys(alives).length);
    });
});

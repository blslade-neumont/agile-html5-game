/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader } from '../../engine';
import { sfx } from '../../dbs/sfx-db';
import { SfxPreloadStrategy } from '../sfx-preload-strategy';

describe('SfxPreloadStrategy', () => {
    let resources: ResourceLoader;
    let preloadStrategy: SfxPreloadStrategy;
    beforeEach(() => {
        resources = new ResourceLoader();
        preloadStrategy = new SfxPreloadStrategy();
    });

    it('should call loadAudio once per sfx in the database', () => {
        sinon.stub(resources, 'loadAudio');
        preloadStrategy.preload(resources);
        expect(resources.loadAudio).callCount(Object.keys(sfx).length);
    });
});

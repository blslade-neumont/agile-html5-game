/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader } from '../../engine';
import { effects } from '../../dbs/effect-db';
import { EffectPreloadStrategy } from '../effect-preload-strategy';

describe('EffectPreloadStrategy', () => {
    let resources: ResourceLoader;
    let preloadStrategy: EffectPreloadStrategy;
    beforeEach(() => {
        resources = new ResourceLoader();
        preloadStrategy = new EffectPreloadStrategy();
    });

    it('should call loadImage once per alive in the database', () => {
        sinon.stub(resources, 'loadImage');
        preloadStrategy.preload(resources);
        expect(resources.loadImage).callCount(Object.keys(effects).length);
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader } from '../../engine';
import { items } from '../../dbs/item-db';
import { ItemPreloadStrategy } from '../item-preload-strategy';

describe('ItemPreloadStrategy', () => {
    let resources: ResourceLoader;
    let preloadStrategy: ItemPreloadStrategy;
    beforeEach(() => {
        resources = new ResourceLoader();
        preloadStrategy = new ItemPreloadStrategy();
    });

    it('should call loadImage once per item in the database', () => {
        sinon.stub(resources, 'loadImage');
        preloadStrategy.preload(resources);
        expect(resources.loadImage).callCount(Object.keys(items).length);
    });
});

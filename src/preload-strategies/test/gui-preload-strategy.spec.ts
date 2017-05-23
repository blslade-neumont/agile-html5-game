/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader } from '../../engine';
import { gui } from '../../dbs/gui-db';
import { GuiPreloadStrategy } from '../gui-preload-strategy';

describe('GuiPreloadStrategy', () => {
    let resources: ResourceLoader;
    let preloadStrategy: GuiPreloadStrategy;
    beforeEach(() => {
        resources = new ResourceLoader();
        preloadStrategy = new GuiPreloadStrategy();
    });

    it('should call loadImage once per gui spec in the database', () => {
        sinon.stub(resources, 'loadImage');
        preloadStrategy.preload(resources);
        expect(resources.loadImage).callCount(Object.keys(gui).length);
    });
});

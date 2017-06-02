/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { delay } from '../delay';

describe('utils/delay', () => {
    it('resolves after the specified number of milliseconds', async () => {
        let startTime = new Date().valueOf();
        await delay(40);
        let difference = new Date().valueOf() - startTime;
        expect(difference).to.be.closeTo(40, 30);
    });
});

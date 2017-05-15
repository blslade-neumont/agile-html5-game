/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { degToRad, radToDeg } from '../math';

describe('utils/degToRad', () => {
    it('converts 0 to 0', () => {
        expect(degToRad(0)).to.eql(0);
    });
    it('converts 180 to 3.14159', () => {
        expect(degToRad(180)).to.eql(Math.PI);
    });
});

describe('utils/radToDeg', () => {
    it('converts 0 to 0', () => {
        expect(radToDeg(0)).to.eql(0);
    });
    it('converts 3.14159 to 180', () => {
        expect(radToDeg(Math.PI)).to.eql(180);
    });
});

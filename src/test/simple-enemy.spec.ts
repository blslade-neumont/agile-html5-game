/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { SimpleEnemy } from '../simple-enemy';

describe('SimpleEnemy', () => {
    let enemy: SimpleEnemy;
    beforeEach(() => {
        enemy = new SimpleEnemy();
    });

    it('Should be named Simple Enemy', () => {
        expect(enemy.name).to.be.eql('Simple Enemy');
    });

});
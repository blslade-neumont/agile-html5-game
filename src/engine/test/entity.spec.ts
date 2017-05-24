/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Entity } from '../entity';

describe('Entity', () => {
    describe('.constructor', () => {
        it('should set the entity name', () => {
            let eobj = new Entity('my-name', { maxHealth: 1 });
            expect(eobj.name).to.eq('my-name');
        });
        it('should set maxHealth based on the option passed in', () => {
            let options = { maxHealth: 1 };
            let eobj = new Entity('my-name', options);
            expect(eobj.maxHealth).to.eq(options.maxHealth);
        });
        it('should set currentHealth based on the maxHealth option passed in if it was not specified', () => {
            let options = { maxHealth: 1 };
            let eobj = new Entity('my-name', options);
            expect(eobj.currentHealth).to.eq(options.maxHealth);
        });
        it('should be able to set a customized current health upon creation', () => {
            let options = { maxHealth: 2, currentHealth: 1 };
            let eobj = new Entity('my-name', options);
            expect(eobj.currentHealth).to.eq(options.currentHealth);
        });
        it('should throw an error if it is constructed with more current health than max health', () => {
            let options = { maxHealth: 2, currentHealth: 3 };
            expect(() => new Entity('my-name', options)).to.throw(/current health higher than max/i);
        });
    });
    describe('.maxHealth', () => {
        it('should have a max health of a passed in number', () => {
            let arbitraryMaxHealth = 10;
            let eobj = new Entity('my-name', { maxHealth: arbitraryMaxHealth });
            expect(eobj.maxHealth).to.be.eq(arbitraryMaxHealth);
        });
    });
    describe('.currentHealth', () => {
        it('should be able to modify its own current health', () => {
            let eobj = new Entity('name', { maxHealth: 10});
            eobj.currentHealth = 9;
            expect(eobj.currentHealth).to.be.eq(9);
        });
        it('should not be able to set negative health', () => {
            let eobj = new Entity('name', { maxHealth: 10});
            eobj.currentHealth = -1111;
            expect(eobj.currentHealth).to.be.eq(0);
        });
        it('should not be able to set more current health than max health after construction', () => {
            let eobj = new Entity('name', { maxHealth: 10});
            eobj.currentHealth = 99999;
            expect(eobj.currentHealth).to.be.eq(10);
        });
    });
});
/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { EventEmitter } from '../event-emitter';

describe('EventEmitter', () => {
    let emitter: EventEmitter<number>;
    beforeEach(() => {
        emitter = new EventEmitter<number>();
    });

    describe('.addListener', () => {
        it('should throw an error if the listener is not a function', () => {
            expect(() => emitter.addListener(<any>void(0))).to.throw(/not a function/i);
        });
    });

    describe('.emit', () => {
        it('should not throw an error if no listeners are registered', () => {
            expect(() => emitter.emit(0)).not.to.throw;
        });
        it('should should invoke the registered listener, if there is one', () => {
            let invoked = false;
            emitter.addListener(num => invoked = true);
            emitter.emit(0);
            expect(invoked).to.be.true;
        });
        it('should invoke all registered listeners, if multiple are registered', () => {
            let invoked = 0;
            emitter.addListener(num => invoked++);
            emitter.addListener(num => invoked++);
            emitter.addListener(num => invoked++);
            emitter.addListener(num => invoked++);
            emitter.addListener(num => invoked++);
            emitter.emit(0);
            expect(invoked).to.eq(5);
        });
        it('should the registered listeners multiple times if multiple events are emitted', () => {
            let sum = 0;
            emitter.addListener(num => sum += num);
            emitter.emit(5);
            emitter.emit(3);
            emitter.emit(2);
            expect(sum).to.eq(10);
        });
        it('should throw an error if emit is invoked from within one of the listeners', () => {
            emitter.addListener(num => emitter.emit(num + 1));
            expect(() => emitter.emit(0)).to.throw(/recursively invoked/i);
        });
    });
});

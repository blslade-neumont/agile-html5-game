/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { EventQueue } from '../event-queue';
import { stubDocument } from './mock-document';
import { delay } from '../utils/delay';

describe('EventQueue', () => {
    stubDocument();

    let events: EventQueue;
    beforeEach(() => {
        events = new EventQueue();
    });

    describe('keyboard input', () => {
        describe('onkeydown', () => {
            it('should emit a keyPressed and keyTyped event the first time a key is pressed', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onkeydown(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                expect(events.clearQueue()).to.deep.eq([{
                    type: 'keyPressed',
                    code: 'ArrowUp',
                    altPressed: false,
                    ctrlPressed: false,
                    shiftPressed: false
                }, {
                    type: 'keyTyped',
                    key: 'ArrowUp',
                    code: 'ArrowUp',
                    altPressed: false,
                    ctrlPressed: false,
                    shiftPressed: false
                }]);
            });
            it('should emit only a keyTyped event subsequent times a key is pressed', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onkeydown(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                events.clearQueue();
                body.onkeydown(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                expect(events.clearQueue()).to.deep.eq([{
                    type: 'keyTyped',
                    key: 'ArrowUp',
                    code: 'ArrowUp',
                    altPressed: false,
                    ctrlPressed: false,
                    shiftPressed: false
                }]);
            });
        });

        describe('onkeyup', () => {
            it('should emit a keyReleased event when a key is released', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onkeydown(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                events.clearQueue();
                body.onkeyup(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                expect(events.clearQueue()).to.deep.eq([{
                    type: 'keyReleased',
                    code: 'ArrowUp',
                    altPressed: false,
                    ctrlPressed: false,
                    shiftPressed: false
                }]);
            });
            it('should not emit a keyReleased event if a duplicate key release event is triggered', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onkeydown(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                body.onkeyup(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                events.clearQueue();
                body.onkeyup(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                expect(events.clearQueue()).to.deep.eq([]);
            });
        });

        describe('.isKeyDown', () => {
            it('should return false before the key has been pressed', () => {
                expect(events.isKeyDown('ArrowUp')).to.be.false;
            });
            it('should return true after the key has been pressed', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onkeydown(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                expect(events.isKeyDown('ArrowUp')).to.be.true;
            });
            it('should return false after the key has been pressed and released', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onkeydown(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                body.onkeyup(<any>{ code: 'ArrowUp', key: 'ArrowUp' });
                expect(events.isKeyDown('ArrowUp')).to.be.false;
            });
        });
    });

    describe('.enqueue', () => {
        it('should queue the event to be returned the next time clearQueue is called', () => {
            let e = <any>{ type: 'fish!' };
            events.enqueue(e);
            expect(events.clearQueue()).to.deep.eq([e]);
        });
    });

    describe('.clearQueue', () => {
        it('should return an empty array if there are no events', () => {
            expect(events.clearQueue()).to.deep.eq([]);
        });
        it('should not return the same event twice', () => {
            let e = <any>{ type: 'fish!' };
            events.enqueue(e);
            expect(events.clearQueue()).to.deep.eq([e]);
            expect(events.clearQueue()).to.deep.eq([]);
        });
    });
});

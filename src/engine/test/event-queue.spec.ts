/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { EventQueue } from '../event-queue';
import { MouseButton } from '../utils/events';
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

    describe('mouse input', () => {
        describe('onmousemove', () => {
            it('should emit a mouseMove event when the mouse is moved', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousemove(<any>{ movementX: -3, movementY: 3 });
                expect(events.clearQueue()).to.deep.eq([{
                    type: 'mouseMoved',
                    movementX: -3,
                    movementY: 3,
                    pageX: -3,
                    pageY: 3
                }]);
            });
            it('should emit only one mouseMove event per frame even if multiple are fired', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousemove(<any>{ movementX: -3, movementY: 3 });
                body.onmousemove(<any>{ movementX: -1, movementY: -2 });
                expect(events.clearQueue()).to.deep.eq([{
                    type: 'mouseMoved',
                    movementX: -4,
                    movementY: 1,
                    pageX: -4,
                    pageY: 1
                }]);
            });
        });
        
        describe('onmousedown', () => {
            it('should emit a mouseButtonPressed event when a mouse button is pressed', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousedown(<any>{ button: 0 });
                expect(events.clearQueue()).to.deep.eq([{
                    type: 'mouseButtonPressed',
                    button: MouseButton.Left,
                    pageX: 0,
                    pageY: 0
                }]);
            });
            it('should not emit a mouseButtonPressed event if a duplicate mouse button event is triggered', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousedown(<any>{ button: 0 });
                events.clearQueue();
                body.onmousedown(<any>{ button: 0 });
                expect(events.clearQueue()).to.deep.eq([]);
            });
            it('should set the mouse position if one is defined', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousedown(<any>{ button: 0, pageX: 42, pageY: 13 });
                expect(events.mousePosition).to.deep.eq({ x: 42, y: 13 });
            });
        });

        describe('onmouseup', () => {
            it('should emit a mouseButtonReleased event when a mouse button is released', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousedown(<any>{ button: 0 });
                events.clearQueue();
                body.onmouseup(<any>{ button: 0 });
                expect(events.clearQueue()).to.deep.eq([{
                    type: 'mouseButtonReleased',
                    button: MouseButton.Left,
                    pageX: 0,
                    pageY: 0
                }]);
            });
            it('should not emit a mouseButtonReleased event if a duplicate mouse button event is triggered', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousedown(<any>{ button: 0 });
                body.onmouseup(<any>{ button: 0 });
                events.clearQueue();
                body.onmouseup(<any>{ button: 0 });
                expect(events.clearQueue()).to.deep.eq([]);
            });
            it('should set the mouse position if one is defined', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousedown(<any>{ button: 0 });
                body.onmouseup(<any>{ button: 0, pageX: 42, pageY: 13 });
                expect(events.mousePosition).to.deep.eq({ x: 42, y: 13 });
            });
        });
        
        describe('onmousewheel', () => {
            it('should emit a mouseWheel event when the wheel is moved', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousewheel(<any>{ wheelDelta: -4 });
                expect(events.clearQueue()).to.deep.eq([{
                    type: 'mouseWheel',
                    delta: -4,
                    pageX: 0,
                    pageY: 0
                }]);
            });
            it('should emit only one mouseWheel event per frame even if multiple are fired', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousewheel(<any>{ wheelDelta: -4 });
                body.onmousewheel(<any>{ wheelDelta: -5 });
                expect(events.clearQueue()).to.deep.eq([{
                    type: 'mouseWheel',
                    delta: -9,
                    pageX: 0,
                    pageY: 0
                }]);
            });
        });

        describe('.isMouseButtonDown', () => {
            it('should return false before the mouse button has been pressed', () => {
                expect(events.isMouseButtonDown(MouseButton.Left)).to.be.false;
            });
            it('should return true after the mouse button has been pressed', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousedown(<any>{ button: 0 });
                expect(events.isMouseButtonDown(MouseButton.Left)).to.be.true;
            });
            it('should return false after the mouse button has been pressed and released', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousedown(<any>{ button: 0 });
                body.onmouseup(<any>{ button: 0 });
                expect(events.isMouseButtonDown(MouseButton.Left)).to.be.false;
            });
        });

        describe('.mousePosition', () => {
            it('should start at (0, 0)', () => {
                expect(events.mousePosition).to.deep.eq({ x: 0, y: 0 });
            });
            it('should be updated when a mouse event sets the page position', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousedown(<any>{ button: 0, pageX: 30, pageY: 40 });
                expect(events.mousePosition).to.deep.eq({ x: 30, y: 40 });
            });
            it('should be updated when mouse move events occur', () => {
                let body = document.getElementsByTagName('body')[0];
                body.onmousemove(<any>{ button: 0, movementX: 60, movementY: 40 });
                body.onmousemove(<any>{ button: 0, movementX: -20, movementY: 30 });
                expect(events.mousePosition).to.deep.eq({ x: 40, y: 70 });
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

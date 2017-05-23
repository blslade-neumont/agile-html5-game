/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GuiObject } from '../gui-object';
import { stubDocument } from '../engine/test';

describe('GuiObject', () => {
    stubDocument();

    let guiObject: GuiObject;
    beforeEach(() => {
        guiObject = new GuiObject();
    });

    describe('.gameTimeString', () => {
        it('should choose the correct hour', () => {
            guiObject.addToScene(<any>{ game: { world: { gameTime: 6 / 24 } } });
            expect(guiObject.gameTimeString).to.eq('Day 1, 6 AM');
        });
        it('should switch to PM correctly', () => {
            guiObject.addToScene(<any>{ game: { world: { gameTime: 18 / 24 } } });
            expect(guiObject.gameTimeString).to.eq('Day 1, 6 PM');
        });
        it('should work for later days', () => {
            guiObject.addToScene(<any>{ game: { world: { gameTime: 2 + (14 / 24) } }});
            expect(guiObject.gameTimeString).to.eq('Day 3, 2 PM');
        });
        it('should prefer 12 AM to 0 AM', () => {
            guiObject.addToScene(<any>{ game: {world: { gameTime: 0 / 24 } }});
            expect(guiObject.gameTimeString).to.eq('Day 1, 12 AM');
        });
        it('should prefer 12 PM to 0 PM', () => {
            guiObject.addToScene(<any>{ game: { world: { gameTime: 12 / 24 } } });
            expect(guiObject.gameTimeString).to.eq('Day 1, 12 PM');
        });
    });

    describe('.render', () => {
        let context: CanvasRenderingContext2D;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
        });

        it('should invoke fillText with the game time string', () => {
            guiObject.addToScene(<any>{ game: { world: { gameTime: 8 / 24 }, canvasSize: [640, 480] } });
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith('Day 1, 8 AM');
        });
        it('should invoke fillText relative to the top right corner of the canvas', () => {
            guiObject.addToScene(<any>{ game: { world: { gameTime: 8 / 24 }, canvasSize: [804, 480] } });
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith(sinon.match.any, 800, 4);
        });
    });
});

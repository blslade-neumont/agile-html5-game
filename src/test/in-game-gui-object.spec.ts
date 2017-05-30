/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { InGameGuiObject } from '../in-game-gui-object';
import { AgileGame } from '../agile-game';
import { GameObject, delay } from '../engine';

describe('InGameGuiObject', () => {

    let guiObject: InGameGuiObject;
    beforeEach(() => {
        guiObject = new InGameGuiObject();
    });

    describe('.gameTimeString', () => {
        it('should choose the correct hour', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 6 / 24 } });
            expect(guiObject.gameTimeString).to.eq('Day 1, 6 AM');
        });
        it('should switch to PM correctly', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 18 / 24 } });
            expect(guiObject.gameTimeString).to.eq('Day 1, 6 PM');
        });
        it('should work for later days', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 2 + (14 / 24) } });
            expect(guiObject.gameTimeString).to.eq('Day 3, 2 PM');
        });
        it('should prefer 12 AM to 0 AM', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 0 / 24 } });
            expect(guiObject.gameTimeString).to.eq('Day 1, 12 AM');
        });
        it('should prefer 12 PM to 0 PM', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 12 / 24 } });
            expect(guiObject.gameTimeString).to.eq('Day 1, 12 PM');
        });
    });

    describe('.handleEvent', () => {

        let game: AgileGame;
        beforeEach(() => {
            game = new AgileGame(30);
        });

        afterEach(() => {
            if (game.isRunning) game.stop();
        });

        it('should pause the game when e is pressed if it is not paused', () => {
            game.start();
            game.scene.addObject(guiObject);
            sinon.stub(game.onPause, 'emit');
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });
            expect(game.onPause.emit).to.be.calledOnce;
        });

        it('should un-pause the game when e is pressed if it is paused', () => {
            game.start();
            game.scene.addObject(guiObject);
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });

            sinon.stub(game.onPlay, 'emit');
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });
            expect(game.onPlay.emit).to.be.calledOnce;
        });

        it('should not pause the game when escape is pressed', () => {
            game.start();
            game.scene.addObject(guiObject);
            sinon.stub(game.onPause, 'emit');
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'Escape' });
            expect(game.onPause.emit).not.to.be.called;
        });

        it('should un-pause the game when escape is pressed if it is paused', () => {
            game.start();
            game.scene.addObject(guiObject);
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });

            sinon.stub(game.onPlay, 'emit');
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'Escape' });
            expect(game.onPlay.emit).to.be.calledOnce;
        });
    });

    describe('.render', () => {
        let context: CanvasRenderingContext2D;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
        });

        it('should invoke fillText with the game time string', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 8 / 24 }, game: { canvasSize: [640, 480] } });
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith('Day 1, 8 AM');
        });
        it('should invoke fillText relative to the top right corner of the canvas', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 8 / 24 }, game: { canvasSize: [804, 480] } });
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith(sinon.match.any, 800, 4);
        });

        it('should invoke fillText with the score string', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 8 / 24 }, game: { canvasSize: [640, 480] } });
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith('Score: 0');
        });
        it('should invoke fillText relative to the top right corner of the canvas', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 8 / 24 }, game: { canvasSize: [804, 480] } });
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith(sinon.match.any, 768, 28);
        });
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { InGameGuiObject } from '../in-game-gui-object';
import { AgileGame } from '../agile-game';
import { OverworldScene } from '../scenes/overworld-scene';
import { Game, GameObject, delay } from '../engine';
import renderUtils = require('../engine');
import { stubDocument, stubImage, MockGame } from '../engine/test';

describe('InGameGuiObject', () => {
    stubDocument();
    stubImage();

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
        stubImage();

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

    describe.only('.render', () => {
        let context: CanvasRenderingContext2D;
        let game: Game;
        let scene: OverworldScene;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
            game = <any>new MockGame();
            (<any>game).scene = scene = <any>{
                game: game, world: { gameTime: 8 / 24 },
                findObject: () => null
            };
            guiObject.addToScene(scene);
        });

        it('should invoke fillText with the game time string', () => {
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith('Day 1, 8 AM');
        });
        it('should invoke fillText relative to the top right corner of the canvas', () => {
            game.canvasSize = [804, 480];
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith(sinon.match.any, 800, 4);
        });
        it('should invoke renderHealth', () => {
            sinon.stub(guiObject, 'renderHealth');
            guiObject.render(context);
            expect((<any>guiObject).renderHealth).to.have.been.calledOnce;
        });
    });

    describe.only('.renderHealth', () => {
        let context: CanvasRenderingContext2D;
        let game: Game;
        let scene: OverworldScene;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
            game = <any>new MockGame();
            (<any>game).scene = scene = <any>{
                game: game, world: { gameTime: 8 / 24 },
                findObject: () => null
            };
            guiObject.addToScene(scene);
        });

        it('should invoke drawSprite ten times', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(renderUtils, 'drawSprite');
                (<any>guiObject).renderHealth(context);
                expect(stub.callCount).to.eq(10);
            }
            finally { if (stub) stub.restore(); }
        });
        it('should invoke drawSprite ten times even if the player is damaged', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(renderUtils, 'drawSprite');
                sinon.stub(scene.world, 'findObject').returns({ currentHealth: 4 });
                (<any>guiObject).renderHealth(context);
                expect(stub.callCount).to.eq(10);
            }
            finally { if (stub) stub.restore(); }
        });
    });
});

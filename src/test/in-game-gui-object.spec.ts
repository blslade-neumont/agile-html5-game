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
import { MockAgileGame } from './mock-agile-game';
import { MenuGuiObject } from '../menu-gui-object';
import { gui } from '../dbs/gui-db';

describe('InGameGuiObject', () => {
    let guiObject: InGameGuiObject;
    beforeEach(() => {
        guiObject = new InGameGuiObject();
    });

    describe('.gameTimeString', () => {
        it('should choose the correct hour', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 6 / 24 }, findObject: () => null });
            expect(guiObject.gameTimeString).to.eq('Day 1, 6 AM');
        });
        it('should switch to PM correctly', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 18 / 24 }, findObject: () => null });
            expect(guiObject.gameTimeString).to.eq('Day 1, 6 PM');
        });
        it('should work for later days', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 2 + (14 / 24) }, findObject: () => null });
            expect(guiObject.gameTimeString).to.eq('Day 3, 2 PM');
        });
        it('should prefer 12 AM to 0 AM', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 0 / 24 }, findObject: () => null });
            expect(guiObject.gameTimeString).to.eq('Day 1, 12 AM');
        });
        it('should prefer 12 PM to 0 PM', () => {
            guiObject.addToScene(<any>{ world: { gameTime: 12 / 24 }, findObject: () => null });
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
            expect(game.onPause.emit).to.have.been.calledOnce;
        });
        it('should un-pause the game when e is pressed if it is paused', () => {
            game.start();
            game.scene.addObject(guiObject);
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });

            sinon.stub(game.onPlay, 'emit');
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });
            expect(game.onPlay.emit).to.have.been.calledOnce;
        });
        it('should not pause the game when escape is pressed', () => {
            game.start();
            game.scene.addObject(guiObject);
            sinon.stub(game.onPause, 'emit');
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'Escape' });
            expect(game.onPause.emit).not.to.have.been.called;
        });
        it('should un-pause the game when escape is pressed if it is paused', () => {
            game.start();
            game.scene.addObject(guiObject);
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });

            sinon.stub(game.onPlay, 'emit');
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'Escape' });
            expect(game.onPlay.emit).to.have.been.calledOnce;
        });

        it('should call super.handleEvent if showing the inventory and the event is not handled', () => {
            game.start();
            game.scene.addObject(guiObject);
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });

            let stub = sinon.stub(MenuGuiObject.prototype, 'handleEvent');
            try {
                guiObject.handleEvent(<any>{ type: 'fakeEvent' });
                expect(MenuGuiObject.prototype.handleEvent).to.have.been.calledOnce;
            }
            finally { if (stub) stub.restore(); }
        });
        it('should not call super.handleEvent if not showing the inventory', () => {
            let stub = sinon.stub(MenuGuiObject.prototype, 'handleEvent');
            try {
                guiObject.handleEvent(<any>{ type: 'fakeEvent' });
                expect(MenuGuiObject.prototype.handleEvent).not.to.have.been.called;
            }
            finally { if (stub) stub.restore(); }
        });
    });

    describe('.tick', () => {
        let game: AgileGame;
        beforeEach(() => {
            game = new AgileGame(30);
        });
        afterEach(() => {
            if (game.isRunning) game.stop();
        });

        it('should call super.tick if showing the inventory', () => {
            game.start();
            game.scene.addObject(guiObject);
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });

            let stub = sinon.stub(MenuGuiObject.prototype, 'tick');
            try {
                guiObject.tick(.02);
                expect(MenuGuiObject.prototype.tick).to.have.been.calledOnce;
            }
            finally { if (stub) stub.restore(); }
        });
        it('should not call super.tick if not showing the inventory', () => {
            let stub = sinon.stub(MenuGuiObject.prototype, 'tick');
            try {
                guiObject.tick(.02);
                expect(MenuGuiObject.prototype.tick).not.to.have.been.called;
            }
            finally { if (stub) stub.restore(); }
        });
    });

    describe('.renderImpl', () => {
        let context: CanvasRenderingContext2D;
        let game: Game;
        let scene: OverworldScene;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
            game = <any>new MockAgileGame();
            (<any>game).scene = scene = <any>{
                game: game, world: { gameTime: 8 / 24 },
                findObject: () => null,
                addObject: () => null
            };
            guiObject.addToScene(scene);
        });

        it('should invoke fillText with the game time string', () => {
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith('Day 1, 8 AM');
        });
        it('should invoke fillText with the score string', () => {
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith('Score: 0');
        });
        it('should render the game time relative to the top right corner of the canvas', () => {
            game.canvasSize = [804, 480];
            sinon.stub(context, 'fillText');
            guiObject.render(context);
            expect(context.fillText).to.have.been.calledWith(sinon.match(/day/i), 800, 4);
        });
        it('should invoke renderHealth', () => {
            sinon.stub(guiObject, 'renderHealth');
            guiObject.render(context);
            expect((<any>guiObject).renderHealth).to.have.been.calledOnce;
        });
        it('should call super.renderImpl if showing the inventory', () => {
            game.scene.addObject(guiObject);
            guiObject.handleEvent(<any>{ type: 'keyPressed', code: 'KeyE' });

            let stub = sinon.stub(MenuGuiObject.prototype, 'renderImpl');
            try {
                (<any>guiObject).renderImpl(context);
                expect((<any>MenuGuiObject.prototype).renderImpl).to.have.been.calledOnce;
            }
            finally { if (stub) stub.restore(); }
        });
        it('should not call super.renderImpl if not showing the inventory', () => {
            let stub = sinon.stub(MenuGuiObject.prototype, 'renderImpl');
            try {
                (<any>guiObject).renderImpl(context);
                expect((<any>MenuGuiObject.prototype).renderImpl).not.to.have.been.called;
            }
            finally { if (stub) stub.restore(); }
        });
    });

    describe('.renderHealth', () => {
        let context: CanvasRenderingContext2D;
        let game: Game;
        let scene: OverworldScene;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
            game = <any>new MockAgileGame();
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
                sinon.stub(scene, 'findObject').returns({ currentHealth: 4 });
                (<any>guiObject).renderHealth(context);
                expect(stub.callCount).to.eq(10);
            }
            finally { if (stub) stub.restore(); }
        });
        it('should not invoke drawSprite with the full health sprite if currentHealth is 0', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(renderUtils, 'drawSprite');
                sinon.stub(scene, 'findObject').returns({ currentHealth: 0 });
                (<any>guiObject).renderHealth(context);
                expect(renderUtils.drawSprite).not.to.have.been.calledWith(sinon.match.any, sinon.match.any, gui['full-health-heart'].sprite);
            }
            finally { if (stub) stub.restore(); }
        });
        it('should not invoke drawSprite with the empty health sprite if currentHealth is maxHealth', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(renderUtils, 'drawSprite');
                sinon.stub(scene, 'findObject').returns({ currentHealth: 10 });
                (<any>guiObject).renderHealth(context);
                expect(renderUtils.drawSprite).not.to.have.been.calledWith(sinon.match.any, sinon.match.any, gui['empty-health-heart'].sprite);
            }
            finally { if (stub) stub.restore(); }
        });
        it('should invoke drawSprite with the exact number of full and empty hearts if the player is damaged', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(renderUtils, 'drawSprite');
                sinon.stub(scene, 'findObject').returns({ currentHealth: 4 });
                (<any>guiObject).renderHealth(context);
                expect(stub.callCount).to.eq(10);
                for (let q = 0; q < 4; q++) expect(renderUtils.drawSprite).to.have.been.calledWith(sinon.match.any, sinon.match.any, gui['full-health-heart'].sprite);
                for (let q = 4; q < 10; q++) expect(renderUtils.drawSprite).to.have.been.calledWith(sinon.match.any, sinon.match.any, gui['empty-health-heart'].sprite);
            }
            finally { if (stub) stub.restore(); }
        });
        it(`should use the player's maxHealth if it is different from the default`, () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(renderUtils, 'drawSprite');
                sinon.stub(scene, 'findObject').returns({ currentHealth: 4, maxHealth: 20 });
                (<any>guiObject).renderHealth(context);
                expect(stub.callCount).to.eq(20);
            }
            finally { if (stub) stub.restore(); }
        });
    });
});

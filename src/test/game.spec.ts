/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Game } from '../game';
import { GameObject } from '../game-object';
import { stubDocument } from './mock-document';
import { stubImage } from './mock-image';
import { stubCanvas } from './mock-canvas';
import { delay } from '../utils/delay';
declare let global: any;

describe('Game', () => {
    stubDocument();
    stubImage();
    stubCanvas();

    let game: Game;
    beforeEach(() => {
        game = new Game(30, new HTMLCanvasElement());
    });
    afterEach(() => {
        if (game.isRunning) game.stop();
    });

    it('should start with no resource loader or event queue', () => {
        expect(game.resourceLoader).not.to.be.ok;
        expect(game.eventQueue).not.to.be.ok;
    });
    it('should start with isRunning = false', () => {
        expect(game.isRunning).to.be.false;
    });

    describe('.start', () => {
        it('should set isRunning to true', () => {
            game.start();
            game.stop();
            expect(game.isRunning).to.be.false;
        });
        it('should create a new resource loader and preload tile and item assets', () => {
            game.start();
            expect(game.resourceLoader).to.be.ok;
            expect(game.resourceLoader.totalResources).to.be.greaterThan(0);
        });
        it('should create a new event queue', () => {
            game.start();
            expect(game.eventQueue).to.be.ok;
        });
        it('should throw an error if you try to call it when the game is already running', () => {
            game.start();
            expect(() => game.start()).to.throw(/game is already running/i);
        });
        it('should begin invoking onTick the requested number of times per second', async () => {
            sinon.stub(game, 'onTick');

            game.start();
            await delay(1000 / 25);
            expect((<any>game).onTick).to.have.been.calledOnce;
        });
    });
    describe('.stop', () => {
        it('should set isRunning to false', () => {
            game.start();
            game.stop();
            expect(game.isRunning).to.be.false;
        });
        it('should stop invoking onTick', async () => {
            sinon.stub(game, 'onTick');
            game.start();
            game.stop();
            await delay(1000 / 25);
            expect((<any>game).onTick).not.to.have.been.called;
        });
    });

    describe('.addObject', () => {
        it('should invoke GameObject.addToGame()', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'addToGame');
            game.addObject(gobj);
            expect(gobj.addToGame).to.have.been.calledOnce;
        });
        it('should invoke GameObject.tick and GameObject.render the next time onTick is called and the resource loader is done', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'tick');
            sinon.stub(gobj, 'render');
            game.addObject(gobj);
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
            (<any>game).onTick();
            expect(gobj.tick).to.have.been.calledOnce;
            expect(gobj.render).to.have.been.calledOnce;
        });
        it('should invoke GameObject.handleEvent the next time onTick is called, the resource loader is done, and there is an event', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'handleEvent');
            game.addObject(gobj);
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
            let e: any = { type: 'fish!' };
            game.eventQueue.enqueue(e);
            (<any>game).onTick();
            let subject = expect(gobj.handleEvent).to.have.been;
            subject.calledOnce;
            subject.calledWithExactly(e);
        });
    });
    describe('.removeObject', () => {
        it('should invoke GameObject.removeFromGame()', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'removeFromGame');
            game.addObject(gobj);
            game.removeObject(gobj);
            expect(gobj.removeFromGame).to.have.been.calledOnce;
        });
        it('should throw an error if the game object is not in the game', () => {
            let gobj = new GameObject('name');
            expect(() => game.removeObject(gobj)).to.throw(/not .*added/i);
        });
        it('should not invoke GameObject.tick or GameObject.render when onTick is called', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'tick');
            sinon.stub(gobj, 'render');
            game.addObject(gobj);
            game.removeObject(gobj);
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
            (<any>game).onTick();
            expect(gobj.tick).not.to.have.been.called;
            expect(gobj.render).not.to.have.been.called;
        });
        it('should not invoke GameObject.handleEvent when onTick is called and there is an event', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'handleEvent');
            game.addObject(gobj);
            game.removeObject(gobj);
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
            game.eventQueue.enqueue(<any>{ type: 'fish!' });
            (<any>game).onTick();
            expect(gobj.handleEvent).not.to.have.been.called;
        });
    });

    describe('.onTick', () => {
        it(`should throw an error if the game hasn't been started yet`, () => {
            expect(() => (<any>game).onTick()).to.throw(/game is not running/i);
        });
        it('should invoke ResourceLoader.render if the resource loader is not done loading', () => {
            game.start();
            (<any>game)._resourceLoader = { isDone: false, render: () => void (0) };
            sinon.stub(game.resourceLoader, 'render');
            sinon.stub(game, 'tick');
            sinon.stub(game, 'render');
            (<any>game).onTick();
            expect(game.resourceLoader.render).to.have.been.calledOnce;
            expect((<any>game).tick).not.to.have.been.called;
            expect((<any>game).render).not.to.have.been.called;
        });
        it('should invoke .tick and .render if the resource loader is done loading', () => {
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void(0) };
            sinon.stub(game.resourceLoader, 'render');
            sinon.stub(game, 'tick');
            sinon.stub(game, 'render');
            (<any>game).onTick();
            expect(game.resourceLoader.render).not.to.have.been.called;
            expect((<any>game).tick).to.have.been.calledOnce;
            expect((<any>game).render).to.have.been.calledOnce;
        });
    });
});

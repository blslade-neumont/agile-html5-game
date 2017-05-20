/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Game } from '../game';
import { GameObject } from '../game-object';
import { stubDocument } from './mock-document';
import { stubImage } from './mock-image';
import { delay } from '../utils/delay';

describe('Game', () => {
    stubDocument();
    stubImage();

    let game: Game;
    beforeEach(() => {
        game = new Game(30);//, new HTMLCanvasElement());
    });
    afterEach(() => {
        if (game.isRunning) game.stop();
    });
    
    it('should start with isRunning = false', () => {
        expect(game.isRunning).to.be.false;
    });
    it('should start with canvasSize = [640, 480]', () => {
        expect(game.canvasSize).to.deep.eq([640, 480]);
    });
    it('should update the canvas size any time the window is resized', () => {
        let canvas = (<any>game).canvas = <any>new HTMLCanvasElement();
        [canvas.scrollWidth, canvas.scrollHeight] = [123, 456];
        expect(game.canvasSize).not.to.deep.eq([123, 456]);
        document.getElementsByTagName('body')[0].onresize(<any>void(0));
        expect(game.canvasSize).to.deep.eq([123, 456]);
    });

    describe('.refreshCanvasSize', () => {
        it(`should not modify canvasSize if the game hasn't been started yet`, () => {
            let [oldWidth, oldHeight] = game.canvasSize;
            (<any>game).refreshCanvasSize();
            expect(game.canvasSize).to.deep.eq([oldWidth, oldHeight]);
        });
    });

    describe('.start', () => {
        it('should set isRunning to true', () => {
            game.start();
            game.stop();
            expect(game.isRunning).to.be.false;
        });
        it('should throw an error if you try to call it when the game is already running', () => {
            game.start();
            expect(() => game.start()).to.throw(/game is already running/i);
        });
        it('should update the canvas size', () => {
            let canvas = (<any>game).canvas = <any>new HTMLCanvasElement();
            [canvas.scrollWidth, canvas.scrollHeight] = [123, 456];
            expect(game.canvasSize).not.to.deep.eq([123, 456]);
            game.start();
            expect(game.canvasSize).to.deep.eq([123, 456]);
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
        it('should not throw an error if the game is already stopped', () => {
            expect(game.isRunning).to.be.false;
            expect(() => game.stop()).not.to.throw;
            expect(game.isRunning).to.be.false;
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
            expect(gobj.tick).to.have.been.calledThrice;
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
        it('should invoke .sendEvents, .tick, and .render if the resource loader is done loading', () => {
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void(0) };
            sinon.stub(game.resourceLoader, 'render');
            sinon.stub(game, 'sendEvents');
            sinon.stub(game, 'tick');
            sinon.stub(game, 'render');
            (<any>game).onTick();
            expect(game.resourceLoader.render).not.to.have.been.called;
            expect((<any>game).sendEvents).to.have.been.calledOnce;
            expect((<any>game).tick).to.have.been.calledThrice;
            expect((<any>game).render).to.have.been.calledOnce;
        });
    });

    describe('.sendEvents', () => {
        //This is more thoroughly tested by the public methods listed above
        it('should short-circuit if a game object handles an event', () => {
            let gobj1 = new GameObject('one');
            sinon.stub(gobj1, 'handleEvent').returns(true);
            let gobj2 = new GameObject('two');
            sinon.stub(gobj2, 'handleEvent');
            game.start();
            game.eventQueue.enqueue(<any>{ type: 'fakeEvent' });
            game.addObject(gobj1);
            game.addObject(gobj2);
            (<any>game).sendEvents();
            expect(gobj1.handleEvent).to.have.been.called;
            expect(gobj2.handleEvent).not.to.have.been.called;
        });
    });

    describe('.render', () => {
        //This is more thoroughly tested by the public methods listed above
        it('should not call GameObject.render if shouldRender is false', () => {
            let gobj = new GameObject('name', { shouldRender: false });
            sinon.stub(gobj, 'render');
            game.addObject(gobj);
            (<any>game).render(<any>void(0));
            expect(gobj.render).not.to.have.been.called;
        });
    });
});

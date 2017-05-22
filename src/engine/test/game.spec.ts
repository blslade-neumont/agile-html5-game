/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Game } from '../game';
import { GameObject } from '../game-object';
import { Camera } from '../camera';
import { stubDocument } from './mock-document';
import { stubImage } from './mock-image';
import { delay } from '../utils/delay';

describe('Game', () => {
    stubDocument();
    stubImage();

    let game: Game;
    beforeEach(() => {
        game = new Game(30);
    });
    afterEach(() => {
        if (game.isRunning) game.stop();
    });
    
    describe('.isRunning', () => {
        it('should start as false', () => {
            expect(game.isRunning).to.be.false;
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

    describe('.camera', () => {
        it('should start with a default camera', () => {
            expect(game.camera).to.be.ok;
            expect(game.camera).to.be.an.instanceof(Camera);
        });
    });

    describe('.refreshCanvasSize', () => {
        it(`should not modify canvasSize if the game hasn't been started yet`, () => {
            let [oldWidth, oldHeight] = game.canvasSize;
            (<any>game).refreshCanvasSize();
            expect(game.canvasSize).to.deep.eq([oldWidth, oldHeight]);
        });
    });

    describe('.canvasSize', () => {
        it('should start as [640, 480]', () => {
            expect(game.canvasSize).to.deep.eq([640, 480]);
        });
        it('should return an array that does not change the follow offset when changed', () => {
            let offset = game.canvasSize;
            offset[0] = NaN;
            expect(game.canvasSize[0]).not.to.be.NaN;
        });
        it('should be updated any time the window is resized', () => {
            let canvas = (<any>game).canvas = <any>new HTMLCanvasElement();
            [canvas.scrollWidth, canvas.scrollHeight] = [123, 456];
            expect(game.canvasSize).not.to.deep.eq([123, 456]);
            document.getElementsByTagName('body')[0].onresize(<any>void(0));
            expect(game.canvasSize).to.deep.eq([123, 456]);
        });
    });
    describe('.canvasSize=', () => {
        it('should short-circuit without sending an event if the new size is the same as the last one', () => {
            sinon.stub(game.eventQueue, 'enqueue');
            game.canvasSize = [640, 480];
            expect(game.eventQueue.enqueue).not.to.have.been.called;
        });
        it('should copy the values to prevent further changes to the object modifying the follow offset', () => {
            let newCanvasSize: [number, number] = [25, 92];
            game.canvasSize = newCanvasSize;
            newCanvasSize[0] = NaN;
            expect(game.canvasSize).to.deep.eq([25, 92]);
        });
        it(`should queue a 'canvasResize' event in the EventQueue`, () => {
            sinon.stub(game.eventQueue, 'enqueue');
            game.canvasSize = [123, 987];
            expect(game.eventQueue.enqueue).to.have.been.called;
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
            (<any>game)._resourceLoader = { isDone: true, render: () => void(0) };
            (<any>game).onTick();
            expect(gobj.tick).to.have.been.calledThrice;
            expect(gobj.render).to.have.been.calledOnce;
        });
        it('should invoke GameObject.handleEvent the next time onTick is called, the resource loader is done, and there is an event', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'handleEvent');
            game.addObject(gobj);
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void(0) };
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
            (<any>game)._resourceLoader = { isDone: true, render: () => void(0) };
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
            (<any>game)._resourceLoader = { isDone: true, render: () => void(0) };
            game.eventQueue.enqueue(<any>{ type: 'fish!' });
            (<any>game).onTick();
            expect(gobj.handleEvent).not.to.have.been.called;
        });
    });
    describe('.findObject', () => {
        let names = ['one', 'two', 'three'];
        let gobjs = names.map(name => new GameObject(name));

        beforeEach(() => {
            gobjs.map(gobj => game.addObject(gobj));
        });
        afterEach(() => {
            gobjs.map(gobj => game.removeObject(gobj));
        });

        it('should return null if the specified object is not found in this game', () => {
            expect(game.findObject(() => false)).to.be.null;
        });
        it('should allow the object name to be passed as an argument', () => {
            expect(game.findObject('two')).to.eq(gobjs[1]);
        });
        it('should throw an error if a falsey value that is not a string is passed in', () => {
            expect(() => game.findObject(<any>null)).to.throw(/invalid predicate/i);
        });
        it('should not throw an error if the empty string is passed in', () => {
            expect(() => game.findObject('')).not.to.throw;
        });
    });
    describe('.findObjects', () => {
        let names = ['one', 'two', 'three'];
        let gobjs = names.map(name => new GameObject(name));

        beforeEach(() => {
            gobjs.map(gobj => game.addObject(gobj));
        });
        afterEach(() => {
            gobjs.map(gobj => game.removeObject(gobj));
        });

        it('should return an empty array if the specified object is not found in this game', () => {
            expect(game.findObjects(() => false)).to.deep.eq([]);
        });
        it('should throw an error if a value that is not a function is passed in', () => {
            expect(() => game.findObjects(<any>null)).to.throw(/invalid predicate/i);
            expect(() => game.findObjects(<any>'')).to.throw(/invalid predicate/i);
            expect(() => game.findObjects(<any>{})).to.throw(/invalid predicate/i);
        });
        it('should return all game objects for which the predicate returns true', () => {
            expect(game.findObjects(obj => obj.name.indexOf('o') != -1)).to.deep.eq([gobjs[0], gobjs[1]]);
        });
    });

    describe('.onTick', () => {
        it(`should throw an error if the game hasn't been started yet`, () => {
            expect(() => (<any>game).onTick()).to.throw(/game is not running/i);
        });

        describe('when the resource loader is not done loading', () => {
            it('should invoke ResourceLoader.render', () => {
                game.start();
                (<any>game)._resourceLoader = { isDone: false, render: () => void(0) };
                sinon.stub(game.resourceLoader, 'render');
                sinon.stub(game, 'tick');
                sinon.stub(game, 'render');
                (<any>game).onTick();
                expect(game.resourceLoader.render).to.have.been.calledOnce;
                expect((<any>game).tick).not.to.have.been.called;
                expect((<any>game).render).not.to.have.been.called;
            });
        });

        describe('when the resource loader is done loading', () => {
            it('should use 0 as the delta if it is the first tick', () => {
                game.start();
                (<any>game).LOGIC_TICKS_PER_RENDER_TICK = 1;
                (<any>game)._resourceLoader = { isDone: true, render: () => void(0) };
                sinon.stub(game, 'tick');
                (<any>game).onTick();
                let subject = expect((<any>game).tick).to.have.been;
                subject.calledOnce;
                subject.calledWith(0);
            });
            it('should specify the delta based on the previous tick time if it is not the first tick', async () => {
                (<any>game)._isRunning = true;
                game.camera = null;
                (<any>game).LOGIC_TICKS_PER_RENDER_TICK = 1;
                (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
                (<any>game).context = new HTMLCanvasElement().getContext('2d');
                (<any>game).onTick();
                await delay(50);
                sinon.stub(game, 'tick');
                (<any>game).onTick();
                let subject = expect((<any>game).tick).to.have.been;
                subject.calledOnce;
                subject.calledWith(sinon.match(delta => delta >= .04 && delta <= .06));
            });
            it('should invoke tick three times for every one time it calls render when the resource loader is done loading', () => {
                game.start();
                (<any>game)._resourceLoader = { isDone: true, render: () => void(0) };
                sinon.stub(game, 'tick');
                sinon.stub(game, 'render');
                (<any>game).onTick();
                expect((<any>game).tick).to.have.been.calledThrice;
                expect((<any>game).render).to.have.been.calledOnce;
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
    });

    describe('.sendEvents', () => {
        let names = ['one', 'two', 'three'];
        let gobjs = names.map(name => new GameObject(name));
        let stubs: sinon.SinonStub[];

        beforeEach(() => {
            stubs = gobjs.map(gobj => {
                game.addObject(gobj);
                return sinon.stub(gobj, 'handleEvent');
            });
        });
        afterEach(() => {
            gobjs.map(gobj => game.removeObject(gobj));
            stubs.map(stub => stub.restore());
        });

        it('should invoke handleEvent on all game objects if none of them handle the event', () => {
            game.start();
            game.eventQueue.enqueue(<any>{ type: 'fakeEvent' });
            (<any>game).sendEvents();
            expect(gobjs[0].handleEvent).to.have.been.calledOnce;
            expect(gobjs[1].handleEvent).to.have.been.calledOnce;
            expect(gobjs[2].handleEvent).to.have.been.calledOnce;
        });
        it('should short-circuit if a game object handles an event', () => {
            stubs[1].returns(true);
            game.start();
            game.eventQueue.enqueue(<any>{ type: 'fakeEvent' });
            (<any>game).sendEvents();
            expect(gobjs[0].handleEvent).to.have.been.calledOnce;
            expect(gobjs[1].handleEvent).to.have.been.calledOnce;
            expect(gobjs[2].handleEvent).not.to.have.been.called;
        });
    });

    describe('.tick', () => {
        let names = ['one', 'two', 'three'];
        let gobjs = names.map(name => new GameObject(name));
        let stubs: sinon.SinonStub[];

        beforeEach(() => {
            stubs = gobjs.map(gobj => {
                game.addObject(gobj);
                return sinon.stub(gobj, 'tick');
            });
        });
        afterEach(() => {
            gobjs.map(gobj => game.removeObject(gobj));
            stubs.map(stub => stub.restore());
        });

        it('should invoke tick on all game objects', () => {
            game.start();
            (<any>game).tick();
            expect((<any>gobjs[0]).tick).to.have.been.calledOnce;
            expect((<any>gobjs[1]).tick).to.have.been.calledOnce;
            expect((<any>gobjs[2]).tick).to.have.been.calledOnce;
        });
        it('should invoke tick on the camera, if there is one', () => {
            game.start();
            game.camera = new Camera(game);
            sinon.stub(game.camera, 'tick');
            (<any>game).tick(45);
            expect(game.camera.tick).to.have.been.calledOnce.calledWith(45);
        });
    });

    describe('.render', () => {
        let names = ['one', 'two', 'three'];
        let gobjs = names.map(name => new GameObject(name));
        let stubs: sinon.SinonStub[];

        beforeEach(() => {
            stubs = gobjs.map(gobj => {
                game.addObject(gobj);
                return sinon.stub(gobj, 'render');
            });
        });
        afterEach(() => {
            gobjs.map(gobj => game.removeObject(gobj));
            stubs.map(stub => stub.restore());
        });

        it('should throw an error if no canvas is passed in', () => {
            expect(() => (<any>game).render(null)).to.throw(/no rendering context/i);
        });
        it('should invoke render on all game objects', () => {
            game.start();
            (<any>game).render((<any>game).context);
            expect(gobjs[0].render).to.have.been.calledOnce;
            expect(gobjs[1].render).to.have.been.calledOnce;
            expect(gobjs[2].render).to.have.been.calledOnce;
        });
        it('should not call GameObject.render if shouldRender is false', () => {
            game.start();
            let gobj = new GameObject('name', { shouldRender: false });
            sinon.stub(gobj, 'render');
            game.addObject(gobj);
            (<any>game).render((<any>game).context);
            expect(gobj.render).not.to.have.been.called;
        });
        it('should invoke push and pop on the camera, if there is one', () => {
            game.start();
            game.camera = new Camera(game);
            sinon.stub(game.camera, 'push');
            sinon.stub(game.camera, 'pop');
            (<any>game).render((<any>game).context);
            expect(game.camera.push).to.have.been.calledOnce.calledBefore(stubs[0]);
            expect(gobjs[0].render).to.have.been.calledOnce;
            expect(gobjs[1].render).to.have.been.calledOnce;
            expect(gobjs[2].render).to.have.been.calledOnce;
            expect(game.camera.pop).to.have.been.calledOnce.calledAfter(stubs[2]);
        });
    });
});

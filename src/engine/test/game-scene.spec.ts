/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GameScene } from '../game-scene';
import { Game } from '../game';
import { Camera } from '../camera';
import { GameObject } from '../game-object';

describe('engine/game-scene', () => {
    let context: CanvasRenderingContext2D;

    let game: Game;
    let scene: GameScene;
    beforeEach(() => {
        context = (new HTMLCanvasElement()).getContext("2d");
        game = new Game();
        game.changeScene(scene = new GameScene());
    });
    afterEach(() => {
        if (game.isRunning) game.stop();
    });

    it('initializes game ref to null', async () => {
        let scene: GameScene = new GameScene();
        expect(scene.game).to.not.be.ok;
    });

    it('allows a reference to the game to be set and obtained correctly', async () => {
        let scene: GameScene = new GameScene();
        scene.game = game;
        expect(scene.game).to.be.eql(game);
    });

    describe('.camera', () => {
        it('should start with a default camera', () => {
            expect(scene.camera).to.be.ok;
            expect(scene.camera).to.be.an.instanceof(Camera);
        });
    });

    describe('.addObject', () => {
        it('should invoke GameObject.addToScene()', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'addToScene');
            scene.addObject(gobj);
            expect(gobj.addToScene).to.have.been.calledOnce;
        });
        it('should invoke GameObject.tick and GameObject.render the next time onTick is called and the resource loader is done', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'tick');
            sinon.stub(gobj, 'render');
            scene.addObject(gobj);
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
            (<any>game).onTick();
            expect(gobj.tick).to.have.been.calledThrice;
            expect(gobj.render).to.have.been.calledOnce;
        });
        it('should invoke GameObject.handleEvent the next time onTick is called, the resource loader is done, and there is an event', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'handleEvent');
            scene.addObject(gobj);
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
        it('should invoke GameObject.removeFromScene()', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'removeFromScene');
            scene.addObject(gobj);
            scene.removeObject(gobj);
            expect(gobj.removeFromScene).to.have.been.calledOnce;
        });
        it('should throw an error if the game object is not in the game', () => {
            let gobj = new GameObject('name');
            expect(() => scene.removeObject(gobj)).to.throw(/not .*added/i);
        });
        it('should not invoke GameObject.tick or GameObject.render when onTick is called', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'tick');
            sinon.stub(gobj, 'render');
            scene.addObject(gobj);
            scene.removeObject(gobj);
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
            (<any>game).onTick();
            expect(gobj.tick).not.to.have.been.called;
            expect(gobj.render).not.to.have.been.called;
        });
        it('should not invoke GameObject.handleEvent when onTick is called and there is an event', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'handleEvent');
            scene.addObject(gobj);
            scene.removeObject(gobj);
            game.start();
            (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
            game.eventQueue.enqueue(<any>{ type: 'fish!' });
            (<any>game).onTick();
            expect(gobj.handleEvent).not.to.have.been.called;
        });
    });
    describe('.findObject', () => {
        let names = ['one', 'two', 'three'];
        let gobjs = names.map(name => new GameObject(name));

        beforeEach(() => {
            gobjs.map(gobj => scene.addObject(gobj));
        });
        afterEach(() => {
            gobjs.map(gobj => scene.removeObject(gobj));
        });

        it('should return null if the specified object is not found in this game', () => {
            expect(scene.findObject(() => false)).to.be.null;
        });
        it('should allow the object name to be passed as an argument', () => {
            expect(scene.findObject('two')).to.eq(gobjs[1]);
        });
        it('should throw an error if a falsey value that is not a string is passed in', () => {
            expect(() => scene.findObject(<any>null)).to.throw(/invalid predicate/i);
        });
        it('should not throw an error if the empty string is passed in', () => {
            expect(() => scene.findObject('')).not.to.throw;
        });
    });
    describe('.findObjects', () => {
        let names = ['one', 'two', 'three'];
        let gobjs = names.map(name => new GameObject(name));

        beforeEach(() => {
            gobjs.map(gobj => scene.addObject(gobj));
        });
        afterEach(() => {
            gobjs.map(gobj => scene.removeObject(gobj));
        });

        it('should return a clone of the objects array if no predicate is passed in', () => {
            expect(scene.findObjects()).to.deep.eq(gobjs);
        });
        it('should not return an array that breaks encapsulation', () => {
            let objs = scene.findObjects();
            objs.length = 0;
            expect(scene.findObjects()).to.deep.eq(gobjs);
        });
        it('should return an empty array if the specified object is not found in this game', () => {
            expect(scene.findObjects(() => false)).to.deep.eq([]);
        });
        it('should throw an error if a value that is not a function is passed in', () => {
            expect(() => scene.findObjects(<any>'fish')).to.throw(/invalid predicate/i);
            expect(() => scene.findObjects(<any>3295)).to.throw(/invalid predicate/i);
            expect(() => scene.findObjects(<any>{})).to.throw(/invalid predicate/i);
        });
        it('should return all game objects for which the predicate returns true', () => {
            expect(scene.findObjects(obj => obj.name.indexOf('o') != -1)).to.deep.eq([gobjs[0], gobjs[1]]);
        });
    });

    describe('.sendEvents', () => {
        let names = ['one', 'two', 'three'];
        let gobjs = names.map(name => new GameObject(name));
        let stubs: sinon.SinonStub[];

        beforeEach(() => {
            stubs = gobjs.map(gobj => {
                scene.addObject(gobj);
                return sinon.stub(gobj, 'handleEvent');
            });
        });
        afterEach(() => {
            gobjs.map(gobj => scene.removeObject(gobj));
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
                scene.addObject(gobj);
                return sinon.stub(gobj, 'tick');
            });
        });
        afterEach(() => {
            gobjs.map(gobj => scene.removeObject(gobj));
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
            scene.camera = new Camera(scene);
            sinon.stub(scene.camera, 'tick');
            (<any>game).tick(45);
            expect(scene.camera.tick).to.have.been.calledOnce.calledWith(45);
        });
    });

    describe('.render', () => {
        let names = ['one', 'two', 'three'];
        let gobjs = names.map(name => new GameObject(name));
        let stubs: sinon.SinonStub[];

        beforeEach(() => {
            stubs = gobjs.map(gobj => {
                scene.addObject(gobj);
                return sinon.stub(gobj, 'render');
            });
        });
        afterEach(() => {
            gobjs.map(gobj => scene.removeObject(gobj));
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
            scene.addObject(gobj);
            (<any>game).render((<any>game).context);
            expect(gobj.render).not.to.have.been.called;
        });
        it('should invoke push and pop on the camera, if there is one', () => {
            game.start();
            scene.camera = new Camera(scene);
            sinon.stub(scene.camera, 'push');
            sinon.stub(scene.camera, 'pop');
            (<any>game).render((<any>game).context);
            expect(scene.camera.push).to.have.been.calledOnce.calledBefore(stubs[0]);
            expect(gobjs[0].render).to.have.been.calledOnce;
            expect(gobjs[1].render).to.have.been.calledOnce;
            expect(gobjs[2].render).to.have.been.calledOnce;
            expect(scene.camera.pop).to.have.been.calledOnce.calledAfter(stubs[2]);
        });
    });
});

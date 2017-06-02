/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Game } from '../game';
import { GameObject } from '../game-object';
import { Camera } from '../camera';
import { delay } from '../utils/delay';
import { GameScene } from '../game-scene';
import { MockEventQueue } from '../../test/mock-event-queue';

describe('Game', () => {
    let game: Game;
    beforeEach(() => {
        game = new Game(30);
        game.changeScene(new GameScene());
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
            document.getElementsByTagName('body')[0].onresize(<any>void (0));
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



    describe('.onTick', () => {
        it(`should throw an error if the game hasn't been started yet`, () => {
            expect(() => (<any>game).onTick()).to.throw(/game is not running/i);
        });

        describe('when the resource loader is not done loading', () => {
            it('should invoke ResourceLoader.render', () => {
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
        });

        describe('when the resource loader is done loading', () => {
            it('should use 0 as the delta if it is the first tick', () => {
                game.start();
                (<any>game).LOGIC_TICKS_PER_RENDER_TICK = 1;
                (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
                sinon.stub(game, 'tick');
                (<any>game).onTick();
                let subject = expect((<any>game).tick).to.have.been;
                subject.calledOnce;
                subject.calledWith(0);
            });
            it('should specify the delta based on the previous tick time if it is not the first tick', async () => {
                (<any>game)._isRunning = true;
                game.scene.camera = null;
                (<any>game).LOGIC_TICKS_PER_RENDER_TICK = 1;
                (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
                (<any>game).context = new HTMLCanvasElement().getContext('2d');
                (<any>game).onTick();
                await delay(50);
                sinon.stub(game, 'tick');
                (<any>game).onTick();
                let subject = expect((<any>game).tick).to.have.been;
                subject.calledOnce;
                subject.calledWith(sinon.match(delta => delta >= .03 && delta <= .07));
            });
            it('should invoke tick three times for every one time it calls render when the resource loader is done loading', () => {
                game.start();
                (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
                sinon.stub(game, 'tick');
                sinon.stub(game, 'render');
                (<any>game).onTick();
                expect((<any>game).tick).to.have.been.calledThrice;
                expect((<any>game).render).to.have.been.calledOnce;
            });
            it('should invoke .sendEvents, .tick, and .render if the resource loader is done loading', () => {
                game.start();
                (<any>game)._resourceLoader = { isDone: true, render: () => void (0) };
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
        it('should tell the current scene about events', () => {
            game.start();
            game.eventQueue.enqueue({ type: 'canvasResize', previousSize: [0, 0], size: [0, 0] });
            sinon.stub(game.scene, "handleEvent");
            (<any>game).sendEvents();
            expect(game.scene.handleEvent).to.be.calledOnce;
        });
    });

    describe('.tick', () => {
        it('should tell the current scene to tick', () => {
            game.start();
            sinon.stub(game.scene, "tick");
            (<any>game).tick(0.2);
            expect(game.scene.tick).to.be.calledOnce;
        });
    });

    describe('.render', () => {
        it('should tell its scene to render', () => {
            game.start();
            sinon.stub(game.scene, "render");
            (<any>game).onTick();
            expect(game.scene.render).to.be.calledOnce;
        });
    });

    describe('.changeScene', () => {
        it('should throw an error if the scene is set more than once per tick', () => {
            game.start();
            game.changeScene(new GameScene());
            expect(() => game.changeScene(new GameScene())).to.throw(/Scene cannot be set more than once per tick/i);
        });

        it('should not throw an error if the scene is set in two consecutive ticks', () => {
            game.start();
            expect(game.changeScene(new GameScene())).not.to.throw;
            (<any>game).tick(0.2);
            expect(game.changeScene(new GameScene())).not.to.throw;
        });

        it('should set the scene\'s game reference to the game when the scene is changed', () => {
            game.start();
            let scene: GameScene = new GameScene();
            expect(game.changeScene(scene)).not.to.throw;
            (<any>game).tick(0.2);
            expect(scene.game).to.eql(game);
        });

        it('should throw an error if trying to pass an invalid scene', () => {
            game.start();
            expect(() => game.changeScene(null)).to.throw(/Bad Scene/i);
        });

        it('should initialize the scene on swap', () => {
            game.start();
            let scene: GameScene = new GameScene();
            game.changeScene(scene);
            sinon.stub(scene, "start");
            (<any>game).tick(0.2);
            expect(scene.start).to.be.calledOnce;
        });
    });
});
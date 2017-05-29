/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { LightingObject } from '../lighting-object';
import { Game, GameScene, Camera } from '../engine';
import { stubDocument, stubImage } from '../engine/test';
import { MockAgileGame } from './mock-agile-game';

let matchCloseTo = val => sinon.match(v => v >= val - .00001 && v <= val + .00001);

describe('LightingObject', () => {
    stubDocument();
    stubImage();

    describe('.renderImpl', () => {
        let context: CanvasRenderingContext2D;
        let game: Game;
        let scene: GameScene;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext("2d");
            game = <any>new MockAgileGame();
            scene = <any>{
                world: { gameTime: 8 / 24 },
                findObjects: () => []
            };
            game.changeScene(scene);
        });

        it('should not call createCompositeImage or context.drawImage if darkness is 0', () => {
            let light = new LightingObject(1, false);
            light.addToScene(scene);
            sinon.stub(light, 'createCompositeImage');
            sinon.stub(context, 'drawImage');
            (<any>light).renderImpl(context);
            expect((<any>light).createCompositeImage).not.to.have.been.called;
            expect(context.drawImage).not.to.have.been.called;
        });
        it('should call createCompositeImage and context.drawImage if darkness is not 0', () => {
            let light = new LightingObject(.5, false);
            light.addToScene(scene);
            sinon.stub(light, 'createCompositeImage');
            sinon.stub(context, 'drawImage');
            (<any>light).renderImpl(context);
            expect((<any>light).createCompositeImage).to.have.been.calledOnce;
            expect(context.drawImage).to.have.been.calledOnce;
        });
        it('should save and restore the context when drawing the light on the main canvas', () => {
            let light = new LightingObject(.5, false);
            light.addToScene(scene);
            sinon.stub(context, 'save');
            sinon.stub(context, 'restore');
            (<any>light).renderImpl(context);
            expect(context.save).to.have.been.calledOnce;
            expect(context.restore).to.have.been.calledOnce.calledAfter(<any>context.save);
        });
        it('should restore the context even if drawing the light on the main canvas throws an Error', () => {
            let light = new LightingObject(.5, false);
            light.addToScene(scene);
            sinon.stub(context, 'save');
            sinon.stub(context, 'restore');
            sinon.stub(context, 'drawImage').throws(new Error('FISH!'));
            expect(() => (<any>light).renderImpl(context)).to.throw(/FISH!/i);
            expect(context.save).to.have.been.calledOnce;
            expect(context.restore).to.have.been.calledOnce.calledAfter(<any>context.save);
        });

        describe('when dayNightCycle == false', () => {
            it('should call createCompositeImage with (1 - ambient) regardless of time if dayNightCycle = false', () => {
                let light = new LightingObject(.75, false);
                light.addToScene(scene);
                let stub = sinon.stub(light, 'createCompositeImage');
                for (let q = 0; q < 1; q += .25 / 24) {
                    (<any>scene).world.gameTime = q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(matchCloseTo(.25));
                    stub.reset();

                    (<any>scene).world.gameTime = 185 + q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(matchCloseTo(.25));
                    stub.reset();
                }
            });
        });

        describe('when dayNightCycle == true', () => {
            let light: LightingObject;
            beforeEach(() => {
                light = new LightingObject();
                light.addToScene(scene);
            });

            it('should throw an error if world is not defined on the scene', () => {
                delete (<any>scene).world;
                expect(() => (<any>light).renderImpl(context)).to.throw(/no world/i);
            });
            it('should call createCompositeImage with (1 - ambient) if it is day', () => {
                (<any>light).ambient = .75;
                let stub = sinon.stub(light, 'createCompositeImage');
                for (let q = 7 / 24; q < 19 / 24; q += .25 / 24) {
                    (<any>scene).world.gameTime = q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(matchCloseTo(.25));
                    stub.reset();

                    (<any>scene).world.gameTime = 25 + q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(matchCloseTo(.25));
                    stub.reset();
                }
            });
            it('should call createCompositeImage with .95 if it is night', () => {
                let stub = sinon.stub(light, 'createCompositeImage');
                for (let q = 0; q < 1; q += .25 / 24) {
                    if (q >= 5.5 / 24 && q <= 20.5 / 24) continue;

                    (<any>scene).world.gameTime = q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(matchCloseTo(.95));
                    stub.reset();

                    (<any>scene).world.gameTime = 25 + q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(matchCloseTo(.95));
                    stub.reset();
                }
            });
            it('should gradually fade from darkness = (ambient - 1) to .95 as the evening turns to night', () => {
                let stub = sinon.stub(light, 'createCompositeImage');
                (<any>light).ambient = .75;
                let lastValue = 0;
                for (let q = 18.5 / 24; q < 21 / 24; q += .25 / 24) {
                    (<any>scene).world.gameTime = q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(sinon.match(val => {
                        if (val < lastValue) return false;
                        lastValue = val;
                        return true;
                    }));
                    stub.reset();
                }
                lastValue = 0;
                for (let q = 18.5 / 24; q < 21 / 24; q += .25 / 24) {
                    (<any>scene).world.gameTime = q + 3;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(sinon.match(val => {
                        if (val < lastValue) return false;
                        lastValue = val;
                        return true;
                    }));
                    stub.reset();
                }
            });
            it('should gradually fade from darkness = .95 to (ambient - 1) as the night turns to morning', () => {
                let stub = sinon.stub(light, 'createCompositeImage');
                (<any>light).ambient = .75;
                let lastValue = 1;
                for (let q = 5 / 24; q < 7.5 / 24; q += .25 / 24) {
                    (<any>scene).world.gameTime = q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(sinon.match(val => {
                        if (val > lastValue) return false;
                        lastValue = val;
                        return true;
                    }));
                    stub.reset();
                }
                lastValue = 1;
                for (let q = 5 / 24; q < 7.5 / 24; q += .25 / 24) {
                    (<any>scene).world.gameTime = q + 3;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(sinon.match(val => {
                        if (val > lastValue) return false;
                        lastValue = val;
                        return true;
                    }));
                    stub.reset();
                }
            });
            it('should never call createCompositeImage with less than (1 - ambient) darkness', () => {
                let stub = sinon.stub(light, 'createCompositeImage');
                (<any>light).ambient = .75;
                for (let q = 0; q < 3; q += .25 / 24) {
                    (<any>scene).world.gameTime = q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(sinon.match(val => val >= .25));
                    stub.reset();
                }
            });
            it('should never call createCompositeImage with more than .95 darkness', () => {
                let stub = sinon.stub(light, 'createCompositeImage');
                (<any>light).ambient = .75;
                for (let q = 0; q < 3; q += .25 / 24) {
                    (<any>scene).world.gameTime = q;
                    (<any>light).renderImpl(context);
                    expect((<any>light).createCompositeImage).to.have.been.calledOnce.calledWith(sinon.match(val => val <= .95));
                    stub.reset();
                }
            });
        });
    });

    describe('createCompositeImage', () => {
        let context: CanvasRenderingContext2D;
        let compositeContext: CanvasRenderingContext2D;
        let game: Game;
        let scene: GameScene;
        let light: LightingObject;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext("2d");
            game = <any>new MockAgileGame();
            scene = <any>{
                world: { gameTime: 8 / 24 },
                findObjects: () => []
            };
            game.changeScene(scene);
            light = new LightingObject(.4, false);
            light.addToScene(scene);
            compositeContext = (<any>light).compositeContext;
        });

        it('should not invoke fillRect on the main graphics context', () => {
            sinon.stub(context, 'fillRect');
            (<any>light).renderImpl(context);
            expect(context.fillRect).not.to.have.been.called;
        });
        it('should invoke fillRect to fill the canvas with the initial darkness', () => {
            sinon.stub(compositeContext, 'fillRect');
            (<any>light).createCompositeImage(.6);
            expect(compositeContext.fillRect).to.have.been.calledOnce;
        });
        it('should push and pop the camera before and after rendering lights', () => {
            let camera: Camera = <any>{ push: () => void(0), pop: () => void(0) };
            sinon.stub(camera, 'push');
            sinon.stub(camera, 'pop');
            scene.camera = camera;
            (<any>light).createCompositeImage(.6);
            expect(camera.push).to.have.been.calledOnce;
            expect(camera.pop).to.have.been.calledOnce.calledAfter(<any>camera.push);
        });
        it('should pop the camera even if rendering lights throws an exception', () => {
            let camera: Camera = <any>{ push: () => void (0), pop: () => void (0) };
            sinon.stub(camera, 'push');
            sinon.stub(camera, 'pop');
            sinon.stub(scene, 'findObjects').throws(new Error('FISH expected exception'));
            scene.camera = camera;
            expect(() => (<any>light).createCompositeImage(.6)).to.throw(/fish expected exception/i);
            expect(camera.push).to.have.been.calledOnce;
            expect(camera.pop).to.have.been.calledOnce.calledAfter(<any>camera.push);
        });
        it('should invoke renderLight on any GameObject in the scene that has that method', () => {
            let testObj = { renderLight: () => void (0) };
            sinon.stub(scene, 'findObjects').returns([testObj, testObj, testObj]);
            sinon.stub(testObj, 'renderLight');
            (<any>light).createCompositeImage(.6);
            expect(testObj.renderLight).to.have.been.calledThrice;
        });
        it('should not attempt to invoke renderLight on any GameObject in the scene that does not have that method', () => {
            let testObj = { renderLight: () => void (0) };
            sinon.stub(scene, 'findObjects').returns([{}, testObj, {}, testObj]);
            sinon.stub(testObj, 'renderLight');
            (<any>light).createCompositeImage(.6);
            expect(testObj.renderLight).to.have.been.calledTwice;
        });
        it('should not pass the main canvas context to renderLight', () => {
            let testObj = { renderLight: () => void (0) };
            sinon.stub(scene, 'findObjects').returns([testObj]);
            sinon.stub(testObj, 'renderLight');
            (<any>light).createCompositeImage(.6);
            expect(testObj.renderLight).to.have.been.calledOnce.calledWith(compositeContext);
            expect(testObj.renderLight).not.to.have.been.calledWith(context);
        });
    });
});

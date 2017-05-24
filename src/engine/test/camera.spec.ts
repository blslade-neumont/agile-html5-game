/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Camera } from '../camera';
import { Game } from '../game';
import { stubDocument } from './mock-document';
import { stubImage } from './mock-image';

describe('Camera', () => {
    stubDocument();
    stubImage();

    let game: Game;
    let camera: Camera;
    beforeEach(() => {
        game = <any>{ canvasSize: [100, 100] };
        camera = new Camera(game);
    });

    it('should start with no clear color', () => {
        expect(camera.clearColor).to.be.null;
    });

    describe('.constructor', () => {
        it('should throw an error if game is falsey', () => {
            expect(() => new Camera(<any>null)).to.throw(/pass in a valid Game/i);
        });
        it('should populate the game property', () => {
            expect(camera.game).to.be.ok;
            expect(camera.game).to.eq(game);
        });
    });

    describe('.center', () => {
        it('should start as [0, 0]', () => {
            expect(camera.center).to.deep.eq([0, 0]);
        });
        it('should return an array that does not change the center when changed', () => {
            let center = camera.center;
            center[0] = NaN;
            expect(camera.center[0]).not.to.be.NaN;
        });
    });
    describe('.center=', () => {
        it('should copy the values to prevent further changes to the object modifying the center', () => {
            let newCenter: [number, number] = [25, 92];
            camera.center = newCenter;
            newCenter[0] = NaN;
            expect(camera.center).to.deep.eq([25, 92]);
        });
    });

    describe('.zoomScale', () => {
        it('should start at 1', () => {
            expect(camera.zoomScale).to.be.closeTo(1, .00001);
        });
    });
    describe('.zoomScale=', () => {
        it('should throw an error if a negative value is passed in', () => {
            expect(() => camera.zoomScale = -25).to.throw(/must be positive/i);
        });
        it('should throw an error if zero is passed in', () => {
            expect(() => camera.zoomScale = 0).to.throw(/must be positive/i);
        });
        it('should update the zoom scale if a valid value is passed in', () => {
            camera.zoomScale = .5;
            expect(camera.zoomScale).to.be.closeTo(.5, .00001);
        });
    });

    describe('.enableSmoothing', () => {
        it('should be enabled by default', () => {
            expect(camera.enableSmoothing).to.be.true;
        });
    });
    
    describe('.bounds', () => {
        it('should be centered around the center position', () => {
            camera.center = [10, -10];
            let bounds = camera.bounds;
            expect((bounds.right + bounds.left) / 2).to.be.closeTo(camera.center[0], .00001);
            expect((bounds.top + bounds.bottom) / 2).to.be.closeTo(camera.center[1], .00001);
        });
        it('should have the same ratio as the canvas', () => {
            camera.center = [10, -10];
            game.canvasSize = [295, 332];
            let canvasRatio = game.canvasSize[0] / game.canvasSize[1];
            let bounds = camera.bounds;
            let [width, height] = [bounds.right - bounds.left, bounds.top - bounds.bottom];
            let cameraRatio = width / height;
            expect(cameraRatio).to.be.closeTo(canvasRatio, .00001);
        });
        it('should be the size of the canvas if zoomScale is 1', () => {
            camera.center = [10, -10];
            let bounds = camera.bounds;
            expect(bounds.right - bounds.left).to.be.closeTo(game.canvasSize[0], .00001);
            expect(bounds.top - bounds.bottom).to.be.closeTo(game.canvasSize[1], .00001);
        });
        it('should be half the size of the canvas if zoomScale is 2', () => {
            camera.center = [10, -10];
            camera.zoomScale = 2;
            let bounds = camera.bounds;
            expect(bounds.right - bounds.left).to.be.closeTo(game.canvasSize[0] * .5, .00001);
            expect(bounds.top - bounds.bottom).to.be.closeTo(game.canvasSize[1] * .5, .00001);
        });
        it('should be twice the size of the canvas if zoomScale is .5', () => {
            camera.center = [10, -10];
            camera.zoomScale = .5;
            let bounds = camera.bounds;
            expect(bounds.right - bounds.left).to.be.closeTo(game.canvasSize[0] * 2, .00001);
            expect(bounds.top - bounds.bottom).to.be.closeTo(game.canvasSize[1] * 2, .00001);
        });
    });

    describe('.tick', () => {
        it('should not throw an error', () => {
            expect(() => camera.tick(.02)).not.to.throw;
        });
    });

    describe('.push', () => {
        let context: CanvasRenderingContext2D;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
        });

        it('should invoke context.save', () => {
            sinon.stub(context, 'save');
            camera.push(context);
            expect(context.save).to.have.been.calledOnce;
        });
        it('should not attempt to fill the screen if no clear color is specified', () => {
            sinon.stub(context, 'fillRect');
            camera.push(context);
            expect(context.fillRect).not.to.have.been.called;
        });
        it('should fill the screen with the clear color if it is specified', () => {
            sinon.stub(context, 'fillRect');
            camera.clearColor = 'green';
            camera.push(context);
            expect(context.fillRect).to.have.been.calledOnce;
            expect(context.fillStyle).to.eq('green');
        });
        it('should translate further draw calls by the camera center position', () => {
            game.canvasSize = [0, 0];
            camera.center = [52, 199];
            sinon.stub(context, 'translate');
            camera.push(context);
            expect(context.translate).to.have.been.calledWith(-52, -199);
        });
        it('should translate further draw calls by one half of the canvas size', () => {
            game.canvasSize = [800, 600];
            sinon.stub(context, 'translate');
            camera.push(context);
            expect(context.translate).to.have.been.calledWith(400, 300);
        });
        it('should scale further draw calls by the zoom scale', () => {
            camera.zoomScale = .25;
            sinon.stub(context, 'scale');
            camera.push(context);
            expect(context.scale).to.have.been.calledWith(.25, .25);
        });
        it('should disable image smoothing if the camera has it disabled', () => {
            camera.enableSmoothing = false;
            sinon.stub(context, 'scale');
            camera.push(context);
            expect(context.imageSmoothingEnabled).to.be.false;
        });
    });

    describe('.pop', () => {
        let context: CanvasRenderingContext2D;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
        });

        it('should invoke context.restore', () => {
            sinon.stub(context, 'restore');
            camera.pop(context);
            expect(context.restore).to.have.been.calledOnce;
        });
    });
});

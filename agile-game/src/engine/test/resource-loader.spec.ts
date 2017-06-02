/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader } from '../resource-loader';

declare let global: any;

describe('ResourceLoader', () => {
    let loader: ResourceLoader;
    beforeEach(() => {
        loader = new ResourceLoader();
    });

    describe('.isDone', () => {
        it('should be true if no resources have been requested', () => {
            expect(loader.isDone).to.be.true;
        });
        it('should be false if an image has started loading but not yet completed', () => {
            loader.loadImage("I_like_chocolate.milk");
            expect(loader.isDone).to.be.false;
        });
        it('should be true if an image was requested but has since finished loading', () => {
            let img = loader.loadImage("I_like_chocolate.milk");
            img.onload(<any>void(0));
            expect(loader.isDone).to.be.true;
        });
        it('should be false if two images were requested but only one has finished loading', () => {
            let img1 = loader.loadImage("I_like_chocolate.milk");
            loader.loadImage("I_like.trains");
            img1.onload(<any>void(0));
            expect(loader.isDone).to.be.false;
        });
        it('should be false if a requested image returned an error', () => {
            let img = loader.loadImage("I_like_chocolate.milk");
            img.onerror(<any>void(0));
            expect(loader.isDone).to.be.false;
        });
    });

    let resourceTypes: [string, string, string, () => any][] = [
        ['loadImage', 'image', 'an HTMLImageElement', () => global.HTMLImageElement],
        ['loadAudio', 'audio', 'an HTMLAudioElement', () => global.HTMLAudioElement]
    ];
    resourceTypes.forEach(([methodName, resourceName, returnTypeName, returnType]) => {
        describe(`.${methodName}`, () => {
            it(`should increase the total number of ${resourceName} if the requested url was never requested before`, () => {
                let total = loader.totalResources;
                loader[methodName]("I_like_chocolate.milk");
                expect(loader.totalResources).to.eq(total + 1);
            });
            it(`should not reload a ${resourceName} if it was already requested`, () => {
                loader[methodName]("I_like_chocolate.milk");
                let total = loader.totalResources;
                loader[methodName]("I_like_chocolate.milk");
                expect(loader.totalResources).to.eq(total);
            });
            it(`should return ${returnTypeName}`, () => {
                let result = loader[methodName]("I_like_chocolate.milk");
                let type = returnType();
                expect(result).to.be.an.instanceOf(type);
            });
            it(`should invoke console.log if DEBUG_RESOURCES is true and the ${resourceName} has not been loaded before`, () => {
                let stub: sinon.SinonStub;
                try {
                    stub = sinon.stub(console, 'log');
                    (<any>loader).DEBUG_RESOURCES = true;
                    loader[methodName]('I_like_chocolate.milk');
                    expect(console.log).to.have.been.calledWith(sinon.match(new RegExp(`loading ${resourceName}`, 'i')));
                } finally { if (stub) stub.restore(); }
            });
            it(`should not invoke console.log if DEBUG_RESOURCES is true but the ${resourceName} has been loaded before`, () => {
                let stub: sinon.SinonStub;
                try {
                    stub = sinon.stub(console, 'log');
                    loader[methodName]('I_like_chocolate.milk');
                    (<any>loader).DEBUG_RESOURCES = true;
                    loader[methodName]('I_like_chocolate.milk');
                    expect(console.log).not.to.have.been.called;
                } finally { if (stub) stub.restore(); }
            });
        });
    });
    
    describe('.render', () => {
        let any = sinon.match.any;

        let context: CanvasRenderingContext2D;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
        });

        it('should not throw an error', () => {
            expect(() => loader.render(context)).not.to.throw;
        });
        it('should fill the canvas with a solid color', () => {
            sinon.stub(context, 'fillRect');
            loader.render(context);
            let subject = expect(context.fillRect).to.have.been;
            subject.calledOnce;
            subject.calledWith(0, 0, context.canvas.scrollWidth, context.canvas.scrollHeight);
        });
        it('should render a progress bar if totalResources > 0', () => {
            loader.loadImage('I_like_chocolate.milk');
            sinon.stub(context, 'fillRect');
            loader.render(context);
            let subject = expect(context.fillRect).to.have.been;
            subject.calledThrice;
            subject.calledWith(0, 0, context.canvas.scrollWidth, context.canvas.scrollHeight);
            subject.calledWith(any, any, 0, any);
            subject.calledWith(any, any, sinon.match(v => typeof v === 'number' && v > 0), any);
        });
        it('should render the loaded and total resources as text', () => {
            sinon.stub(context, 'fillText');
            loader.render(context);
            let subject = expect(context.fillText).to.have.been;
            subject.calledOnce;
            subject.calledWith('0/0');
        });
        it('should render the loaded and total resources as text even if not all resources are loaded', () => {
            loader.loadImage('I_like_chocolate.milk');
            sinon.stub(context, 'fillText');
            loader.render(context);
            let subject = expect(context.fillText).to.have.been;
            subject.calledOnce;
            subject.calledWith('0/1');
        });
        it('should render any errors that occur as text', () => {
            sinon.stub(context, 'fillText');
            (<any>loader)._errors.push('FISH and CHIPS');
            loader.render(context);
            let subject = expect(context.fillText).to.have.been.calledWith(sinon.match(/FISH and CHIPS/));
        });
    });
});

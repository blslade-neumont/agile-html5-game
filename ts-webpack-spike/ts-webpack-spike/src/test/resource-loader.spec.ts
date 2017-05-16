/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { ResourceLoader } from '../resource-loader';

class MockImage {
    constructor(readonly width?: number, readonly height?: number) { }
}
declare let global: any;

describe('ResourceLoader', () => {
    let previousImage: any;
    beforeEach(() => {
        previousImage = global.Image;
        global.Image = MockImage;
    });
    afterEach(() => {
        delete global.Image;
        if (typeof previousImage !== 'undefined') global.Image = previousImage;
    });

    describe('.constructor', () => {
        it('should preload item and tile resources if preload = true', () => {
            let loader = new ResourceLoader(true);
            expect(loader.totalResources).to.be.greaterThan(0);
        });
        it('should not preload any resources if preload = false', () => {
            let loader = new ResourceLoader(false);
            expect(loader.totalResources).to.eq(0);
        });
    });

    describe('.isDone', () => {
        it('should be true if no resources have been requested', () => {
            let loader = new ResourceLoader(false);
            expect(loader.isDone).to.be.true;
        });
        it('should be false if an image has started loading but not yet completed', () => {
            let loader = new ResourceLoader(false);
            loader.loadImage("I_like_chocolate.milk");
            expect(loader.isDone).to.be.false;
        });
        it('should be true if an image was requested but has since finished loading', () => {
            let loader = new ResourceLoader(false);
            let img = loader.loadImage("I_like_chocolate.milk");
            img.onload(<any>void(0));
            expect(loader.isDone).to.be.true;
        });
        it('should be false if two images were requested but only one has finished loading', () => {
            let loader = new ResourceLoader(false);
            let img1 = loader.loadImage("I_like_chocolate.milk");
            loader.loadImage("I_like.trains");
            img1.onload(<any>void(0));
            expect(loader.isDone).to.be.false;
        });
        it('should be false if a requested image returned an error', () => {
            let loader = new ResourceLoader(false);
            let img = loader.loadImage("I_like_chocolate.milk");
            img.onerror(<any>void(0));
            expect(loader.isDone).to.be.false;
        });
    });

    describe('.loadImage', () => {
        it('should increase the total number of resources if the requested url was never requested before', () => {
            let loader = new ResourceLoader(false);
            let total = loader.totalResources;
            loader.loadImage("I_like_chocolate.milk");
            expect(loader.totalResources).to.eq(total + 1);
        });
        it('should not reload a resource if it was already requested', () => {
            let loader = new ResourceLoader(false);
            loader.loadImage("I_like_chocolate.milk");
            let total = loader.totalResources;
            loader.loadImage("I_like_chocolate.milk");
            expect(loader.totalResources).to.eq(total);
        });
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { isSingleTileSprite, isAnimationSprite, SimpleSpriteT, SingleTileSpriteT, AnimationSpriteT } from '../sprite';

let simple: SimpleSpriteT = { src: 'simple' };
let singleTile: SingleTileSpriteT = {
    src: 'simple',
    tileset: { width: 32, height: 32, tilex: 3, tiley: 2 }
};
let animation: AnimationSpriteT = {
    src: 'simple',
    tileset: { width: 32, height: 32 },
    frames: [
        { tilex: 0, tiley: 0 },
        { tilex: 1, tiley: 0 },
        { tilex: 2, tiley: 0 },
        { tilex: 3, tiley: 0 }
    ]
};

describe('utils/isSingleTileSprite', () => {
    it('should return false for a simple sprite', () => {
        expect(isSingleTileSprite(simple)).to.be.false;
    });
    it('should return true for a single tile sprite', () => {
        expect(isSingleTileSprite(singleTile)).to.be.true;
    });
    it('should return false for an animation sprite', () => {
        expect(isSingleTileSprite(animation)).to.be.false;
    });
});

describe('utils/isAnimationSprite', () => {
    it('should return false for a simple sprite', () => {
        expect(isAnimationSprite(simple)).to.be.false;
    });
    it('should return false for a single tile sprite', () => {
        expect(isAnimationSprite(singleTile)).to.be.false;
    });
    it('should return true for an animation sprite', () => {
        expect(isAnimationSprite(animation)).to.be.true;
    });
});

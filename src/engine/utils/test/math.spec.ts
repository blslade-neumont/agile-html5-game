/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { degToRad, radToDeg, clamp, fmod, pointDirection } from '../math';

describe('utils/degToRad', () => {
    it('should convert 0 to 0', () => {
        expect(degToRad(0)).to.eql(0);
    });
    it('should convert 180 to 3.14159', () => {
        expect(degToRad(180)).to.eql(Math.PI);
    });
});

describe('utils/radToDeg', () => {
    it('should convert 0 to 0', () => {
        expect(radToDeg(0)).to.eql(0);
    });
    it('should convert 3.14159 to 180', () => {
        expect(radToDeg(Math.PI)).to.eql(180);
    });
});

describe('utils/clamp', () => {
    it('should constrain a value lower than the lower bound to the lower bound', () => {
        expect(clamp(0, 1, 2)).to.be.closeTo(1, .00001);
    });
    it('should constrain a value higher than the upper bound to the upper bound', () => {
        expect(clamp(3, 1, 2)).to.be.closeTo(2, .00001);
    });
    it('should return a number', () => {
        expect(clamp(2, 2, 5)).to.be.a('number');
    });
    it('should throw an error if the lower bound is greater than the upper bound', () => {
        expect(() => clamp(2, 5, 2)).to.throw(/lower bound greater/i);
    });
});

describe('utils/fmod', () => {
    it('should return a number', () => {
        expect(fmod(25, 2)).to.be.a('number');
    });
    it('should not treat negative numbers as a special case', () => {
        expect(fmod(-2, 10)).to.be.closeTo(8, .00001);
    });
    it('should compute the floating-point modulus of the first number base the second number', () => {
        expect(fmod(5, 10)).to.be.closeTo(5, .00001);
        expect(fmod(15, 10)).to.be.closeTo(5, .00001);
        expect(fmod(-5, 10)).to.be.closeTo(5, .00001);
        expect(fmod(97, 10)).to.be.closeTo(7, .00001);
    });
});

describe('utils/pointDirection', () => {
    it('should return 0 when facing east', () => {
        expect(pointDirection(0, 0, 1, 0)).to.eql(0);
    });
    it('should return 45 when facing northeast', () => {
        expect(pointDirection(0, 0, 1, -1)).to.eql(45);
    });
    it('should return 90 when facing north', () => {
        expect(pointDirection(0, 0, 0, -1)).to.eql(90);
    });
    it('should return 135 when facing northwest', () => {
        expect(pointDirection(0, 0, -1, -1)).to.eql(135);
    });
    it('should return 180 when facing west', () => {
        expect(pointDirection(0, 0, -1, 0)).to.eql(180);
    });
    it('should return 225 when facing southwest', () => {
        expect(pointDirection(0, 0, -1, 1)).to.eql(225);
    });
    it('should return 270 when facing south', () => {
        expect(pointDirection(0, 0, 0, 1)).to.eql(270);
    });
    it('should return 315 when facing southeast', () => {
        expect(pointDirection(0, 0, 1, 1)).to.eql(315);
    });
    it('should return the same direction regardless of magnitude', () => {
        let dx = Math.random() - .5;
        let dy = Math.random() - .5;
        let dir = pointDirection(0, 0, dx, dy);
        expect(pointDirection(0, 0, dx * 5, dy * 5)).to.be.closeTo(dir, .00001);
    });
});

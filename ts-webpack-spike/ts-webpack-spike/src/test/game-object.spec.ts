/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GameObject } from '../game-object';
import { Game } from '../game';

describe('GameObject', () => {
    it('should start without a resourceLoader or a game', () => {
        let gobj = new GameObject('name');
        expect(gobj.game).not.to.be.ok;
        expect(gobj.resources).not.to.be.ok;
    });

    describe('.constructor', () => {
        it('should set the object defaults based on the options passed in', () => {
            let options = { x: 45, y: 12, direction: 195, speed: 4.5 };
            let gobj = new GameObject('my-name', options);
            expect(gobj.name).to.eq('my-name');
            expect(gobj.x).to.eq(options.x);
            expect(gobj.y).to.eq(options.y);
            expect(gobj.direction).to.eq(options.direction);
            expect(gobj.speed).to.eq(options.speed);
        });
    });

    describe('.direction', () => {
        it('should modify hspeed and vspeed when it changes', () => {
            let gobj = new GameObject('name', { hspeed: -4, vspeed: 0 });
            expect(gobj.direction).to.be.closeTo(180, .00001);
            gobj.direction = 90;
            expect(gobj.hspeed).to.be.closeTo(0, .00001);
            expect(gobj.vspeed).to.be.closeTo(4, .00001);
        });
        it('should not change if speed is set to 0', () => {
            let gobj = new GameObject('name', { hspeed: -4, vspeed: 0 });
            expect(gobj.direction).to.eq(180);
            gobj.speed = 0;
            expect(gobj.hspeed).to.be.closeTo(0, .00001);
            expect(gobj.vspeed).to.be.closeTo(0, .00001);
            expect(gobj.direction).to.be.closeTo(180, .00001);
        });
        it('should normalize the value when it is less than 0 or greater than 360', () => {
            let gobj = new GameObject('name');
            gobj.direction = -20;
            expect(gobj.direction).to.be.closeTo(340, .00001);
            gobj.direction += 40;
            expect(gobj.direction).to.be.closeTo(20, .00001);
            gobj.direction = 42 + (360 * 25);
            expect(gobj.direction).to.be.closeTo(42, .00001);
        });
    });
    describe('.speed', () => {
        it('should modify hspeed and vspeed when it changes', () => {
            let gobj = new GameObject('name', { hspeed: -4, vspeed: 0 });
            expect(gobj.direction).to.be.closeTo(180, .00001);
            gobj.speed = 2;
            expect(gobj.hspeed).to.be.closeTo(-2, .00001);
            expect(gobj.vspeed).to.be.closeTo(0, .00001);
        });
        it('should throw an error if you try to set a negative speed', () => {
            let gobj = new GameObject('name');
            expect(() => gobj.speed = -2).to.throw(/invalid speed/i);
        });
    });
    describe('.hspeed', () => {
        it('should modify speed and direction when it changes', () => {
            let gobj = new GameObject('name', { speed: 4, direction: 0 });
            expect(gobj.hspeed).to.be.closeTo(4, .00001);
            expect(gobj.vspeed).to.be.closeTo(0, .00001);
            gobj.hspeed = -2;
            expect(gobj.direction).to.be.closeTo(180, .00001);
            expect(gobj.speed).to.be.closeTo(2, .00001);
        });
    });
    describe('.vspeed', () => {
        it('should modify speed and direction when it changes', () => {
            let gobj = new GameObject('name', { speed: 4, direction: 90 });
            expect(gobj.hspeed).to.be.closeTo(0, .00001);
            expect(gobj.vspeed).to.be.closeTo(4, .00001);
            gobj.vspeed = -2;
            expect(gobj.direction).to.be.closeTo(270, .00001);
            expect(gobj.speed).to.be.closeTo(2, .00001);
        });
    });

    describe('.addToGame', () => {
        let testGame: Game = <any>{ resourceLoader: 'fake resource loader!' };
        it(`should populate the 'game' and 'resources' helper properties`, () => {
            let gobj = new GameObject('test');
            gobj.addToGame(testGame);
            expect(gobj.game).to.deep.eq(testGame);
            expect(gobj.resources).to.deep.eq(testGame.resourceLoader);
        });
    });

    describe('.removeFromGame', () => {
        let testGame: Game = <any>{ resourceLoader: 'fake resource loader!' };
        it(`should populate the 'game' and 'resources' helper properties`, () => {
            let gobj = new GameObject('test');
            gobj.addToGame(testGame);
            gobj.removeFromGame();
            expect(gobj.game).not.to.be.ok;
            expect(gobj.resources).not.to.be.ok;
        });
    });

    describe('.tick', () => {
        it('should not modify the position of the game object if speed == 0', () => {
            let gobj = new GameObject('name', { x: 0, y: 0, hspeed: 0, vspeed: 0 });
            gobj.tick(1);
            expect(gobj.x).to.eq(0);
            expect(gobj.y).to.eq(0);
        });
        it('should translate the game object by (hspeed, vspeed) * delta', () => {
            let gobj = new GameObject('name', { x: 0, y: 0, hspeed: 13, vspeed: -29 });
            gobj.tick(.5);
            expect(gobj.x).to.eq(gobj.hspeed * .5);
            expect(gobj.y).to.eq(gobj.vspeed * .5);
        });
    });
});

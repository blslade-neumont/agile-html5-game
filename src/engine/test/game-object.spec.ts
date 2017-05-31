/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GameObject } from '../game-object';
import { Game } from '../game';
import * as renderUtils from '../utils/render';
import { GameScene } from '../game-scene';
import { Rect } from '../utils/rect';

describe('GameObject', () => {
    it('should start without a resourceLoader, eventQueue, or game', () => {
        let gobj = new GameObject('name');
        expect(gobj.game).not.to.be.ok;
        expect(gobj.resources).not.to.be.ok;
        expect(gobj.events).not.to.be.ok;
    });

    describe('.constructor', () => {
        it('should set the game object name', () => {
            let gobj = new GameObject('my-name');
            expect(gobj.name).to.eq('my-name');
        });
        it('should set shouldTick, x, y, direction, and speed based on the options passed in', () => {
            let options = { shouldTick: false, x: 45, y: 12, collisionBounds: new Rect(-2, 3.14159, -3, 4) };
            let gobj = new GameObject('my-name', options);
            expect(gobj.shouldTick).to.eq(options.shouldTick);
            expect(gobj.x).to.eq(options.x);
            expect(gobj.y).to.eq(options.y);
            expect(gobj.collisionBounds).to.eq(options.collisionBounds);
        });
        it('should set direction and speed based on the options passed in', () => {
            let options = { direction: 195, speed: 4.5 };
            let gobj = new GameObject('my-name', options);
            expect(gobj.direction).to.eq(options.direction);
            expect(gobj.speed).to.eq(options.speed);
        });
        it('should set hspeed and vspeed based on the options passed in', () => {
            let options = { x: 45, y: 12, hspeed: 6, vspeed: 4 };
            let gobj = new GameObject('my-name', options);
            expect(gobj.hspeed).to.eq(options.hspeed);
            expect(gobj.vspeed).to.eq(options.vspeed);
        });
        it('should set shouldRender, sprite, animationAge, animationSpeed, and imageAngle based on the options passed in', () => {
            let options = <any>{ shouldRender: 'aaa', sprite: 'bbb', animationAge: 'ccc', animationSpeed: 'ddd', imageAngle: 'eee' };
            let gobj = new GameObject('my-name', options);
            expect(gobj.shouldRender).to.eq(options.shouldRender);
            expect(gobj.sprite).to.eq(options.sprite);
            expect(gobj.animationAge).to.eq(options.animationAge);
            expect(gobj.animationSpeed).to.eq(options.animationSpeed);
            expect(gobj.imageAngle).to.eq(options.imageAngle);
        });
    });

    describe('.shouldTick', () => {
        it('should default to true', () => {
            let gobj = new GameObject('name');
            expect(gobj.shouldTick).to.be.true;
        });
    });

    describe('.shouldRender', () => {
        it('should default to true', () => {
            let gobj = new GameObject('name');
            expect(gobj.shouldRender).to.be.true;
        });
    });

    describe('.collisionBounds', () => {
        it('should result in the zero rect if the object has no sprite', () => {
            let gobj = new GameObject('name');
            let bounds = gobj.collisionBounds;
            expect(bounds).to.be.ok;
            expect(bounds.left).to.eq(0);
            expect(bounds.bottom).to.eq(0);
            expect(bounds.width).to.eq(0);
            expect(bounds.height).to.eq(0);
        });
        it('should calculate the collision bounds based on the sprite size if it has one', () => {
            let gobj = new GameObject('name', {
                sprite: {
                    src: 'chocolate.milk',
                    tileset: { width: 32, height: 66.2, tilex: 0, tiley: 0 }
                }
            });
            let bounds = gobj.collisionBounds;
            expect(bounds).to.be.ok;
            expect(bounds.width).to.be.closeTo(32, .00001);
            expect(bounds.height).to.be.closeTo(66.2, .00001);
        });
        it('should offset the collision bounds if the sprite has a pivot', () => {
            let gobj = new GameObject('name', {
                sprite: {
                    src: 'chocolate.milk',
                    pivot: { x: 6, y: 4 },
                    tileset: {
                        width: 32, height: 66.2, tilex: 0, tiley: 0
                    }
                }
            });
            let bounds = gobj.collisionBounds;
            expect(bounds).to.be.ok;
            expect(bounds.left).to.be.closeTo(-6, .00001);
            expect(bounds.bottom).to.be.closeTo(-4, .00001);
        });
        it('should recalculate the collision bounds when the sprite changes', () => {
            let gobj = new GameObject('name', {
                sprite: {
                    src: 'chocolate.milk',
                    tileset: { width: 32, height: 66.2, tilex: 0, tiley: 0 }
                }
            });
            let bounds = gobj.collisionBounds;
            expect(bounds).to.be.ok;

            gobj.sprite = {
                src: 'chocolate.milk',
                tileset: { width: 13, height: 27, tilex: 0, tiley: 0 }
            };
            let newBounds = gobj.collisionBounds;
            expect(newBounds).to.be.ok;
            expect(newBounds).not.to.eq(bounds);
            expect(newBounds.width).to.be.closeTo(13, .00001);
            expect(newBounds.height).to.be.closeTo(27, .00001);
        });
    });
    describe('.collisionBounds=', () => {
        it('should override the default behavior of collisionBounds', () => {
            let gobj = new GameObject('name', {
                sprite: {
                    src: 'chocolate.milk',
                    tileset: { width: 32, height: 66.2, tilex: 0, tiley: 0 }
                }
            });
            gobj.collisionBounds = new Rect(-2, 2, -2, 2);
            let bounds = gobj.collisionBounds;
            expect(bounds).to.be.ok;
            expect(bounds.left).to.be.closeTo(-2, .00001);
            expect(bounds.bottom).to.be.closeTo(-2, .00001);
            expect(bounds.width).to.be.closeTo(4, .00001);
            expect(bounds.height).to.be.closeTo(4, .00001);
        });
    });

    describe('.direction', () => {
        it('should modify hspeed and vspeed when it changes', () => {
            let gobj = new GameObject('name', { hspeed: -4, vspeed: 0 });
            expect(gobj.direction).to.be.closeTo(180, .00001);
            gobj.direction = 90;
            expect(gobj.hspeed).to.be.closeTo(0, .00001);
            expect(gobj.vspeed).to.be.closeTo(-4, .00001);
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
        it('should invoke console.log when the setter is called if DEBUG_MOVEMENT is true', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(console, 'log');
                let gobj = new GameObject('name');
                (<any>gobj).DEBUG_MOVEMENT = true;
                gobj.direction = 32;
                expect(console.log).to.have.been.calledWith(sinon.match(/setting direction/i));
                expect(console.log).to.have.been.calledWith(sinon.match(/hspeed:.*vspeed:/i));
            } finally { if (stub) stub.restore(); }
        });

        it('should be 0 when facing east', () => {
            let gobj = new GameObject('name', { hspeed: 1, vspeed: 0 });
            expect(gobj.direction).to.eql(0);
        });
        it('should be 45 when facing northeast', () => {
            let gobj = new GameObject('name', { hspeed: 1, vspeed: -1 });
            expect(gobj.direction).to.eql(45);
        });
        it('should be 90 when facing north', () => {
            let gobj = new GameObject('name', { hspeed: 0, vspeed: -1 });
            expect(gobj.direction).to.eql(90);
        });
        it('should be 135 when facing northwest', () => {
            let gobj = new GameObject('name', { hspeed: -1, vspeed: -1 });
            expect(gobj.direction).to.eql(135);
        });
        it('should be 180 when facing west', () => {
            let gobj = new GameObject('name', { hspeed: -1, vspeed: 0 });
            expect(gobj.direction).to.eql(180);
        });
        it('should be 225 when facing southwest', () => {
            let gobj = new GameObject('name', { hspeed: -1, vspeed: 1 });
            expect(gobj.direction).to.eql(225);
        });
        it('should be 270 when facing south', () => {
            let gobj = new GameObject('name', { hspeed: 0, vspeed: 1 });
            expect(gobj.direction).to.eql(270);
        });
        it('should be 315 when facing southeast', () => {
            let gobj = new GameObject('name', { hspeed: 1, vspeed: 1 });
            expect(gobj.direction).to.eql(315);
        });
        it('should be the same direction regardless of magnitude', () => {
            let dx = Math.random() - .5;
            let dy = Math.random() - .5;
            let gobj = new GameObject('name', { hspeed: dx, vspeed: dy });
            let dir = gobj.direction;
            gobj.hspeed = dx * 5;
            gobj.vspeed = dy * 5;
            expect(gobj.direction).to.be.closeTo(dir, .00001);
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
        it('should not change direction if set to 0', () => {
            let gobj = new GameObject('name', { hspeed: -4, vspeed: 0 });
            expect(gobj.direction).to.be.closeTo(180, .00001);
            expect(gobj.speed).to.be.closeTo(4, .00001);
            gobj.speed = 0;
            expect(gobj.hspeed).to.be.closeTo(0, .00001);
            expect(gobj.vspeed).to.be.closeTo(0, .00001);
            expect(gobj.direction).to.be.closeTo(180, .00001);
        });
        it('should not change hspeed and vspeed if set to the same value', () => {
            let gobj = new GameObject('name', { hspeed: -4, vspeed: 0 });
            (<any>gobj)._hspeed = 29;
            (<any>gobj)._vspeed = 63;
            gobj.speed = 4;
            expect(gobj.hspeed).to.be.closeTo(29, .00001);
            expect(gobj.vspeed).to.be.closeTo(63, .00001);
        });
        it('should invoke console.log when the setter is called if DEBUG_MOVEMENT is true', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(console, 'log');
                let gobj = new GameObject('name');
                (<any>gobj).DEBUG_MOVEMENT = true;
                gobj.speed = 12;
                expect(console.log).to.have.been.calledWith(sinon.match(/setting speed/i));
                expect(console.log).to.have.been.calledWith(sinon.match(/hspeed:.*vspeed:/i));
            } finally { if (stub) stub.restore(); }
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
        it('should not change direction if set to 0 and vspeed is already 0', () => {
            let gobj = new GameObject('name', { hspeed: -4, vspeed: 0 });
            expect(gobj.direction).to.be.closeTo(180, .00001);
            gobj.hspeed = 0;
            expect(gobj.hspeed).to.be.closeTo(0, .00001);
            expect(gobj.vspeed).to.be.closeTo(0, .00001);
            expect(gobj.direction).to.be.closeTo(180, .00001);
        });
        it('should invoke console.log when the setter is called if DEBUG_MOVEMENT is true', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(console, 'log');
                let gobj = new GameObject('name');
                (<any>gobj).DEBUG_MOVEMENT = true;
                gobj.hspeed = 12;
                expect(console.log).to.have.been.calledWith(sinon.match(/setting hspeed/i));
                expect(console.log).to.have.been.calledWith(sinon.match(/speed:.*direction:/i));
            } finally { if (stub) stub.restore(); }
        });
    });
    describe('.vspeed', () => {
        it('should modify speed and direction when it changes', () => {
            let gobj = new GameObject('name', { speed: 4, direction: 90 });
            expect(gobj.hspeed).to.be.closeTo(0, .00001);
            expect(gobj.vspeed).to.be.closeTo(-4, .00001);
            gobj.vspeed = 2;
            expect(gobj.direction).to.be.closeTo(270, .00001);
            expect(gobj.speed).to.be.closeTo(2, .00001);
        });
        it('should not change direction if set to 0 and hspeed is already 0', () => {
            let gobj = new GameObject('name', { hspeed: 0, vspeed: 4 });
            expect(gobj.direction).to.be.closeTo(270, .00001);
            gobj.vspeed = 0;
            expect(gobj.hspeed).to.be.closeTo(0, .00001);
            expect(gobj.vspeed).to.be.closeTo(0, .00001);
            expect(gobj.direction).to.be.closeTo(270, .00001);
        });
        it('should invoke console.log when the setter is called if DEBUG_MOVEMENT is true', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(console, 'log');
                let gobj = new GameObject('name');
                (<any>gobj).DEBUG_MOVEMENT = true;
                gobj.vspeed = 12;
                expect(console.log).to.have.been.calledWith(sinon.match(/setting vspeed/i));
                expect(console.log).to.have.been.calledWith(sinon.match(/speed:.*direction:/i));
            } finally { if (stub) stub.restore(); }
        });
    });

    describe('.addToScene', () => {
        let testGame: Game = <any>{ resourceLoader: 'fake resource loader!', scene: new GameScene() };
        it(`should populate the 'game,' 'resources,' and 'events' helper properties`, () => {
            let gobj = new GameObject('test');
            testGame.scene.game = testGame;
            gobj.addToScene(testGame.scene);
            expect(gobj.game).to.deep.eq(testGame);
            expect(gobj.resources).to.deep.eq(testGame.resourceLoader);
            expect(gobj.events).to.deep.eq(testGame.eventQueue);
        });
        it('should throw an error if the game object is already added to a game', () => {
            let gobj = new GameObject('test');
            gobj.addToScene(new GameScene());
            expect(() => gobj.addToScene(new GameScene())).to.throw(/already added to a scene/i);
        });
    });

    describe('.removeFromScene', () => {
        let testGame: Game = <any>{ resourceLoader: 'fake resource loader!' };
        it(`should depopulate the 'game,' 'resources,' and 'events' helper properties`, () => {
            let gobj = new GameObject('test');
            gobj.addToScene(new GameScene());
            gobj.removeFromScene();
            expect(gobj.game).not.to.be.ok;
            expect(gobj.resources).not.to.be.ok;
            expect(gobj.events).not.to.be.ok;
        });
    });

    describe('.handleEvent', () => {
        it('should not throw an error', () => {
            let gobj = new GameObject('name', { x: 0, y: 0, hspeed: 0, vspeed: 0 });
            expect(gobj.handleEvent(<any>void(0))).not.to.throw;
        });
    });

    describe('.tick', () => {
        it('should not modify the position of the game object if speed == 0', () => {
            let gobj = new GameObject('name', { x: 0, y: 0, hspeed: 0, vspeed: 0 });
            gobj.tick(1);
            expect(gobj.x).to.eq(0);
            expect(gobj.y).to.eq(0);
        });
        it('should not modify the position of the game object if shouldTick == false', () => {
            let gobj = new GameObject('name', { x: 0, y: 0, hspeed: 10, vspeed: 10, shouldTick: false });
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
        it('should not modify the animation age if animationSpeed == 0', () => {
            let gobj = new GameObject('name', { animationSpeed: 0 });
            gobj.tick(1);
            expect(gobj.animationAge).to.eq(0);
        });
        it('should not modify the animation age if shouldTick == false', () => {
            let gobj = new GameObject('name', { shouldTick: false });
            gobj.tick(1);
            expect(gobj.animationAge).to.eq(0);
        });
        it('should increase the animation age by animationSpeed * delta', () => {
            let gobj = new GameObject('name', { animationSpeed: .3 });
            gobj.tick(.5);
            expect(gobj.animationAge).to.eq(.5 * .3);
        });
    });

    describe('.render', () => {
        let context: CanvasRenderingContext2D;
        let drawSpriteStub: sinon.SinonStub;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
            drawSpriteStub = sinon.stub(renderUtils, 'drawSprite');
        });
        afterEach(() => {
            drawSpriteStub.restore();
        });

        it('should not render anything if shouldRender is false', () => {
            sinon.stub(context, 'fillRect');
            sinon.stub(context, 'fillText');
            let gobj = new GameObject('name', { shouldRender: false });
            sinon.stub(gobj, 'renderImpl');
            gobj.render(context);
            expect(renderUtils.drawSprite).not.to.have.been.called;
            expect(context.fillRect).not.to.have.been.called;
            expect(context.fillText).not.to.have.been.called;
            expect((<any>gobj).renderImpl).not.to.have.been.called;
        });
        it('should invoke renderImpl', () => {
            let gobj = new GameObject('name');
            sinon.stub(gobj, 'renderImpl');
            gobj.render(context);
            expect((<any>gobj).renderImpl).to.have.been.calledOnce.calledWith(context);
        });
        it('should save and restore the context state', () => {
            let gobj = new GameObject('name');
            sinon.stub(context, 'save');
            sinon.stub(context, 'restore');
            gobj.render(context);
            expect(context.save).to.have.been.calledOnce;
            expect(context.restore).to.have.been.calledOnce.calledAfter(<any>context.save);
        });
        it('should translate and rotate the image based on x, y, and imageAngle', () => {
            sinon.stub(context, 'translate');
            sinon.stub(context, 'rotate');
            let gobj = new GameObject('name', { x: 13, y: -27, imageAngle: 180 });
            gobj.render(context);
            expect(context.translate).to.have.been.calledOnce.calledWith(13, -27);
            expect(context.rotate).to.have.been.calledOnce.calledWith(-Math.PI);
        });
    });

    describe('.renderImpl', () => {
        let context: CanvasRenderingContext2D;
        let drawSpriteStub: sinon.SinonStub;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
            drawSpriteStub = sinon.stub(renderUtils, 'drawSprite');
        });
        afterEach(() => {
            drawSpriteStub.restore();
        });

        it('should render the sprite if the game object has one', () => {
            let sprite = { src: 'blah' };
            let gobj = new GameObject('name', { sprite: sprite, animationAge: 14.3 });
            (<any>gobj).renderImpl(context);
            expect(renderUtils.drawSprite).to.have.been.calledWith(context, sinon.match.any, sprite, 0, 0, 14.3);
        });
        it('should render a rect and a question mark if the game object has no sprite', () => {
            sinon.stub(context, 'fillRect');
            sinon.stub(context, 'fillText');
            let gobj = new GameObject('name');
            (<any>gobj).renderImpl(context);
            expect(context.fillRect).to.have.been.calledOnce;
            expect(context.fillText).to.have.been.calledWith('?');
        });
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Player } from '../player';
import { MockEventQueue } from './mock-event-queue';
import { MockWorld } from './mock-world';
import { alives } from '../dbs/alive-db';

describe('Player', () => {
    let player: Player;
    beforeEach(() => {
        player = new Player();
    });

    it('should be named Player', () => {
        expect(player.name).to.be.eq('Player');
    });
    it('should start with katie_south as the sprite', () => {
        expect(player.sprite).to.deep.eq(alives['katie_south'].sprite);
    });

    describe('.tick', () => {
        describe('physics', () => {
            xit('should not allow the player to move into a blocked right tile', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowRight'), world: new MockWorld(' X') })
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.2);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should allow the player to move into a non-blocked right tile', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowRight'), world: new MockWorld() })
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.greaterThan(oldX);
                expect(player.y).to.be.eq(oldY);
            });

            xit('should not allow the player to move into a blocked left tile', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowLeft'), world: new MockWorld('X ') })
                let [oldX, oldY] = [player.x = 32, player.y = 0];
                player.tick(.2);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should allow the player to move into a non-blocked left tile', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowLeft'), world: new MockWorld() })
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.lessThan(oldX);
                expect(player.y).to.be.eq(oldY);
            });

            xit('should not allow the player to move into a blocked top tile', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowUp'), world: new MockWorld('X', ' ') })
                let [oldX, oldY] = [player.x = 0, player.y = 32];
                player.tick(.2);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should allow the player to move into a non-blocked top tile', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowUp'), world: new MockWorld() })
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.eq(oldX);
                expect(player.y).to.be.lessThan(oldY);
            });

            xit('should not allow the player to move into a blocked bottom tile', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowDown'), world: new MockWorld('', 'X') })
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.2);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should allow the player to move into a non-blocked bottom tile', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowDown'), world: new MockWorld() })
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.eq(oldX);
                expect(player.y).to.be.greaterThan(oldY);
            });

            it('should not move the player horizontally if left and right are pressed', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowLeft', 'ArrowRight'), world: new MockWorld() })
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should not move the player vertically if up and down are pressed', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowUp', 'ArrowDown'), world: new MockWorld() })
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should not move the player if no movement keys are pressed', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue(), world: new MockWorld() })
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });
        });

        describe('animation', () => {
            it('should not change the sprite if the player is not moving', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue(), world: new MockWorld() })
                let sprite = player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(sprite);
            });
            it('should change the sprite to katie_north if the player is moving north', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowUp'), world: new MockWorld() })
                player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(alives['katie_north'].sprite);
            });
            it('should change the sprite to katie_south if the player is moving south', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowDown'), world: new MockWorld() })
                player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(alives['katie_south'].sprite);
            });
            it('should change the sprite to katie_east if the player is moving east', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowRight'), world: new MockWorld() })
                player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(alives['katie_east'].sprite);
            });
            it('should change the sprite to katie_west if the player is moving west', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowLeft'), world: new MockWorld() })
                player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(alives['katie_west'].sprite);
            });
            it('should set animationSpeed to 0 if the player is not moving', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue(), world: new MockWorld() })
                player.animationSpeed = <any>5;
                player.tick(.02);
                expect(player.animationSpeed).to.eq(0);
            });
            it('should set animationSpeed to .2 if the player is moving', () => {
                player.addToGame(<any>{ eventQueue: new MockEventQueue('ArrowRight'), world: new MockWorld() })
                player.animationSpeed = <any>5;
                player.tick(.02);
                expect(player.animationSpeed).to.eq(.2);
            });
        });
    });
});

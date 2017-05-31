/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { SimpleEnemy } from '../simple-enemy';
import { alives } from '../dbs/alive-db';
import { MockEventQueue } from './mock-event-queue';
import { MockWorld } from './mock-world';

describe('SimpleEnemy', () => {
    let enemy: SimpleEnemy;
    beforeEach(() => {
        enemy = new SimpleEnemy();
    });

    it('Should be named Simple Enemy', () => {
        expect(enemy.name).to.be.eql('Simple Enemy');
    });

    it('should start with bat-south as the sprite', () => {
        expect(enemy.sprite).to.deep.eq(alives['bat-south'].sprite);
    });

    describe('animation', () => {
        it('should change the sprite to enemy-north if the enemy is moving north', () => {
            enemy.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue()
                },
                world: new MockWorld()
            });
            enemy.sprite = <any>'I like chocolate milk!';
            sinon.stub(enemy, 'getMove').returns(0);
            enemy.tick(.02);
            expect((<any>enemy).getMove).to.have.been.calledOnce;
            expect(enemy.sprite).to.deep.eq(alives['bat-north'].sprite);
        });
        it('should change the sprite to enemy-south if the enemy is moving south', () => {
            enemy.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue()
                },
                world: new MockWorld()
            });
            enemy.sprite = <any>'I like chocolate milk!';
            sinon.stub(enemy, 'getMove').returns(2);
            enemy.tick(.02);
            expect((<any>enemy).getMove).to.have.been.calledOnce;
            expect(enemy.sprite).to.deep.eq(alives['bat-south'].sprite);
        });
        it('should change the sprite to enemy-east if the enemy is moving east', () => {
            enemy.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue()
                },
                world: new MockWorld()
            });
            enemy.sprite = <any>'I like chocolate milk!';
            sinon.stub(enemy, 'getMove').returns(1);
            enemy.tick(.02);
            expect((<any>enemy).getMove).to.have.been.calledOnce;
            expect(enemy.sprite).to.deep.eq(alives['bat-east'].sprite);
        });
        it('should change the sprite to enemy-west if the enemy is moving west', () => {
            enemy.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue()
                },
                world: new MockWorld()
            });
            enemy.sprite = <any>'I like chocolate milk!';
            sinon.stub(enemy, 'getMove').returns(3);
            enemy.tick(.02);
            expect((<any>enemy).getMove).to.have.been.calledOnce;
            expect(enemy.sprite).to.deep.eq(alives['bat-west'].sprite);
        });
        it('should set animationSpeed to .2 if the enemy is moving', () => {
            enemy.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue()
                },
                world: new MockWorld()
            });
            enemy.animationSpeed = <any>5;
            enemy.tick(.02);
            expect(enemy.animationSpeed).to.eq(.2);
        });
    });
});

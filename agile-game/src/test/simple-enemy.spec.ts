/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { SimpleEnemy } from '../simple-enemy';
import { alives } from '../dbs/alive-db';
import { MockWorld } from './mock-world';
import { GameObject } from '../engine';
import { MockEventQueue } from '../engine/test';

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

    describe('getMove', () => {
        it('should not move directly opposite its last move', () => {
            let l: number = (<any>enemy).getMove();
            for (let i: number = 0; i < 50; ++i) {
                let c: number = (<any>enemy).getMove();
                expect((c+2)%4).to.not.eq(l);
                l = c;
            }
        });
    });

    describe('.kill', () => {
        it('should increase the game score', () => {
            let scene: any = <any>{
                game: {
                    eventQueue: new MockEventQueue(),
                    score: 0
                },
                world: new MockWorld(),
                addObject: (obj: GameObject) => { },
                removeObject: (obj: GameObject) => { }
            };

            enemy.addToScene(scene);
            enemy.kill();
            expect(scene.game.score).to.be.greaterThan(0);
        });
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

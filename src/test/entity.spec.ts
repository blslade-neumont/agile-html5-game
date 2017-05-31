/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Entity } from '../entity';
import { GameObject, AudioSourceObject } from '../engine';
import { MockEventQueue } from './mock-event-queue';
import { MockWorld } from './mock-world';

describe('Entity', () => {
    let ent: Entity;
    beforeEach(() => {
        ent = new Entity('name', { maxHealth: 10 });
        ent.addToScene(<any>{
            removeObject: () => { },
            addObject: () => { }
        });
    });

    describe('.constructor', () => {
        it('should set the entity name', () => {
            let eobj = new Entity('my-name', { maxHealth: 1 });
            expect(eobj.name).to.eq('my-name');
        });

        it('should set maxHealth based on the option passed in if it is positive', () => {
            let options = { maxHealth: 1 };
            let eobj = new Entity('my-name', options);
            expect(eobj.maxHealth).to.eq(options.maxHealth);
        });
        it('should throw an error if maxHealth is zero', () => {
            expect(() => new Entity('my-name', { maxHealth: 0 })).to.throw(/must be positive/i);
        });
        it('should throw an error if maxHealth is negative', () => {
            expect(() => new Entity('my-name', { maxHealth: -25 })).to.throw(/must be positive/i);
        });

        it('should set currentHealth based on the maxHealth option passed in if it was not specified', () => {
            let options = { maxHealth: 1 };
            let eobj = new Entity('my-name', options);
            expect(eobj.currentHealth).to.eq(options.maxHealth);
        });
        it('should be able to set a customized current health upon creation', () => {
            let options = { maxHealth: 2, currentHealth: 1 };
            let eobj = new Entity('my-name', options);
            expect(eobj.currentHealth).to.eq(options.currentHealth);
        });
        it('should throw an error if it is constructed with more current health than max health', () => {
            let options = { maxHealth: 2, currentHealth: 3 };
            expect(() => new Entity('my-name', options)).to.throw(/current health higher than max/i);
        });
        it('should throw an error if currentHealth is zero', () => {
            expect(() => new Entity('my-name', { maxHealth: 1, currentHealth: 0 })).to.throw(/must be positive/i);
        });
        it('should throw an error if currentHealth is negative', () => {
            expect(() => new Entity('my-name', { maxHealth: 1, currentHealth: -25 })).to.throw(/must be positive/i);
        });

        it('should set damageImmunity and damageImmunityTimer based on the options passed in', () => {
            let options = <any>{ damageImmunity: 3, damageImmunityTimer: 2 };
            let gobj = new Entity('my-name', options);
            expect(gobj.damageImmunity).to.eq(options.damageImmunity);
            expect(gobj.damageImmunityTimer).to.eq(options.damageImmunityTimer);
        });
    });
    
    describe('.currentHealth=', () => {
        it('should be able to modify its own current health', () => {
            ent.currentHealth = 9;
            expect(ent.currentHealth).to.be.eq(9);
        });
        it('should not be able to set negative health', () => {
            ent.currentHealth = -1111;
            expect(ent.currentHealth).to.be.eq(0);
        });
        it('should not be able to set more current health than max health after construction', () => {
            ent.currentHealth = ent.maxHealth + 1;
            expect(ent.currentHealth).to.be.eq(ent.maxHealth);
        });
        it('should invoke Entity.kill if set to zero', () => {
            sinon.stub(ent, 'kill');
            ent.currentHealth = 0;
            expect(ent.kill).to.have.been.calledOnce;
        });
        it('should throw an error if you try to modify it after the entity has died', () => {
            ent.kill();
            expect(() => ent.currentHealth = 5).to.throw(/entity is dead/i);
        });
    });

    describe('.isImmuneToDamage', () => {
        it('should be true if damageImmunity is greater than zero', () => {
            ent.damageImmunity = 3;
            expect(ent.isImmuneToDamage).to.be.true;
        });
        it('should be false if damageImmunity is less than zero', () => {
            ent.damageImmunity = -3;
            expect(ent.isImmuneToDamage).to.be.false;
        });
        it('should be true if damageImmunity is zero', () => {
            ent.damageImmunity = 0;
            expect(ent.isImmuneToDamage).to.be.false;
        });
    });

    describe('.isAlive', () => {
        it('should start as true', () => {
            expect(ent.isAlive).to.be.true;
            expect(ent.isDead).to.be.false;
        });
        it('should be false after the entity has been killed', () => {
            ent.kill();
            expect(ent.isAlive).to.be.false;
            expect(ent.isDead).to.be.true;
        });
    });

    describe('.tick', () => {
        describe('physics', () => {
            it('should allow the entity to move upwards when next to a right blocked tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, vspeed: -15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld(' X',
                        ' X',
                        ' X')
                });
                let [oldX, oldY] = [entity.x = 0, entity.y = 32];
                entity.tick(.02);
                expect(entity.x).to.be.eq(oldX);
                expect(entity.y).to.be.lessThan(oldY);
            });

            it('should allow the entity to move downwards when next to a right blocked tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, vspeed: 15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue(),
                    },
                    world: new MockWorld(' X',
                        ' X',
                        ' X')
                });
                let [oldX, oldY] = [entity.x = 0, entity.y = 32];
                entity.tick(.02);
                expect(entity.x).to.be.eq(oldX);
                expect(entity.y).to.be.greaterThan(oldY);
            });

            it('should allow the entity to move upwards when next to a left blocked tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, vspeed: -15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue(),
                    },
                    world: new MockWorld('X ',
                        'X ',
                        'X ')
                });
                let [oldX, oldY] = [entity.x = 32, entity.y = 32];
                entity.tick(.02);
                expect(entity.x).to.be.eq(oldX);
                expect(entity.y).to.be.lessThan(oldY);
            });

            it('should allow the entity to move downwards when next to a left blocked tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, vspeed: 15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld('X ',
                        'X ',
                        'X ')
                });
                let [oldX, oldY] = [entity.x = 32, entity.y = 32];
                entity.tick(.02);
                expect(entity.x).to.be.eq(oldX);
                expect(entity.y).to.be.greaterThan(oldY);
            });

            it('should allow the entity to move right when next to a top blocked tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, hspeed: 15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld('XXX')
                });
                let [oldX, oldY] = [entity.x = 32, entity.y = 32];
                entity.tick(.02);
                expect(entity.x).to.be.greaterThan(oldX);
                expect(entity.y).to.be.eq(oldY);
            });

            it('should allow the entity to move left when next to a top blocked tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, hspeed: -15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld('XXX')
                });
                let [oldX, oldY] = [entity.x = 32, entity.y = 32];
                entity.tick(.02);
                expect(entity.x).to.be.lessThan(oldX);
                expect(entity.y).to.be.eq(oldY);
            });

            it('should allow the entity to move right when next to a bottom blocked tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, hspeed: 15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld('   ',
                        'XXX')
                });
                let [oldX, oldY] = [entity.x = 32, entity.y = 0];
                entity.tick(.02);
                expect(entity.x).to.be.greaterThan(oldX);
                expect(entity.y).to.be.eq(oldY);
            });

            it('should allow the entity to move left when next to a bottom blocked tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, hspeed: -15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld('   ',
                        'XXX')
                });
                let [oldX, oldY] = [entity.x = 32, entity.y = 0];
                entity.tick(.02);
                expect(entity.x).to.be.lessThan(oldX);
                expect(entity.y).to.be.eq(oldY);
            });

            it('should not allow the entity to move into a blocked right tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, hspeed: 15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld(' X')
                });
                let [oldX, oldY] = [entity.x = 0, entity.y = 0];
                entity.tick(.2);
                expect([oldX, oldY]).to.deep.eq([entity.x, entity.y]);
            });

            it('should allow the entity to move into a non-blocked right tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, hspeed: 15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [entity.x = 0, entity.y = 0];
                entity.tick(.02);
                expect(entity.x).to.be.greaterThan(oldX);
                expect(entity.y).to.be.eq(oldY);
            });

            it('should not allow the entity to move into a blocked left tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, hspeed: -15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld('X ')
                });
                let [oldX, oldY] = [entity.x = 32, entity.y = 0];
                entity.tick(.2);
                expect([oldX, oldY]).to.deep.eq([entity.x, entity.y]);
            });

            it('should allow the entity to move into a non-blocked left tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, hspeed: -15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [entity.x = 0, entity.y = 0];
                entity.tick(.02);
                expect(entity.x).to.be.lessThan(oldX);
                expect(entity.y).to.be.eq(oldY);
            });

            it('should not allow the entity to move into a blocked top tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, vspeed: -15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld('X', ' ')
                });
                let [oldX, oldY] = [entity.x = 0, entity.y = 32];
                entity.tick(.2);
                expect([oldX, oldY]).to.deep.eq([entity.x, entity.y]);
            });

            it('should allow the entity to move into a non-blocked top tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, vspeed: -15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [entity.x = 0, entity.y = 0];
                entity.tick(.02);
                expect(entity.x).to.be.eq(oldX);
                expect(entity.y).to.be.lessThan(oldY);
            });

            it('should not allow the entity to move into a blocked bottom tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, vspeed: 15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld('', 'X')
                });
                let [oldX, oldY] = [entity.x = 0, entity.y = 0];
                entity.tick(.2);
                expect([oldX, oldY]).to.deep.eq([entity.x, entity.y]);
            });

            it('should allow the entity to move into a non-blocked bottom tile', () => {
                let entity: Entity = new Entity("testEnt", { maxHealth: 5, vspeed: 15 });
                entity.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [entity.x = 0, entity.y = 0];
                entity.tick(.02);
                expect(entity.x).to.be.eq(oldX);
                expect(entity.y).to.be.greaterThan(oldY);
            });
        });

        it('should invoke super.tick', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'tick');
                ent.tick(.02);
                expect(GameObject.prototype.tick).to.have.been.calledOnce.calledWithExactly(.02);
            }
            finally { if (stub) stub.restore(); }
        });
        it('should decrease damageImmunity', () => {
            let prevDamageImmunity = ent.damageImmunity;
            ent.tick(.02);
            expect(ent.damageImmunity).to.be.lessThan(prevDamageImmunity);
        });
    });

    describe('.takeDamage', () => {
        it('should throw an error if the entity is dead', () => {
            ent.kill();
            expect(() => ent.takeDamage(2)).to.throw(/already dead/i);
        });
        it('should throw an error if the damage amount is negative', () => {
            expect(() => ent.takeDamage(-2)).to.throw(/cannot take negative damage/i);
        });
        it('should not modify currentHealth if the entity is immune to damage', () => {
            ent.damageImmunity = 2;
            let prevHealth = ent.currentHealth;
            ent.takeDamage(2);
            expect(ent.currentHealth).to.eq(prevHealth);
        });
        it('should return false if the entity is immune to damage', () => {
            ent.damageImmunity = 2;
            expect(ent.takeDamage(2)).to.be.false;
        });
        it('should take damage if the entity is not immune to damage', () => {
            let prevHealth = ent.currentHealth;
            ent.takeDamage(2)
            expect(ent.currentHealth).to.be.closeTo(prevHealth - 2, .00001);
        });
        it('should return true if the entity is not immune to damage', () => {
            expect(ent.takeDamage(2)).to.be.true;
        });
        it('should not kill the entity if taking damage is not enough to reduce the entity to zero health', () => {
            sinon.stub(ent, 'kill');
            ent.takeDamage(ent.currentHealth - 2);
            expect(ent.kill).not.to.have.been.called;
        });
        it('should kill the entity if taking damage is enough to reduce the entity to zero health', () => {
            sinon.stub(ent, 'kill');
            ent.takeDamage(ent.currentHealth);
            expect(ent.kill).to.have.been.calledOnce;
        });
        it('should kill the entity if taking damage is more than enough to reduce the entity to zero health', () => {
            sinon.stub(ent, 'kill');
            ent.takeDamage(ent.currentHealth + 2);
            expect(ent.kill).to.have.been.calledOnce;
        });
        it('should set isImmuneToDamage to true if damageImmunityTimer is not zero', () => {
            ent.damageImmunityTimer = 2;
            ent.takeDamage(2);
            expect(ent.isImmuneToDamage).to.be.true;
        });
        it('should not set isImmuneToDamage to true if damageImmunityTimer is zero', () => {
            ent.damageImmunityTimer = 0;
            ent.takeDamage(2);
            expect(ent.isImmuneToDamage).to.be.false;
        });
        it('should not play a sound if there is no takeDamageSound', () => {
            sinon.stub(ent.scene, 'addObject');
            ent.takeDamage(2);
            expect(ent.scene.addObject).not.to.have.been.called;
        });
        it('should not play a sound if the entity dies even if there is a takeDamageSound', () => {
            sinon.stub(ent.scene, 'addObject');
            ent.currentHealth = 1;
            ent.takeDamageSound = { src: 'blah' };
            ent.takeDamage(2);
            expect(ent.scene.addObject).not.to.have.been.called;
        });
        it('should play a sound if the entity does not die and there is a takeDamageSound', () => {
            sinon.stub(ent.scene, 'addObject');
            ent.takeDamageSound = { src: 'blah' };
            ent.takeDamage(2);
            expect(ent.scene.addObject).to.have.been.calledOnce.calledWith(sinon.match(obj => obj instanceof AudioSourceObject));
        });
    });

    describe('.kill', () => {
        it('should throw an error if the entity is dead', () => {
            ent.kill();
            expect(() => ent.kill()).to.throw(/already dead/i);
        });
        it('should set isAlive to false and isDead to true', () => {
            ent.kill();
            expect(ent.isAlive).to.be.false;
            expect(ent.isDead).to.be.true;
        });
        it('should invoke Entity.scene.removeObject', () => {
            sinon.stub(ent.scene, 'removeObject');
            ent.kill();
            expect(ent.scene.removeObject).to.have.been.calledOnce.calledWithExactly(ent);
        });
        it('should not play a sound if there is no killSound', () => {
            sinon.stub(ent.scene, 'addObject');
            ent.kill();
            expect(ent.scene.addObject).not.to.have.been.called;
        });
        it('should play a sound if there is a killSound', () => {
            sinon.stub(ent.scene, 'addObject');
            ent.killSound = { src: 'blah' };
            ent.kill();
            expect(ent.scene.addObject).to.have.been.calledOnce.calledWith(sinon.match(obj => obj instanceof AudioSourceObject));
        });
    });

    describe('.renderImpl', () => {
        let context: CanvasRenderingContext2D;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
        });

        it('should invoke GameObject.renderImpl if the entity is not immune to damage', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'renderImpl');
                ent.render(context);
                expect((<any>GameObject.prototype).renderImpl).to.have.been.calledOnce.calledWithExactly(context);
            }
            finally { if (stub) stub.restore(); }
        });
        it('should invoke GameObject.renderImpl about half the time if the entity is immune to damage', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'renderImpl');
                for (let q = 2; q > 0; q -= .01) {
                    ent.damageImmunity = q;
                    (<any>ent).renderImpl(context);
                }
                let callCount = stub.callCount;
                expect(callCount).to.be.closeTo((2 / .01) / 2, 5);
            }
            finally { if (stub) stub.restore(); }
        });
    });
});

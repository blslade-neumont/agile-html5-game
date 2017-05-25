/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Player } from '../player';
import { MockEventQueue } from './mock-event-queue';
import { MockWorld } from './mock-world';
import { alives } from '../dbs/alive-db';
import { Entity, GameScene } from '../engine';
import { AgileGame } from '../agile-game';
import { Game } from '../engine';
import { stubDocument } from '../engine/test/mock-document';
import { stubImage } from '../engine/test/mock-image';
import { DeadPlayer } from '../dead-player';

describe('Player', () => {
    let player: Player;
    beforeEach(() => {
        player = new Player();
    });

    it('should be named Player', () => {
        expect(player.name).to.be.eq('Player');
    });
    it('should start with player-south as the sprite', () => {
        expect(player.sprite).to.deep.eq(alives['player-south'].sprite);
    });

    describe('.tick', () => {
        describe('physics', () => {
            it('should allow the player to move upwards when next to a right blocked tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowUp')
                    },
                    world: new MockWorld(' X',
                                         ' X',
                                         ' X')
                });
                let [oldX, oldY] = [player.x = 0, player.y = 32];
                player.tick(.02);
                expect(player.x).to.be.eq(oldX);
                expect(player.y).to.be.lessThan(oldY);
            });

            it('should allow the player to move downwards when next to a right blocked tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowDown'),
                    },
                    world: new MockWorld(' X',
                                         ' X',
                                         ' X')
                });
                let [oldX, oldY] = [player.x = 0, player.y = 32];
                player.tick(.02);
                expect(player.x).to.be.eq(oldX);
                expect(player.y).to.be.greaterThan(oldY);
            });

            it('should allow the player to move upwards when next to a left blocked tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowUp'),
                    },
                    world: new MockWorld('X ',
                                         'X ',
                                         'X ')
                });
                let [oldX, oldY] = [player.x = 32, player.y = 32];
                player.tick(.02);
                expect(player.x).to.be.eq(oldX);
                expect(player.y).to.be.lessThan(oldY);
            });

            it('should allow the player to move downwards when next to a left blocked tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowDown')
                    },
                    world: new MockWorld('X ',
                                         'X ',
                                         'X ')
                });
                let [oldX, oldY] = [player.x = 32, player.y = 32];
                player.tick(.02);
                expect(player.x).to.be.eq(oldX);
                expect(player.y).to.be.greaterThan(oldY);
            });

            it('should allow the player to move right when next to a top blocked tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowRight')
                    },
                    world: new MockWorld('XXX')
                });
                let [oldX, oldY] = [player.x = 32, player.y = 32];
                player.tick(.02);
                expect(player.x).to.be.greaterThan(oldX);
                expect(player.y).to.be.eq(oldY);
            });

            it('should allow the player to move left when next to a top blocked tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowLeft')
                    },
                    world: new MockWorld('XXX')
                });
                let [oldX, oldY] = [player.x = 32, player.y = 32];
                player.tick(.02);
                expect(player.x).to.be.lessThan(oldX);
                expect(player.y).to.be.eq(oldY);
            });

            it('should allow the player to move right when next to a bottom blocked tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowRight')
                    },
                    world: new MockWorld('   ',
                                         'XXX')
                });
                let [oldX, oldY] = [player.x = 32, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.greaterThan(oldX);
                expect(player.y).to.be.eq(oldY);
            });

            it('should allow the player to move left when next to a bottom blocked tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowLeft')
                    },
                    world: new MockWorld('   ',
                                         'XXX')
                });
                let [oldX, oldY] = [player.x = 32, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.lessThan(oldX);
                expect(player.y).to.be.eq(oldY);
            });

            it('should not allow the player to move into a blocked right tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowRight')
                    },
                    world: new MockWorld(' X')
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.2);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should allow the player to move into a non-blocked right tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowRight')
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.greaterThan(oldX);
                expect(player.y).to.be.eq(oldY);
            });

            it('should not allow the player to move into a blocked left tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowLeft')
                    },
                    world: new MockWorld('X ')
                });
                let [oldX, oldY] = [player.x = 32, player.y = 0];
                player.tick(.2);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should allow the player to move into a non-blocked left tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowLeft')
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.lessThan(oldX);
                expect(player.y).to.be.eq(oldY);
            });

            it('should not allow the player to move into a blocked top tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowUp')
                    },
                    world: new MockWorld('X', ' ')
                });
                let [oldX, oldY] = [player.x = 0, player.y = 32];
                player.tick(.2);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should allow the player to move into a non-blocked top tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowUp')
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.eq(oldX);
                expect(player.y).to.be.lessThan(oldY);
            });

            it('should not allow the player to move into a blocked bottom tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowDown')
                    },
                    world: new MockWorld('', 'X')
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.2);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should allow the player to move into a non-blocked bottom tile', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowDown')
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect(player.x).to.be.eq(oldX);
                expect(player.y).to.be.greaterThan(oldY);
            });

            it('should not move the player horizontally if left and right are pressed', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowLeft', 'ArrowRight')
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should not move the player vertically if up and down are pressed', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowUp', 'ArrowDown')
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });

            it('should not move the player if no movement keys are pressed', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld()
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });
        });

        describe('.kill', () => {
            stubDocument();
            stubImage();

            let game: Game;
            beforeEach(() => {
                game = new Game(30);
                game.changeScene(new GameScene());
            });
            afterEach(() => {
                if (game.isRunning) game.stop();
            });

            it('should create a dead player object', () => {
                game.scene.addObject(player);
                sinon.stub(game.scene, 'addObject');
                player.kill();
                expect(game.scene.addObject).to.be.calledWith(sinon.match((x) => x instanceof DeadPlayer));

            });

            it('should call super.kill', () => {
                game.scene.addObject(player);
                let stub: sinon.SinonStub;
                try {
                    stub = sinon.stub(Entity.prototype, 'kill');
                    player.kill();
                    expect(Entity.prototype.kill).to.have.been.calledOnce;
                } finally { if (stub) stub.restore(); }
            });
        });

        describe('animation', () => {
            it('should not change the sprite if the player is not moving', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld()
                });
                let sprite = player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(sprite);
            });
            it('should change the sprite to player-north if the player is moving north', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowUp')
                    },
                    world: new MockWorld()
                });
                player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(alives['player-north'].sprite);
            });
            it('should change the sprite to player-south if the player is moving south', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowDown')
                    },
                    world: new MockWorld()
                });
                player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(alives['player-south'].sprite);
            });
            it('should change the sprite to player-east if the player is moving east', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowRight')
                    },
                    world: new MockWorld()
                });
                player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(alives['player-east'].sprite);
            });
            it('should change the sprite to player-west if the player is moving west', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowLeft')
                    },
                    world: new MockWorld()
                });
                player.sprite = <any>'I like chocolate milk!';
                player.tick(.02);
                expect(player.sprite).to.deep.eq(alives['player-west'].sprite);
            });
            it('should set animationSpeed to 0 if the player is not moving', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld()
                });
                player.animationSpeed = <any>5;
                player.tick(.02);
                expect(player.animationSpeed).to.eq(0);
            });
            it('should set animationSpeed to .2 if the player is moving', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowRight')
                    },
                    world: new MockWorld()
                });
                player.animationSpeed = <any>5;
                player.tick(.02);
                expect(player.animationSpeed).to.eq(.2);
            });
        });
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Player } from '../player';
import { MockWorld } from './mock-world';
import { alives } from '../dbs/alive-db';
import { GameScene, GameObject, Game, MouseWheelEvent } from '../engine';
import { MockEventQueue } from '../engine/test';
import { AgileGame } from '../agile-game';
import { Entity } from '../entity';
import { DeadPlayer } from '../dead-player';
import { Bomb } from '../bomb';
import { TILE_SIZE } from '../dbs/tile-db';
import { SimpleEnemy } from '../simple-enemy';

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

    describe('Bomb Placement', () => {
        it('should not allow the player to place another bomb if one second has yet to elapse since the last placement', () => {
            player.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue('ArrowDown', 'Space')
                },
                world: new MockWorld(),
                addObject: (obj: GameObject) => { },
                findObjects: () => []
            });

            player.tick(0.2);
            player.handleEvent(<any>{ type: 'keyPressed' });

            sinon.stub(player.scene, 'addObject');

            player.tick(0.99);
            player.handleEvent(<any>{ type: 'keyPressed' });

            expect(player.scene.addObject).not.to.have.been.called;
        });

        it('should allow the player to place another bomb if one second has elapsed since the last placement', () => {
            player.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue('ArrowDown', 'Space')
                },
                world: new MockWorld(),
                addObject: (obj: GameObject) => { },
                findObjects: () => []
            });

            player.tick(0.2);
            player.handleEvent(<any>{ type: 'keyPressed' });

            sinon.stub(player.scene, 'addObject');

            player.tick(1.01);
            player.handleEvent(<any>{ type: 'keyPressed' });

            expect(player.scene.addObject).to.have.been.calledOnce.calledWith(sinon.match(obj => obj instanceof Bomb));
        });

        it('should place a bomb one tile to the right if the player is facing east', () => {
            player.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue('ArrowRight', 'Space')
                },
                world: new MockWorld(),
                addObject: (obj: GameObject) => { },
                findObjects: () => []
            });

            sinon.stub(player.scene, 'addObject');

            player.tick(0.2);
            player.handleEvent(<any>{ type: 'keyPressed' });

            expect(player.scene.addObject).to.have.been.calledOnce.calledWith(sinon.match(obj => obj instanceof Bomb
                && (Math.floor(obj.x / TILE_SIZE) == Math.floor(1 + player.x / TILE_SIZE))
                && (Math.floor(obj.y / TILE_SIZE) == Math.floor(player.y / TILE_SIZE))));
        });

        it('should place a bomb one tile to the left if the player is facing west', () => {
            player.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue('ArrowLeft', 'Space')
                },
                world: new MockWorld(),
                addObject: (obj: GameObject) => { },
                findObjects: () => []
            });

            sinon.stub(player.scene, 'addObject');

            player.tick(0.2);
            player.handleEvent(<any>{ type: 'keyPressed' });

            expect(player.scene.addObject).to.have.been.calledOnce.calledWith(sinon.match(obj => obj instanceof Bomb
                && (Math.floor(obj.x / TILE_SIZE) == Math.floor(-1 + player.x / TILE_SIZE))
                && (Math.floor(obj.y / TILE_SIZE) == Math.floor(player.y / TILE_SIZE))));
        });

        it('should place a bomb one tile to the top if the player is facing north', () => {
            player.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue('ArrowUp', 'Space')
                },
                world: new MockWorld(),
                addObject: (obj: GameObject) => { },
                findObjects: () => []
            });

            sinon.stub(player.scene, 'addObject');

            player.tick(0.2);
            player.handleEvent(<any>{ type: 'keyPressed' });

            expect(player.scene.addObject).to.have.been.calledOnce.calledWith(sinon.match(obj => obj instanceof Bomb
                && (Math.floor(obj.x / TILE_SIZE) == Math.floor(player.x / TILE_SIZE))
                && (Math.floor(obj.y / TILE_SIZE) == Math.floor(-1 + player.y / TILE_SIZE))));
        });

        it('should place a bomb one tile to the bottom if the player is facing south', () => {
            player.addToScene(<any>{
                game: {
                    eventQueue: new MockEventQueue('ArrowDown', 'Space')
                },
                world: new MockWorld(),
                addObject: (obj: GameObject) => { },
                findObjects: () => []
            });

            sinon.stub(player.scene, 'addObject');

            player.tick(0.2);
            player.handleEvent(<any>{ type: 'keyPressed' });

            expect(player.scene.addObject).to.have.been.calledOnce.calledWith(sinon.match(obj => obj instanceof Bomb
                && (Math.floor(obj.x / TILE_SIZE) == Math.floor(player.x / TILE_SIZE))
                && (Math.floor(obj.y / TILE_SIZE) == Math.floor(1 + player.y / TILE_SIZE))));
        });
    });

    describe('.handleEvent', () => {
        let game: AgileGame;
        beforeEach(() => {
            game = new AgileGame(30);
        });
        afterEach(() => {
            if (game.isRunning) game.stop();
        });

        it('should ___ the camera zoom scale when passed a positive delta', () => {
            game.start();
            game.scene.addObject(player);
            let lastZoom = game.scene.camera.zoomScale;
            player.handleEvent(<any>{type: 'mouseWheel', delta: 10});
            expect(game.scene.camera.zoomScale).to.be.lessThan(lastZoom);
        });

        it('should ___ the camera zoom scale when passed a negative delta', () => {
            game.start();
            game.scene.addObject(player);
            let lastZoom = game.scene.camera.zoomScale;
            player.handleEvent(<any>{ type: 'mouseWheel', delta: -10 });
            expect(game.scene.camera.zoomScale).to.be.greaterThan(lastZoom);
        });

        describe('Enemy Interaction', () => {
            it('should take damage only once next to more than one an instance of SimpleEnemy', () => {
                game.start();
                game.scene.addObject(player);
                let ent: SimpleEnemy = new SimpleEnemy({ maxHealth: 5, x: 32, y: 0 });
                let ent1: SimpleEnemy = new SimpleEnemy({ maxHealth: 5, x: -32, y: 0 });
                let ent2: SimpleEnemy = new SimpleEnemy({ maxHealth: 5, x: 0, y: 32 });
                game.scene.addObject(ent);
                game.scene.addObject(ent1);
                game.scene.addObject(ent2);
                let health = player.currentHealth;
                player.tick(0.2);
                expect(player.currentHealth).to.be.eq(health - 2);
            });

            it('should take damage when next to an instance of SimpleEnemy', () => {
                game.start();
                game.scene.addObject(player);
                let ent: SimpleEnemy = new SimpleEnemy({ maxHealth: 5, x: 32, y: 0 });
                game.scene.addObject(ent);
                let health = player.currentHealth;
                player.tick(0.2);
                expect(player.currentHealth).to.be.eq(health - 2);
            });

            it('should not take damage when not next to an instance of SimpleEnemy', () => {
                game.start();
                game.scene.addObject(player);
                let ent: SimpleEnemy = new SimpleEnemy({ maxHealth: 5, x: 64, y: 0 });
                game.scene.addObject(ent);
                let health = player.currentHealth;
                player.tick(0.2);
                expect(player.currentHealth).to.be.eq(health);
            });
        });
    });

    describe('.tick', () => {
        describe('physics', () => {

            it('should not move the player horizontally if left and right are pressed', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue('ArrowLeft', 'ArrowRight')
                    },
                    world: new MockWorld(),
                    findObjects: () => []
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
                    world: new MockWorld(),
                    findObjects: () => []
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
                    world: new MockWorld(),
                    findObjects: () => []
                });
                let [oldX, oldY] = [player.x = 0, player.y = 0];
                player.tick(.02);
                expect([oldX, oldY]).to.deep.eq([player.x, player.y]);
            });
        });

        describe('animation', () => {
            it('should not change the sprite if the player is not moving', () => {
                player.addToScene(<any>{
                    game: {
                        eventQueue: new MockEventQueue()
                    },
                    world: new MockWorld(),
                    findObjects: () => []
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
                    world: new MockWorld(),
                    findObjects: () => []
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
                    world: new MockWorld(),
                    findObjects: () => []
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
                    world: new MockWorld(),
                    findObjects: () => []
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
                    world: new MockWorld(),
                    findObjects: () => []
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
                    world: new MockWorld(),
                    findObjects: () => []
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
                    world: new MockWorld(),
                    findObjects: () => []
                });
                player.animationSpeed = <any>5;
                player.tick(.02);
                expect(player.animationSpeed).to.eq(.2);
            });
        });
    });

    describe('.kill', () => {
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
});

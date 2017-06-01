/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Bomb } from '../bomb';
import { Game } from '../engine';
import { GameObject, GameScene, AudioSourceObject } from '../engine';
import { alives } from '../dbs/alive-db';
import { Explosion } from '../explosion';

describe('Bomb', () => {
    let bomb: Bomb;
    let game: Game;
    beforeEach(() => {
        bomb = new Bomb();
        game = new Game(30);
        game.changeScene(new GameScene());
    });

    afterEach(() => {
        if (game.isRunning) game.stop();
    });

    it('should call explode after three seconds', () => {
        game.scene.addObject(bomb);
        sinon.stub(bomb, 'explode');
        bomb.tick(3.01);
        expect(bomb.explode).to.be.calledOnce;
    });

    it('should not call explode after less than three seconds', () => {
        game.scene.addObject(bomb);
        sinon.stub(bomb, 'explode');
        bomb.tick(2.99);
        expect(bomb.explode).not.to.have.been.called;
    });

    describe('.explode', () => {
        it('should remove itself from the scene', () => {
            game.scene.addObject(bomb);
            sinon.stub(game.scene, 'removeObject');
            bomb.explode();
            expect(game.scene.removeObject).to.be.calledWith(sinon.match((x) => x == bomb));
        });

        it('should create an explosion at its position', () => {
            game.scene.addObject(bomb);
            let stub = sinon.stub(game.scene, 'addObject');
            bomb.explode();
            expect(stub.firstCall).to.have.been.calledWith(sinon.match(obj => obj instanceof Explosion && obj.x == bomb.x && obj.y == bomb.y));
        });

        xit('should deal damage to any entity within a certain radius', () => {

        });

        it('should play the explosion sound effect', () => {
            game.scene.addObject(bomb);
            let stub = sinon.stub(game.scene, 'addObject');
            bomb.explode();
            expect(stub.lastCall).to.have.been.calledWith(sinon.match(obj => obj instanceof AudioSourceObject));
        });
    });

    it('should set the sprite to the bomb', () => {
        expect(bomb.sprite).to.eq(alives['bomb'].sprite);
    });

    describe('.tick', () => {
        it('should call super.tick', () => {
            game.scene.addObject(bomb);
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'tick');
                bomb.tick(0.2);
                expect(GameObject.prototype.tick).to.have.been.calledOnce;
            } finally { if (stub) stub.restore(); }
        });
    });
});
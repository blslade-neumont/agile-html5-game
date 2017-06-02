/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Explosion } from '../explosion';
import { Game } from '../engine';
import { GameObject, GameScene } from '../engine';
import { effects } from '../dbs/effect-db';

describe('Explosion', () => {
    let explosion: Explosion;
    let game: Game;
    beforeEach(() => {
        explosion = new Explosion();
        game = new Game(30);
        game.changeScene(new GameScene());
    });

    afterEach(() => {
        if (game.isRunning) game.stop();
    });

    it('should remove itself from the scene after one second', () => {
        game.scene.addObject(explosion);
        sinon.stub(game.scene, 'removeObject');
        explosion.tick(1.01);
        expect(game.scene.removeObject).to.be.calledWith(sinon.match((x) => x == explosion));
    });

    it('should not remove itself from the scene after less than one second', () => {
        game.scene.addObject(explosion);
        sinon.stub(game.scene, 'removeObject');
        explosion.tick(0.99);
        expect(game.scene.removeObject).not.to.have.been.called;
    });

    it('should set the sprite to the bomb', () => {
        expect(explosion.sprite).to.eq(effects['explosion'].sprite);
    });

    describe('.tick', () => {
        it('should call super.tick', () => {
            game.scene.addObject(explosion);
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'tick');
                explosion.tick(0.2);
                expect(GameObject.prototype.tick).to.have.been.calledOnce;
            } finally { if (stub) stub.restore(); }
        });
    });
});
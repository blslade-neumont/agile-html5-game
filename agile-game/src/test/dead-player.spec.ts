/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { DeadPlayer } from '../dead-player';
import { Game } from '../engine';
import { GameObject, GameScene } from '../engine';
import { alives } from '../dbs/alive-db';
import { GameOverScene } from '../scenes/game-over-scene';

describe('Dead Player', () => {
    let deadPlayer: DeadPlayer;
    let game: Game;
    beforeEach(() => {
        deadPlayer = new DeadPlayer();
        game = new Game(30);
        game.changeScene(new GameScene());
    });

    afterEach(() => {
        if (game.isRunning) game.stop();
    });

    it('should call game.changeScene after two seconds with a game over scene', () => {
        game.scene.addObject(deadPlayer);
        sinon.stub(game, 'changeScene');
        deadPlayer.tick(2.01);
        expect(game.changeScene).to.be.calledWith(sinon.match((x) => x instanceof GameOverScene));

    });

    it('should not call game.changeScene after less than two seconds', () => {
        game.scene.addObject(deadPlayer);
        sinon.stub(game, 'changeScene');
        deadPlayer.tick(1.99);
        expect(game.changeScene).not.to.have.been.called;
    });

    it('should set the sprite to the dead player sprite', () => {
        expect(deadPlayer.sprite).to.eq(alives['dead-player'].sprite);
    });

    describe('.tick', () => {
        it('should call super.tick', () => {
            game.scene.addObject(deadPlayer);
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'tick');
                deadPlayer.tick(0.2);
                expect(GameObject.prototype.tick).to.have.been.calledOnce;
            } finally { if (stub) stub.restore(); }
        });
    });
});
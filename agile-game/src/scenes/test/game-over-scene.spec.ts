/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GameOverScene } from '../game-over-scene';
import { TitleScene } from '../title-scene';
import { Game, AudioSourceObject } from '../../engine';
import { MockGame } from '../../engine/test';

describe('GameOverScene', () => {
    let game: Game;
    let scene: GameOverScene;
    beforeEach(() => {
        scene = new GameOverScene();
        game = scene.game = <any>new MockGame(scene);
    });

    describe('.start', () => {
        it('should create an AudioSourceObject for the game over music', () => {
            sinon.stub(scene, 'addObject');
            scene.start();
            expect(scene.addObject).to.have.been.calledWith(sinon.match(obj => obj instanceof AudioSourceObject && obj.name.match(/music/i)));
        });
    });

    describe('.handleEvent', () => {
        beforeEach(() => {
            scene.start();
        });

        it('should navigate to the title scene when enter is pressed', () => {
            sinon.stub(game, 'changeScene');
            scene.handleEvent({
                type: 'keyPressed',
                code: 'Enter',
                shiftPressed: false,
                ctrlPressed: false,
                altPressed: false
            });
            expect(game.changeScene).to.have.been.calledWith(sinon.match.instanceOf(TitleScene));
        });
        it('should navigate to the title scene when escape is pressed', () => {
            sinon.stub(game, 'changeScene');
            scene.handleEvent({
                type: 'keyPressed',
                code: 'Escape',
                shiftPressed: false,
                ctrlPressed: false,
                altPressed: false
            });
            expect(game.changeScene).to.have.been.calledWith(sinon.match.instanceOf(TitleScene));
        });
    });
});

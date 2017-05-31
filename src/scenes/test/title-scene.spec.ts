/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { TitleScene } from '../title-scene';
import { OverworldScene } from '../overworld-scene';
import { Game, AudioSourceObject } from '../../engine';
import { MockGame } from '../../engine/test';

describe('TitleScene', () => {
    let game: Game;
    let scene: TitleScene;
    beforeEach(() => {
        scene = new TitleScene();
        game = scene.game = <any>new MockGame(scene);
    });
    
    describe('.handleEvent', () => {
        beforeEach(() => {
            scene.start();
        });

        it('should navigate to the overworld scene when enter is pressed', () => {
            sinon.stub(game, 'changeScene');
            scene.handleEvent({
                type: 'keyPressed',
                code: 'Enter',
                shiftPressed: false,
                ctrlPressed: false,
                altPressed: false
            });
            expect(game.changeScene).to.have.been.calledWith(sinon.match.instanceOf(OverworldScene));
        });
    });
});

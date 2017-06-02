/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { TitleScene } from '../title-scene';
import { OverworldScene } from '../overworld-scene';
import { Game, AudioSourceObject } from '../../engine';
import { MockAgileGame } from '../../test/mock-agile-game';
import { AgileGame } from "agile-game";

describe('TitleScene', () => {
    let game: AgileGame;
    let scene: TitleScene;
    beforeEach(() => {
        scene = new TitleScene();
        game = scene.game = <any>new MockAgileGame(scene);
    });

    describe('.start', () =>{
        it('should create a new world', () => {
            scene.start();
            expect(scene.world).to.be.ok;
        });
        it('should create a new grid renderer', () => {
            scene.start();
            let gridRenderer = scene.findObject('GridRenderer');
            expect(gridRenderer).to.be.ok;
        });
        it('should create an AudioSourceObject for the music', () => {
            sinon.stub(scene, 'addObject');
            scene.start();
            expect(scene.addObject).to.have.been.calledWith(sinon.match(obj => obj instanceof AudioSourceObject && obj.name.match(/music/i)));
        });
        it('should set the score to 0', () => {
            game.score = <any>"Over 9000";
            scene.start();
            expect(game.score).to.be.eq(0);
        });
    });

    describe('.handleEvent', () => {
        it('should navigate to the overworld scene when enter is pressed', () => {
            scene.start();
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

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GameScene } from '../../engine/game-scene';
import { pauseWithGame } from '../pause-with-game';
import { GameObject } from '../../engine/game-object';
import { AgileGame } from '../../agile-game';
import { stubDocument, stubImage } from '../../engine/test';

describe('pauseWithGame', () => {
    stubDocument();
    stubImage();

    let context: CanvasRenderingContext2D;

    let game: AgileGame;
    let scene: GameScene;
    let obj: GameObject;
    beforeEach(() => {
        context = (new HTMLCanvasElement()).getContext("2d");
        game = new AgileGame();
        obj = new GameObject("test obj");
        game.changeScene(scene = new GameScene());
        scene.addObject(obj);
    });

    afterEach(() => {
        if (game.isRunning) game.stop();
    });

    it('set the onPause listener to a function that sets should tick to false for the passed in object', () =>{
        pauseWithGame(obj);
        obj.shouldTick = true;
        game.onPause.emit(void(0));
        expect(obj.shouldTick).to.be.false;
    });

    it('set the onPlay listener to a function that sets should tick to true for the passed in object', () => {
        pauseWithGame(obj);
        obj.shouldTick = false;
        game.onPlay.emit(void(0));
        expect(obj.shouldTick).to.be.true;
    });

});
/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Game, GameScene } from '../../engine';
import { MockGame, stubDocument, stubImage } from '../../engine/test';
import { gui } from '../gui-db';
import { handleGUIEvent } from '../../utils/gui';
import { Entity } from '../../entity';
import { OverworldScene } from '../../scenes/overworld-scene';
import { TitleScene } from '../../scenes/title-scene';

describe('dbs/gui', () => {
    stubDocument();
    stubImage();

    let game: Game;
    let scene: GameScene;
    beforeEach(() => {
        game = <any>new MockGame();
        (<any>game).scene = scene = new GameScene(game);
    });

    describe('inventory', () => {
        
    });

    describe('title', () => {
        let titleGui = gui['title'];

        it('should navigate to an OverworldScene when enter is pressed', () => {
            sinon.stub(game, 'changeScene');
            handleGUIEvent(<any>{
                type: 'keyPressed',
                code: 'Enter'
            }, game, titleGui);
            expect(game.changeScene).to.have.been.calledOnce.calledWith(sinon.match.instanceOf(OverworldScene));
        });
    });

    describe('game-over', () => {
        let gameOverGui = gui['game-over'];

        it('should navigate to a TitleScene when enter is pressed', () => {
            sinon.stub(game, 'changeScene');
            handleGUIEvent(<any>{
                type: 'keyPressed',
                code: 'Enter'
            }, game, gameOverGui);
            expect(game.changeScene).to.have.been.calledOnce.calledWith(sinon.match.instanceOf(TitleScene));
        });
        it('should navigate to a TitleScene when escape is pressed', () => {
            sinon.stub(game, 'changeScene');
            handleGUIEvent(<any>{
                type: 'keyPressed',
                code: 'Escape'
            }, game, gameOverGui);
            expect(game.changeScene).to.have.been.calledOnce.calledWith(sinon.match.instanceOf(TitleScene));
        });
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GridRenderer } from '../grid-renderer';
//import { AgileGame } from '../agile-game';
import { Game } from '../engine';
import { OverworldScene } from '../scenes/overworld-scene';
import { World } from '../world';
import { ResourceLoader } from '../engine';
import { MockGame, stubDocument, stubImage } from '../engine/test';
import { TILE_SIZE } from '../dbs/tile-db';
import { GameScene } from '../engine';

describe('GridRenderer', () => {
    stubDocument();
    stubImage();

    it('should start without a world', () =>{
        let renderer: GridRenderer = new GridRenderer();
        expect(renderer.world).not.to.be.ok;
    });

    describe('.addToScene', () => {
        it('should throw an error if the passed-in game is falsey', () => {
            let renderer = new GridRenderer();
            expect(() => renderer.addToScene(<any>null)).to.throw(/can only be added to .*Scene/i);
        });
        it('should throw an error if the passed-in game is not an instance of AgileGame', () => {
            let renderer = new GridRenderer();
            expect(() => renderer.addToScene(<any>{ key: 'fish!' })).to.throw(/can only be added to .*Scene/i);
        });
        it('should populate scene, game and world if a valid Scene is passed in', () => {
            let renderer = new GridRenderer();
            let scene = new OverworldScene();
            let game = scene.game = <any>new MockGame(scene);
            scene.start();

            renderer.addToScene(scene);
            expect(renderer.scene).to.deep.equal(scene);
            expect(renderer.game).to.deep.equal(game);
            expect(renderer.world).to.deep.equal(scene.world);
        });
    });

    describe('.renderImpl', () => {
        let context: CanvasRenderingContext2D;

        let game: Game;
        let scene: OverworldScene;
        beforeEach(() => {
            context = (new HTMLCanvasElement()).getContext("2d");
            scene = new OverworldScene();
            scene.game = game = <any>new MockGame(scene);
        });
        
        it('should call drawImage once per tile that can be rendered on the canvas', () => {
            scene.start();

            let world: World = scene.world;
            let renderer: GridRenderer = <GridRenderer>scene.findObject('GridRenderer');
            let [canvasWidth, canvasHeight] = game.canvasSize;
            let [tilesX, tilesY] = [Math.ceil(canvasWidth / TILE_SIZE), Math.ceil(canvasHeight / TILE_SIZE)];

            let stub = sinon.stub(context, "drawImage");

            renderer.render(context);
            expect(stub.callCount).to.be.within((tilesX * tilesY), ((tilesX + 1) * (tilesY + 1)));
        });
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GridRenderer } from '../grid-renderer';
import { AgileGame } from '../agile-game';
import { World } from '../world';
import { ResourceLoader } from '../engine';
import { stubDocument, stubImage } from '../engine/test';
import { TILE_SIZE } from '../dbs/tile-db';

describe('GridRenderer', () => {
    it('should start without a world, or resource loader', () =>{
        let renderer: GridRenderer = new GridRenderer();
        expect(renderer.world).not.to.be.ok;
        expect(renderer.loader).not.to.be.ok;
    });

    describe('.setGame', () => {
        it('should set the world, game, and renderer based on the object passed in', () => {
            let renderer = new GridRenderer();
            let game: AgileGame = <any>{ world: 'myWorld', resourceLoader: 'loader' };
            renderer.setGame(game);
            expect(renderer.game).to.deep.equal(game);
            expect(renderer.world).to.deep.equal(game.world);
            expect(renderer.loader).to.deep.equal(game.resourceLoader);
        });
    });

    describe('.render', () => {
        let context: CanvasRenderingContext2D;

        stubDocument();
        stubImage();

        let game: AgileGame;
        beforeEach(() => {
            context = (new HTMLCanvasElement()).getContext("2d");
            game = new AgileGame();
        });

        afterEach(() => {
            if (game.isRunning) game.stop();
        });


        it('should call drawImage once per tile in the world', () => {
            game.start();

            let world: World = game.world;
            let renderer: GridRenderer = game.gridRenderer;

            let stub = sinon.stub(context, "drawImage");

            renderer.render(context);
            expect(stub.callCount).to.be.within((world.tilesX * world.tilesY), ((world.tilesX+1) * (world.tilesY + 1)));
        });
    });
});

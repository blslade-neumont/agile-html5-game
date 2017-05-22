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
    stubDocument();
    stubImage();

    it('should start without a world', () =>{
        let renderer: GridRenderer = new GridRenderer();
        expect(renderer.world).not.to.be.ok;
    });

    describe('.addToGame', () => {
        it('should throw an error if the passed-in game is falsey', () => {
            let renderer = new GridRenderer();
            expect(() => renderer.addToGame(<any>null)).to.throw(/can only be added to .*AgileGame/i);
        });
        it('should throw an error if the passed-in game is not an instance of AgileGame', () => {
            let renderer = new GridRenderer();
            expect(() => renderer.addToGame(<any>{ key: 'fish!' })).to.throw(/can only be added to .*AgileGame/i);
        });
        it('should populate game and world if a valid AgileGame is passed in', () => {
            let renderer = new GridRenderer();
            let game: AgileGame = new AgileGame();
            renderer.addToGame(game);
            expect(renderer.game).to.deep.equal(game);
            expect(renderer.world).to.deep.equal(game.world);
        });
    });

    describe('.render', () => {
        let context: CanvasRenderingContext2D;
        
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
            let renderer: GridRenderer = <GridRenderer>game.findObject('GridRenderer');

            let stub = sinon.stub(context, "drawImage");

            renderer.render(context);
            expect(stub.callCount).to.be.within((world.tilesX * world.tilesY), ((world.tilesX+1) * (world.tilesY + 1)));
        });
    });
});

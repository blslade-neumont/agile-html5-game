/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GridRenderer } from '../grid-renderer';
import { Game } from '../game';
import { World } from '../world';
import { ResourceLoader } from '../resource-loader';
import { stubDocument } from './mock-document';
import { stubImage } from './mock-image';
import { stubCanvas } from './mock-canvas';
import { TILE_SIZE } from '../dbs/tile-db';

describe('GridRenderer', () => {

    it('should start without a world, or resource loader', () =>{
        let renderer: GridRenderer = new GridRenderer();
        expect(renderer.world).not.to.be.ok;
        expect(renderer.loader).not.to.be.ok;
    });

    describe('.setWorld', () => {
        it('should set the world based on the object passed in', () => {
            let world: World = new World();
            let renderer: GridRenderer = new GridRenderer();
            renderer.setWorld(world);
            expect(renderer.world).to.equal(world);
        });
    });

    describe('.render', () => {
        let context: CanvasRenderingContext2D;

        stubDocument();
        stubImage();
        stubCanvas();

        let game: Game;
        beforeEach(() => {
            context = (new HTMLCanvasElement()).getContext("2d");
            game = new Game(30, new HTMLCanvasElement());
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
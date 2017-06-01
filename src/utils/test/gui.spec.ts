/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GuiSpec } from '../../dbs/gui-db';
import { handleGUIEvent, tickGUI, drawGUI, drawItemStack } from '../gui';
import { Game, GameEvent, GameScene } from '../../engine';
import { MockGame } from '../../engine/test';
import * as engineUtils from '../../engine';
import * as guiUtils from '../gui';

let any = sinon.match.any;

describe('utils/handleGuiEvent', () => {
    let game: Game;
    beforeEach(() => {
        game = <any>new MockGame();
    });

    it('should return false if it does not handle the event', () => {
        let gui: GuiSpec = <any>{};
        let evt: GameEvent = <any>{ type: 'fake-event' };
        expect(handleGUIEvent(evt, game, gui)).to.be.false;
    });
    it('should return true if it handles the event', () => {
        let gui: GuiSpec = <any>{
            navigation: {
                'Enter': () => new GameScene()
            }
        };
        let evt: GameEvent = <any>{
            type: 'keyPressed',
            code: 'Enter'
        };
        expect(handleGUIEvent(evt, game, gui)).to.be.true;
    });
    it('should navigate to a new scene if the keyPressed event matches a navigation on the gui', () => {
        let navScene = new GameScene();
        let gui: GuiSpec = <any>{
            navigation: {
                'Enter': () => navScene
            }
        };
        let evt: GameEvent = <any>{
            type: 'keyPressed',
            code: 'Enter'
        };
        sinon.stub(game, 'changeScene');
        handleGUIEvent(evt, game, gui)
        expect(game.changeScene).to.have.been.calledOnce.calledWith(navScene);
    });
});

describe('utils/tickGUI', () => {
    it('should not throw an error', () => {
        expect(() => tickGUI(.02, <any>{}, <any>{})).not.to.throw;
    });
});

describe('utils/drawGUI', () => {
    let context: CanvasRenderingContext2D;
    let drawSpriteStub: sinon.SinonStub;
    let measureSpriteStub: sinon.SinonStub;
    let game: Game;
    beforeEach(() => {
        context = new HTMLCanvasElement().getContext("2d");
        drawSpriteStub = sinon.stub(engineUtils, 'drawSprite');
        measureSpriteStub = sinon.stub(engineUtils, 'measureSprite');
        game = <any>new MockGame();
    });
    afterEach(() => {
        if (drawSpriteStub) drawSpriteStub.restore();
        if (measureSpriteStub) measureSpriteStub.restore();
    });

    it('should fill the screen with a black overlay', () => {
        let gui = { sprite: { src: 'blah' } };
        sinon.stub(context, 'fillRect');
        game.canvasSize = [924, 12];
        drawGUI(context, game, gui);
        expect(context.fillRect).to.have.been.calledOnce.calledWith(0, 0, game.canvasSize[0], game.canvasSize[1]);
    });
    it('should draw the sprite specified in the gui', () => {
        let sprite = { src: 'blah' };
        let gui = { sprite: sprite };
        drawGUI(context, game, gui);
        expect(engineUtils.drawSprite).to.have.been.calledOnce.calledWith(any, any, sprite);
    });
    it('should draw the sprite at the center of the screen', () => {
        let gui = { sprite: { src: 'blah' } };
        measureSpriteStub.returns({ width: 100, height: 60 });
        game.canvasSize = [924, 12];
        drawGUI(context, game, gui);
        expect(engineUtils.drawSprite).to.have.been.calledOnce.calledWith(any, any, any, (924 / 2) - (100 / 2), (12 / 2) - (60 / 2));
    });
    it('should call drawSprite once for the gui, and once again for each item stack in the gui', () => {
        let gui = {
            sprite: { src: 'blah' },
            itemSlots: [
                { x: 5, y: 5 },
                { x: 15, y: 5 },
                { x: 25, y: 5 }
            ]
        };
        drawGUI(context, game, gui);
        expect(drawSpriteStub.callCount).to.eq(4);
    });
});

describe('utils/drawItemStack', () => {
    let context: CanvasRenderingContext2D;
    let drawSpriteStub: sinon.SinonStub;
    let measureSpriteStub: sinon.SinonStub;
    let game: Game;
    beforeEach(() => {
        context = new HTMLCanvasElement().getContext("2d");
        drawSpriteStub = sinon.stub(engineUtils, 'drawSprite');
        measureSpriteStub = sinon.stub(engineUtils, 'measureSprite');
        game = <any>new MockGame();
    });
    afterEach(() => {
        if (drawSpriteStub) drawSpriteStub.restore();
        if (measureSpriteStub) measureSpriteStub.restore();
    });

    it('should draw the sprite specified by the item', () => {
        let sprite = { src: 'chocolate.milk' };
        drawItemStack(context, game, { sprite: sprite }, 0, 0);
        expect(engineUtils.drawSprite).to.have.been.calledOnce.calledWith(any, any, sprite);
    });
    it('should draw the sprite at the specified position', () => {
        drawItemStack(context, game, { sprite: { src: 'chocolate.milk' } }, 14, 28);
        expect(engineUtils.drawSprite).to.have.been.calledOnce.calledWith(any, any, any, 14, 28);
    });
    it('should throw an error if the count is not 1', () => {
        expect(() => drawItemStack(context, game, { sprite: { src: 'chocolate.milk' } }, 0, 0, 2)).to.throw(/not implemented.*item stack.*count/i);
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Game, GameScene, GameObject } from '../engine';
import { MenuGuiObject } from '../menu-gui-object';
import { MockGame, MockEventQueue } from '../engine/test';
import * as guiUtils from '../utils/gui';
import { MockWorld } from './mock-world';
import { Player } from '../player';
import { gui } from '../dbs/gui-db';
import { items } from '../dbs/item-db';

let sampleGui = {
    sprite: {
        src: 'chocolate.milk'
    }
};

describe('MenuGuiObject', () => {
    let game: Game;
    let scene: GameScene;
    beforeEach(() => {
        game = <any>new MockGame();
        scene = new GameScene(game);
    });

    describe('.renderCamera', () => {
        let guiObj: MenuGuiObject;
        it(`should start as 'none'`, () => {
            let guiObj = new MenuGuiObject(sampleGui);
            expect(guiObj.renderCamera).to.eq('none');
        });
    });

    describe('.handleEvent', () => {
        describe('Inventory Selection', () => {
            let guiObj: MenuGuiObject;
            beforeEach(() => {
                guiObj = new MenuGuiObject(gui['inventory']);
                scene.addObject(new Player());
                scene.addObject(guiObj);
            });

            it('should set the current item to the leftward item if the A key is pressed', () => {
                let item = guiObj.currentItem;
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'KeyA' });
                expect(item).to.be.eq(guiObj.Gui.itemSlots[guiObj.currentItem.rightIndex]);
            });

            it('should set the current item to the leftward item if the left arrow key is pressed', () => {
                let item = guiObj.currentItem;
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'ArrowLeft' });
                expect(item).to.be.eq(guiObj.Gui.itemSlots[guiObj.currentItem.rightIndex]);
            });

            it('should set the current item to the rightward item if the D key is pressed', () => {
                let item = guiObj.currentItem;
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'KeyD' });
                expect(item).to.be.eq(guiObj.Gui.itemSlots[guiObj.currentItem.leftIndex]);
            });

            it('should set the current item to the rightward item if the right arrow key is pressed', () => {
                let item = guiObj.currentItem;
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'ArrowRight' });
                expect(item).to.be.eq(guiObj.Gui.itemSlots[guiObj.currentItem.leftIndex]);
            });

            it('should set the current item to the downward item if the S key is pressed', () => {
                let item = guiObj.currentItem;
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'KeyS' });
                expect(item).to.be.eq(guiObj.Gui.itemSlots[guiObj.currentItem.upIndex]);
            });

            it('should set the current item to the downward item if the down arrow key is pressed', () => {
                let item = guiObj.currentItem;
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'ArrowDown' });
                expect(item).to.be.eq(guiObj.Gui.itemSlots[guiObj.currentItem.upIndex]);
            });

            it('should set the current item to the upward item if the W key is pressed', () => {
                let item = guiObj.currentItem;
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'KeyW' });
                expect(item).to.be.eq(guiObj.Gui.itemSlots[guiObj.currentItem.downIndex]);
            });

            it('should set the current item to the upward item if the up arrow key is pressed', () => {
                let item = guiObj.currentItem;
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'ArrowUp' });
                expect(item).to.be.eq(guiObj.Gui.itemSlots[guiObj.currentItem.downIndex]);
            });

            it('should use the selected item when enter is pressed on a valid item', () => {
                guiObj.inventory.addItem(items['crop_carrot']);
                let stub = sinon.stub(guiObj.inventory.items[0], 'onUse'); 
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'Enter' });
                expect(stub).to.have.been.calledOnce;
            });

            it('should remove the selected item when enter is pressed on a valid item', () => {
                guiObj.inventory.addItem(items['crop_carrot']);
                sinon.stub(guiObj.inventory, 'removeItem');
                guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'Enter' });
                expect(guiObj.inventory.removeItem).to.have.been.calledOnce;
            });

            it('should neither remove nor use any items when enter is pressed on a non-item', () => {
                sinon.stub(guiObj.inventory, 'removeItem');
                expect(() => guiObj.handleEvent(<any>{ type: 'keyTyped', code: 'Enter' })).to.not.throw;
                expect(guiObj.inventory.removeItem).not.to.have.been.called;
            });
        });

        it('should call GameObject.handleEvent', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'handleEvent');
                let guiObj = new MenuGuiObject(sampleGui);
                guiObj.handleEvent(<any>{ type: 'fakeEvent' });
                expect(GameObject.prototype.handleEvent).to.have.been.calledOnce;
            } finally { if (stub) stub.restore(); }
        });
        it('should return true if GameObject handles the event', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'handleEvent').returns(true);
                let guiObj = new MenuGuiObject(sampleGui);
                expect(guiObj.handleEvent(<any>{ type: 'fakeEvent' })).to.be.true;
            } finally { if (stub) stub.restore(); }
        });
        it('should not call handleGUIEvent if GameObject handles the event', () => {
            let stub: sinon.SinonStub;
            let stub2: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'handleEvent').returns(true);
                stub2 = sinon.stub(guiUtils, 'handleGUIEvent');
                let guiObj = new MenuGuiObject(sampleGui);
                guiObj.handleEvent(<any>{ type: 'fakeEvent' });
                expect(guiUtils.handleGUIEvent).not.to.have.been.called;
            } finally {
                if (stub) stub.restore();
                if (stub2) stub2.restore();
            }
        });
        it('should call handleGuiEvent if GameObject does not handle the event', () => {
            let stub: sinon.SinonStub;
            let stub2: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'handleEvent').returns(false);
                stub2 = sinon.stub(guiUtils, 'handleGUIEvent');
                let guiObj = new MenuGuiObject(sampleGui);
                guiObj.handleEvent(<any>{ type: 'fakeEvent' });
                expect(guiUtils.handleGUIEvent).to.have.been.calledOnce;
            } finally {
                if (stub) stub.restore();
                if (stub2) stub2.restore();
            }
        });
        it('should return true if the event is handled by handleGuiEvent', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(guiUtils, 'handleGUIEvent').returns(true);
                let guiObj = new MenuGuiObject(sampleGui);
                expect(guiObj.handleEvent(<any>{ type: 'fakeEvent' })).to.be.true;
            } finally { if (stub) stub.restore(); }
        });
        it('should return false if the event is not handled', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(guiUtils, 'handleGUIEvent').returns(false);
                let guiObj = new MenuGuiObject(sampleGui);
                expect(guiObj.handleEvent(<any>{ type: 'fakeEvent' })).to.be.false;
            } finally { if (stub) stub.restore(); }
        });
    });
    
    describe('.tick', () => {
        it('should call GameObject.tick', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'tick');
                let guiObj = new MenuGuiObject(sampleGui);
                guiObj.tick(.02);
                expect(GameObject.prototype.tick).to.have.been.calledOnce;
            } finally { if (stub) stub.restore(); }
        });
        it('should call handleGuiEvent', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(guiUtils, 'tickGUI');
                let guiObj = new MenuGuiObject(sampleGui);
                guiObj.tick(.02);
                expect(guiUtils.tickGUI).to.have.been.calledOnce;
            } finally { if (stub) stub.restore(); }
        });
    });

    describe('.renderImpl', () => {
        let context: CanvasRenderingContext2D;
        beforeEach(() => {
            context = new HTMLCanvasElement().getContext('2d');
        });

        it('should not call MenuGuiObject.renderImpl', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(GameObject.prototype, 'renderImpl');
                let guiObj = new MenuGuiObject(sampleGui);
                guiObj.tick(.02);
                expect((<any>GameObject.prototype).renderImpl).not.to.have.been.called;
            } finally { if (stub) stub.restore(); }
        });
        it('should call drawGUI', () => {
            let stub: sinon.SinonStub;
            try {
                stub = sinon.stub(guiUtils, 'drawGUI');
                let guiObj = new MenuGuiObject(sampleGui);
                (<any>guiObj).renderImpl(<any>null);
                expect(guiUtils.drawGUI).to.have.been.calledOnce;
            } finally { if (stub) stub.restore(); }
        });
    });
});

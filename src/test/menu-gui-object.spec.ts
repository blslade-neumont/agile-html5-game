/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Game, GameScene, GameObject } from '../engine';
import { MenuGuiObject } from '../menu-gui-object';
import { MockGame } from '../engine/test';
import { stubDocument, stubImage } from '../engine/test';
import * as guiUtils from '../utils/gui';

let sampleGui = {
    sprite: {
        src: 'chocolate.milk'
    }
};

describe('MenuGuiObject', () => {
    stubDocument();
    stubImage();

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

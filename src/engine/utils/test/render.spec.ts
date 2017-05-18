/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { fillText } from '../render';
import { stubCanvas } from '../../test/mock-canvas';

describe('utils/fillText', () => {
    stubCanvas();

    let context: CanvasRenderingContext2D;
    beforeEach(() => {
        context = new HTMLCanvasElement().getContext("2d");
    });

    it('should split strings on new lines and render to context', () => {
        expect(() => fillText(context, "和書委\n和書委\n和書委\n和書委", 0, 0)).not.to.throw;
    });

    it('should invoke context.renderText for every line of text', () => {
        sinon.stub(context, 'fillText');
        fillText(context, 'a\nb\nHello\nWorld', 0, 0);
        let subject = expect(context.fillText).to.have.been;
        subject.callCount(4);
        subject.calledWith('a');
        subject.calledWith('b');
        subject.calledWith('Hello');
        subject.calledWith('World');
    });
});

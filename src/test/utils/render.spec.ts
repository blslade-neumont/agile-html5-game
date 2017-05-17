/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { fillText } from '../../utils/render';
import { stubCanvas } from '../mock-canvas';

describe('utils/fillText', () => {
    stubCanvas();

    it('should split strings on new lines and render to context', () => {
        expect(() => fillText(new HTMLCanvasElement().getContext("2d"), "和書委\n和書委\n和書委\n和書委", 0, 0)).not.to.throw();
    });
});


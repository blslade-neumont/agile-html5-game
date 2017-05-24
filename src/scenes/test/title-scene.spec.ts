/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { TitleScene } from '../title-scene';
import { Game } from '../../engine';

describe('TitleScene', () => {
    let game: Game;
    let scene: TitleScene;
    beforeEach(() => {
        scene = new TitleScene();
        scene.game = game = <any>{ scene: scene };
    });

    
});

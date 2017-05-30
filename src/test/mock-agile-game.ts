import { GameScene } from '../engine';
import { MockGame } from '../engine/test';

export class MockAgileGame extends MockGame {
    constructor(scene?: GameScene) {
        super(scene);
    }

    onPause = {
        emit: () => void(0),
        addListender: () => void(0)
    };
    onPlay = {
        emit: () => void(0),
        addListender: () => void(0)
    };

    score = 0;
    addToScore(val: number) {
        this.score += val;
    }
}

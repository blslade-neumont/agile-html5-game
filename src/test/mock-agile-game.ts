import { MockGame } from '../engine/test';

export class MockAgileGame extends MockGame {
    onPause = {
        emit: () => void(0),
        addListender: () => void(0)
    };
    onPlay = {
        emit: () => void(0),
        addListender: () => void(0)
    };
}

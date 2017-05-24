import { GameScene } from '../game-scene';
import { EventQueue } from '../event-queue';
import { ResourceLoader } from '../resource-loader';

export class MockGame {
    constructor(private scene: GameScene = null) {
    }

    changeScene(scene: GameScene) {
        this.scene = scene;
    }

    resourceLoader = new ResourceLoader();
    eventQueue = new EventQueue();

    isRunning = true;

    canvasSize = [640, 480];
}

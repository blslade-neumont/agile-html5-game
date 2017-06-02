import { GameScene } from '../game-scene';
import { EventQueue } from '../event-queue';
import { ResourceLoader } from '../resource-loader';

export class MockGame {
    constructor(scene: GameScene = null) {
        if (scene) this.changeScene(scene);
    }

    scene = null;
    changeScene(scene: GameScene) {
        this.scene = scene;
        scene.game = <any>this;
    }

    resourceLoader = new ResourceLoader();
    eventQueue = new EventQueue();

    isRunning = true;

    canvasSize = [640, 480];
}

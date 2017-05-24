import { Game, FollowCamera, GameScene } from './engine';
import { TilePreloadStrategy } from './preload-strategies/tile-preload-strategy';
import { AlivePreloadStrategy } from './preload-strategies/alive-preload-strategy';
import { FlockingScene } from './scenes/flocking-scene';

export class RtsGame extends Game {
    constructor(framesPerSecond = 30) {
        super(framesPerSecond);
        this.resourceLoader.addPreloadStrategy(new TilePreloadStrategy());
        this.resourceLoader.addPreloadStrategy(new AlivePreloadStrategy());
    }
    
    start() {
        super.start();
        this.changeScene(new FlockingScene());
    }
}

import { Game, EventEmitter } from './engine';
import { World } from './world';
import { TilePreloadStrategy } from './preload-strategies/tile-preload-strategy';
import { ItemPreloadStrategy } from './preload-strategies/item-preload-strategy';
import { AlivePreloadStrategy } from './preload-strategies/alive-preload-strategy';
import { GuiPreloadStrategy } from './preload-strategies/gui-preload-strategy';
import { TitleScene } from './scenes/title-scene';

export class AgileGame extends Game {
    constructor(framesPerSecond = 30) {
        super(framesPerSecond);
        this.resourceLoader.addPreloadStrategy(new TilePreloadStrategy());
        this.resourceLoader.addPreloadStrategy(new ItemPreloadStrategy());
        this.resourceLoader.addPreloadStrategy(new AlivePreloadStrategy());
        this.resourceLoader.addPreloadStrategy(new GuiPreloadStrategy());
    }

    private _pause = new EventEmitter<void>();
    get onPause() {
        return this._pause;
    }
    private _play = new EventEmitter<void>();
    get onPlay() {
        return this._play;
    }

    start() {
        super.start();
        this.changeScene(new TitleScene());
    }
}

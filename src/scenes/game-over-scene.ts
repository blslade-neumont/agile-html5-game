import { GameScene, AudioSourceObject } from '../engine';
import { MenuGuiObject } from '../menu-gui-object';
import { sfx } from '../dbs/sfx-db';

export class GameOverScene extends GameScene {
    constructor() {
        super();
    }

    start() {
        super.start();

        this.addObject(new MenuGuiObject('game-over'));

        this.addObject(new AudioSourceObject('Music', sfx['gameOverMusic']));
        
        this.camera.clearColor = 'black';
    }
}

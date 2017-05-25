import { GameScene } from '../engine';
import { MenuGuiObject } from '../menu-gui-object';

export class TitleScene extends GameScene {
    constructor() {
        super();
    }

    start() {
        super.start();

        this.addObject(new MenuGuiObject('game-over'));
        
        this.camera.clearColor = 'black';
    }
}

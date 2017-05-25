import { GameScene, GameObject, FollowCamera } from '../engine';
import { World } from '../world';
import { MenuGuiObject } from '../menu-gui-object';
import { GridRenderer } from '../grid-renderer';

export class TitleScene extends GameScene {
    constructor() {
        super();
    }

    private _world: World;
    get world() {
        return this._world;
    }
    
    start() {
        super.start();

        this._world = new World();
        this.addObject(this._world);
        this.addObject(new GridRenderer());

        this.addObject(new MenuGuiObject('title'));

        let cameraFollowObject = new GameObject("CameraFollowObject", {
            direction: -30,
            speed: 4 * 30,
            shouldRender: false
        });
        this.addObject(cameraFollowObject);

        let camera = this.camera = new FollowCamera(this);
        camera.follow = cameraFollowObject;
        camera.enableSmoothing = false;
    }
}

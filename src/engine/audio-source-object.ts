import { GameObject, GameObjectOptions } from './game-object';
import { GameScene } from './game-scene';
import { AudioT } from './utils/audio';
import merge = require('lodash.merge');

export interface AudioSourceObjectOptions extends GameObjectOptions {
    shouldLoop?: boolean
}

export class AudioSourceObject extends GameObject {
    constructor(name: string, private audio: AudioT, opts: AudioSourceObjectOptions = {}) {
        super(name, merge({
            shouldRender: false
        }, opts));

        if (typeof opts.shouldLoop !== 'undefined') this._shouldLoop = opts.shouldLoop;
    }

    private _shouldLoop = false;
    get shouldLoop() {
        return this._shouldLoop;
    }

    addToScene(scene: GameScene) {
        super.addToScene(scene);

        let theirAudio = this.resources.loadAudio(this.audio.src);
        this.myAudio = document.createElement('audio');
        this.myAudio.src = theirAudio.src;
        this.myAudio.onended = () => {
            if (this._shouldLoop) this.myAudio.play();
            else this.scene.removeObject(this);
        };
        if (this.game.scene == scene) this.myAudio.play();
    }

    private myAudio: HTMLAudioElement;

    onSceneEnter() {
        if (this.myAudio.paused) this.myAudio.play();
    }
    onSceneExit() {
        if (!this.myAudio.paused) this.myAudio.pause();
    }
}

import { GameObject } from '../engine';

export function pauseWithGame(gobj: GameObject) {
    let game = gobj.game;
    let onPause = (<any>game).onPause;
    let onPlay = (<any>game).onPlay;
    if (onPause && onPlay) {
        onPause.addListener(() => gobj.shouldTick = false);
        onPlay.addListener(() => gobj.shouldTick = true);
    }
}

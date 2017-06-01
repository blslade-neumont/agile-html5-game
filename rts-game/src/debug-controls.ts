import { GameObject, GameScene, fillText } from './engine';

export class DebugControls extends GameObject {
    constructor() {
        super('DebugControls', { renderCamera: 'none' });
    }

    addToScene(scene: GameScene) {
        super.addToScene(scene);
        let objsWithControls = <{ debugControls: any[] }[]><any[]>scene.findObjects(obj => (<any>obj).debugControls);
        this.controls = () => {
            return [].concat.apply([], objsWithControls.map(obj => obj.debugControls));
        };
    }

    private controls: () => any[];

    renderImpl(context: CanvasRenderingContext2D) {
        let controlsStr = this.controls()
            .map(c => {
                let state = typeof c.state === 'undefined' || c.state == null ? '' :
                                                 typeof c.state !== 'boolean' ? `${c.state}` :
                                                                      c.state ? 'on' :
                                                                                'off';
                return ((c.key && `${c.key} - `) || '') + c.name + ((state && `: ${state}`) || '')
            })
            .join('\n');

        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.fillStyle = 'white';
        fillText(context, controlsStr, 4, 4);
    }
}

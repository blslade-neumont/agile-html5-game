import { fillText } from './utils/render';
import { PreloadStrategy } from './utils/preload-strategy';

const DEBUG_RESOURCES = false;

export class ResourceLoader {
    constructor() {
    }

    addPreloadStrategy(strategy: PreloadStrategy) {
        strategy.preload(this);
    }
    
    private _resourcesLoaded = 0;
    get resourcesLoaded() {
        return this._resourcesLoaded;
    }
    private _resourcesLoading = 0;
    get totalResources() {
        return this._resourcesLoading;
    }
    private _errors: string[] = [];
    get error() {
        return this._errors.join('\n');
    }

    get isDone() {
        return this.totalResources == this.resourcesLoaded && !this.error;
    }

    private _images = new Map<string, HTMLImageElement>();

    loadImage(src: string) {
        if (this._images.has(src)) return this._images.get(src);

        this._resourcesLoading++;
        if (DEBUG_RESOURCES) console.log(`Loading resource: '${src}'`);
        let img = new Image();
        this._images.set(src, img);
        img.onload = () => {
            this._resourcesLoaded++;
        };
        img.onerror = (e) => {
            this._errors.push(`ERROR: Could not load ${src}`);
        };
        img.src = src;
        return img;
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = 'grey';
        context.fillRect(0, 0, 640, 480);
        
        if (this.totalResources > 0) {
            context.fillStyle = 'white';
            context.fillRect(4, 4, 100, 4);
            context.fillStyle = 'black';
            context.fillRect(4, 4, 100 * (this.resourcesLoaded / this.totalResources), 4);
        }

        let msg = `${this.resourcesLoaded}/${this.totalResources}`;
        if (this._errors.length) msg += '\n' + this.error;
        context.textBaseline = 'top';
        context.textAlign = 'left';
        context.fillStyle = 'black';
        fillText(context, msg, 4, 12);
    }
}

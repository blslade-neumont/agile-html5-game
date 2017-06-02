import { fillText } from './utils/render';
import { PreloadStrategy } from './utils/preload-strategy';

export class ResourceLoader {
    constructor() {
        let pathParts = window.location.pathname.split('/');
        this._baseUrl = window.location.origin + (pathParts[pathParts.length - 1] == 'index.html' ? pathParts.slice(0, pathParts.length - 1) : pathParts).join('/');
        if (this._baseUrl.startsWith('null/')) this._baseUrl = 'file:///' + this._baseUrl.slice(5);
    }

    private DEBUG_RESOURCES = false;
    
    addPreloadStrategy(strategy: PreloadStrategy) {
        strategy.preload(this);
    }

    private _baseUrl: string;
    get baseUrl() {
        return this._baseUrl;
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
        src = this.resolvePath(src);
        if (this._images.has(src)) return this._images.get(src);

        this._resourcesLoading++;
        if (this.DEBUG_RESOURCES) console.log(`Loading image: '${src}'`);
        let img = document.createElement('img');
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
    private _audio = new Map<string, HTMLAudioElement>();
    loadAudio(src: string) {
        src = this.resolvePath(src);
        if (this._audio.has(src)) return this._audio.get(src);

        this._resourcesLoading++;
        if (this.DEBUG_RESOURCES) console.log(`Loading audio: '${src}'`);
        let aud = document.createElement('audio');
        this._audio.set(src, aud);
        aud.onloadeddata = () => {
            this._resourcesLoaded++;
        };
        aud.onerror = (e) => {
            this._errors.push(`ERROR: Could not load ${src}`);
        };
        aud.src = src;
        return aud;
    }

    private resolvePath(src: string) {
        if (src.match(/^[a-z]:\/\//i)) return src;
        if (src.startsWith('/')) return `${this.baseUrl}${src}`;
        else return `${this.baseUrl}/${src}`;
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = 'grey';
        context.fillRect(0, 0, context.canvas.scrollWidth, context.canvas.scrollHeight);
        
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

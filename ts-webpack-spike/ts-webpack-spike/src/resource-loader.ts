import { items } from './dbs/item-db';
import { tiles } from './dbs/tile-db';

export class ResourceLoader {
    constructor() {
        this.init();
    }
    private init() {
        this.loadTiles();
        this.loadItems();
    }

    loadTiles() {
        for (let tile of tiles) {
            this.loadImage(tile.sprite.src)
        }
    }
    loadItems() {
        for (let item of items) {
            this.loadImage(item.sprite.src)
        }
    }

    private _resourcesLoaded = 0;
    get resourcesLoaded() {
        return this._resourcesLoaded;
    }
    private _resourcesLoading = 0;
    get totalResources() {
        return this._resourcesLoading;
    }
    private _error: string = null;
    get error() {
        return this._error;
    }

    get isDone() {
        return this.totalResources == this.resourcesLoaded && !this.error;
    }

    private _images = new Map<string, HTMLImageElement>();

    loadImage(src: string) {
        if (this._images.has(src)) return this._images.get(src);

        this._resourcesLoading++;
        console.log(`Loading resource: '${src}'`);
        let img = new Image();
        this._images.set(src, img);
        img.onload = () => {
            this._resourcesLoaded++;
        };
        img.onerror = (e) => {
            this._error = e.message;
            this._resourcesLoaded++;
        }
        img.src = src;
        return img;
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = 'grey';
        context.fillRect(0, 0, 640, 480);
        
        if (this.totalResources > 0 && !this.error) {
            context.fillStyle = 'white';
            context.fillRect(4, 4, 100, 4);
            context.fillStyle = 'black';
            context.fillRect(4, 4, 100 * (this.resourcesLoaded / this.totalResources), 4);
        }

        let msg = this.error || `${this.resourcesLoaded}/${this.totalResources}`;
        context.textBaseline = 'top';
        context.textAlign = 'left';
        context.fillStyle = 'black';
        context.fillText(msg, 4, 12);
    }
}

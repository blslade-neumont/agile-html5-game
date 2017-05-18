import { ResourceLoader } from '../resource-loader';

export interface PreloadStrategy {
    preload(loader: ResourceLoader);
}

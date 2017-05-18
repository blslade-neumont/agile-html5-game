import { SpriteT } from '../engine';

export interface Alive {
    sprite: SpriteT,
};

export let alives: { [name: string]: Alive } =
    {
        katie_south: {
            sprite: {
                src: 'images/Alive/Katie.png',
                tileset: { width: 32, height: 32, tilex: 0, tiley: 0 }
            }
        }
    };

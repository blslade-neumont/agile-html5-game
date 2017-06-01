import { AudioT } from '../engine';

export const ITEM_SIZE: number = 24;

export let sfx: { [name: string]: AudioT } =
    {
        titleScreenMusic: { src: 'audio/music/Town1.ogg' },
        overworldMusic: { src: 'audio/music/Airship.ogg' },
        dungeonMusic: { src: 'audio/music/Dungeon1.ogg' },
        gameOverMusic: { src: 'audio/music/Gameover2.ogg' },

        teleport: { src: 'audio/sfx/Absorb2.ogg' },
        playerDeath: { src: 'audio/sfx/Cry2.ogg' },
        playerDamage: { src: 'audio/sfx/Scream.ogg' },
        explode: { src: 'audio/sfx/Explosion1.ogg' }
    };

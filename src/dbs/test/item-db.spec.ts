/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GameItem, items } from '../item-db';
import { Player } from '../../player';
import { GameScene, AudioSourceObject } from '../../engine';
import { AgileGame } from '../../agile-game';
import { MockAgileGame } from '../../test/mock-agile-game';

describe('dbs/items', () => {
    let player: Player;
    let game: AgileGame;
    let scene: GameScene;
    beforeEach(() => {
        player = new Player({ maxHealth: 1000, currentHealth: 100 });
        scene = new GameScene();
        game = <any>new MockAgileGame(scene);
        player.addToScene(scene);
    });

    let healingItems: [string, number, RegExp][] = [
        ['crop_carrot', 300, /heal/i],
    ];
    healingItems.forEach(([itemType, recoverAmount, audioRegexp]) => {
        describe(itemType, () => {
            it(`onUse should invoke recover with ${recoverAmount}`, () => {
                sinon.stub(player, 'recoverDamage');
                items[itemType].onUse(player);
                expect(player.recoverDamage).to.have.been.calledOnce.calledWith(recoverAmount);
            });
            it('should play a sound when the player lands', () => {
                sinon.spy(scene, 'addObject');
                items[itemType].onUse(player);
                expect(scene.addObject).to.have.been.calledOnce.calledWith(sinon.match(obj => obj instanceof AudioSourceObject && obj.name.match(audioRegexp)));
            });
        });
    });
});

/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GameItem, items } from '../item-db';
import { Player } from '../../player';

describe('dbs/items', () => {
    let player: Player;
    beforeEach(() => {
        player = new Player({ maxHealth: 1000, currentHealth: 100 });
    });

    let healingItems: [string, number][] = [
        ['crop_carrot', 300],
    ];
    healingItems.forEach(([itemType, recoverAmount]) => {
        describe(itemType, () => {
            it(`onUse should invoke recover with ${recoverAmount}`, () => {
                sinon.stub(player, 'recoverDamage');
                items[itemType].onUse(player);
                expect(player.recoverDamage).to.have.been.calledOnce.calledWith(recoverAmount);
            });
        });
    });
});

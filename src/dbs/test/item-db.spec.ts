/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { GameItem, items } from '../item-db';
import { Player } from '../../player';

describe('dbs/items', () => {
    let healingItems: [string, number][] = [
        ['crop_carrot', 300],
    ];
    let player: Player;
    beforeEach(() => {
        player = new Player({ maxHealth: 1000, currentHealth: 100 });
    });

    healingItems.forEach(([itemType, recoverAmount]) => {
        describe(itemType, () => {
            xit(`should invoke GameItem.onUse with ${recoverAmount}`, () => {
                player.inventory.addItem(items[itemType]);
                // some sort of use method here
                expect(items[itemType].onUse).to.have.been.calledOnce.calledWith(recoverAmount);
            });
        });
    });
});
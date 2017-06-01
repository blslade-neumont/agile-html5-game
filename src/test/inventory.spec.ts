/// <reference types="mocha" />

import { expect, use } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
use(sinonChai);

import { Inventory } from '../inventory';
import { GameItem, items } from '../dbs/item-db';

describe('Inventory', () => {
    let inventory: Inventory;
    let carrot: GameItem;
    beforeEach(() => {
        carrot = items['crop_carrot'];
        inventory = new Inventory();
    });

    describe('.currentItemCount', () => {
        it('should return the correct amount of items in an inventory', () => {
            let itemAmount = 5;
            for (let j = 0; j < itemAmount; ++j) {
                inventory.addItem(carrot);
            }
            expect(inventory.currentItemCount).to.be.eq(itemAmount);
        });
        it('should increment every time an item is added to the inventory', () => {
            let itemAmount = 5;
            for (let j = 0; j < itemAmount; ++j) {
                inventory.addItem(carrot);
            }
            expect(inventory.currentItemCount).to.be.eq(itemAmount);
            inventory.addItem(carrot);
            expect(inventory.currentItemCount).to.be.eq(itemAmount + 1);
        });
        it('should decrement every time an item is removed from the inventory', () => {
            let itemAmount = 5;
            for (let j = 0; j < itemAmount; ++j) {
                inventory.addItem(carrot);
            }
            expect(inventory.currentItemCount).to.be.eq(itemAmount);
            inventory.removeItem(carrot);
            expect(inventory.currentItemCount).to.be.eq(itemAmount - 1);
        });
    });

    describe('.containsItem', () => {
        it('should return true if the item is in the inventory', () => {
            inventory.addItem(carrot);
            expect(inventory.containsItem(carrot)).to.be.true;
        });
        it('should return false if the item is not in the inventory', () => {
            expect(inventory.containsItem(carrot)).to.be.false;
        });
    });

    describe('.addItem', () => {
        it('should add an item to the inventory', () => {
            inventory.addItem(carrot);
            expect(inventory.items[0]).to.be.equal(carrot);
        });
        it('should return false when attempting to add too many items to an inventory', () => {
            for (let j = 0; j < inventory.MAX_ITEM_COUNT; ++j) {
                inventory.addItem(carrot);
            }
            expect(inventory.addItem(carrot)).to.be.false;
        });
    });
    describe('.removeItem', () => {
        it('should remove an item to the inventory', () => {
            inventory.addItem(carrot);
            inventory.removeItem(carrot);
            expect(inventory.items.length).to.be.equal(0);
        });
        it('should throw an error when removing an item that is not in the inventory', () => {
            expect(() => inventory.removeItem(carrot)).to.throw(/remove an item that was not in the inventory/i);
        });
    });
});
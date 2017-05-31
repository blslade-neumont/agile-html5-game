import { GameItem } from './dbs/item-db';


export class Inventory {
    constructor() {

    }

    private _items: GameItem[] = [];
    get items() {
        return this._items;
    }

    addItem(newItem: GameItem) {
        this.items.push(newItem);
    }

    removeItem(itemToRemove: GameItem) {
        this.items.splice(this.items.indexOf(itemToRemove), 1);
    }
}
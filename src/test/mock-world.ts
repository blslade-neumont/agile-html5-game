

export class MockWorld {
    private _tiles: string[] = [];
    constructor(...tiles: string[]) { this._tiles = tiles; }

    getTileAt(x: number, y: number) {
        return { sprite: { src: "FAKE_TILE" }, isSolid: (y >= 0 && y < this._tiles.length && x >= 0 && x < this._tiles[y].length) && (this._tiles[y][x] == 'X') };
    }
}

import { EnemyController } from './enemy-controller';

export function keyFromCoords(x: number, y: number) {
    return `${x}_${y}`;
}

export class Node {
    constructor(readonly controller: EnemyController, readonly x: number, readonly y: number) {
    }
    
    private static neighborOffsets: [number, number][] = [
        [0, -1],
        [-1, 0],
        [1, 0],
        [0, 1]
    ];
    private static dependentNeighborOffsets: [number[], [number, number]][] = [
        [[0, 1], [-1, -1]],
        [[0, 2], [1, -1]],
        [[3, 1], [-1, 1]],
        [[3, 2], [1, 1]]
    ];
    private _neighbors: Node[] | null = null;
    get neighbors(): Node[] {
        if (!this._neighbors) {
            let temp = Node.neighborOffsets.map(([offx, offy]) => this.controller.getNode(this.x + offx, this.y + offy));
            this._neighbors = [...temp, ...Node.dependentNeighborOffsets.map(dep => {
                for (let q = 0; q < dep[0].length; q++)
                    if (!temp[dep[0][q]]) return null;
                let [offx, offy] = dep[1];
                return this.controller.getNode(this.x + offx, this.y + offy);
            })].filter(Boolean);
        }
        return this._neighbors;
    }
}

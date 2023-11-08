import { Grid, GridCell } from '../data_structures/grid';

class BFS {
    grid: Grid;
    parent: { [key: string]: GridCell } = {};

    constructor(grid: Grid) {
        this.grid = grid;
    }


    public shortestPath(start: GridCell, end: GridCell) {
        let path_exist = this.search(start, end);

        if (!path_exist)
            return [];

        let path: GridCell[] = [];
        let child = end;

        while (this.parent[child.toString()] !== undefined) {
            path.push(child);
            child = this.parent[child.toString()]
        }
        path.push(child);

        return path;
    }


    public search(start: GridCell, end: GridCell) {
        let visited: { [key: string]: boolean } = {};

        visited[start.toString()] = true;

        let cellsToVisit: GridCell[] = [];

        for (let child of start.adjecent) {
            this.parent[child.toString()] = start;
            cellsToVisit.push(child);
        }

        while (cellsToVisit.length > 0) {
            let nextCellsToVisit: GridCell[] = [];

            for (let i = 0; i < cellsToVisit.length; i++) {
                let cell: GridCell = cellsToVisit[i];

                if (visited[cell.toString()] !== undefined)
                    continue;

                if (cell === end) {
                    return true;
                }

                for (let child of cell.adjecent) {
                    if (visited[child.toString()] === undefined) {
                        this.parent[child.toString()] = cell;
                        nextCellsToVisit.push(child);
                    }
                }

                visited[cell.toString()] = true;
            }
            cellsToVisit = nextCellsToVisit;
        }

        return false
    }
}

let grid = new Grid(10, 10, [[0,1],[1,1],[5,3], [8,9]]);
let algo = new BFS(grid);

let path = algo.shortestPath(grid.getCell(0, 0), grid.getCell(9, 9));
path.reverse()
let t: GridCell;
for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
        if(t === undefined)
            t = path.shift();

        if (t && t.x === i && t.y === j) {
            process.stdout.write("[..]")
            t = undefined;
        } else {
            process.stdout.write("[  ]")
        }
    }
    console.log()
}
import { Grid, GridCell } from './grid';

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

let grid = new Grid(2, 2);
let algo = new BFS(grid);

let path = algo.shortestPath(grid.getCell(0, 0), grid.getCell(1, 1));

console.log(path);
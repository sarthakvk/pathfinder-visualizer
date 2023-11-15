import { Grid, GridCell } from '../data_structures/grid';

export class BFS {
    private grid: Grid;
    private shortest_path_parent_refs: { [key: string]: GridCell } = {};

    constructor(grid: Grid) {
        this.grid = grid;
    }


    public shortestPath(start: GridCell, end: GridCell) {
        let path_exist = this.search(start, end);

        if (!path_exist)
            return [];

        let path: GridCell[] = [];
        let child = end;

        while (this.shortest_path_parent_refs[child.toString()] !== undefined) {
            path.push(child);
            child = this.shortest_path_parent_refs[child.toString()]
        }
        path.push(child);

        return path.reverse();
    }


    public search(start: GridCell, end: GridCell) {
        let visited: { [key: string]: boolean } = {};

        visited[start.toString()] = true;

        let cellsToVisit: GridCell[] = [];

        for (let child of start.adjecent) {
            this.shortest_path_parent_refs[child.toString()] = start;
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
                        this.shortest_path_parent_refs[child.toString()] = cell;
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

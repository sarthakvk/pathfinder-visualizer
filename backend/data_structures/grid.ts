export class GridCell {
    x: number;
    y: number;
    reachable: boolean;
    weight: number;
    adjecent: GridCell[];
    distance_from_source: number;

    constructor(x: number, y: number, reachable: boolean = true, weight: number = 1) {
        if (x < 0 || y < 0) {
            throw new Error("grid cell dimentions should be positive")
        }
        this.x = x;
        this.y = y;
        this.reachable = reachable;
        this.weight = weight;
        this.adjecent = [];
        this.distance_from_source = Infinity;
    }

    toString(): string {
        return `${this.x}-${this.y}`
    }
}


export class Grid {
    data: GridCell[][] = []
    row_size: number;
    col_size: number;

    constructor(M: number, N: number, blocked: [number, number][] = []) {
        this.row_size = M;
        this.col_size = N;
        blocked.sort((n1, n2) => {
            if (n1[0] !== n2[0])
                return n1[0] - n2[0];
            else
                return n1[1] - n2[1];
        })

        for (let i = 0; i < M; i++) {
            let row: GridCell[] = [];
            for (let j = 0; j < N; j++) {
                let can_reach = true;
                if (blocked.length !== 0 && blocked[0][0] == i && blocked[0][1] == j) {
                    can_reach = false;
                    blocked.shift()
                }
                let cell = new GridCell(i, j, can_reach);
                row.push(cell);
            }
            this.data.push(row);
        }
        this.setAdjCells();
    }

    public getCell(row: number, col: number): GridCell {
        if (this.isValidIndex(row, col))
            return this.data[row][col]

        throw new Error("Invalid index")
    }

    public getAllCells(): GridCell[]{
        let cells: GridCell[] = []
        for (let row of this.data) for (let cell of row) cells.push(cell);

        return cells;
    }
    public setCellWeight(row: number, col: number, weight: number){
        let cell  = this.getCell(row, col);
        cell.weight = weight;
    }

    public isValidIndex(row: number, col: number): boolean {
        return (row >= 0 && col >= 0 && row < this.row_size && col < this.col_size)
    }

    public canReachIndex(row: number, col: number): boolean {
        if (this.isValidIndex(row, col)) {
            let cell = this.getCell(row, col);
            return cell.reachable;
        }

        return false
    }

    private setAdjCells() {
        for (let i = 0; i < this.row_size; i++) {
            for (let j = 0; j < this.col_size; j++) {
                let cell = this.data[i][j]

                if (!cell.reachable)
                    continue

                if (this.canReachIndex(i - 1, j))
                    cell.adjecent.push(this.getCell(i - 1, j))

                if (this.canReachIndex(i + 1, j))
                    cell.adjecent.push(this.getCell(i + 1, j))

                if (this.canReachIndex(i, j - 1))
                    cell.adjecent.push(this.getCell(i, j - 1))

                if (this.canReachIndex(i, j + 1))
                    cell.adjecent.push(this.getCell(i, j + 1))
            }
        }
    }
}

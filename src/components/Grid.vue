<template>
    <div class="configuration">
        <h3 v-if="start === null"> Select the starting point</h3>
        <h3 v-else-if="end === null"> Select the end point</h3>
        <h3 v-else>Click and hover to block the cell, path can't have a blocked cell</h3>

        <input type="number" name="Rows" v-model="M" @change="initializeMatrix">
        <input type="number" name="Columns" v-model="N" @change="initializeMatrix">
    </div>
    <div class="table-container">
        <table class="table" @mouseleave="canSelectBlockedCellByHover = false">
            <tr v-for="(row, i) in M">
                <td :class="{ pathEndpoints: matrix[i][j], blocked: isBlocked(i, j) }" v-for="(col, j) in N"
                    :id="`${i}-${j}`">
                    <input class="matrix-checkbox" v-model="matrix[i][j]" @click.prevent="markPoint(i, j)"
                        @mousedown="markBlocked(i, j)" @mouseup="canSelectBlockedCellByHover = false"
                        @mouseover="canSelectBlockedCellByHover && markBlocked(i, j)" type="checkbox" />
                </td>
            </tr>
        </table>
    </div>
    <div class="configuration">
        <button class="findPathButton" @click="createShortestPath" :disabled="!!!start || !!!end">Find the shortest path</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { BFS } from '../backend/algorithms/bfs'
import { Grid } from '@/backend/data_structures/grid';
import { Dijkstra } from '../backend/algorithms/dijkstra';

export default class GridComponent extends Vue {
    start: [number, number] | null = null;
    end: [number, number] | null = null;
    M = 0;
    N = 0;
    matrix: boolean[][] = []
    blocked: { [key: number]: { [key: number]: boolean } } = {}
    canSelectBlockedCellByHover = false;

    created(): void {
        this.initializeMatrix()
    }

    initializeMatrix() {
        this.start = null;
        this.end = null;
        this.blocked = {};
        this.matrix = Array.from({ length: this.M }, () =>
            Array.from({ length: this.N }, () => false)
        );
    }

    markBlocked(row: number, column: number) {
        if (!(this.start && this.end))
            return

        this.canSelectBlockedCellByHover = true
        let blocked_rows = this.blocked[row] ? this.blocked[row] : {};
        blocked_rows[column] = !!!blocked_rows[column];
        this.blocked[row] = blocked_rows;
    }

    markPoint(row: number, column: number) {
        if (this.start === null) {
            this.start = [row, column]
            this.matrix[row][column] = true;
        }
        else if (this.end === null) {
            this.end = [row, column]
            this.matrix[row][column] = true;
        }
    }

    isBlocked(i: number, j: number) {
        return this.blocked[i] ? !!this.blocked[i][j] : false
    }

    getBlockedList(): [number, number][] {
        let obj = this.blocked;
        let blocked_list: [number, number][] = Object.keys(obj)
            .flatMap((outerKey) =>
                Object.keys(obj[parseInt(outerKey, 10)])
                    .filter((innerKey) => obj[parseInt(outerKey, 10)][parseInt(innerKey, 10)])
                    .map((innerKey): [number, number] => [parseInt(outerKey, 10), parseInt(innerKey, 10)])
            )

        console.log(blocked_list)
        return blocked_list;
    }

    clearPath() {
        if (!(!!this.start && !!this.end))
            return

        this.matrix.forEach(
            (row, r) => row.forEach(
                (val, c) => {
                    if (!((r === this.start![0] && c === this.start![1]) || (r === this.end![0] && c === this.end![1])))
                        this.matrix[r][c] = false;
                }
            )
        )
    }
    async createShortestPath() {
        this.clearPath()
        let blocked_list = this.getBlockedList()
        let grid = new Grid(this.M, this.N, blocked_list);
        let start_cell = grid.getCell(...this.start!)
        let end_cell = grid.getCell(...this.end!)
        let bfs = new BFS(grid)
        // let dj = new Dijkstra(grid, this.start!)
        let path = bfs.shortestPath(start_cell, end_cell)
        // let path = dj.findShortestPath(this.end!)

        const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

        for (let cell of path) {
            this.matrix[cell.x][cell.y] = true;
            await timer(50);
        }
    }
}
</script>

<style>
.configuration {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    justify-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
}

.table-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 85vh; */
}

.table {
    border-collapse: collapse;
}

.pathEndpoints {
    background-color: red;
}

.table td,
.table tr {
    margin: 0%;
    padding: 0%;
    display: flex;
    border: 1px solid black;

}

.matrix-checkbox {
    /* Hide the default checkbox */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* Add custom styles */
    width: 20px;
    height: 20px;
    border: 1px solid #3498db;
    border-radius: 0px;
    margin: 0%;
    padding: 0%;
    outline: none;
    transition: background-color 0.9s;
}

.blocked {
    background-color: purple;
}

.findPathButton {
    font-size: large;
    background-color: #3498db;
    color: black;
}
</style>
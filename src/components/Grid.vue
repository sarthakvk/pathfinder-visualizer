<template>
    <div class="configuration">
        <h3 v-if="start === null"> Select the starting point</h3>
        <h3 v-else-if="end === null"> Select the end point</h3>
        <h3 v-else>Click and hover to block the cell, path can't have a blocked cell</h3>

        <input type="number" name="Rows" v-model="M" @input="initializeMatrix">
        <input type="number" name="Columns" v-model="N" @input="initializeMatrix">
    </div>
    <div class="table-container" v-if="M > 0 && N > 0 && matrix.length == M && matrix[0].length == N">
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
        <button class="findPathButton" @click="createShortestPath" :disabled="!!!start || !!!end">Find the shortest
            path</button>
        <button class="findPathButton" @click="initializeMatrix">Reset</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import { BFS } from '../backend/algorithms/bfs';
import { Grid, GridCell } from '@/backend/data_structures/grid';
import { Dijkstra } from '../backend/algorithms/dijkstra';

export default defineComponent({
    props: {
        algorithm: {
            type: String as PropType<string>,
            default: 'bfs',
        },
    },
    setup(props) {
        const start = ref<[number, number] | null>(null);
        const end = ref<[number, number] | null>(null);
        let M = ref(0);
        let N = ref(0);
        const matrix = ref<boolean[][]>([]);
        const blocked = ref<{ [key: number]: { [key: number]: boolean } }>({});
        const canSelectBlockedCellByHover = ref(false);

        onMounted(() => {
            M.value = 30;
            N.value = 30;
            initializeMatrix();
        });

        const initializeMatrix = () => {
            start.value = null;
            end.value = null;
            blocked.value = {};
            matrix.value = Array.from({ length: M.value }, () =>
                Array.from({ length: N.value }, () => false)
            );
        };

        const markBlocked = (row: number, column: number) => {
            if (!(start.value && end.value)) return;

            canSelectBlockedCellByHover.value = true;
            const blockedRows = blocked.value[row] ? { ...blocked.value[row] } : {};
            blockedRows[column] = !!!blockedRows[column];
            blocked.value[row] = blockedRows;
        };

        const markPoint = (row: number, column: number) => {
            if (start.value === null) {
                start.value = [row, column];
                matrix.value[row][column] = true;
            } else if (end.value === null) {
                end.value = [row, column];
                matrix.value[row][column] = true;
            }
        };

        const isBlocked = (i: number, j: number) => {
            return blocked.value[i] ? !!blocked.value[i][j] : false;
        };

        const getBlockedList = (): [number, number][] => {
            const obj = blocked.value;
            const blockedList: [number, number][] = Object.keys(obj)
                .flatMap((outerKey) =>
                    Object.keys(obj[parseInt(outerKey, 10)])
                        .filter((innerKey) => obj[parseInt(outerKey, 10)][parseInt(innerKey, 10)])
                        .map((innerKey): [number, number] => [parseInt(outerKey, 10), parseInt(innerKey, 10)])
                );

            return blockedList;
        };

        const clearPath = () => {
            if (!(start.value && end.value)) return;

            matrix.value.forEach((row, r) =>
                row.forEach((val, c) => {
                    if (!((r === start.value![0] && c === start.value![1]) || (r === end.value![0] && c === end.value![1])))
                        matrix.value[r][c] = false;
                })
            );
        };

        const createShortestPath = async () => {
            clearPath();
            let blockedList = getBlockedList();
            let grid = new Grid(M.value, N.value, blockedList);
            let startCell = grid.getCell(...start.value!);
            let endCell = grid.getCell(...end.value!);
            let path: GridCell[] = [];

            if (props.algorithm === "bfs") {
                let bfs = new BFS(grid);
                path = bfs.shortestPath(startCell, endCell);
            }
            else if (props.algorithm == "dijkstra") {
                let dj = new Dijkstra(grid, start.value!);
                path = dj.findShortestPath(end.value!);
            }

            const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

            for (const cell of path) {
                matrix.value[cell.x][cell.y] = true;
                await timer(50);
            }
        };

        return {
            start,
            end,
            M,
            N,
            matrix,
            blocked,
            canSelectBlockedCellByHover,
            initializeMatrix,
            markBlocked,
            markPoint,
            isBlocked,
            getBlockedList,
            clearPath,
            createShortestPath,
        };
    },
});
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

.configuration button {
    margin-right: 5px;
    margin-left: 5px;
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
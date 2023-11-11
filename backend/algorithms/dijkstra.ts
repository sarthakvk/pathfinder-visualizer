import { Grid, GridCell } from "../data_structures/grid";
import { PriorityQueue } from "../data_structures/priority_queue";


class Dijkstra {
    private grid: Grid;
    private source_cell: GridCell;
    public shortest_path_parent_refs: { [key: string]: GridCell } = {};
    public shortest_distances: { [key: string]: number } = {};
    public vertex_queue: PriorityQueue<GridCell>;

    constructor(grid: Grid, source: [number, number]) {
        this.grid = grid;

        let source_cell = grid.getCell(source[0], source[1]);
        source_cell.distance_from_source = 0;
        this.source_cell = source_cell;

        let vertices = grid.getAllCells();
        this.vertex_queue = new PriorityQueue<GridCell>(vertices, (v1, v2) => v1.distance_from_source <= v2.distance_from_source);
    }

    public findAllShortestPaths() {
        while (!this.vertex_queue.isEmpty()) {
            let closest_vertex = this.vertex_queue.getMaxPriorityElement();

            this.shortest_distances[closest_vertex.toString()] = closest_vertex.distance_from_source;
            for (let adj of closest_vertex.adjecent) {
                if ((this.shortest_distances[adj.toString()] === undefined)) {
                    this.relax(adj, closest_vertex);
                }
            }
        }
    }


    public findShortestPath(destination: [number, number]): GridCell[] {
        let destination_cell = this.grid.getCell(...destination);
        while (!this.vertex_queue.isEmpty()) {
            let closest_vertex = this.vertex_queue.getMaxPriorityElement();
            let distance = closest_vertex.distance_from_source;
            this.shortest_distances[closest_vertex.toString()] = distance;

            if (closest_vertex === destination_cell) {
                return this.buildPath(closest_vertex);
            }

            for (let adj of closest_vertex.adjecent) {
                if ((this.shortest_distances[adj.toString()] === undefined)) {
                    this.relax(adj, closest_vertex);
                }
            }
        }
    }

    private buildPath(vertex: GridCell): GridCell[] {
        if (vertex.distance_from_source === Infinity)
            return []

        let path = [];
        let end_vertex = vertex;

        while (this.shortest_path_parent_refs[end_vertex.toString()] !== undefined) {
            path.push(end_vertex);
            end_vertex = this.shortest_path_parent_refs[end_vertex.toString()];
        }
        path.push(this.source_cell);

        return path;
    }

    private relax(vertex: GridCell, new_parent: GridCell) {
        let need_relaxing = vertex.distance_from_source > new_parent.distance_from_source + new_parent.weight;
        if (need_relaxing) {
            vertex.distance_from_source = new_parent.distance_from_source + new_parent.weight;
            this.shortest_path_parent_refs[vertex.toString()] = new_parent;
            this.vertex_queue.resyncElement(vertex);
        }
    }
}

import { Grid, GridCell } from "../data_structures/grid";
import { PriorityQueue } from "../data_structures/priority_queue";


class Dijkstra{
    public shortest_path_parent_refs: {[key: string]: GridCell} = {};
    public shortest_distances: {[key: string]: number} = {};
    public vertex_queue: PriorityQueue<GridCell>;

    constructor(grid: Grid, source: [number, number]){
        let source_cell = grid.getCell(source[0], source[1]);
        source_cell.distance_from_source = 0;
        let vertices = grid.getAllCells();
        this.vertex_queue = new PriorityQueue<GridCell>(vertices, (v1, v2) => v1.distance_from_source <= v2.distance_from_source);
    }

    public findAllShortestPaths(){
        while (!this.vertex_queue.isEmpty()){
            let closest_vertex = this.vertex_queue.getMaxPriorityElement();

            this.shortest_distances[closest_vertex.toString()] = closest_vertex.distance_from_source;
            for (let adj of closest_vertex.adjecent){
                if ((this.shortest_distances[adj.toString()] === undefined)){
                    this.relax(adj, closest_vertex);
                }
            }
        }
    }


    public findShortestPath() {
        // TODO
    }


    private relax(vertex: GridCell, new_parent: GridCell)
    {
        let need_relaxing = vertex.distance_from_source > new_parent.distance_from_source + new_parent.weight;
        if(need_relaxing){
            vertex.distance_from_source = new_parent.distance_from_source + new_parent.weight;
            this.shortest_path_parent_refs[vertex.toString()] = new_parent;
            this.vertex_queue.resyncElement(vertex);
        }
    }
}

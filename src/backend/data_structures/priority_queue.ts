import { BinaryHeap } from "./binary_heap";
import { Heap, ToString } from "./heap"

export class PriorityQueue<Type extends ToString> {
    private data: Heap<Type>;
    private compare_fn: (high: Type, low: Type) => boolean;

    constructor(
        values_list: Type[],
        key: (high: Type, low: Type) => boolean,
        store_backend: new (values_list: Type[], key: (high: Type, low: Type) => boolean) => Heap<Type> = BinaryHeap
    ) {
        this.data = new store_backend(values_list, key);
        this.compare_fn = key;
    }

    public peek() {
        return this.data.getRoot();
    }

    public getMaxPriorityElement() {
        return this.data.extractRoot();
    }

    public resyncElement(element: Type) {
        this.data.resyncElement(element);
    }

    public isEmpty() {
        let root = this.data.getRoot();
        if (root === undefined)
            return true
        return false;
    }

    public insert(value: Type) {
        this.data.insert(value);
    }
}

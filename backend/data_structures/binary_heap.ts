class BinaryHeap<Type>{
    public values_list: Type[];
    private compare_fn: (parent: Type, child: Type) => boolean;


    constructor(values: Type[], key: (parent: Type, child: Type) => boolean) {
        this.compare_fn = key;
        this.values_list = values.map((val) => val)

        for (let i = this.values_list.length - 1; i >= 0; i--) {
            this.heapifyUp(i)
        }
    }


    public extractRoot() {
        let heap_size = this.values_list.length;

        if (heap_size < 1)
            return

        this.replace(0, heap_size - 1)
        let root = this.values_list.pop();
        this.heapifyDown(0);

        return root;
    }


    public insert(value: Type) {
        this.values_list.push(value);
        let last_idx = this.values_list.length;
        this.heapifyUp(last_idx);
    }


    public getRoot() {
        let heap_size = this.values_list.length;

        if (heap_size > 0)
            return this.values_list[0]

    }


    private heapifyUp(index: number) {
        if (index === 0)
            return

        // Child of Nth index will be left: 2N + 1 & right: 2N + 2
        // to get the parent of `i` we just need to get floor of (i - 1) / 2
        let parent_idx = (index + (index % 2)) / 2 - 1;

        let parent: Type = this.values_list[parent_idx]
        let child: Type = this.values_list[index]

        if (!this.compare_fn(parent, child)) {
            this.replace(parent_idx, index)
            this.heapifyUp(parent_idx);
        }

    }


    private replace(index1: number, index2: number) {
        let max_idx = this.values_list.length - 1;

        if (index1 > max_idx || index2 > max_idx)
            return

        let tmp: Type = this.values_list[index1];
        this.values_list[index1] = this.values_list[index2];
        this.values_list[index2] = tmp;
    }


    private heapifyDown(index: number) {
        let left_child_idx = index * 2 + 1;
        let right_child_idx = left_child_idx + 1;
        let last_idx = this.values_list.length - 1;

        if (left_child_idx > last_idx)
            return

        let parent = this.values_list[index];
        let left_child = this.values_list[left_child_idx];
        let right_child: Type;

        if (right_child_idx <= last_idx)
            right_child = this.values_list[right_child_idx];

        if (right_child === undefined) {
            if (!this.compare_fn(parent, left_child)) {
                this.replace(index, left_child_idx)
                this.heapifyDown(left_child_idx);
            }
        }
        else {
            if (this.compare_fn(right_child, left_child) && !this.compare_fn(parent, right_child)) {
                this.replace(index, right_child_idx)
                this.heapifyDown(right_child_idx);
            }
            else if (this.compare_fn(left_child, right_child) && !this.compare_fn(parent, left_child)) {
                this.replace(index, left_child_idx)
                this.heapifyDown(left_child_idx);
            }
        }
    }
}

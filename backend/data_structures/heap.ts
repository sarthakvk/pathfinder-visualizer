export interface Heap<Type> {
    extractRoot(): Type;
    insert(value: Type): void;
    getRoot(): Type;
    resyncElement(element: Type)
}

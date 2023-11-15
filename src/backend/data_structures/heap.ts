export interface Heap<Type> {
    extractRoot(): Type | undefined;
    insert(value: Type): void;
    getRoot(): Type | undefined;
    resyncElement(element: Type): void
}

export interface ToString {
    toString(): string
}

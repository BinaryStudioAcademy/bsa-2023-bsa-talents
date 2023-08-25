type Service<T = unknown> = {
    find(): Promise<T>;
    findById(id: number): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Service };

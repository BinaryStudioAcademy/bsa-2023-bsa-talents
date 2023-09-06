type Service<T = unknown> = {
    find(payload: Record<string, unknown>): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(payload: unknown): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Service };

type Repository<T = unknown> = {
    find(payload: unknown): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(payload: unknown): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Repository };

type Repository<T = unknown> = {
    findById(id: number): Promise<T>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(): Promise<T>;
    delete(): Promise<boolean>;
};

export { type Repository };

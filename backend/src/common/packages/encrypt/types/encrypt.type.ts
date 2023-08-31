type Encrypt = {
    make: (data: string) => Promise<string>;
    compare: (data: string, encrypted: string) => Promise<boolean>;
};

export { type Encrypt };

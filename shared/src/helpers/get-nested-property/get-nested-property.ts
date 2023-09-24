const getNestedProperty = <T>(
    object: Record<string, unknown>,
    path: string,
): T | undefined => {
    const keys = path.split('.');
    let value: unknown = object;

    for (const key of keys) {
        if (value === undefined || value === null) {
            return undefined;
        }
        value = (value as Record<string, unknown>)[key];
    }

    return value as T;
};

export { getNestedProperty };

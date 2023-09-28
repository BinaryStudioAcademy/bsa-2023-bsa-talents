type NestedObject<T = unknown> = Record<string, T>;

const getNestedProperty = <T, O extends NestedObject>(
    object: O,
    path: (keyof O)[],
): T | undefined => {
    const findNested = (object_: NestedObject, keys: (keyof O)[]): unknown => {
        if (keys.length === 0) {
            return object_;
        }

        const [firstKey, ...remainingKeys] = keys;
        const value = object_[firstKey as string];

        if (value === undefined || value === null) {
            return undefined;
        }

        return findNested(value as NestedObject, remainingKeys);
    };

    return findNested(object, path) as T;
};

export { getNestedProperty };

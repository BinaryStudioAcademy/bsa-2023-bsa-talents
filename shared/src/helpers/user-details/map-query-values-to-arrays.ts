const mapQueryValuesToArrays = <
    T extends Record<string, string | string[] | boolean | number | number[]>,
>(
    queryObject: T,
    exceptions: string[],
): T => {
    const filteredObject: Record<
        string,
        string | string[] | boolean | number | number[]
    > = {};

    for (const key in queryObject) {
        if (!exceptions.includes(key)) {
            const value = queryObject[key];
            if (typeof value === 'string') {
                filteredObject[key] = [value];
            } else if (typeof value === 'number') {
                filteredObject[key] = [value];
            } else {
                filteredObject[key] = value;
            }
        }
    }

    return { ...queryObject, ...filteredObject } as T;
};

export { mapQueryValuesToArrays };

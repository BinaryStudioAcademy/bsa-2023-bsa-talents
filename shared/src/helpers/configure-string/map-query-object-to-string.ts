const mapQueryObjectToString = <
    T extends Record<string, string | string[] | boolean | number | number[]>,
>(
    query: T,
): string => {
    return Object.entries(query)
        .filter(
            ([, value]) =>
                value !== '' && !(Array.isArray(value) && value.length === 0),
        )
        .flatMap(([key, value]) =>
            Array.isArray(value)
                ? value.map((v) => `${key}=${v}`)
                : `${key}=${value}`,
        )
        .join('&');
};

export { mapQueryObjectToString };

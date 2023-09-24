const mapQueryObjectToString = <
    T extends Record<string, string | string[] | boolean | number | number[]>,
>(
    query: T,
): string => {
    return Object.entries(query)
        .filter(([, value]) => {
            if (value === '') {
                return false;
            } else if (Array.isArray(value) && value.length === 0) {
                return false;
            } else {
                return true;
            }
        })
        .flatMap(([key, value]) => {
            return Array.isArray(value)
                ? value.map((v) => `${key}=${v}`)
                : `${key}=${value}`;
        })
        .join('&');
};

export { mapQueryObjectToString };

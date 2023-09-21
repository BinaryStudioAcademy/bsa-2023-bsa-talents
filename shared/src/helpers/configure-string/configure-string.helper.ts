const configureString = <T extends Record<string, string | string[] | boolean>>(
    ...parameters: [...string[], T]
): string => {
    const copiedArguments = [...parameters];

    const options = copiedArguments.pop() as T;

    let result = copiedArguments.join('');

    const query: Record<string, string | string[] | boolean> = {};

    for (const [key, value] of Object.entries(options)) {
        // parse url params
        if (typeof value === 'string') {
            result = result.replace(`:${key}`, value);
        }
        // pars query params
        const regex = new RegExp(`\\?(${key})`);
        result = result.replace(regex, (_, group) => {
            query[group] = value;
            return '';
        });
    }

    const queryString = Object.entries(query)
        .filter(([, value]) => value)
        .map(([key, value]) => {
            return Array.isArray(value)
                ? value
                      .map((v) => [key, v].join('='))
                      .filter(Boolean)
                      .join('&')
                : [key, value].join('=');
        })
        .filter(Boolean)
        .join('&');

    result += queryString ? `?${queryString}` : '';

    return result;
};

export { configureString };

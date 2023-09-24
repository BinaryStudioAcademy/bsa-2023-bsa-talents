import { mapQueryObjectToString } from './map-query-object-to-string.js';

const configureString = <T extends Record<string, string | string[] | boolean>>(
    ...parameters: [...string[], T]
): string => {
    const copiedArguments = [...parameters];

    const options = copiedArguments.pop() as T;

    let endpoint = copiedArguments.join('');

    const query: Record<string, string | string[] | boolean> = {};

    for (const [key, value] of Object.entries(options)) {
        // parse url params
        if (typeof value === 'string') {
            endpoint = endpoint.replace(`:${key}`, value);
        }
        // parse query params
        const queryRegex = new RegExp(`\\?(${key})`);
        endpoint = endpoint.replace(queryRegex, (_, queryParameter) => {
            query[queryParameter] = value;
            return '';
        });
    }

    const queryString = mapQueryObjectToString(query);

    endpoint += queryString ? `?${queryString}` : '';

    return endpoint;
};

export { configureString };

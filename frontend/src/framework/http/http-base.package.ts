import { type Http, type HttpOptions } from './types/types.js';

class HttpBase implements Http {
    public load(path: string, options: HttpOptions): Promise<Response> {
        const { method, payload, headers } = options;

        return fetch(path, {
            method,
            headers,
            body: payload,
        });
    }
}

export { HttpBase };

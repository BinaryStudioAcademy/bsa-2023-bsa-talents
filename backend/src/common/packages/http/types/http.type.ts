import { type Response } from 'node-fetch';

import { type HttpOptions } from './http-options.type.js';

type Http = {
    load(path: string, options: HttpOptions): Promise<Response>;
};

export { type Http };

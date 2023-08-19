import { type HttpApiOptions } from '../types/types.js';

type HttpApi = {
    load(path: string, options: HttpApiOptions): Promise<Response>;
};

export { type HttpApi };

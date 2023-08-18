import { type HttpApiOptions } from '../types/types.js';

type IHttpApi = {
    load(path: string, options: HttpApiOptions): Promise<Response>;
};

export { type IHttpApi };

import { type HttpApiOptions } from './types';

type HttpApi = {
    load(path: string, options: HttpApiOptions): Promise<Response>;
};

export { type HttpApi };

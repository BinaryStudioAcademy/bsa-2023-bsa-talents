import { type HttpOptions } from '../types/http-options.type';

type Http = {
    load(path: string, options: HttpOptions): Promise<Response>;
};

export { type Http };

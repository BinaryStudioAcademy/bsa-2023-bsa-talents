import { type HttpOptions } from './http-options.type';

type Http = {
    load(path: string, options: HttpOptions): Promise<Response>;
};

export { type Http };

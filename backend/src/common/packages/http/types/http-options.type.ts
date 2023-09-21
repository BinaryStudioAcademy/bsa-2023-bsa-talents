import { type BodyInit } from 'node-fetch';

import { type HttpMethod } from './http-method.type.js';

type HttpOptions = {
    method?: HttpMethod;
    payload?: BodyInit | null;
    headers?: { 'X-Token': string | undefined }; // TODO: fix, shoud be used all types of headers
};

export { type HttpOptions };

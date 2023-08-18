import { HttpBase } from './http-base.package';

const http = new HttpBase();

export { http };
export { HttpCode, HttpHeader } from './enums/enums';
export { HttpError } from './exceptions/exceptions';
export { type Http } from './interfaces/interfaces';
export { type HttpOptions } from './types/types';

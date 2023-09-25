import { type ValidationSchema } from './types.js';

type ValidationParameters = {
    body?: ValidationSchema;
    query?: ValidationSchema;
};

export { type ValidationParameters };

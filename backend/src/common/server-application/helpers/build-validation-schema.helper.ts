import { type FastifySchema } from 'fastify';

import { type ValidationParameters } from '../types/types.js';

const buildValidationSchema = (
    validation: ValidationParameters,
): FastifySchema => {
    const validationSchema: FastifySchema = {};

    if (validation.body) {
        validationSchema.body = validation.body;
    }

    if (validation.query) {
        validationSchema.querystring = validation.query;
    }

    return validationSchema;
};

export { buildValidationSchema };

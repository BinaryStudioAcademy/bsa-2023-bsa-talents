import { config } from '~/common/packages/packages.js';

type Return = {
    origin: string[];
    methods: string[];
    allowedHeaders: string[];
};

const getCorsConfiguration = (): Return => {
    const { ORIGINS, METHODS, ALLOWED_HEADERS } = config.ENV.CORS;

    const origin = ORIGINS.split(',');
    const methods = METHODS.split(',');
    const allowedHeaders = ALLOWED_HEADERS.split(',');

    return {
        origin,
        methods,
        allowedHeaders,
    };
};

export { getCorsConfiguration };

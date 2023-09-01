import { AuthApiPath } from '~/bundles/auth/enums/enums.js';
import { ApiPath } from '~/common/enums/enums.js';

const WHITE_ROUTES = [
    {
        path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
        methods: ['POST'],
    },
    {
        path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
        methods: ['POST'],
    },
    {
        path: `/api/v1${ApiPath.DOCUMENTATION}/*`,
        methods: ['GET'],
    },
];

export { WHITE_ROUTES };

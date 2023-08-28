import { AuthApiPath } from '~/bundles/auth/enums/enums.js';
import { ApiPath } from '~/common/enums/enums.js';

const WHITE_ROUTES = [
    {
        routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
        methods: ['POST'],
    },
    {
        routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
        methods: ['POST'],
    },
    {
        routerPath: `/v1${ApiPath.DOCUMENTATION}/`,
        methods: ['GET'],
    },
    {
        routerPath: `/v1${ApiPath.DOCUMENTATION}/static/*`,
        methods: ['GET'],
    },
    {
        routerPath: `/v1${ApiPath.DOCUMENTATION}/json`,
        methods: ['GET'],
    },
];

export { WHITE_ROUTES };

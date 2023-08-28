import { AuthApiPath } from '~/bundles/auth/enums/enums.js';
import { ApiPath } from '~/common/enums/enums.js';

const WHITE_ROUTES = [
    `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
];

export { WHITE_ROUTES };

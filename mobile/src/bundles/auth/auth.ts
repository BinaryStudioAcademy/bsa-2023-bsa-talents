import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { AuthApi } from './auth-api';

const authApi = new AuthApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { authApi };

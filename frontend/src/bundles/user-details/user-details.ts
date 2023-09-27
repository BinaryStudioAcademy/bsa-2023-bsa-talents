import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { UserDetailsApi } from './user-details-api.js';

const userDetailsApi = new UserDetailsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { userDetailsApi };

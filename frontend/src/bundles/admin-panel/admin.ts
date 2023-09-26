import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { AdminApi } from './admin-panel-api.js';

const adminApi = new AdminApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { adminApi };

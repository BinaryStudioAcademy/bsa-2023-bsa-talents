import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { EmployersApi } from './employers-api.js';

const employersApi = new EmployersApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { employersApi };

import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { LMSApi } from './lms-api.js';

const lmsApi = new LMSApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { lmsApi };

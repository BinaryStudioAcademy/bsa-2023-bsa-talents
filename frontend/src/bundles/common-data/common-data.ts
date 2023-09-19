import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { CommonDataApi } from './common-data-api.js';

const commonDataApi = new CommonDataApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    http,
    storage,
});

export { commonDataApi };

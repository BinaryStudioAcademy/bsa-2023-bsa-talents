import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { HiringInfoApi } from './hiring-info-api.js';

const hiringInfoApi = new HiringInfoApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { hiringInfoApi };

import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { BsaBadgesApi } from './bsa-badges-api.js';

const bsaBadgesApi = new BsaBadgesApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    http,
    storage,
});

export { bsaBadgesApi };

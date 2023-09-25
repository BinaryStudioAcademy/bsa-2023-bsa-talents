import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { CommonApi } from './common-api';

const commonApi = new CommonApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { commonApi };

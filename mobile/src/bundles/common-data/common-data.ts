import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { CommonDataApi } from './common-data-api';

const commonDataApi = new CommonDataApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { commonDataApi };

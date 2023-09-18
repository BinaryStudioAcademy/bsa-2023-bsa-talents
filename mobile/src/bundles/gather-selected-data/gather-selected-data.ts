import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { GatherSelectedDataApi } from './gather-selected-data-api';

const gatherSelectedDataApi = new GatherSelectedDataApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { gatherSelectedDataApi };

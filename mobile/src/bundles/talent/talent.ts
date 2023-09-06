import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { TalentApi } from './talent-api';

const talentApi = new TalentApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { talentApi };

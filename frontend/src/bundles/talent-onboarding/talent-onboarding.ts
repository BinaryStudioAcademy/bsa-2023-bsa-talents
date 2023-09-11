import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { TalentOnBoardingApi } from './talent-onboarding-api.js';

const talentOnBoardingApi = new TalentOnBoardingApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { talentOnBoardingApi };

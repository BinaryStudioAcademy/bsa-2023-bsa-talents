import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { EmployerOnBoardingApi } from './employer-onboarding-api.js';

const employerOnBoardingApi = new EmployerOnBoardingApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { employerOnBoardingApi };

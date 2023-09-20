import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { EmployerApi } from './employer-api';

const employerApi = new EmployerApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { employerApi };

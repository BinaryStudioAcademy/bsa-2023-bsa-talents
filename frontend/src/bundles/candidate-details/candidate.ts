import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { CandidateApi } from './candidate-api.js';

const candidateApi = new CandidateApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { candidateApi };

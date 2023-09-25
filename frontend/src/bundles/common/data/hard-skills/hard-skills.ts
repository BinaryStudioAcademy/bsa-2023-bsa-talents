import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { HardSkillsApi } from './hard-skills-api.js';

const hardSkillsApi = new HardSkillsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    http,
    storage,
});

export { hardSkillsApi };

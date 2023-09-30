import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { FetchLinkPreviewApi } from './fetch-link-preview-api.js';

const fetchLinkPreviewApi = new FetchLinkPreviewApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { fetchLinkPreviewApi };

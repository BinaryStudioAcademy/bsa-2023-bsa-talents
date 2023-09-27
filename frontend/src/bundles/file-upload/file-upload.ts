import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { FileUploadApi } from './file-upload-api.js';

const fileUploadApi = new FileUploadApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { fileUploadApi };

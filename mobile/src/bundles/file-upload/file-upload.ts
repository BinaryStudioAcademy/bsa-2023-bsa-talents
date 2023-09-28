import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { FileUploadApi } from './file-upload-api';

const fileUploadApi = new FileUploadApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { fileUploadApi };

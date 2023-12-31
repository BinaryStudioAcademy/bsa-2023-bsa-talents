import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { ChatApi } from './chat-api';

const chatApi = new ChatApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { chatApi };

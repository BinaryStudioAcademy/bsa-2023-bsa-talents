import { type LMSDataServerResponseDto } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class UsersApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USERS, baseUrl, http, storage });
    }

    public async getTalentLmsDataById(
        payload: string,
    ): Promise<LMSDataServerResponseDto | null> {
        const path = '/:userId/lms-data'.replace(':userId', payload);
        const response = await this.load(this.getFullEndpoint(path, {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });

        return await response.json<LMSDataServerResponseDto>();
    }
}

export { UsersApi };

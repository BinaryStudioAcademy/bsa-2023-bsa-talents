import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type TalentBadgeResponseDto } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class LMSApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USERS, baseUrl, http, storage });
    }

    public async getTalentBadges(
        payload: string,
    ): Promise<TalentBadgeResponseDto> {
        const pathSegments = ['/', payload, '/bsa-badges'];

        const response = await this.load(
            this.getFullEndpoint(...pathSegments, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<TalentBadgeResponseDto>();
    }
}

export { LMSApi };

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type BsaBadges } from '../types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class BsaBadgesApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.BSA_BADGES, baseUrl, http, storage });
    }

    public async getAllBSABadges(): Promise<BsaBadges> {
        const response = await this.load(
            this.getFullEndpoint(ApiPath.BSA_BADGES, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return await response.json<BsaBadges>();
    }
}

export { BsaBadgesApi };

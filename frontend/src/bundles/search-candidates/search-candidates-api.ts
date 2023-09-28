import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type SeacrhCandidateResponse,
    type UserDetailsSearchUsersRequestDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class SearchCandidatesApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async searchUserDetails(
        payload: Partial<UserDetailsSearchUsersRequestDto>,
    ): Promise<SeacrhCandidateResponse[]> {
        const queryParameters = Object.keys(payload).map((key) => `?${key}`);

        const response = await this.load(
            this.getFullEndpoint(...queryParameters, payload),

            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return response.json<SeacrhCandidateResponse[]>();
    }
    public async getCandidateDetailsByUserId(payload: {
        userId: string;
    }): Promise<SeacrhCandidateResponse | null> {
        const response = await this.load(
            this.getFullEndpoint('/', ':userId', payload),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<SeacrhCandidateResponse>();
    }
}

export { SearchCandidatesApi };

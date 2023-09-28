import {
    ApiPath,
    ContentType,
    UserDetailsApiPath,
} from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type SeacrhCandidateResponse } from '../search-candidates/types/types.js';
import {
    type UserDetailsFindByUserIdRequestDto,
    type UserDetailsGeneralCustom,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class TalentOnBoardingApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async getUserDetailsByUserId(
        payload: Partial<UserDetailsGeneralCustom>,
    ): Promise<SeacrhCandidateResponse | null> {
        const { userId = '' } = payload;

        const response = await this.load(
            this.getFullEndpoint('/', ':userId', { userId }),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<SeacrhCandidateResponse>();
    }

    public async updatePublishedData(
        payload: UserDetailsFindByUserIdRequestDto,
    ): Promise<UserDetailsGeneralCustom> {
        const { userId } = payload;
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.PUBLISH, {
                userId,
            }),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );
        return response.json<UserDetailsGeneralCustom>();
    }

    public async createUserDetails(
        payload: UserDetailsGeneralCustom,
    ): Promise<SeacrhCandidateResponse> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<SeacrhCandidateResponse>();
    }

    public async updateUserDetails(
        payload: UserDetailsGeneralCustom,
    ): Promise<SeacrhCandidateResponse> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return response.json<SeacrhCandidateResponse>();
    }
}

export { TalentOnBoardingApi };

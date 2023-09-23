import {
    ApiPath,
    ContentType,
    UserDetailsApiPath,
} from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type UserDetailsGeneralCustom } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class EmployerOnBoardingApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async createUserDetails(
        payload: UserDetailsGeneralCustom,
    ): Promise<UserDetailsGeneralCustom> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<UserDetailsGeneralCustom>();
    }

    public async updateUserDetails(
        payload: UserDetailsGeneralCustom,
    ): Promise<UserDetailsGeneralCustom> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<UserDetailsGeneralCustom>();
    }

    public async getUserDetailsByUserId(
        payload: Partial<UserDetailsGeneralCustom>,
    ): Promise<UserDetailsGeneralCustom | null> {
        const { userId = '' } = payload;

        const response = await this.load(
            this.getFullEndpoint('/', userId, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<UserDetailsGeneralCustom>();
    }
}

export { EmployerOnBoardingApi };

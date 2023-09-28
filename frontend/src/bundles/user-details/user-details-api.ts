import {
    ApiPath,
    ContentType,
    UserDetailsApiPath,
} from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';
import { getURLWithQueryString } from '~/helpers/helpers.js';

import { type UserDetailsGeneralCustom } from '../talent-onboarding/types/types.js';
import {
    type UserDetailsFullResponseDto,
    type UserDetailsShortResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};
class UserDetailsApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async getUserDetailsById(
        payload: string,
    ): Promise<UserDetailsGeneralCustom | null> {
        const path = '/:userId/company'.replace(':userId', payload);
        const response = await this.load(this.getFullEndpoint(path, {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });

        return await response.json<UserDetailsGeneralCustom>();
    }
    public async getShortUserDetailsByRole(payload: {
        role: 'talent' | 'employer';
    }): Promise<UserDetailsShortResponseDto[]> {
        const { role } = payload;
        const path = getURLWithQueryString(UserDetailsApiPath.SHORT, {
            userType: role,
        });

        const response = await this.load(this.getFullEndpoint(path, {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });

        return response.json();
    }

    public async getFullUserDetailsById(payload: {
        userId: string;
    }): Promise<UserDetailsFullResponseDto> {
        const { userId } = payload;

        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.FULL, { userId }),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<UserDetailsFullResponseDto>();
    }

    public async approve(payload: { userId: string }): Promise<boolean> {
        const { userId } = payload;

        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.APPROVE, { userId }),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<boolean>();
    }

    public async deny(payload: {
        userId: string;
        deniedReason: string;
    }): Promise<boolean> {
        const { userId, deniedReason } = payload;

        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.DENY, { userId }),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify({ deniedReason }),
                hasAuth: true,
            },
        );
        return response.json<boolean>();
    }
}

export { UserDetailsApi };

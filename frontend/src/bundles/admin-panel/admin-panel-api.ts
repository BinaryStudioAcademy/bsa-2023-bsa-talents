import {
    ApiPath,
    ContentType,
    UserDetailsApiPath,
} from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type UserDetailsFullResponseDto,
    type UserDetailsShortResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class AdminApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    // public async getUserDetailsByUserId(
    //     payload: Partial<UserDetailsFullResponseDto>,
    // ): Promise<UserDetailsFullResponseDto | null> {
    //     const { userId = '' } = payload;

    //     const response = await this.load(
    //         this.getFullEndpoint('/', userId, {}),
    //         {
    //             method: 'GET',
    //             contentType: ContentType.JSON,
    //             hasAuth: true,
    //         },
    //     );
    //     return response.json<UserDetailsFullResponseDto>();
    // }

    public async getShortUserDetailsByRole(payload: {
        role: 'talent' | 'employer';
    }): Promise<UserDetailsShortResponseDto[]> {
        const { role = '' } = payload;

        const response = await this.load(
            this.getFullEndpoint(
                UserDetailsApiPath.SHORT,
                '?userType=',
                role,
                {},
            ),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return response.json();
    }

    public async getFullUserDetailsById(
        payload: Partial<UserDetailsFullResponseDto>,
    ): Promise<UserDetailsFullResponseDto> {
        const { userId = '' } = payload;

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

    public async approve(
        payload: Partial<UserDetailsFullResponseDto>,
    ): Promise<boolean> {
        const { userId = '' } = payload;

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

export { AdminApi };

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { UsersApiPath } from './enums/enums.js';
import {
    type UserFindResponseDto,
    type UserGetAllResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class UserApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USERS, baseUrl, http, storage });
    }

    public async getAll(): Promise<UserGetAllResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<UserGetAllResponseDto>();
    }

    public async getByToken(): Promise<UserFindResponseDto> {
        const token = localStorage.getItem(StorageKey.TOKEN);
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: false,
                payload: JSON.stringify({ token }),
            },
        );
        return await response.json<UserFindResponseDto>();
    }
}

export { UserApi };

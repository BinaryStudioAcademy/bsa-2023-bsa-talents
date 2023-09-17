import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

import { UsersApiPath } from './enums/enums';
import { type UserGetAllResponseDto } from './users';

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
}

export { UserApi };

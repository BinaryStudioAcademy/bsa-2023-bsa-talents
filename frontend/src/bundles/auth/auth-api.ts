import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import {
    type UserFindResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import { AuthApiPath } from './enums/enums.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class AuthApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.AUTH, baseUrl, http, storage });
    }

    public async signUp(
        payload: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<UserSignUpResponseDto>();
    }

    public async getByToken(): Promise<UserFindResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.CURRENT_USER, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<UserFindResponseDto>();
    }
}

export { AuthApi };

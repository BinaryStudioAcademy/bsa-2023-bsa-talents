import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '../users/users';
import { AuthApiPath } from './enums/enums';

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

    public async signIn(
        payload: UserSignInRequestDto,
    ): Promise<UserSignInResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<UserSignUpResponseDto>();
    }
}

export { AuthApi };

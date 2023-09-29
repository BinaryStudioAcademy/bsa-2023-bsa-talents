import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import {
    type UserDetailsCreateRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsGeneralResponseDto,
    type UserDetailsResponseDto,
} from '~/bundles/common/types/types';
import { UserDetailsApiPath } from '~/bundles/talent/enums/enums';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class CommonApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async completeUserDetails(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<UserDetailsResponseDto>();
    }

    public async completeOnboardingStep(
        payload: UserDetailsGeneralRequestDto,
    ): Promise<UserDetailsGeneralResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<UserDetailsGeneralResponseDto>();
    }

    public async getUserDetailsByUserId(
        payload: Partial<UserDetailsGeneralRequestDto>,
    ): Promise<UserDetailsResponseDto | null> {
        const { userId = '' } = payload;
        const response = await this.load(
            this.getFullEndpoint('/', userId, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<UserDetailsResponseDto>();
    }

    public async updatePublishedData(
        payload: Partial<UserDetailsGeneralRequestDto>,
    ): Promise<UserDetailsGeneralRequestDto> {
        const { userId = '' } = payload;
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.PUBLISH, { userId }),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify(payload),
            },
        );
        return response.json<UserDetailsGeneralRequestDto>();
    }

    public async getTalents(
        payload: string,
    ): Promise<UserDetailsResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, payload, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<UserDetailsResponseDto[]>();
    }
}

export { CommonApi };

import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import {
    type UserDetailsCreateRequestDto,
    type UserDetailsGeneralRequestDto,
    type UserDetailsResponseDto,
} from '~/bundles/talent/types/types';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class TalentApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async completeTalentDetails(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const response = await this.load(this.getFullEndpoint('/', {}), {
            method: 'POST',
            contentType: ContentType.JSON,
            payload: JSON.stringify(payload),
            hasAuth: true,
        });
        return await response.json<UserDetailsResponseDto>();
    }

    public async completeOnboardingStep(
        payload: UserDetailsGeneralRequestDto,
    ): Promise<UserDetailsGeneralRequestDto> {
        const response = await this.load(this.getFullEndpoint('/', {}), {
            method: 'PATCH',
            contentType: ContentType.JSON,
            payload: JSON.stringify(payload),
            hasAuth: true,
        });
        return await response.json<UserDetailsGeneralRequestDto>();
    }

    public async getUserDetailsByUserId(
        payload: Partial<UserDetailsGeneralRequestDto>,
    ): Promise<UserDetailsGeneralRequestDto | null> {
        const { userId = '' } = payload;
        const response = await this.load(
            this.getFullEndpoint('/', userId, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<UserDetailsGeneralRequestDto>();
    }
}

export { TalentApi };

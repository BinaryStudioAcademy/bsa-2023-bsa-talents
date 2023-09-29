import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import {
    type BadgesResponseDto,
    type HardSkillsResponseDto,
    type LMSDataResponseDto,
    type TalentBadgeResponseDto,
    type UserFindResponseDto,
    type UserGetLMSDataById,
} from '~/bundles/common-data/types/types';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class CommonDataApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.EMPTY, baseUrl, http, storage });
    }

    public async getBadgesData(): Promise<BadgesResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ApiPath.BSA_BADGES, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<BadgesResponseDto>();
    }

    public async getTalentBadges(
        payload: string,
    ): Promise<TalentBadgeResponseDto> {
        const path = ['/', payload, '/bsa-badges'];
        const response = await this.load(this.getFullEndpoint(...path, {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });
        return response.json<TalentBadgeResponseDto>();
    }

    public async getHardSkillsData(): Promise<HardSkillsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ApiPath.HARD_SKILLS, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<HardSkillsResponseDto>();
    }

    public async getDataFromLMS({
        userId,
    }: UserGetLMSDataById): Promise<LMSDataResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ApiPath.USERS, `/${userId}/`, 'lms-data', {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<LMSDataResponseDto>();
    }

    public async getAllUsers(): Promise<{ items: UserFindResponseDto[] }> {
        const response = await this.load(
            this.getFullEndpoint(ApiPath.USERS, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<{ items: UserFindResponseDto[] }>();
    }
}

export { CommonDataApi };

import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import {
    BSABadgeApiPath,
    HardSkillsApiPath,
} from '~/bundles/gather-selected-data/enums/enums';
import {
    type BadgesResponseDto,
    type HardSkillsResponseDto,
} from '~/bundles/gather-selected-data/types/types';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class GatherSelectedDataApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async getBadgesData(): Promise<BadgesResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(BSABadgeApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<BadgesResponseDto>();
    }

    public async getHardSkillsData(): Promise<HardSkillsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(HardSkillsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<HardSkillsResponseDto>();
    }
}

export { GatherSelectedDataApi };

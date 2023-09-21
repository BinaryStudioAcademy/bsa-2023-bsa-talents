import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type HardSkillsResponseDto } from '../../types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class HardSkillsApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: '', baseUrl, http, storage });
    }

    public async getAllHardSkills(): Promise<HardSkillsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ApiPath.HARD_SKILLS, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );

        return response.json<HardSkillsResponseDto>();
    }
}

export { HardSkillsApi };

import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import { AuthApiPath } from '~/bundles/talent/enums/enums';
import { type ProfileStepDto } from '~/bundles/talent/types/types';
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
        super({ path: ApiPath.AUTH, baseUrl, http, storage });
    }

    public async setProfileStep(
        payload: ProfileStepDto,
    ): Promise<ProfileStepDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.CURRENT_USER, {}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );
        return await response.json<ProfileStepDto>();
    }
}

export { TalentApi };

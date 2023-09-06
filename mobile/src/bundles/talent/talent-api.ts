import { ApiPath } from '~/bundles/common/enums/enums';
// import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
// import { UserDetailsApiPath } from '~/bundles/talent/enums/enums';
import {
    type ProfileStepDto,
    type SkillsStepDto,
} from '~/bundles/talent/types/types';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

//TODO update when UserDetailsApiPath is ready
class TalentApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.AUTH, baseUrl, http, storage });
    }
    public completeProfileStep(payload: ProfileStepDto): ProfileStepDto {
        return payload;
    }

    // public constructor({ baseUrl, http, storage }: Constructor) {
    //     super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    // }

    // public async completeProfileStep(
    //     payload: ProfileStepDto,
    // ): Promise<ProfileStepDto> {
    //     const response = await this.load(
    //         this.getFullEndpoint(UserDetailsApiPath.UPDATE, {}),
    //         {
    //             method: 'PATCH',
    //             contentType: ContentType.JSON,
    //             payload: JSON.stringify(payload),
    //             hasAuth: true,
    //         },
    //     );
    //     return await response.json<ProfileStepDto>();
    // }
    public completeSkillsStep(payload: SkillsStepDto): SkillsStepDto {
        return payload;
    }
}

export { TalentApi };

import {
    ApiPath,
    ContentType,
    UserDetailsApiPath,
} from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type EmployerDataDto } from './types/employers-data-dto.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class EmployersApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async getEmployerDetails(userId: string): Promise<EmployerDataDto> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, `/${userId}`, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json();
    }
}

export { EmployersApi };

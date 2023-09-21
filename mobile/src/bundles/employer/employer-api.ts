import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import { type UserDetailsResponseDto } from '~/bundles/employer/types/types';
import { UserDetailsApiPath } from '~/bundles/talent/enums/enums';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class EmployerApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async getAllTalents(): Promise<UserDetailsResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<UserDetailsResponseDto[]>();
    }

    public async getFilteredTalents(
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

export { EmployerApi };

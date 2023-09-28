import { ContactsApiPath } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type ContactsCreateRequestDto,
    type ContactsFindRequestDto,
    type ContactsResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class CandidateApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.CONTACTS, baseUrl, http, storage });
    }

    public async shareContactWithCompany(
        payload: ContactsCreateRequestDto,
    ): Promise<ContactsResponseDto | null> {
        const response = await this.load(
            this.getFullEndpoint(ContactsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<ContactsResponseDto>();
    }

    public async getContactWithTalent(
        payload: ContactsFindRequestDto,
    ): Promise<boolean> {
        const queryParameters = Object.keys(payload).map((key) => `?${key}`);

        const response = await this.load(
            this.getFullEndpoint(...queryParameters, payload),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<boolean>();
    }
}

export { CandidateApi };

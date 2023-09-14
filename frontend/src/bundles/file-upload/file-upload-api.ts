import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/http-api-base.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import { FileApiPath } from './enums/enums.js';
import { type FileUploadResponse } from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class FileUploadApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.FILES, baseUrl, http, storage });
    }

    public async uploadDocument(payload: { cv: File }): Promise<string> {
        const formData = new FormData();
        formData.append('document', payload.cv);

        const response = await this.load(
            this.getFullEndpoint(FileApiPath.DOCUMENT, {}),
            {
                method: 'POST',
                contentType: ContentType.MULTI_PART_FORM,
                payload: formData,
                hasAuth: true,
            },
        );

        const parsed = await response.json<FileUploadResponse>();
        return parsed.id;
    }

    public async uploadImage(payload: { photo: File }): Promise<string> {
        const formData = new FormData();
        formData.append('image', payload.photo);

        const response = await this.load(
            this.getFullEndpoint(FileApiPath.IMAGE, {}),
            {
                method: 'POST',
                contentType: ContentType.MULTI_PART_FORM,
                payload: formData,
                hasAuth: true,
            },
        );

        const parsed = await response.json<FileUploadResponse>();
        return parsed.id;
    }
}

export { FileUploadApi };

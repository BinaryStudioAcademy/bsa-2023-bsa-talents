import { FileApiPath } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/http-api-base.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import { type FileApiHandlerResponse } from './types/file-api-response.type.js';

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
        formData.append('file', payload.cv);

        const response = await this.load(
            this.getFullEndpoint(FileApiPath.DOCUMENT, {}),
            {
                method: 'POST',
                contentType: ContentType.MULTI_PART_FORM,
                payload: formData,
                hasAuth: true,
            },
        );

        const responseJson = await response.json<FileApiHandlerResponse>();
        return responseJson.payload;
    }

    public async uploadImage(payload: { photo: File }): Promise<string> {
        const formData = new FormData();
        formData.append('file', payload.photo);

        const response = await this.load(
            this.getFullEndpoint(FileApiPath.IMAGE, {}),
            {
                method: 'POST',
                contentType: ContentType.MULTI_PART_FORM,
                payload: formData,
                hasAuth: true,
            },
        );

        const responseJson = await response.json<FileApiHandlerResponse>();
        return responseJson.payload;
    }
}

export { FileUploadApi };

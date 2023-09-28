import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import { HttpApiBase } from '~/framework/api/http-api-base';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

import { FileApiPath } from './enums/enums';
import { type FileUploadResponse } from './types/types';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class FileUploadApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.FILES, baseUrl, http, storage });
    }

    public async upload(payload: {
        files: File[];
    }): Promise<FileUploadResponse> {
        const formData = new FormData();
        for (const file of payload.files) {
            formData.append('files', file);
        }

        const response = await this.load(
            this.getFullEndpoint(FileApiPath.UPLOAD, {}),
            {
                method: 'POST',
                contentType: ContentType.MULTI_PART_FORM,
                payload: formData,
                hasAuth: true,
            },
        );

        return response.json<FileUploadResponse>();
    }
}

export { FileUploadApi };

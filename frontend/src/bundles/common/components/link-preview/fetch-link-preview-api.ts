import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class FetchLinkPreviewApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.PROXY_LINK_PREVIEW, baseUrl, http, storage });
    }

    public async fetchLinkPreviewData(url: string): Promise<{ data: string }> {
        const response = await this.load(
            this.getFullEndpoint(`/?url=${url}`, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json();
    }
}

export { FetchLinkPreviewApi };

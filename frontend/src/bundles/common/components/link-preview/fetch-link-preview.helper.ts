import { fetchLinkPreviewApi } from './fetch-link-preview.js';
import { type LinkPreviewData } from './link-preview-data.type.js';

const fetchLinkPreview = async (
    url: string,
): Promise<LinkPreviewData | null> => {
    try {
        const response = await fetchLinkPreviewApi.fetchLinkPreviewData(url);
        const data = response.data;
        const parser = new DOMParser();
        const document = parser.parseFromString(data, 'text/html');
        const title = document.querySelector('title')?.textContent ?? '';
        const description =
            document
                .querySelector('meta[name="description"]')
                ?.getAttribute('content') ?? '';
        const image =
            document
                .querySelector('meta[property="og:image"]')
                ?.getAttribute('content') ?? '';

        return { title, description, image };
    } catch {
        return null;
    }
};

export { fetchLinkPreview };

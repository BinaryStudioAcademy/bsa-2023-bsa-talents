import fetch from 'node-fetch';

class ProxyLinkPreviewService {
    public async proxyLinkPreview(payload: {
        url: string;
    }): Promise<{ data: string }> {
        const response = await fetch(payload.url);
        const data = await response.text();
        return { data };
    }
}

export { ProxyLinkPreviewService };

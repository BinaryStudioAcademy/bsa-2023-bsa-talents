import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { type ProxyLinkPreviewService } from './proxy-link-preview.service.js';

class ProxyLinkPreviewController extends ControllerBase {
    private proxyLinkPreviewService: ProxyLinkPreviewService;

    public constructor(
        logger: Logger,
        proxyLinkPreviewService: ProxyLinkPreviewService,
    ) {
        super(logger, ApiPath.PROXY_LINK_PREVIEW);
        this.proxyLinkPreviewService = proxyLinkPreviewService;

        this.addRoute({
            path: '/',
            method: 'GET',
            handler: (options) => {
                return this.proxyLinkPreview(
                    options as ApiHandlerOptions<{
                        query: { url: string };
                    }>,
                );
            },
        });
    }

    private async proxyLinkPreview(
        options: ApiHandlerOptions<{ query: { url: string } }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.proxyLinkPreviewService.proxyLinkPreview(
                options.query,
            ),
        };
    }
}

export { ProxyLinkPreviewController };
